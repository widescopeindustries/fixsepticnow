export interface City {
  name: string;
  slug: string;
  county: string;
  region: string; // "houston-metro" | "austin-metro" | "san-antonio-metro" | "dfw-metro" | "east-texas"
  population: number;
  neighbors: string[]; // slugs of neighboring cities
  soilType: string;
  lat: number;
  lng: number;
}

export const cities: City[] = [
  // Tier 1 - Houston Metro
  { name: "Conroe", slug: "conroe", county: "Montgomery", region: "houston-metro", population: 97200, neighbors: ["the-woodlands", "magnolia", "willis", "huntsville"], soilType: "sandy loam and clay", lat: 30.3119, lng: -95.4561 },
  { name: "Katy", slug: "katy", county: "Harris", region: "houston-metro", population: 21894, neighbors: ["cypress", "richmond", "fulshear"], soilType: "heavy clay (Beaumont clay)", lat: 29.7858, lng: -95.8245 },
  { name: "Spring", slug: "spring", county: "Harris", region: "houston-metro", population: 54298, neighbors: ["the-woodlands", "tomball", "conroe", "humble"], soilType: "sandy clay loam", lat: 30.0799, lng: -95.4172 },
  { name: "Tomball", slug: "tomball", county: "Harris", region: "houston-metro", population: 12280, neighbors: ["spring", "magnolia", "cypress", "the-woodlands"], soilType: "sandy loam", lat: 30.0972, lng: -95.6161 },
  { name: "Magnolia", slug: "magnolia", county: "Montgomery", region: "houston-metro", population: 2632, neighbors: ["tomball", "conroe", "the-woodlands", "waller"], soilType: "sandy loam", lat: 30.2091, lng: -95.7508 },
  { name: "Cypress", slug: "cypress", county: "Harris", region: "houston-metro", population: 186475, neighbors: ["katy", "tomball", "spring", "waller"], soilType: "heavy clay", lat: 29.9691, lng: -95.6972 },
  { name: "The Woodlands", slug: "the-woodlands", county: "Montgomery", region: "houston-metro", population: 114436, neighbors: ["conroe", "spring", "tomball", "magnolia"], soilType: "sandy loam", lat: 30.1658, lng: -95.4613 },
  { name: "Humble", slug: "humble", county: "Harris", region: "houston-metro", population: 15569, neighbors: ["spring", "kingwood", "atascocita"], soilType: "clay loam", lat: 29.9988, lng: -95.2622 },
  { name: "Willis", slug: "willis", county: "Montgomery", region: "houston-metro", population: 6800, neighbors: ["conroe", "huntsville", "the-woodlands"], soilType: "sandy loam", lat: 30.4249, lng: -95.4797 },
  { name: "Waller", slug: "waller", county: "Waller", region: "houston-metro", population: 3235, neighbors: ["magnolia", "cypress", "katy", "hempstead"], soilType: "sandy loam and clay", lat: 30.0566, lng: -95.9272 },
  { name: "Richmond", slug: "richmond", county: "Fort Bend", region: "houston-metro", population: 12592, neighbors: ["katy", "rosenberg", "fulshear"], soilType: "heavy clay", lat: 29.5822, lng: -95.7608 },
  { name: "Fulshear", slug: "fulshear", county: "Fort Bend", region: "houston-metro", population: 16977, neighbors: ["katy", "richmond", "waller"], soilType: "clay loam", lat: 29.6894, lng: -95.8991 },
  { name: "Hempstead", slug: "hempstead", county: "Waller", region: "houston-metro", population: 8268, neighbors: ["waller", "magnolia", "brenham"], soilType: "sandy loam", lat: 30.0972, lng: -96.0786 },

  // Tier 1 - Austin Metro
  { name: "Dripping Springs", slug: "dripping-springs", county: "Hays", region: "austin-metro", population: 5765, neighbors: ["wimberley", "buda", "bee-cave"], soilType: "limestone and thin clay", lat: 30.1902, lng: -98.0867 },
  { name: "Liberty Hill", slug: "liberty-hill", county: "Williamson", region: "austin-metro", population: 5440, neighbors: ["georgetown", "leander", "burnet"], soilType: "limestone and rocky clay", lat: 30.6644, lng: -97.9225 },
  { name: "Georgetown", slug: "georgetown", county: "Williamson", region: "austin-metro", population: 75420, neighbors: ["liberty-hill", "round-rock", "hutto", "taylor"], soilType: "blackland clay and limestone", lat: 30.6333, lng: -97.6781 },
  { name: "Bastrop", slug: "bastrop", county: "Bastrop", region: "austin-metro", population: 10200, neighbors: ["smithville", "elgin", "buda"], soilType: "sandy loam (Lost Pines)", lat: 30.1105, lng: -97.3153 },
  { name: "Wimberley", slug: "wimberley", county: "Hays", region: "austin-metro", population: 3200, neighbors: ["dripping-springs", "san-marcos", "buda"], soilType: "limestone karst", lat: 29.9977, lng: -98.0986 },
  { name: "Buda", slug: "buda", county: "Hays", region: "austin-metro", population: 16843, neighbors: ["dripping-springs", "kyle", "wimberley"], soilType: "blackland clay", lat: 30.0852, lng: -97.8392 },
  { name: "Kyle", slug: "kyle", county: "Hays", region: "austin-metro", population: 55645, neighbors: ["buda", "san-marcos", "wimberley"], soilType: "blackland clay", lat: 29.9889, lng: -97.8772 },
  { name: "Leander", slug: "leander", county: "Williamson", region: "austin-metro", population: 75272, neighbors: ["liberty-hill", "georgetown", "cedar-park"], soilType: "limestone and clay", lat: 30.5788, lng: -97.8531 },
  { name: "Hutto", slug: "hutto", county: "Williamson", region: "austin-metro", population: 40195, neighbors: ["georgetown", "taylor", "round-rock"], soilType: "blackland clay", lat: 30.5427, lng: -97.5467 },
  { name: "Taylor", slug: "taylor", county: "Williamson", region: "austin-metro", population: 17456, neighbors: ["hutto", "georgetown", "elgin"], soilType: "blackland clay", lat: 30.5708, lng: -97.4097 },
  { name: "Elgin", slug: "elgin", county: "Bastrop", region: "austin-metro", population: 11200, neighbors: ["taylor", "bastrop", "smithville"], soilType: "sandy loam and clay", lat: 30.3497, lng: -97.3703 },
  { name: "Smithville", slug: "smithville", county: "Bastrop", region: "austin-metro", population: 4200, neighbors: ["bastrop", "la-grange", "elgin"], soilType: "sandy loam", lat: 30.0086, lng: -97.1592 },

  // Tier 1 - San Antonio Metro
  { name: "New Braunfels", slug: "new-braunfels", county: "Comal", region: "san-antonio-metro", population: 98857, neighbors: ["san-marcos", "boerne", "seguin"], soilType: "limestone and clay", lat: 29.7030, lng: -98.1245 },
  { name: "Boerne", slug: "boerne", county: "Kendall", region: "san-antonio-metro", population: 20093, neighbors: ["new-braunfels", "comfort", "fair-oaks-ranch"], soilType: "limestone karst (Hill Country)", lat: 29.7947, lng: -98.7320 },
  { name: "Seguin", slug: "seguin", county: "Guadalupe", region: "san-antonio-metro", population: 32400, neighbors: ["new-braunfels", "san-marcos", "gonzales"], soilType: "blackland clay and sandy loam", lat: 29.5689, lng: -97.9647 },
  { name: "San Marcos", slug: "san-marcos", county: "Hays", region: "san-antonio-metro", population: 67553, neighbors: ["new-braunfels", "kyle", "wimberley", "seguin"], soilType: "limestone and blackland clay", lat: 29.8833, lng: -97.9414 },

  // Tier 1 - DFW Metro
  { name: "Waxahachie", slug: "waxahachie", county: "Ellis", region: "dfw-metro", population: 41250, neighbors: ["cleburne", "corsicana", "midlothian", "ennis"], soilType: "blackland clay", lat: 32.3866, lng: -96.8483 },
  { name: "Ennis", slug: "ennis", county: "Ellis", region: "dfw-metro", population: 22588, neighbors: ["waxahachie", "corsicana", "midlothian"], soilType: "blackland clay", lat: 32.3294, lng: -96.6253 },
  { name: "Midlothian", slug: "midlothian", county: "Ellis", region: "dfw-metro", population: 36000, neighbors: ["waxahachie", "ennis", "cleburne", "red-oak"], soilType: "blackland clay", lat: 32.4824, lng: -96.9942 },
  { name: "Red Oak", slug: "red-oak", county: "Ellis", region: "dfw-metro", population: 14000, neighbors: ["midlothian", "ennis", "waxahachie"], soilType: "blackland clay", lat: 32.5176, lng: -96.8044 },

  // Tier 2 - North DFW / Texoma
  { name: "Gainesville", slug: "gainesville", county: "Cooke", region: "dfw-metro", population: 17000, neighbors: ["weatherford"], soilType: "sandy loam and clay", lat: 33.6259, lng: -97.1334 },
  { name: "Stephenville", slug: "stephenville", county: "Erath", region: "dfw-metro", population: 21000, neighbors: ["granbury", "weatherford"], soilType: "sandy loam and clay", lat: 32.2207, lng: -98.2023 },

  // Tier 2 - East Texas
  { name: "Paris", slug: "paris", county: "Lamar", region: "east-texas", population: 24000, neighbors: ["athens"], soilType: "sandy loam", lat: 33.6609, lng: -95.5555 },
  { name: "Jacksonville", slug: "jacksonville", county: "Cherokee", region: "east-texas", population: 14000, neighbors: ["palestine", "athens", "canton"], soilType: "sandy loam", lat: 31.9638, lng: -95.2705 },
  { name: "Weatherford", slug: "weatherford", county: "Parker", region: "dfw-metro", population: 32930, neighbors: ["azle", "granbury", "mineral-wells"], soilType: "sandy loam and clay", lat: 32.7593, lng: -97.7973 },
  { name: "Azle", slug: "azle", county: "Tarrant", region: "dfw-metro", population: 13024, neighbors: ["weatherford", "springtown", "decatur"], soilType: "sandy loam", lat: 32.8954, lng: -97.5458 },
  { name: "Granbury", slug: "granbury", county: "Hood", region: "dfw-metro", population: 11320, neighbors: ["weatherford", "cleburne", "glen-rose"], soilType: "sandy loam and limestone", lat: 32.4419, lng: -97.7942 },
  { name: "Cleburne", slug: "cleburne", county: "Johnson", region: "dfw-metro", population: 32850, neighbors: ["waxahachie", "granbury", "burleson"], soilType: "blackland clay", lat: 32.3476, lng: -97.3867 },
  { name: "Corsicana", slug: "corsicana", county: "Navarro", region: "dfw-metro", population: 24200, neighbors: ["waxahachie", "athens", "terrell"], soilType: "blackland clay", lat: 32.0954, lng: -96.4689 },
  { name: "Terrell", slug: "terrell", county: "Kaufman", region: "dfw-metro", population: 19600, neighbors: ["corsicana", "kaufman", "forney"], soilType: "blackland clay", lat: 32.7360, lng: -96.2753 },
  { name: "Canton", slug: "canton", county: "Van Zandt", region: "dfw-metro", population: 4050, neighbors: ["terrell", "athens", "kaufman"], soilType: "sandy loam and clay", lat: 32.5565, lng: -95.8633 },
  { name: "Kaufman", slug: "kaufman", county: "Kaufman", region: "dfw-metro", population: 7600, neighbors: ["terrell", "forney", "canton"], soilType: "blackland clay", lat: 32.5890, lng: -96.3089 },
  { name: "Forney", slug: "forney", county: "Kaufman", region: "dfw-metro", population: 27345, neighbors: ["terrell", "kaufman", "rockwall"], soilType: "blackland clay", lat: 32.7481, lng: -96.4719 },

  // Tier 2 - East Texas
  { name: "Huntsville", slug: "huntsville", county: "Walker", region: "east-texas", population: 46100, neighbors: ["conroe", "willis", "livingston", "navasota"], soilType: "sandy loam", lat: 30.7235, lng: -95.5508 },
  { name: "Livingston", slug: "livingston", county: "Polk", region: "east-texas", population: 5400, neighbors: ["huntsville", "lufkin"], soilType: "sandy loam and pine forest soil", lat: 30.7111, lng: -94.9330 },
  { name: "Lufkin", slug: "lufkin", county: "Angelina", region: "east-texas", population: 35540, neighbors: ["livingston", "nacogdoches"], soilType: "deep sandy loam (Piney Woods)", lat: 31.3382, lng: -94.7291 },
  { name: "Nacogdoches", slug: "nacogdoches", county: "Nacogdoches", region: "east-texas", population: 33800, neighbors: ["lufkin", "palestine"], soilType: "sandy loam and red clay", lat: 31.6035, lng: -94.6555 },
  { name: "Palestine", slug: "palestine", county: "Anderson", region: "east-texas", population: 18700, neighbors: ["corsicana", "athens", "nacogdoches"], soilType: "sandy loam", lat: 31.7621, lng: -95.6308 },
  { name: "Athens", slug: "athens", county: "Henderson", region: "east-texas", population: 13000, neighbors: ["canton", "corsicana", "palestine"], soilType: "sandy loam and clay", lat: 32.2049, lng: -95.8550 },
  { name: "Navasota", slug: "navasota", county: "Grimes", region: "east-texas", population: 7700, neighbors: ["huntsville", "brenham", "hempstead"], soilType: "sandy loam", lat: 30.3880, lng: -96.0878 },
  { name: "Brenham", slug: "brenham", county: "Washington", region: "east-texas", population: 17800, neighbors: ["navasota", "hempstead", "la-grange"], soilType: "sandy loam and clay", lat: 30.1669, lng: -96.3978 },
  { name: "La Grange", slug: "la-grange", county: "Fayette", region: "east-texas", population: 4900, neighbors: ["smithville", "brenham"], soilType: "sandy loam and clay", lat: 29.9055, lng: -96.8767 },

  // Tier 1 - Streetman & Central Texas Core (100-mile Radius)
  { name: "Streetman", slug: "streetman", county: "Freestone", region: "central-texas", population: 300, neighbors: ["fairfield", "teague", "corsicana", "wortham", "kerens"], soilType: "sandy loam and clay (Richland Chambers Lake)", lat: 31.8732, lng: -96.3264 },
  { name: "Fairfield", slug: "fairfield", county: "Freestone", region: "central-texas", population: 3000, neighbors: ["streetman", "teague", "buffalo", "corsicana"], soilType: "sandy loam and red clay", lat: 31.7243, lng: -96.1652 },
  { name: "Teague", slug: "teague", county: "Freestone", region: "central-texas", population: 3500, neighbors: ["fairfield", "streetman", "mexia", "wortham"], soilType: "clay loam", lat: 31.6282, lng: -96.2841 },
  { name: "Mexia", slug: "mexia", county: "Limestone", region: "central-texas", population: 7400, neighbors: ["groesbeck", "teague", "wortham", "corsicana"], soilType: "blackland clay", lat: 31.6846, lng: -96.5828 },
  { name: "Groesbeck", slug: "groesbeck", county: "Limestone", region: "central-texas", population: 4200, neighbors: ["mexia", "waco", "buffalo"], soilType: "blackland clay", lat: 31.5249, lng: -96.5350 },
  { name: "Buffalo", slug: "buffalo", county: "Leon", region: "central-texas", population: 1900, neighbors: ["fairfield", "centerville", "jewett"], soilType: "sandy loam", lat: 31.4657, lng: -96.0583 },
  { name: "Centerville", slug: "centerville", county: "Leon", region: "central-texas", population: 900, neighbors: ["buffalo", "madisonville", "crockett"], soilType: "sandy loam", lat: 31.2588, lng: -95.9791 },
  { name: "Wortham", slug: "wortham", county: "Freestone", region: "central-texas", population: 1100, neighbors: ["streetman", "mexia", "teague", "corsicana"], soilType: "blackland clay", lat: 31.7877, lng: -96.4633 },
  { name: "Kerens", slug: "kerens", county: "Navarro", region: "central-texas", population: 1500, neighbors: ["corsicana", "streetman", "athens"], soilType: "sandy loam", lat: 32.1332, lng: -96.2289 },

  // Cedar Creek Lake / Tri-County Lake Hubs
  { name: "Gun Barrel City", slug: "gun-barrel-city", county: "Henderson", region: "east-texas", population: 6200, neighbors: ["mabank", "malakoff", "tool", "seven-points"], soilType: "sandy loam (Cedar Creek Lake waterfront)", lat: 32.3324, lng: -96.1158 },
  { name: "Mabank", slug: "mabank", county: "Kaufman", region: "dfw-metro", population: 4000, neighbors: ["gun-barrel-city", "canton", "kaufman"], soilType: "sandy loam and clay", lat: 32.3671, lng: -96.1030 },
  { name: "Malakoff", slug: "malakoff", county: "Henderson", region: "east-texas", population: 2400, neighbors: ["gun-barrel-city", "athens", "kerens"], soilType: "sandy loam", lat: 32.1677, lng: -95.9772 },
  { name: "Tool", slug: "tool", county: "Henderson", region: "east-texas", population: 2300, neighbors: ["gun-barrel-city", "seven-points", "malakoff"], soilType: "sandy loam", lat: 32.2618, lng: -96.1558 },
  { name: "Seven Points", slug: "seven-points", county: "Henderson", region: "east-texas", population: 1500, neighbors: ["tool", "gun-barrel-city", "mabank"], soilType: "sandy loam", lat: 32.3368, lng: -96.2080 },

  // Waco & McLennan County Hub
  { name: "Waco", slug: "waco", county: "McLennan", region: "central-texas", population: 138000, neighbors: ["hewitt", "woodway", "robinson", "hillsboro"], soilType: "blackland clay and limestone", lat: 31.5493, lng: -97.1467 },
  { name: "Hewitt", slug: "hewitt", county: "McLennan", region: "central-texas", population: 16000, neighbors: ["waco", "woodway", "robinson"], soilType: "blackland clay", lat: 31.4552, lng: -97.1950 },
  { name: "Woodway", slug: "woodway", county: "McLennan", region: "central-texas", population: 9000, neighbors: ["waco", "hewitt", "mcgregor"], soilType: "blackland clay", lat: 31.5038, lng: -97.2417 },
  { name: "Robinson", slug: "robinson", county: "McLennan", region: "central-texas", population: 12000, neighbors: ["waco", "hewitt", "groesbeck"], soilType: "blackland clay", lat: 31.4682, lng: -97.1147 },
  { name: "Hillsboro", slug: "hillsboro", county: "Hill", region: "central-texas", population: 8500, neighbors: ["waco", "whitney", "corsicana", "waxahachie"], soilType: "blackland clay", lat: 32.0113, lng: -97.1300 },
  { name: "Whitney", slug: "whitney", county: "Hill", region: "central-texas", population: 2100, neighbors: ["hillsboro", "cleburne", "waco"], soilType: "limestone karst (Lake Whitney)", lat: 31.9515, lng: -97.3228 },

  // Tyler & East TX Outer Expansion
  { name: "Tyler", slug: "tyler", county: "Smith", region: "east-texas", population: 107000, neighbors: ["lindale", "jacksonville", "canton", "athens"], soilType: "deep sandy loam and red clay", lat: 32.3513, lng: -95.3011 },
  { name: "Lindale", slug: "lindale", county: "Smith", region: "east-texas", population: 6500, neighbors: ["tyler", "canton", "mineola"], soilType: "sandy loam", lat: 32.5160, lng: -95.4094 },
  { name: "Crockett", slug: "crockett", county: "Houston", region: "east-texas", population: 6800, neighbors: ["centerville", "palestine", "lufkin"], soilType: "sandy loam", lat: 31.3174, lng: -95.4566 },
  { name: "Madisonville", slug: "madisonville", county: "Madison", region: "central-texas", population: 4500, neighbors: ["centerville", "huntsville", "bryan"], soilType: "sandy loam", lat: 30.9502, lng: -95.9125 },
  { name: "Bryan", slug: "bryan", county: "Brazos", region: "central-texas", population: 87000, neighbors: ["college-station", "madisonville", "navasota"], soilType: "sandy loam and clay", lat: 30.6744, lng: -96.3700 },
  { name: "College Station", slug: "college-station", county: "Brazos", region: "central-texas", population: 120000, neighbors: ["bryan", "navasota", "brenham"], soilType: "sandy loam and clay", lat: 30.6280, lng: -96.3344 },
  { name: "Mansfield", slug: "mansfield", county: "Tarrant", region: "dfw-metro", population: 78000, neighbors: ["midlothian", "burleson", "arlington"], soilType: "blackland clay", lat: 32.5632, lng: -97.1417 },
  { name: "Burleson", slug: "burleson", county: "Johnson", region: "dfw-metro", population: 52000, neighbors: ["cleburne", "mansfield", "crowley"], soilType: "blackland clay", lat: 32.5421, lng: -97.3208 },
  { name: "Crandall", slug: "crandall", county: "Kaufman", region: "dfw-metro", population: 4500, neighbors: ["kaufman", "forney", "seagoville"], soilType: "blackland clay", lat: 32.6282, lng: -96.4542 },
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getNeighborCities(slug: string): City[] {
  const city = getCityBySlug(slug);
  if (!city) return [];
  return city.neighbors
    .map((n) => getCityBySlug(n))
    .filter((c): c is City => c !== undefined);
}

export function getCitiesByRegion(region: string): City[] {
  return cities.filter((c) => c.region === region);
}

export function getResponseTime(city: City): string {
  switch (city.region) {
    case "central-texas":
      return "30–60 minutes";
    case "houston-metro":
      return "30–60 minutes";
    case "austin-metro":
      return "45–90 minutes";
    case "san-antonio-metro":
      return "45–90 minutes";
    case "dfw-metro":
      return "45–90 minutes";
    case "east-texas":
      return "60–120 minutes";
    default:
      return "30–60 minutes";
  }
}
