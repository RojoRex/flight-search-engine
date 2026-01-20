const AIRLINES = [
  { name: 'SkyHigh Air', code: 'SH' },
  { name: 'Oceanic', code: 'OC' },
  { name: 'Global Wings', code: 'GW' },
  { name: 'Starliner', code: 'SL' },
  { name: 'Quantum Jets', code: 'QJ' }
];

const AIRPORTS = ['JFK', 'LHR', 'CDG', 'HND', 'DXB', 'SIN', 'LAX', 'SFO'];

// Helper to generate random flight data
const generateFlights = (from, to, date) => {
  const results = [];
  const basePrice = 300 + Math.random() * 200;
  
  // Generate 25 mock flights
  for (let i = 0; i < 25; i++) {
    const airline = AIRLINES[Math.floor(Math.random() * AIRLINES.length)];
    const stops = Math.floor(Math.random() * 3); // 0, 1, or 2 stops
    const durationBase = 300; // minutes
    const duration = durationBase + (stops * 120) + Math.floor(Math.random() * 60);
    
    // Price calculation
    let price = basePrice + (stops * -50) + (Math.random() * 300);
    if (airline.name === 'Quantum Jets') price += 150; // Premium airline
    
    // Time
    const departureHour = Math.floor(Math.random() * 24);
    const departureMinute = Math.floor(Math.random() * 60);
    
    const depDate = new Date(date);
    depDate.setHours(departureHour, departureMinute, 0);
    
    const arrDate = new Date(depDate.getTime() + duration * 60000);
    
    results.push({
      id: `fl-${i}-${Date.now()}`,
      airline: airline.name,
      airlineCode: airline.code,
      flightNumber: `${airline.code}${Math.floor(100 + Math.random() * 900)}`,
      origin: from || AIRPORTS[Math.floor(Math.random() * AIRPORTS.length)],
      destination: to || AIRPORTS[Math.floor(Math.random() * AIRPORTS.length)],
      departureTime: depDate.toISOString(),
      arrivalTime: arrDate.toISOString(),
      durationMinutes: duration,
      stops: stops,
      price: Math.floor(price),
    });
  }
  
  // Sort by price initially
  return results.sort((a, b) => a.price - b.price);
};

export const searchFlights = async ({ origin, destination, date }) => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const flights = generateFlights(origin, destination, date);
      resolve(flights);
    }, 800); // 800ms delay
  });
};
