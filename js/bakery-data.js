/**
 * SRI LAKSHMI BAKERY - Master Dataset (Updated with Extended Schema, Slots, Events & Admin Defaults)
 */

window.BAKERY_DATA = {
  brand: {
    name: "SRI LAKSHMI BAKERY",
    tagline: "Freshly Baked Happiness Every Day",
    supportingText: "Delicious cakes, breads, cookies, cool drinks, custom bakes & celebration spaces — made with love, served with a smile.",
    phone: "+1 (555) 987-6543",
    phoneClean: "15559876543",
    whatsappNumber: "15559876543",
    email: "srilakshmibakery@gmail.com",
    address: "123 Main Road, Srikakulam, Andhra Pradesh — 532001",
    hours: "Mon – Sun: 7:00 AM – 10:00 PM",
    established: "2019",
    heroEyebrow: "FRESH • LOCAL • HANDCRAFTED"
  },

  cakeCustomizer: {
    weights: [
      { id: "0.5kg", label: "0.5 kg", multiplier: 1, extraPrice: 0 },
      { id: "1.0kg", label: "1.0 kg", multiplier: 1.8, extraPrice: 350 },
      { id: "1.5kg", label: "1.5 kg", multiplier: 2.6, extraPrice: 700 },
      { id: "2.0kg", label: "2.0 kg", multiplier: 3.4, extraPrice: 1050 }
    ],
    types: [
      { id: "eggless", label: "Eggless (100% Pure Veg)", extraPrice: 30 },
      { id: "with-egg", label: "With Egg (Traditional)", extraPrice: 0 }
    ],
    flavours: [
      "Belgian Dark Chocolate",
      "Royal Rasmalai Saffron",
      "Butterscotch Praline",
      "Fresh Alphonso Mango",
      "Pineapple Delight",
      "Red Velvet Cream Cheese",
      "Madagascar Vanilla Bean"
    ]
  },

  pickupSlots: [
    { time: "10:00 AM", available: true },
    { time: "11:00 AM", available: true },
    { time: "12:00 PM", available: true },
    { time: "01:00 PM", available: true },
    { time: "02:00 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "04:00 PM", available: true },
    { time: "05:00 PM", available: true },
    { time: "06:00 PM", available: true },
    { time: "07:00 PM", available: true },
    { time: "08:00 PM", available: true }
  ],

  eventOccasions: [
    "Birthday Party",
    "Wedding Anniversary",
    "Engagement Celebration",
    "Baby Shower / Naming Ceremony",
    "Corporate Event / Meeting",
    "Family Gathering"
  ],

  trustFeatures: [
    { id: "fresh", icon: "wheat", title: "FRESH INGREDIENTS", desc: "Made fresh every single morning." },
    { id: "hygiene", icon: "shield-check", title: "HYGIENIC & SAFE", desc: "Prepared with utmost care & safety." },
    { id: "delivery", icon: "truck", title: "FAST LOCAL DELIVERY", desc: "Freshness delivered right to your door." }
  ],

  categories: [
    { id: "all", name: "ALL ITEMS", subtitle: "Explore complete menu", icon: "utensils" },
    { id: "cakes", name: "CAKES", subtitle: "For every celebration", icon: "cake" },
    { id: "drinks", name: "COOL DRINKS", subtitle: "Shakes, Milks & Sodas", icon: "cup-soda" },
    { id: "pastries", name: "PASTRIES", subtitle: "Small bites, big joy", icon: "pie-chart" },
    { id: "breads", name: "BREADS", subtitle: "Fresh & healthy", icon: "sandwich" },
    { id: "cookies", name: "COOKIES", subtitle: "Crispy & delicious", icon: "cookie" },
    { id: "snacks", name: "SNACKS", subtitle: "Tasty all day", icon: "popcorn" }
  ],

  products: [
    {
      id: "rasmalai-cake",
      name: "Royal Rasmalai Fusion Cake",
      category: "cakes",
      shortDesc: "Cardamom sponge infused with saffron milk, topped with soft rasmalai & pistachios.",
      fullDesc: "An authentic Indian celebration favorite! Fluffy eggless sponge soaked in aromatic saffron-cardamom milk, layered with soft rasmalai pieces, crushed pistachios, and edible rose petals.",
      price: "₹599",
      rawPrice: 599,
      unit: "0.5 kg",
      isCake: true,
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Fresh Rasmalai", "Saffron Milk", "Cardamom Sponge", "Pistachio Curls", "Rose Petals"],
      bestseller: true,
      rating: 4.9,
      reviewsCount: 180
    },
    {
      id: "butterscotch-cake",
      name: "Butterscotch Crunch Cake",
      category: "cakes",
      shortDesc: "Rich caramel sponge layered with crunchy butterscotch praline and whipped cream.",
      fullDesc: "Classic local favorite! Golden vanilla sponge smothered in creamy caramel butterscotch sauce, filled with crunchy praline bits and topped with chocolate crown decorations.",
      price: "₹450",
      rawPrice: 450,
      unit: "0.5 kg",
      isCake: true,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Caramel Praline", "Butterscotch Sauce", "Vanilla Sponge", "Whipped Cream"],
      bestseller: true,
      rating: 4.8,
      reviewsCount: 155
    },
    {
      id: "pineapple-cake",
      name: "Fresh Pineapple Delight Cake",
      category: "cakes",
      shortDesc: "Moist sponge layered with real pineapple slices, maraschino cherries and light cream.",
      fullDesc: "Refreshing & tropical! Soft vanilla cake filled with juicy pineapple chunks, sweet pineapple glaze, and topped with glace cherries and white chocolate flakes.",
      price: "₹420",
      rawPrice: 420,
      unit: "0.5 kg",
      isCake: true,
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Fresh Pineapple Slices", "Vanilla Sponge", "Whipped Cream", "Glace Cherries"],
      bestseller: false,
      rating: 4.7,
      reviewsCount: 112
    },
    {
      id: "red-velvet-cake",
      name: "Red Velvet Heart Celebration Cake",
      category: "cakes",
      shortDesc: "Vibrant red cocoa sponge layered with silky cream cheese frosting.",
      fullDesc: "Smooth, velvety, and luxurious! Heart-shaped red velvet sponge layered with authentic tangy cream cheese frosting and fine velvet crumbs.",
      price: "₹520",
      rawPrice: 520,
      unit: "0.5 kg",
      isCake: true,
      image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Red Cocoa Sponge", "Cream Cheese Frosting", "Vanilla Extract", "Butter"],
      bestseller: true,
      rating: 4.9,
      reviewsCount: 168
    },
    {
      id: "chilled-badam-milk",
      name: "Chilled Saffron Badam Milk",
      category: "drinks",
      shortDesc: "Traditional almond milk infused with saffron, cardamom and silvered nuts.",
      fullDesc: "Slow-cooked full cream milk blended with roasted California almonds, Kashmir saffron, green cardamom, and served ice-cold in traditional glass bottles.",
      price: "₹60",
      rawPrice: 60,
      unit: "300ml Bottle",
      isCake: false,
      image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Pure Milk", "Roasted Almonds", "Kashmir Saffron", "Green Cardamom"],
      bestseller: true,
      rating: 4.9,
      reviewsCount: 220
    },
    {
      id: "chilled-rose-milk",
      name: "Special Chilled Rose Milk",
      category: "drinks",
      shortDesc: "Refreshing cold milk blended with fragrant organic rose syrup and sabja seeds.",
      fullDesc: "A local summer classic! Fresh cold milk infused with aromatic rose petal extract, natural cane sugar, and cooling basil (sabja) seeds.",
      price: "₹50",
      rawPrice: 50,
      unit: "300ml Bottle",
      isCake: false,
      image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Fresh Milk", "Organic Rose Syrup", "Sabja Seeds", "Ice"],
      bestseller: true,
      rating: 4.8,
      reviewsCount: 195
    },
    {
      id: "cold-coffee-icecream",
      name: "Cold Coffee with Vanilla Scoop",
      category: "drinks",
      shortDesc: "Thick espresso cold coffee topped with a scoop of vanilla ice cream & chocolate drizzle.",
      fullDesc: "Freshly brewed South Indian coffee beans blended with cold milk and dark chocolate syrup, served thick with a floating scoop of gourmet vanilla ice cream.",
      price: "₹90",
      rawPrice: 90,
      unit: "350ml Glass",
      isCake: false,
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Espresso Coffee", "Chilled Milk", "Vanilla Ice Cream", "Chocolate Sauce"],
      bestseller: true,
      rating: 4.9,
      reviewsCount: 240
    },
    {
      id: "mango-lassi",
      name: "Fresh Alphonso Mango Lassi",
      category: "drinks",
      shortDesc: "Thick sweet curd smoothie blended with natural Alphonso mango pulp.",
      fullDesc: "Creamy curd whipped smooth with Alphonso mango puree, topped with malai, pistachios, and saffron strands.",
      price: "₹70",
      rawPrice: 70,
      unit: "300ml Glass",
      isCake: false,
      image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Sweet Curd", "Alphonso Mango Pulp", "Pistachio Bits", "Cardamom"],
      bestseller: false,
      rating: 4.8,
      reviewsCount: 130
    },
    {
      id: "black-forest-pastry",
      name: "Classic Black Forest Pastry",
      category: "pastries",
      shortDesc: "Layers of chocolate sponge, whipped cream, and maraschino cherries.",
      fullDesc: "Traditional recipe featuring soft chocolate sponge soaked in cherry syrup, layered with fresh whipped vanilla cream and dark cherry compote.",
      price: "₹99",
      rawPrice: 99,
      unit: "Per Piece",
      isCake: false,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Cocoa Sponge", "Whipped Cream", "Maraschino Cherries", "Chocolate Shavings"],
      bestseller: true,
      rating: 4.8,
      reviewsCount: 98
    },
    {
      id: "butter-cookies",
      name: "Royal Bakery Butter Cookies",
      category: "cookies",
      shortDesc: "Melt-in-your-mouth Danish style golden butter cookies.",
      fullDesc: "Baked using 100% pure dairy butter and unbleached flour. Crispy, golden, and rich in natural butter aroma.",
      price: "₹200",
      rawPrice: 200,
      unit: "1 kg Pack",
      isCake: false,
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Pure Dairy Butter", "Cane Sugar", "Flour", "Vanilla Extract"],
      bestseller: true,
      rating: 4.9,
      reviewsCount: 215
    },
    {
      id: "fresh-bread",
      name: "Whole Wheat Artisanal Bread",
      category: "breads",
      shortDesc: "Daily baked 100% whole wheat bread loaf, zero preservatives.",
      fullDesc: "Freshly sliced artisan loaf prepared with stone-ground whole wheat flour, honey, and natural sourdough starter.",
      price: "₹40",
      rawPrice: 40,
      unit: "400g Loaf",
      isCake: false,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Stone-Ground Whole Wheat", "Honey", "Yeast", "Sea Salt"],
      bestseller: true,
      rating: 4.8,
      reviewsCount: 310
    },
    {
      id: "garlic-breadsticks",
      name: "Herb & Garlic Breadsticks",
      category: "snacks",
      shortDesc: "Crispy baked breadsticks brushed with garlic herb butter.",
      fullDesc: "Crunchy baked sticks infused with roasted garlic, Italian oregano, rosemary, and extra virgin olive oil.",
      price: "₹80",
      rawPrice: 80,
      unit: "Pack of 8",
      isCake: false,
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Wheat Flour", "Roasted Garlic", "Italian Herbs", "Butter"],
      bestseller: false,
      rating: 4.6,
      reviewsCount: 77
    }
  ],

  seatingAreas: [
    {
      title: "Cake Cutting & Birthday Zone",
      desc: "Dedicated celebration space equipped with warm party lights, balloon stands, background party backdrops, and spacious cake cutting tables.",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
      badge: "Free Birthday Setup"
    },
    {
      title: "AC Family Dining Lounge",
      desc: "Comfortable air-conditioned indoor seating with plush sofas and warm ambient lighting. Perfect for enjoying fresh pastries and cool drinks with family.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      badge: "Family Seating"
    },
    {
      title: "Outdoor Coffee & Snack Counter",
      desc: "Breezy outdoor high-stool counters for quick coffee, badam milk, and evening hot snacks.",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
      badge: "Quick Snack Area"
    }
  ],

  stats: [
    { label: "Years of Service", value: 5, suffix: "+" },
    { label: "Happy Customers", value: 10, suffix: "K+" },
    { label: "Bakery Varieties", value: 50, suffix: "+" },
    { label: "Daily Fresh Bakes", value: 100, suffix: "%" }
  ],

  qualityFeatures: [
    { title: "QUALITY INGREDIENTS", desc: "Only 100% pure butter, organic flour, and farm-fresh dairy.", icon: "award" },
    { title: "GREAT TASTE", desc: "Time-tested recipes perfected over years of baking passion.", icon: "smile" },
    { title: "HYGIENIC PREPARATION", desc: "Clean automated kitchens adhering to strict safety standards.", icon: "sparkles" },
    { title: "CUSTOMER SATISFACTION", desc: "Delighting over 10,000+ happy local families in Srikakulam.", icon: "heart" }
  ],

  reviews: [
    {
      id: "r1",
      name: "Rahul K.",
      rating: 5,
      comment: "The Rasmalai cake was mindblowing! We celebrated my daughter's birthday in their special cake cutting area. The staff set up the table so beautifully!",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      location: "Srikakulam"
    },
    {
      id: "r2",
      name: "Priya S.",
      rating: 5,
      comment: "Best badam milk & cold coffee in town! Super clean AC sitting area. Love coming here with friends in the evenings.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      location: "Main Road"
    },
    {
      id: "r3",
      name: "Arjun M.",
      rating: 5,
      comment: "Great quality, friendly staff and always fresh bread. Order features on their website are super fast!",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
      location: "Srikakulam"
    }
  ],

  gallery: [
    { id: "g1", title: "Royal Rasmalai Fusion Cake", category: "Cakes", image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80" },
    { id: "g2", title: "Chilled Saffron Badam Milk & Rose Milk", category: "Cool Drinks", image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80" },
    { id: "g3", title: "Birthday Celebration Seating Zone", category: "Dining Area", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80" },
    { id: "g4", title: "Butterscotch Crunch Celebration Cake", category: "Cakes", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80" },
    { id: "g5", title: "Family AC Seating Lounge", category: "Dining Area", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" },
    { id: "g6", title: "Cold Coffee with Scoop", category: "Cool Drinks", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80" }
  ],

  // Initial Mock Admin Data
  initialAdminData: {
    orders: [
      {
        id: "SLB-94821",
        customerName: "Suresh Varma",
        phone: "+91 98765 12345",
        items: [
          { name: "Royal Rasmalai Fusion Cake (1.0 kg)", quantity: 1, price: 949 }
        ],
        total: 949,
        status: "Preparing",
        pickupDate: "2026-09-15",
        pickupSlot: "05:00 PM",
        paymentMethod: "UPI (Google Pay)",
        createdAt: "2026-09-14 10:30 AM"
      },
      {
        id: "SLB-94822",
        customerName: "Ananya Rao",
        phone: "+91 98765 67890",
        items: [
          { name: "Chilled Saffron Badam Milk", quantity: 4, price: 240 },
          { name: "Royal Bakery Butter Cookies", quantity: 1, price: 200 }
        ],
        total: 440,
        status: "Ready for Pickup",
        pickupDate: "2026-09-14",
        pickupSlot: "06:00 PM",
        paymentMethod: "Pay on Pickup",
        createdAt: "2026-09-14 02:15 PM"
      }
    ],
    customRequests: [
      {
        id: "CR-104",
        customerName: "Kavitha Sharma",
        phone: "+91 99887 76655",
        occasion: "1st Birthday Party",
        cakeType: "3D Jungle Theme Fondant Cake",
        flavour: "Belgian Dark Chocolate",
        weight: "2.5 kg",
        eggless: "Eggless",
        pickupDate: "2026-09-20",
        pickupTime: "04:00 PM",
        message: "Happy 1st Birthday Aaryan!",
        status: "Pending Quote",
        quotedPrice: null,
        referenceImg: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=400&q=80"
      }
    ],
    eventBookings: [
      {
        id: "EV-201",
        customerName: "Ramesh Babu",
        phone: "+91 91234 56789",
        occasion: "Birthday Party",
        guests: "25 Guests",
        seatingArea: "Cake Cutting & Birthday Zone",
        date: "2026-09-18",
        slot: "06:00 PM - 09:00 PM",
        status: "Confirmed"
      }
    ]
  }
};
