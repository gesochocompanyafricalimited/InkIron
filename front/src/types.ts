export type VehicleStyle = 'cafe-racer' | 'bobber' | 'scrambler' | 'jetski' | 'tuktuk';

export interface VehicleSpecs {
  engineType: string;
  suspension: string;
  clutch: string;
  exhaust: string;
  controls: string;
  corrosionResistance: string;
  radiator: string;
}

export interface StyleInfo {
  id: VehicleStyle;
  name: string;
  description: string;
  keyFeatures: string[];
  image: string;
  specs: VehicleSpecs;
}

export const VEHICLE_STYLES: StyleInfo[] = [
  {
    id: 'cafe-racer',
    name: 'Cafe Racer',
    description: 'Born in the 1960s London, these bikes are built for speed and handling over short distances. Minimalist, aggressive, and iconic.',
    keyFeatures: ['Clip-on handlebars', 'Rear-set footpegs', 'Single seat with cowl', 'Low-slung profile'],
    image: '/images/Cafe Racer.jpg',
    specs: {
      engineType: '900cc Parallel-Twin High Output',
      suspension: 'Ohlins Inverted Front Forks & Twin Rear Shocks',
      clutch: 'Multi-plate Assist & Slipper Clutch',
      exhaust: 'Stainless Steel 2-into-2 with Megaphone Mufflers',
      controls: 'CNC-Machined Clip-ons with Radial Master Cylinder',
      corrosionResistance: 'Trivalent Zinc Coating on Hardware',
      radiator: 'High-Efficiency Slim-line Aluminum Radiator'
    }
  },
  {
    id: 'bobber',
    name: 'Bobber',
    description: 'Originating from the 1930s, "bobbing" involved stripping a bike of all non-essential parts to make it lighter and faster.',
    keyFeatures: ['Shortened (bobbed) rear fender', 'Solo seat', 'Fat tires', 'Low, stripped-back look'],
    image: '/images/Bobber.png',
    specs: {
      engineType: '1200cc High-Torque V-Twin',
      suspension: 'Hidden Monoshock Rear & 47mm Showa Front Forks',
      clutch: 'Heavy-Duty Torque Assist Clutch',
      exhaust: 'Slash-cut Shorty Side Pipes',
      controls: 'Mid-mount Pegs with Wide Drag Bars',
      corrosionResistance: 'Powder-coated Frame & Anodized Components',
      radiator: 'Large Capacity Front-Mounted Blacked-out Unit'
    }
  },
  {
    id: 'scrambler',
    name: 'Scrambler',
    description: 'The original dual-purpose bikes. Built to go from the street to the dirt without missing a beat.',
    keyFeatures: ['High-mounted exhaust', 'Knobby tires', 'Wide handlebars', 'Long-travel suspension'],
    image: '/images/Scrambler.jpg',
    specs: {
      engineType: '800cc L-Twin Desmodromic Engine',
      suspension: 'Long-Travel Kayaba Suspension (200mm)',
      clutch: 'Hydraulic Slipper Clutch for Rough Terrain',
      exhaust: 'High-Level 2-into-1 System with Heat Shields',
      controls: 'Wide Cross-braced Bars & Off-road Serrated Pegs',
      corrosionResistance: 'Galvanized Fasteners & Epoxy-prime Coated Frame',
      radiator: 'Curved Performance Radiator with Stone Guard'
    }
  },
  {
    id: 'jetski',
    name: 'Custom Jetski',
    description: 'High-performance personal watercraft. Built for agility, speed, and carving through waves with style.',
    keyFeatures: ['Performance hull', 'Racing sponsons', 'High-flow impeller', 'Custom deck traction'],
    image: '/images/Custom Jetski.jpg',
    specs: {
      engineType: '1.8L Supercharged 4-Cylinder Marine Engine',
      suspension: 'N/A (Adjustable Sponsons for Ride Tuning)',
      clutch: 'Direct Drive with High-Torque Coupling',
      exhaust: 'Water-cooled Wet Exhaust with Sound Damping',
      controls: 'Racing Grips with Electronic Trim Control',
      corrosionResistance: 'Marine-Grade 316 Stainless & Salt-Water Anodizing',
      radiator: 'Open-loop Cooling System with Raw Water Intake'
    }
  },
  {
    id: 'tuktuk',
    name: 'Custom Tuktuk',
    description: 'The iconic three-wheeled urban explorer. Reimagined for the modern street with custom chassis and vibrant aesthetics.',
    keyFeatures: ['Three-wheel chassis', 'Open-air cabin', 'Reinforced roll cage', 'High-torque engine'],
    image: '/images/Custom Tuktuk.jpg',
    specs: {
      engineType: '250cc Fuel-Injected Low-Emissions Single Engine',
      suspension: 'Trailing Arm Front & Leaf Spring Rear Reinforcement',
      clutch: 'Multi-plate Wet Clutch with Foot Change',
      exhaust: 'Low-slung baffled Urban Exhaust',
      controls: 'Handlebar Steering with Integrated Gear Shift',
      corrosionResistance: 'Anti-Rust Underbody Coating & UV-Resistant Paint',
      radiator: 'Forced Air-Cooled with Electric Fan Assist'
    }
  }
];

export interface PartOption {
  id: string;
  name: string;
  category: 'tank' | 'seat' | 'exhaust' | 'tires' | 'hull' | 'impeller' | 'canopy' | 'chassis';
  description: string;
}

export const PART_OPTIONS: PartOption[] = [
  { id: 't-1', name: 'Classic Teardrop', category: 'tank', description: 'Timeless curves for a vintage look.' },
  { id: 't-2', name: 'Angular Sport', category: 'tank', description: 'Aggressive lines for modern performance.' },
  { id: 's-1', name: 'Diamond Stitch Solo', category: 'seat', description: 'Premium leather with classic stitching.' },
  { id: 's-2', name: 'Brat Style Bench', category: 'seat', description: 'Flat and functional for a rugged feel.' },
  { id: 'e-1', name: 'Megaphone Slip-on', category: 'exhaust', description: 'The classic roar of a cafe racer.' },
  { id: 'e-2', name: 'High-Mount Scrambler', category: 'exhaust', description: 'Built for clearance and attitude.' },
  { id: 'tr-1', name: 'Vintage Sawtooth', category: 'tires', description: 'Classic tread for a retro bobber.' },
  { id: 'tr-2', name: 'Dual-Sport Knobbies', category: 'tires', description: 'Maximum grip on dirt and asphalt.' },
  { id: 'h-1', name: 'Carbon Fiber Racing Hull', category: 'hull', description: 'Ultra-lightweight for maximum agility.' },
  { id: 'i-1', name: 'Stainless High-Pitch Impeller', category: 'impeller', description: 'Increased top-end speed and acceleration.' },
  { id: 'c-1', name: 'Safari Canvas Canopy', category: 'canopy', description: 'Rugged weather protection with a vintage feel.' },
  { id: 'ch-1', name: 'Reinforced Tubular Chassis', category: 'chassis', description: 'Heavy-duty frame for urban durability.' }
];
