// This service is integrated with Amadeus Self-Service API
// Documentation: https://developers.amadeus.com/self-service/category/air/api-doc/flight-offers-search

const AMADEUS_BASE_URL = 'https://test.api.amadeus.com/v2';
const CLIENT_ID = import.meta.env.VITE_AMADEUS_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

// Token management
let accessToken = null;
let tokenExpiry = 0;

const getAccessToken = async () => {
    const now = Date.now();
    if (accessToken && now < tokenExpiry) return accessToken;

    if (!CLIENT_ID || !CLIENT_SECRET) {
        throw new Error("Missing Amadeus API Keys. Please check your .env file.");
    }

    const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    });

    if (!response.ok) {
        throw new Error("Failed to authenticate with Amadeus API");
    }

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpiry = now + (data.expires_in * 1000) - 60000; // Expire 1 minute early for safety
    return accessToken;
};

// Start with standard IATA dictionary (can be expanded)
const AIRLINE_NAMES = {
    'AA': 'American Airlines',
    'DL': 'Delta Air Lines',
    'UA': 'United Airlines',
    'BA': 'British Airways',
    'AF': 'Air France',
    'LH': 'Lufthansa',
    'SQ': 'Singapore Airlines',
    'EK': 'Emirates',
    'QR': 'Qatar Airways',
    'QF': 'Qantas',
    'CX': 'Cathay Pacific',
    'JL': 'Japan Airlines',
    'NH': 'All Nippon Airways',
    'AC': 'Air Canada'
};

export const searchFlightsAmadeus = async ({ origin, destination, date }) => {
    try {
        const token = await getAccessToken();

        // Format: date must be YYYY-MM-DD
        const url = `${AMADEUS_BASE_URL}/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=1&nonStop=false&max=25`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch flight offers");
        }

        const data = await response.json();

        // Using dictionaries from response if available for better mapping
        const dictionaries = data.dictionaries || {};

        // Map Amadeus response to our app structure
        return data.data.map(offer => {
            const it = offer.itineraries[0];
            const segment = it.segments[0];
            const airlineCode = offer.validatingAirlineCodes[0];

            // Try to find name in dictionaries, then local map, then fallback to code
            let airlineName = dictionaries.carriers ? dictionaries.carriers[airlineCode] : null;
            if (!airlineName) airlineName = AIRLINE_NAMES[airlineCode] || airlineCode;

            return {
                id: offer.id,
                airline: airlineName,
                airlineCode: airlineCode,
                flightNumber: `${segment.carrierCode}${segment.number}`,
                origin: segment.departure.iataCode,
                destination: it.segments[it.segments.length - 1].arrival.iataCode,
                departureTime: segment.departure.at,
                arrivalTime: it.segments[it.segments.length - 1].arrival.at,
                durationMinutes: parseDuration(it.duration),
                stops: it.segments.length - 1,
                price: parseFloat(offer.price.total)
            };
        });
    } catch (error) {
        console.error("Amadeus API Error:", error);
        throw error;
    }
};

// Fallback locations for Test Environment (which has limited dataset)
const FALLBACK_LOCATIONS = [
    { name: "Ninoy Aquino Intl", iataCode: "MNL", cityName: "Manila", countryName: "Philippines", type: "AIRPORT" },
    { name: "Changi", iataCode: "SIN", cityName: "Singapore", countryName: "Singapore", type: "AIRPORT" },
    { name: "Heathrow", iataCode: "LHR", cityName: "London", countryName: "United Kingdom", type: "AIRPORT" },
    { name: "John F Kennedy Intl", iataCode: "JFK", cityName: "New York", countryName: "United States", type: "AIRPORT" },
    { name: "Haneda", iataCode: "HND", cityName: "Tokyo", countryName: "Japan", type: "AIRPORT" },
    { name: "Narita Intl", iataCode: "NRT", cityName: "Tokyo", countryName: "Japan", type: "AIRPORT" },
    { name: "Hong Kong Intl", iataCode: "HKG", cityName: "Hong Kong", countryName: "Hong Kong", type: "AIRPORT" },
    { name: "Suvarnabhumi", iataCode: "BKK", cityName: "Bangkok", countryName: "Thailand", type: "AIRPORT" },
    { name: "Dubai Intl", iataCode: "DXB", cityName: "Dubai", countryName: "United Arab Emirates", type: "AIRPORT" },
    { name: "Charles De Gaulle", iataCode: "CDG", cityName: "Paris", countryName: "France", type: "AIRPORT" },
    { name: "Los Angeles Intl", iataCode: "LAX", cityName: "Los Angeles", countryName: "United States", type: "AIRPORT" },
    { name: "San Francisco Intl", iataCode: "SFO", cityName: "San Francisco", countryName: "United States", type: "AIRPORT" },
    { name: "Kingsford Smith", iataCode: "SYD", cityName: "Sydney", countryName: "Australia", type: "AIRPORT" },
    { name: "Indira Gandhi Intl", iataCode: "DEL", cityName: "New Delhi", countryName: "India", type: "AIRPORT" },
    { name: "Incheon Intl", iataCode: "ICN", cityName: "Seoul", countryName: "South Korea", type: "AIRPORT" }
];

// Search for cities or airports
export const searchLocations = async (keyword) => {
    if (!keyword || keyword.length < 2) return [];

    const lowerKeyword = keyword.toLowerCase();

    // 1. Search Local Fallback first (Instant & fixes Test Env gaps)
    const localMatches = FALLBACK_LOCATIONS.filter(loc =>
        loc.cityName.toLowerCase().includes(lowerKeyword) ||
        loc.iataCode.toLowerCase().includes(lowerKeyword) ||
        loc.name.toLowerCase().includes(lowerKeyword)
    );

    try {
        const token = await getAccessToken();
        const url = `${AMADEUS_BASE_URL}/reference-data/locations?subType=CITY,AIRPORT&keyword=${keyword}&page[limit]=5`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        let apiResults = [];
        if (response.ok) {
            const data = await response.json();
            apiResults = data.data.map(loc => ({
                name: loc.name,
                iataCode: loc.iataCode,
                cityName: loc.address.cityName,
                countryName: loc.address.countryName,
                type: loc.subType
            }));
        }

        // 2. Merge results: API first, but filter out duplicates from API that match local Fallback to avoid double showing
        // (Or simpler: just combine and dedupe by IATA code)
        const combined = [...apiResults, ...localMatches];

        // Deduplicate by IATA Code
        const seen = new Set();
        const uniqueResults = [];
        for (const item of combined) {
            if (!seen.has(item.iataCode)) {
                seen.add(item.iataCode);
                uniqueResults.push(item);
            }
        }

        return uniqueResults;

    } catch (error) {
        console.warn("Location Search API failed, using fallback only", error);
        return localMatches;
    }
};

// Helper for ISO 8601 duration (PT1H30M -> 90)
const parseDuration = (duration) => {
    if (!duration) return 0;

    const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!matches) return 0;

    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;

    return (hours * 60) + minutes;
};
