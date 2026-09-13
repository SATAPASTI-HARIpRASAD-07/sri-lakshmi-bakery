/**
 * EMBER & SAGE - Master Restaurant Dataset
 * Modular, structured data for dishes, story, chef, gallery, and reservation options.
 */

window.EMBER_DATA = {
  restaurant: {
    name: "EMBER & SAGE",
    tagline: "Where Fire Meets Flavor.",
    subheading: "An intimate dining experience shaped by flame, craft, and seasonal ingredients.",
    address: "42 Emberwood Lane, Culinary Quarter, NY 10012",
    phone: "+1 (555) 839-3724",
    email: "reservations@embersage.com",
    hours: {
      dinner: "Mon - Sun: 5:00 PM - 11:30 PM",
      chefsTable: "Wed - Sun: 7:00 PM & 9:30 PM (2 seatings)"
    },
    awards: ["Michelin 3-Star (2024)", "World's 50 Best Restaurants #4", "James Beard Outstanding Chef"]
  },

  menuCategories: [
    { id: "signatures", name: "SIGNATURES", icon: "flame" },
    { id: "starters", name: "STARTERS", icon: "sparkles" },
    { id: "mains", name: "MAINS", icon: "utensils" },
    { id: "desserts", name: "DESSERTS", icon: "cake" },
    { id: "drinks", name: "DRINKS", icon: "wine" }
  ],

  menuItems: [
    {
      id: "dish-1",
      category: "signatures",
      name: "FIRE-ROASTED TRUFFLE STEAK",
      shortDesc: "Charred seasonal vegetables, smoked jus, herb butter.",
      fullDesc: "45-day dry-aged Wagyu ribeye cooked over binchotan charcoal, glazed with 25-year aged balsamic and topped with shaved black winter truffles from Périgord.",
      price: "₹1,450",
      rawPrice: 1450,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      ingredients: ["Dry-Aged Wagyu", "Périgord Black Truffle", "Binchotan Charcoal", "Smoked Bone Marrow Jus", "Wild Rosemary Butter"],
      allergens: ["Dairy"],
      calories: "780 kcal",
      pairing: "2018 Chateau Margaux Premier Grand Cru",
      chefTip: "Best experienced medium-rare to honor the intricate marbling and wood-smoke infusion.",
      hotspots: [
        { name: "Périgord Truffle", pos: { x: -0.8, y: 0.6, z: 0.3 }, text: "Hand-harvested winter truffles shaved tableside." },
        { name: "Smoked Jus", pos: { x: 0.5, y: -0.2, z: 0.6 }, text: "Slow-reduced for 48 hours over cherrywood embers." },
        { name: "Aged Wagyu", pos: { x: 0.0, y: 0.1, z: 0.0 }, text: "A5 Kagoshima beef dry-aged for 45 days." },
        { name: "Herb Butter", pos: { x: 0.7, y: 0.5, z: -0.4 }, text: "Whipped with charred sage & sea salt crystals." }
      ]
    },
    {
      id: "dish-2",
      category: "signatures",
      name: "CHARRED SEA BASS IN SAGE INFUSION",
      shortDesc: "Wood-fired wild sea bass, sage velouté, pickled fennel.",
      fullDesc: "Pan-roasted Chilean sea bass skin-crisped over applewood embers, resting in an aromatic sage and citrus leaf emulsion.",
      price: "₹1,280",
      rawPrice: 1280,
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
      ingredients: ["Chilean Sea Bass", "Crispy Garden Sage", "Citrus Leaf Emulsion", "Pickled Baby Fennel", "Compressed Green Apple"],
      allergens: ["Fish", "Dairy"],
      calories: "520 kcal",
      pairing: "2021 Domaine Leflaive Puligny-Montrachet",
      chefTip: "Pair with the house fermented sage kombucha for elevated herbal notes.",
      hotspots: [
        { name: "Crispy Sage", pos: { x: -0.3, y: 0.7, z: 0.2 }, text: "Flash-fried in sage-infused olive oil." },
        { name: "Sea Bass", pos: { x: 0.1, y: 0.0, z: 0.1 }, text: "Wild-caught and seared skin-down for crunch." },
        { name: "Sage Velouté", pos: { x: 0.6, y: -0.4, z: 0.5 }, text: "Emulsified with brown butter and bergamot juice." }
      ]
    },
    {
      id: "dish-3",
      category: "signatures",
      name: "BURNT TRUFFLE RAVIOLI",
      shortDesc: "Handmade egg ravioli, smoked ricotta, charred truffle broth.",
      fullDesc: "Silky pasta parcels filled with smoked buffalo ricotta and wild mushroom duxelles, floating in a dark roasted mushroom dashi.",
      price: "₹1,150",
      rawPrice: 1150,
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80",
      ingredients: ["Handmade Pasta", "Smoked Ricotta", "Porcini Duxelles", "Charred Truffle Broth", "Crispy Parsnip Ribbon"],
      allergens: ["Gluten", "Dairy", "Eggs"],
      calories: "610 kcal",
      pairing: "2019 Barolo Cannubi D.O.C.G.",
      chefTip: "Pierce the ravioli to allow the warm molten center to meld with the truffle broth.",
      hotspots: [
        { name: "Handmade Pasta", pos: { x: 0.0, y: 0.3, z: 0.0 }, text: "Rolled hourly using 30-yolk Italian flour dough." },
        { name: "Truffle Broth", pos: { x: -0.7, y: -0.3, z: 0.4 }, text: "Clarified consommé infused with charred truffles." }
      ]
    },
    {
      id: "dish-4",
      category: "starters",
      name: "EMBER-GLAZED HEIRLOOM CARROTS",
      shortDesc: "Smoked labneh, toasted pistachio crumble, sage honey.",
      fullDesc: "Rainbow heirloom carrots roasted directly in embers, brushed with wildflower sage honey and served over velvety smoked goat labneh.",
      price: "₹850",
      rawPrice: 850,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80",
      ingredients: ["Heirloom Carrots", "Smoked Labneh", "Bronte Pistachio", "Wildflower Sage Honey", "Dill Oil"],
      allergens: ["Dairy", "Nuts"],
      calories: "340 kcal",
      pairing: "2022 Sancerre Pascal Jolivet",
      chefTip: "An exquisite vegetable course celebrating earth and smoke synergy."
    },
    {
      id: "dish-5",
      category: "starters",
      name: "SMOKED SCALLOP CEVICHE",
      shortDesc: "Hokkaido scallops, ember-charred corn, yuzu pearls, smoked sea salt.",
      fullDesc: "Raw Hokkaido scallops lightly torched tableside, cured in yuzu and green apple juice with charred sweet corn puree.",
      price: "₹980",
      rawPrice: 980,
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80",
      ingredients: ["Hokkaido Scallops", "Yuzu Kosho", "Charred Sweet Corn", "Finger Lime Pearls", "Smoked Sea Salt"],
      allergens: ["Shellfish"],
      calories: "280 kcal",
      pairing: "Champagne Ruinart Blanc de Blancs",
      chefTip: "Inhale the delicate applewood smoke aroma as the dome is lifted."
    },
    {
      id: "dish-6",
      category: "mains",
      name: "BISON TOMAHAWK WITH CHARRED HERBS",
      shortDesc: "32oz dry-aged bison, charred bone marrow, sage garlic butter.",
      fullDesc: "Magnificent grass-fed bison Tomahawk seared over mesquite coals, accompanied by roasted bone marrow and flamed thyme bouquet.",
      price: "₹2,600",
      rawPrice: 2600,
      image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80",
      ingredients: ["32oz Bison Tomahawk", "Roasted Bone Marrow", "Mesquite Coals", "Garlic Sage Butter", "Flaky Maldon Salt"],
      allergens: ["Dairy"],
      calories: "1,150 kcal",
      pairing: "2017 Opus One Napa Valley",
      chefTip: "Designed for sharing between two guests seeking the ultimate primal fire experience."
    },
    {
      id: "dish-7",
      category: "mains",
      name: "ROASTED SAGE DUCK BREAST",
      shortDesc: "Spiced plum reduction, smoked parsnip puree, crispy sage.",
      fullDesc: "Dry-aged Muscovy duck breast with crispy golden skin, served over roasted parsnip velvet and ember-broiled blood plum reduction.",
      price: "₹1,550",
      rawPrice: 1550,
      image: "https://images.unsplash.com/photo-1514944288352-fffac99f0bdf?auto=format&fit=crop&w=1200&q=80",
      ingredients: ["Muscovy Duck Breast", "Blood Plum Reduction", "Smoked Parsnip", "Fresh Sage Leaves", "Duck Fat Potatoes"],
      allergens: [],
      calories: "720 kcal",
      pairing: "2019 Domaine Dujac Morey-Saint-Denis",
      chefTip: "Crisped skin is seasoned with crushed pink peppercorn and dried sage dust."
    },
    {
      id: "dish-8",
      category: "desserts",
      name: "SMOKED CHOCOLATE & SAGE TART",
      shortDesc: "70% Valrhona dark chocolate, smoked salt caramel, sage ice cream.",
      fullDesc: "Decadent dark chocolate ganache infused with oak smoke, encased in a cocoa sable crust and paired with house-churned garden sage gelato.",
      price: "₹650",
      rawPrice: 650,
      image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1200&q=80",
      ingredients: ["70% Valrhona Chocolate", "Smoked Maldon Caramel", "Garden Sage Gelato", "Edible Gold Leaf"],
      allergens: ["Dairy", "Gluten", "Eggs"],
      calories: "490 kcal",
      pairing: "2015 Taylor Fladgate 20 Year Tawny Port",
      chefTip: "The herbal warmth of sage balances the intense cocoa bitterness."
    },
    {
      id: "dish-9",
      category: "desserts",
      name: "FLAMED PEACH & BERRY PAVLOVA",
      shortDesc: "Bourbon-flamed white peaches, burnt vanilla meringue, sage syrup.",
      fullDesc: "Crisp meringue shell filled with whipped mascarpone, topped with bourbon-flamed peaches and wild berry reduction.",
      price: "₹580",
      rawPrice: 580,
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=80",
      ingredients: ["White Peaches", "Bourbon Flambé", "Burnt Vanilla Meringue", "Wild Berries", "Sage Flower Syrup"],
      allergens: ["Eggs", "Dairy"],
      calories: "380 kcal",
      pairing: "2020 Chateau d'Yquem Sauternes",
      chefTip: "Ignited tableside with aged Kentucky bourbon."
    },
    {
      id: "dish-10",
      category: "drinks",
      name: "THE EMBER SMOKE COCKTAIL",
      shortDesc: "Smoked Mezcal, toasted sage syrup, blood orange, flamed rosemary.",
      fullDesc: "Artisanal Mezcal infused with charred cedar wood smoke, shaken with freshly pressed blood orange juice and house-crafted sage syrup.",
      price: "₹720",
      rawPrice: 720,
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
      ingredients: ["Ilegal Mezcal", "Toasted Sage Syrup", "Blood Orange Juice", "Smoked Cedar Fog", "Charred Rosemary"],
      allergens: [],
      calories: "180 kcal",
      pairing: "Signature Aperitif",
      chefTip: "Served inside a smoke-filled cloche that releases wood aroma upon serving."
    }
  ],

  chef: {
    name: "ARJUN RAO",
    title: "Executive Chef & Founder",
    quote: "Cooking is not about following fire. It is about understanding it.",
    bio: "With over 18 years of culinary innovation across Tokyo, Paris, and San Francisco, Chef Arjun Rao created Ember & Sage to bridge ancient primal flame cooking with contemporary culinary science.",
    philosophy: "Every ingredient possesses a unique soul that only the proper heat and herb pairing can unlock.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
  },

  story: [
    {
      step: "01",
      title: "INGREDIENTS",
      heading: "Sourced from Living Soil",
      desc: "Every vegetable, herb, and grain is harvested daily from our biodynamic coastal farm 30 miles north of the restaurant."
    },
    {
      step: "02",
      title: "FIRE",
      heading: "Mastery of the Flame",
      desc: "We burn three distinct woods: White Oak for intense heat, Applewood for delicate sweetness, and Binchotan for clean smokeless infrared searing."
    },
    {
      step: "03",
      title: "CRAFT",
      heading: "Precision & Alchemy",
      desc: "Traditional ember roasting meets modern thermal immersion to preserve texture while sealing natural juices."
    },
    {
      step: "04",
      title: "PLATE",
      heading: "Culinary Canvas",
      desc: "Each dish is composed as a visual and tactile artwork, engaging smell, sight, and palate in unified harmony."
    },
    {
      step: "05",
      title: "GUEST",
      heading: "An Unforgettable Memory",
      desc: "Dining is intimate storytelling. We craft every evening so that you leave not just satisfied, but inspired."
    }
  ],

  farmToTableTimeline: [
    {
      stage: "FARM",
      title: "Sagewood Biodynamic Estate",
      desc: "Located on 45 acres of untouched coastal ridge soil. Zero pesticides, nurtured by ocean fog.",
      time: "5:00 AM",
      icon: "sprout"
    },
    {
      stage: "HARVEST",
      title: "Morning Hand Pick",
      desc: "Herbs and micro-greens are hand-harvested at sunrise when essential oils reach peak aroma density.",
      time: "7:30 AM",
      icon: "sun"
    },
    {
      stage: "KITCHEN",
      title: "Ember & Wood Preparation",
      desc: "Charcoal fires are stoked and maintained. Sauces begin their 14-hour reduction over slow embers.",
      time: "1:00 PM",
      icon: "flame"
    },
    {
      stage: "TABLE",
      title: "Tableside Presentation",
      desc: "Served over customized volcanic stone and hot cedar plates with tableside smoke infusion.",
      time: "7:00 PM",
      icon: "utensils"
    }
  ],

  gallery: [
    { title: "Open Kitchen Fire Pit", category: "Kitchen", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80" },
    { title: "Wagyu Seared over Binchotan", category: "Dishes", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80" },
    { title: "Private Dining Cellar", category: "Ambience", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80" },
    { title: "Chef Arjun Plating", category: "Craft", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80" },
    { title: "Ember Smoke Cocktail", category: "Drinks", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80" },
    { title: "Handcrafted Sage Butter", category: "Ingredients", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80" }
  ],

  designConcepts: [
    {
      id: "design-1",
      number: "01",
      name: "CINEMATIC LUXURY",
      subtitle: "Michelin-level elegance meets editorial fashion.",
      palette: ["#0a0908", "#f4efe6", "#d4af37", "#4a0e17"],
      font: "Cormorant Garamond",
      badge: "Editorial & Gold",
      desc: "Full-screen dark hero with steam particle simulation, gold typography, character-by-character headline reveals, and refined editorial food grid.",
      previewImg: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "design-2",
      number: "02",
      name: "FUTURISTIC 3D",
      subtitle: "Digital food laboratory with spatial 3D interactivity.",
      palette: ["#08080a", "#ff9e00", "#2b0938", "#ffffff"],
      font: "Space Grotesk",
      badge: "WebGL & Spatial",
      desc: "Floating 3D dish center, glowing neon particles, spatial floating menu cards, and interactive 360° flavor explorer with clickable ingredient hotspots.",
      previewImg: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "design-3",
      number: "03",
      name: "DARK FIRE / CHEF'S TABLE",
      subtitle: "Primal open fire, embers, and dark kitchen drama.",
      palette: ["#121212", "#ff5500", "#b87333", "#faf8f5"],
      font: "Cinzel / Condensed",
      badge: "Flame & Embers",
      desc: "Open kitchen fire pit visual, 5-stage fire scroll journey with flame transitions, horizontal scrolling Chef's Table showcase, and glowing copper form.",
      previewImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "design-4",
      number: "04",
      name: "ORGANIC PREMIUM / SAGE",
      subtitle: "Botanical fine dining with natural textures and fluid depth.",
      palette: ["#4a5d4e", "#f7f5f0", "#606c38", "#19241b"],
      font: "Playfair / Humanist",
      badge: "Sage & Botanicals",
      desc: "Soft sage & cream palette, floating botanical leaves, natural parallax scrolling, interactive Farm-to-Table timeline, and organic image masking.",
      previewImg: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "design-5",
      number: "05",
      name: "IMMERSIVE FOOD ART",
      subtitle: "Culinary gallery treating dishes as sculptural masterpieces.",
      palette: ["#000000", "#ffffff", "#e63946", "#888888"],
      font: "Syne / Avant-Garde",
      badge: "Deconstructing 3D",
      desc: "Monochrome high contrast aesthetic, deconstructing 3D dish scroll animation, full-screen food art gallery modals, and 5-act horizontal narrative.",
      previewImg: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80"
    }
  ]
};
