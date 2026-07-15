import Place from "../models/Place.js";

// Sample Heritage Places of Tamil Nadu
const samplePlaces = [
  {
    name: "Brihadeeswarar Temple",
    district: "Thanjavur",
    category: "Temple",
    image: "/assets/images/places/brihadeeswarar.jpg",
    rating: 4.9,
    entryFee: "Free",
    timings: "6:00 AM - 8:30 PM",
    bestTime: "October - February",
    weather: "32°C",
    unesco: true,
    description: "Built by Raja Raja Chola I, this magnificent temple is one of India's greatest architectural masterpieces and a UNESCO World Heritage Site.",
    latitude: 10.7828,
    longitude: 79.1318,
    audio: "Available",
    googleMap: "https://goo.gl/maps/bYwVep6v6K4mQxJGA"
  },
  {
    name: "Meenakshi Amman Temple",
    district: "Madurai",
    category: "Temple",
    image: "/assets/images/places/meenakshi.jpg",
    rating: 4.9,
    entryFee: "Free",
    timings: "5:00 AM - 9:30 PM",
    bestTime: "October - March",
    weather: "34°C",
    unesco: false,
    description: "One of the most famous temples in India dedicated to Goddess Meenakshi with breathtaking Dravidian architecture.",
    latitude: 9.9195,
    longitude: 78.1193,
    audio: "Available",
    googleMap: "https://goo.gl/maps/M2cK76bV3X1k7y2R8"
  },
  {
    name: "Shore Temple",
    district: "Mahabalipuram",
    category: "Temple",
    image: "/assets/images/places/shore-temple.jpg",
    rating: 4.8,
    entryFee: "₹40",
    timings: "6:00 AM - 6:00 PM",
    bestTime: "November - February",
    weather: "31°C",
    unesco: true,
    description: "The Shore Temple overlooks the Bay of Bengal and is one of the oldest structural stone temples in South India.",
    latitude: 12.6166,
    longitude: 80.1999,
    audio: "Available",
    googleMap: "https://goo.gl/maps/D8eXn3L2H8u2c8vK8"
  },
  {
    name: "Airavatesvara Temple",
    district: "Kumbakonam",
    category: "Temple",
    image: "/assets/images/places/airavatesvara.jpg",
    rating: 4.8,
    entryFee: "₹40",
    timings: "6:00 AM - 8:00 PM",
    bestTime: "October - February",
    weather: "30°C",
    unesco: true,
    description: "A Chola masterpiece famous for intricate stone carvings and remarkable architecture.",
    latitude: 10.9486,
    longitude: 79.3567,
    audio: "Available",
    googleMap: "https://goo.gl/maps/B9gWep6v6K4mQxJHA"
  },
  {
    name: "Gangaikonda Cholapuram",
    district: "Ariyalur",
    category: "Temple",
    image: "/assets/images/places/gangaikonda.jpg",
    rating: 4.8,
    entryFee: "₹40",
    timings: "6:00 AM - 8:00 PM",
    bestTime: "October - February",
    weather: "31°C",
    unesco: true,
    description: "Built by Rajendra Chola I after his victorious northern campaign, this temple is another UNESCO World Heritage treasure.",
    latitude: 11.2083,
    longitude: 79.4494,
    audio: "Available",
    googleMap: "https://goo.gl/maps/L2eXn3L2H8u2c8vK8"
  },
  {
    name: "Vellore Fort",
    district: "Vellore",
    category: "Fort",
    image: "/assets/images/places/vellore-fort.jpg",
    rating: 4.6,
    entryFee: "₹5",
    timings: "8:00 AM - 6:00 PM",
    bestTime: "October - February",
    weather: "30°C",
    unesco: false,
    description: "A 16th-century grand fort in Vellore, built by Vijayanagara kings, known for its grand ramparts, moat, and Jalakanteswarar Temple.",
    latitude: 12.9229,
    longitude: 79.1301,
    audio: "Available",
    googleMap: "https://goo.gl/maps/U9wVep6v6K4mQxJGA"
  },
  {
    name: "Ramanathaswamy Temple",
    district: "Rameswaram",
    category: "Temple",
    image: "/assets/images/places/rameshwaram-temple.jpg",
    rating: 4.8,
    entryFee: "Free",
    timings: "5:00 AM - 1:00 PM, 3:00 PM - 9:00 PM",
    bestTime: "October - March",
    weather: "30°C",
    unesco: false,
    description: "Famous for its long corridors, 22 sacred water wells (theerthams) for ceremonial bathing, and beautiful architecture dedicated to Lord Shiva.",
    latitude: 9.2881,
    longitude: 79.3174,
    audio: "Available",
    googleMap: "https://maps.app.goo.gl/rameshwaram"
  },
  {
    name: "Chidambaram Natarajar Temple",
    district: "Chidambaram",
    category: "Temple",
    image: "/assets/images/places/chidambaram-temple.jpg",
    rating: 4.7,
    entryFee: "Free",
    timings: "6:00 AM - 12:00 PM, 5:00 PM - 10:00 PM",
    bestTime: "November - February",
    weather: "29°C",
    unesco: false,
    description: "A historic temple dedicated to Lord Shiva in his cosmic dance form (Nataraja), displaying beautiful classical Bharatanatyam postures on its gopurams.",
    latitude: 11.3994,
    longitude: 79.6934,
    audio: "Available",
    googleMap: "https://maps.app.goo.gl/chidambaram"
  },
  {
    name: "Gingee Fort",
    district: "Villupuram",
    category: "Fort",
    image: "/assets/images/places/gingee-fort.jpg",
    rating: 4.7,
    entryFee: "₹25",
    timings: "9:00 AM - 5:30 PM",
    bestTime: "November - February",
    weather: "28°C",
    unesco: false,
    description: "Often called the 'Troy of the East' by the British, this impregnable fort is built across three scenic hills in Villupuram district.",
    latitude: 12.2505,
    longitude: 79.4182,
    audio: "Available",
    googleMap: "https://maps.app.goo.gl/gingee"
  },
  {
    name: "Padmanabhapuram Palace",
    district: "Kanyakumari",
    category: "Fort",
    image: "/assets/images/places/padmanabhapuram-palace.jpg",
    rating: 4.6,
    entryFee: "₹40",
    timings: "9:00 AM - 1:00 PM, 2:00 PM - 4:30 PM",
    bestTime: "October - March",
    weather: "30°C",
    unesco: false,
    description: "A magnificent 16th-century wooden palace displaying Kerala-style architecture, built by the Kings of Travancore.",
    latitude: 8.2508,
    longitude: 77.3275,
    audio: "Available",
    googleMap: "https://maps.app.goo.gl/padmanabhapuram"
  },
  {
    name: "Government Museum Chennai",
    district: "Chennai",
    category: "Museum",
    image: "/assets/images/places/govt-museum-chennai.jpg",
    rating: 4.5,
    entryFee: "₹15",
    timings: "9:30 AM - 5:00 PM",
    bestTime: "November - February",
    weather: "29°C",
    unesco: false,
    description: "Established in 1851, it is the second oldest museum in India, featuring a world-famous collection of Chola bronzes and archaeological wonders.",
    latitude: 13.0705,
    longitude: 80.2588,
    audio: "Available",
    googleMap: "https://maps.app.goo.gl/chennaimuseum"
  },
  {
    name: "Government Museum Madurai",
    district: "Madurai",
    category: "Museum",
    image: "/assets/images/places/govt-museum-madurai.jpg",
    rating: 4.3,
    entryFee: "₹5",
    timings: "10:00 AM - 5:00 PM",
    bestTime: "October - March",
    weather: "33°C",
    unesco: false,
    description: "Houses rich historical treasures, including sculptures, paintings, and traditional crafts celebrating the ancient Pandya dynasty.",
    latitude: 9.9252,
    longitude: 78.1348,
    audio: "Available",
    googleMap: "https://maps.app.goo.gl/maduraimuseum"
  },
  {
    name: "Thanjavur Maratha Palace",
    district: "Thanjavur",
    category: "Museum",
    image: "/assets/images/places/thanjavur-palace.jpg",
    rating: 4.4,
    entryFee: "₹50",
    timings: "9:00 AM - 6:00 PM",
    bestTime: "October - February",
    weather: "31°C",
    unesco: false,
    description: "The official residence of the Bhonsle family who ruled Thanjavur, containing an ancient library, durbar halls, and royal museum collections.",
    latitude: 10.7915,
    longitude: 79.1372,
    audio: "Available",
    googleMap: "https://maps.app.goo.gl/thanjavurpalace"
  },
  {
    name: "Dhanushkodi Beach",
    district: "Rameswaram",
    category: "Beach",
    image: "/assets/images/places/dhanushkodi-beach.jpg",
    rating: 4.8,
    entryFee: "Free",
    timings: "6:00 AM - 6:00 PM",
    bestTime: "October - March",
    weather: "29°C",
    unesco: false,
    description: "A breathtaking ghost town beach at the southernmost tip of Rameswaram island, where the Bay of Bengal meets the Indian Ocean.",
    latitude: 9.1764,
    longitude: 79.4442,
    audio: "Available",
    googleMap: "https://maps.app.goo.gl/dhanushkodi"
  },
  {
    name: "Marina Beach",
    district: "Chennai",
    category: "Beach",
    image: "/assets/images/places/marina-beach.jpg",
    rating: 4.4,
    entryFee: "Free",
    timings: "24 Hours",
    bestTime: "November - February",
    weather: "29°C",
    unesco: false,
    description: "The longest natural urban beach in India and the second longest in the world, running along the Bay of Bengal in Chennai.",
    latitude: 13.0500,
    longitude: 80.2824,
    audio: "Available",
    googleMap: "https://maps.app.goo.gl/marinabeach"
  },
  {
    name: "Kanyakumari Beach",
    district: "Kanyakumari",
    category: "Beach",
    image: "/assets/images/places/kanyakumari.jpg",
    rating: 4.7,
    entryFee: "Free",
    timings: "24 Hours",
    bestTime: "October - March",
    weather: "30°C",
    unesco: false,
    description: "A unique scenic location witnessing the confluence of the Arabian Sea, the Bay of Bengal, and the Indian Ocean, famous for sunrise and sunset views.",
    latitude: 8.0780,
    longitude: 77.5552,
    audio: "Available",
    googleMap: "https://maps.app.goo.gl/kanyakumari"
  },
  {
    name: "Ooty Hill Station",
    district: "Nilgiris",
    category: "Hill",
    image: "/assets/images/places/ooty-nilgiris.jpg",
    rating: 4.7,
    entryFee: "Free",
    timings: "24 Hours",
    bestTime: "March - June, October - December",
    weather: "15°C",
    unesco: false,
    description: "Known as the 'Queen of Hill Stations', Ooty features beautiful tea gardens, botanical parks, and the Nilgiri Mountain Railway toy train.",
    latitude: 11.4102,
    longitude: 76.6950,
    audio: "Available",
    googleMap: "https://maps.app.goo.gl/ooty"
  },
  {
    name: "Kodaikanal Hill Station",
    district: "Dindigul",
    category: "Hill",
    image: "/assets/images/places/kodaikanal.jpg",
    rating: 4.6,
    entryFee: "Free",
    timings: "24 Hours",
    bestTime: "April - June, September - October",
    weather: "18°C",
    unesco: false,
    description: "The 'Gift of the Forest', this scenic hill station is famous for its star-shaped Kodaikanal Lake, pine forests, and misty valleys.",
    latitude: 10.2381,
    longitude: 77.4892,
    audio: "Available",
    googleMap: "https://maps.app.goo.gl/kodaikanal"
  },
  {
    name: "Yelagiri Hills",
    district: "Vellore",
    category: "Hill",
    image: "/assets/images/places/yelagiri-hills.jpg",
    rating: 4.3,
    entryFee: "Free",
    timings: "24 Hours",
    bestTime: "November - February",
    weather: "22°C",
    unesco: false,
    description: "A peaceful hill station surrounded by orchards, rose gardens, and green valleys, perfect for trekking and nature walks.",
    latitude: 12.5785,
    longitude: 78.6384,
    audio: "Available",
    googleMap: "https://maps.app.goo.gl/yelagiri"
  },
  {
    name: "Mahabalipuram Rock Sculptures",
    district: "Mahabalipuram",
    category: "Temple",
    image: "/assets/images/places/mahabalipuram-sculptures.jpg",
    rating: 4.8,
    entryFee: "₹40",
    timings: "6:00 AM - 6:00 PM",
    bestTime: "November - February",
    weather: "30°C",
    unesco: true,
    description: "Outstanding 7th and 8th-century rock-cut monuments, including Arjuna's Penance and Five Rathas, created by the Pallava Dynasty.",
    latitude: 12.6269,
    longitude: 80.1927,
    audio: "Available",
    googleMap: "https://maps.app.goo.gl/mahabalipuram"
  },
  {
    name: "Velankanni Church",
    district: "Nagapattinam",
    category: "Temple",
    image: "/assets/images/places/velankanni-church.jpg",
    rating: 4.7,
    entryFee: "Free",
    timings: "5:00 AM - 9:00 PM",
    bestTime: "September - December",
    weather: "28°C",
    unesco: false,
    description: "Also known as the Basilica of Our Lady of Good Health, this beautiful white Gothic-style church attracts millions of pilgrims worldwide.",
    latitude: 10.6796,
    longitude: 79.8499,
    audio: "Available",
    googleMap: "https://maps.app.goo.gl/velankanni"
  }
];

// @desc    Get all places (with search/filter options)
// @route   GET /api/places
export const getPlaces = async (req, res) => {
  try {
    const { search, category, district } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (category && category !== "Category" && category !== "All") {
      query.category = category;
    }
    if (district && district !== "District") {
      query.district = district;
    }

    const places = await Place.find(query);
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get place by ID
// @route   GET /api/places/:id
export const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.json(place);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Seed sample places
// @route   POST /api/places/seed
export const seedPlaces = async (req, res) => {
  try {
    // Optional: Clear existing places
    await Place.deleteMany();
    const createdPlaces = await Place.insertMany(samplePlaces);
    res.status(201).json({
      message: "Sample places seeded successfully",
      count: createdPlaces.length,
      places: createdPlaces
    });
  } catch (error) {
    res.status(500).json({ message: "Seeding failed", error: error.message });
  }
};
