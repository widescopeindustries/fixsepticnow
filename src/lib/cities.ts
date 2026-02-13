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
  { name: "Waxahachie", slug: "waxahachie", county: "Ellis", region: "dfw-metro", population: 41250, neighbors: ["cleburne", "corsicana", "midlothian"], soilType: "blackland clay", lat: 32.3866, lng: -96.8483 },
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
