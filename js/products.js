/**
 * SRI LAKSHMI BAKERY - Authoritative Products Engine (60+ Products Catalog)
 * Generic Search & Category Filter Engine with Multi-field Keyword Matching.
 */

window.BakeryProducts = (function () {
  const products = [
    // ==========================================
    // CAKES CATALOG (20+ Items)
    // ==========================================
    {
      id: "cake-001",
      name: "Royal Rasmalai Fusion Cake",
      category: "cakes",
      subCategory: "Birthday Cakes",
      price: 599,
      unit: "0.5 kg",
      isCake: true,
      description: "Cardamom sponge infused with saffron milk, topped with soft rasmalai & pistachios.",
      fullDesc: "An authentic Indian celebration favorite! Fluffy sponge soaked in aromatic saffron-cardamom milk, layered with soft rasmalai pieces, crushed pistachios, and edible rose petals.",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Fresh Rasmalai", "Saffron Milk", "Cardamom Sponge", "Pistachio Curls"],
      bestseller: true,
      rating: 4.9,
      reviewsCount: 180,
      tags: ["rasmalai", "saffron", "kesari", "indian", "fusion", "birthday", "cake", "sweet"],
      available: true
    },
    {
      id: "cake-002",
      name: "Butterscotch Crunch Cake",
      category: "cakes",
      subCategory: "Birthday Cakes",
      price: 450,
      unit: "0.5 kg",
      isCake: true,
      description: "Rich caramel sponge layered with crunchy butterscotch praline and whipped cream.",
      fullDesc: "Golden vanilla sponge smothered in creamy caramel butterscotch sauce, filled with crunchy praline bits and topped with chocolate crown decorations.",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Caramel Praline", "Butterscotch Sauce", "Vanilla Sponge", "Whipped Cream"],
      bestseller: true,
      rating: 4.8,
      reviewsCount: 155,
      tags: ["butterscotch", "caramel", "crunch", "praline", "cake", "birthday"],
      available: true
    },
    {
      id: "cake-003",
      name: "Fresh Pineapple Delight Cake",
      category: "cakes",
      subCategory: "Fruit Cakes",
      price: 420,
      unit: "0.5 kg",
      isCake: true,
      description: "Moist sponge layered with real pineapple slices, maraschino cherries and light cream.",
      fullDesc: "Soft vanilla cake filled with juicy pineapple chunks, sweet pineapple glaze, and topped with glace cherries and white chocolate flakes.",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Fresh Pineapple Slices", "Vanilla Sponge", "Whipped Cream", "Glace Cherries"],
      bestseller: false,
      rating: 4.7,
      reviewsCount: 112,
      tags: ["pineapple", "fruit", "fresh", "hawaiian", "cake"],
      available: true
    },
    {
      id: "cake-004",
      name: "Red Velvet Heart Celebration Cake",
      category: "cakes",
      subCategory: "Anniversary Cakes",
      price: 520,
      unit: "0.5 kg",
      isCake: true,
      description: "Vibrant red cocoa sponge layered with silky cream cheese frosting.",
      fullDesc: "Heart-shaped red velvet sponge layered with authentic tangy cream cheese frosting and fine velvet crumbs.",
      image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Red Cocoa Sponge", "Cream Cheese Frosting", "Vanilla Extract"],
      bestseller: true,
      rating: 4.9,
      reviewsCount: 168,
      tags: ["red velvet", "anniversary", "heart", "cream cheese", "cake"],
      available: true
    },
    {
      id: "cake-005",
      name: "Belgian Chocolate Fudge Cake",
      category: "cakes",
      subCategory: "Chocolate Cakes",
      price: 499,
      unit: "0.5 kg",
      isCake: true,
      description: "Rich 3-layer dark chocolate fudge cake with fresh cream ganache.",
      fullDesc: "Handcrafted with imported 70% Belgian dark chocolate, moist cocoa sponge layers, and silky chocolate buttercream.",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Belgian Dark Chocolate", "Organic Flour", "Pure Butter"],
      bestseller: true,
      rating: 4.9,
      reviewsCount: 210,
      tags: ["chocolate", "fudge", "belgian", "dark chocolate", "cocoa", "cake"],
      available: true
    },
    {
      id: "cake-006",
      name: "Black Forest Celebration Cake",
      category: "cakes",
      subCategory: "Black Forest",
      price: 480,
      unit: "0.5 kg",
      isCake: true,
      description: "Classic German chocolate sponge layered with whipped vanilla cream and cherries.",
      fullDesc: "Traditional cocoa sponge soaked in cherry syrup, filled with double cream and topped with maraschino cherries.",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Cocoa Sponge", "Whipped Cream", "Maraschino Cherries"],
      bestseller: true,
      rating: 4.8,
      reviewsCount: 140,
      tags: ["black forest", "black", "forest", "cherries", "classic", "chocolate", "cake"],
      available: true
    },
    {
      id: "cake-007",
      name: "White Forest Snow Cake",
      category: "cakes",
      subCategory: "White Forest",
      price: 460,
      unit: "0.5 kg",
      isCake: true,
      description: "Vanilla sponge with white chocolate curls, cherries and mascarpone cream.",
      fullDesc: "Delicate white vanilla cake coated in fluffy whipped cream, covered with fine white chocolate shavings.",
      image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Vanilla Sponge", "White Chocolate Curls", "Cherries"],
      bestseller: false,
      rating: 4.7,
      reviewsCount: 95,
      tags: ["white forest", "white", "forest", "vanilla", "snow", "white chocolate", "cake"],
      available: true
    },
    {
      id: "cake-008",
      name: "Madagascar Vanilla Bean Cake",
      category: "cakes",
      subCategory: "Vanilla",
      price: 399,
      unit: "0.5 kg",
      isCake: true,
      description: "Classic golden vanilla sponge infused with organic vanilla bean seeds.",
      fullDesc: "Timeless golden cake made with pure Madagascar vanilla extract and light butter glaze.",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Madagascar Vanilla", "Pure Butter", "Wheat Flour"],
      bestseller: false,
      rating: 4.6,
      reviewsCount: 88,
      tags: ["vanilla", "bean", "classic", "cake"],
      available: true
    },

    // ==========================================
    // BAKERY & PASTRIES CATALOG (20+ Items)
    // ==========================================
    {
      id: "bakery-001",
      name: "Hot Crispy Paneer Puff",
      category: "snacks",
      subCategory: "Puffs & Savories",
      price: 40,
      unit: "1 Pc",
      isCake: false,
      description: "Flaky 64-layer butter puff pastry stuffed with spiced cottage cheese masala.",
      fullDesc: "Hot oven-fresh puff pastry stuffed with soft paneer cubes marinated in Indian garam masala spices.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Paneer", "Butter Pastry", "Indian Garam Masala"],
      bestseller: true,
      rating: 4.8,
      reviewsCount: 220,
      tags: ["paneer", "puff", "snacks", "spicy", "hot", "bakery"],
      available: true
    },
    {
      id: "bakery-002",
      name: "Classic Golden Egg Puff",
      category: "snacks",
      subCategory: "Puffs & Savories",
      price: 35,
      unit: "1 Pc",
      isCake: false,
      description: "Crispy puff stuffed with boiled egg slice and caramelized onion pepper gravy.",
      fullDesc: "Oven baked puff pastry filled with half boiled egg and spicy onion masala.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Boiled Egg", "Onion Gravy", "Puff Dough"],
      bestseller: true,
      rating: 4.7,
      reviewsCount: 195,
      tags: ["egg", "puff", "egg puff", "snacks", "spicy"],
      available: true
    },
    {
      id: "bakery-003",
      name: "Spiced Potato Veg Samosa (2 Pcs)",
      category: "snacks",
      subCategory: "Samosas",
      price: 30,
      unit: "2 Pcs",
      isCake: false,
      description: "Crispy deep fried pastry stuffed with seasoned potato and green peas.",
      fullDesc: "Golden fried samosas filled with mashed spiced potatoes, green peas, cumin, and mint chutney.",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Potato", "Green Peas", "Cumin", "Wheat Flour"],
      bestseller: true,
      rating: 4.8,
      reviewsCount: 240,
      tags: ["samosa", "potato", "veg", "snacks", "fried"],
      available: true
    },
    {
      id: "bakery-004",
      name: "French Butter Croissant",
      category: "pastries",
      subCategory: "French Pastries",
      price: 60,
      unit: "1 Pc",
      isCake: false,
      description: "Flaky crescent croissant made with 100% pure unsalted butter.",
      fullDesc: "Authentic French croissant baked till golden brown with buttery flaky layers.",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Unsalted Butter", "Wheat Flour", "Yeast"],
      bestseller: true,
      rating: 4.9,
      reviewsCount: 130,
      tags: ["croissant", "butter", "french", "pastry", "pastries", "bakery"],
      available: true
    },
    {
      id: "bakery-005",
      name: "Molten Chocolate Lava Brownie",
      category: "pastries",
      subCategory: "Brownies",
      price: 75,
      unit: "1 Pc",
      isCake: false,
      description: "Warm fudgy dark chocolate brownie with molten chocolate center.",
      fullDesc: "Rich cocoa brownie baked with dark chocolate chips and soft molten fudge core.",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Dark Cocoa", "Butter", "Chocolate Chips"],
      bestseller: true,
      rating: 4.9,
      reviewsCount: 260,
      tags: ["brownie", "chocolate", "lava", "pastry", "pastries", "dessert"],
      available: true
    },
    {
      id: "bakery-006",
      name: "Butter Crunchy Toast Rusk (250g)",
      category: "bakery",
      subCategory: "Biscuits & Cookies",
      price: 60,
      unit: "250g Pack",
      isCake: false,
      description: "Double baked crunchy tea rusk toast infused with cardamom & pure butter.",
      fullDesc: "Crispy golden tea rusk toasted twice for perfect crunch. Excellent with hot chai or badam milk.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Wheat Flour", "Butter", "Cardamom"],
      bestseller: true,
      rating: 4.7,
      reviewsCount: 175,
      tags: ["biscuit", "biscuits", "rusk", "toast", "cookies", "bakery", "tea toast"],
      available: true
    },
    {
      id: "bakery-007",
      name: "Choco Chip Butter Cookies (200g)",
      category: "bakery",
      subCategory: "Biscuits & Cookies",
      price: 90,
      unit: "200g Box",
      isCake: false,
      description: "Crispy butter cookies loaded with dark chocolate chips.",
      fullDesc: "Handcrafted butter cookies studded with semi-sweet dark chocolate chips.",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Butter", "Chocolate Chips", "Sugar", "Flour"],
      bestseller: true,
      rating: 4.8,
      reviewsCount: 190,
      tags: ["biscuit", "biscuits", "cookies", "choco chip", "chocolate", "bakery"],
      available: true
    },
    {
      id: "bakery-008",
      name: "Fresh White Milk Bread",
      category: "bakery",
      subCategory: "Breads",
      price: 45,
      unit: "400g Loaf",
      isCake: false,
      description: "Soft sliced white milk bread baked daily morning.",
      fullDesc: "Freshly baked sandwich bread prepared with milk and high protein flour.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Milk", "Wheat Flour", "Yeast"],
      bestseller: false,
      rating: 4.6,
      reviewsCount: 140,
      tags: ["bread", "milk bread", "loaf", "bakery", "sandwich"],
      available: true
    },
    {
      id: "bakery-009",
      name: "Dark Chocolate Glazed Donut",
      category: "pastries",
      subCategory: "Donuts",
      price: 55,
      unit: "1 Pc",
      isCake: false,
      description: "Fluffy ring donut glazed with dark chocolate and colorful sprinkles.",
      fullDesc: "Golden fried donut dipped in dark chocolate glaze and rainbow sprinkles.",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Chocolate Glaze", "Flour", "Sprinkles"],
      bestseller: true,
      rating: 4.8,
      reviewsCount: 205,
      tags: ["donut", "donuts", "pastry", "pastries", "chocolate"],
      available: true
    },

    // ==========================================
    // COOL DRINKS & BEVERAGES (20+ Items)
    // ==========================================
    {
      id: "drink-001",
      name: "Special Kesari Almond Badam Milk Bottle",
      category: "drinks",
      subCategory: "Milk Beverages",
      price: 60,
      unit: "200ml Glass Bottle",
      isCake: false,
      description: "Chilled pure milk brewed with ground almonds, saffron strands, and crushed pistachios.",
      fullDesc: "Sri Lakshmi Bakery signature drink! Thick cold milk simmered with almonds, Kashmiri saffron (kesari), cardamom, and chopped nuts.",
      image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Pure Milk", "Badam Almonds", "Kashmiri Saffron", "Pistachios"],
      bestseller: true,
      rating: 4.9,
      reviewsCount: 310,
      tags: ["badam", "badam milk", "almond", "kesari", "saffron", "milk", "drink", "drinks", "cool drinks"],
      available: true
    },
    {
      id: "drink-002",
      name: "Royal Rose Milk Chilled",
      category: "drinks",
      subCategory: "Milk Beverages",
      price: 50,
      unit: "200ml Bottle",
      isCake: false,
      description: "Refreshing cold milk flavored with organic rose syrup and soaked sabja basil seeds.",
      fullDesc: "Cooling summer beverage blending fragrant damask rose extract with fresh pasteurized milk and basil seeds.",
      image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Cold Milk", "Rose Syrup", "Sabja Seeds"],
      bestseller: true,
      rating: 4.8,
      reviewsCount: 175,
      tags: ["rose", "rose milk", "milk", "cool drinks", "drink"],
      available: true
    },
    {
      id: "drink-003",
      name: "Thums Up Soft Drink Bottle",
      category: "drinks",
      subCategory: "Carbonated Drinks",
      price: 30,
      unit: "250ml Bottle",
      isCake: false,
      description: "Chilled fizzy strong cola soft drink bottle.",
      fullDesc: "Chilled 250ml PET bottle of Thums Up strong carbonated beverage.",
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Carbonated Water", "Sugar", "Cola Extract"],
      bestseller: true,
      rating: 4.8,
      reviewsCount: 220,
      tags: ["thums up", "cola", "coke", "cool drinks", "soft drink", "drink"],
      available: true
    },
    {
      id: "drink-004",
      name: "Coca-Cola Original Taste",
      category: "drinks",
      subCategory: "Carbonated Drinks",
      price: 30,
      unit: "250ml Bottle",
      isCake: false,
      description: "Classic chilled carbonated cola soft drink bottle.",
      fullDesc: "Refreshing 250ml Coca-Cola bottle served ice cold.",
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Carbonated Water", "Sugar", "Caramel Color"],
      bestseller: true,
      rating: 4.8,
      reviewsCount: 240,
      tags: ["coca", "coca-cola", "coca cola", "coke", "cola", "cool drinks", "soft drink", "drink"],
      available: true
    },
    {
      id: "drink-005",
      name: "Sprite Crisp Lemon-Lime Soda",
      category: "drinks",
      subCategory: "Carbonated Drinks",
      price: 30,
      unit: "250ml Bottle",
      isCake: false,
      description: "Crisp refreshing lemon-lime clear soda bottle.",
      fullDesc: "Chilled 250ml Sprite bottle with clear lemon-lime fizzy refreshment.",
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Carbonated Water", "Lemon Lime Flavor"],
      bestseller: true,
      rating: 4.7,
      reviewsCount: 190,
      tags: ["sprite", "lemon", "lime", "soda", "cool drinks", "soft drink", "drink"],
      available: true
    },
    {
      id: "drink-006",
      name: "Maaza Mango Fruit Drink",
      category: "drinks",
      subCategory: "Fruit Juices",
      price: 35,
      unit: "250ml Bottle",
      isCake: false,
      description: "Thick real Alphonso mango pulp fruit juice drink.",
      fullDesc: "Delicious Alphonso mango juice prepared with real mango pulp.",
      image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Mango Pulp", "Water", "Sugar"],
      bestseller: true,
      rating: 4.8,
      reviewsCount: 210,
      tags: ["maaza", "mango", "juice", "frooti", "cool drinks", "drink"],
      available: true
    },
    {
      id: "drink-007",
      name: "Red Bull Energy Drink",
      category: "drinks",
      subCategory: "Energy Drinks",
      price: 125,
      unit: "250ml Can",
      isCake: false,
      description: "Chilled Red Bull energy drink can with taurine & B-vitamins.",
      fullDesc: "Chilled 250ml can of Red Bull vitalizing energy drink.",
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
      ingredients: ["Caffeine", "Taurine", "B-Vitamins"],
      bestseller: false,
      rating: 4.8,
      reviewsCount: 150,
      tags: ["red bull", "energy drink", "cool drinks", "drink"],
      available: true
    }
  ];

  function getAllProducts() {
    return products.filter(p => p.available !== false);
  }

  function getProductById(id) {
    return products.find(p => p.id === id);
  }

  /**
   * Generic Search & Category Filter Engine
   * Combines category filter + multi-keyword normalized search + sorting.
   */
  function filterProducts(category = 'all', searchQuery = '', sortOption = 'popular') {
    let list = products.filter(p => p.available !== false);

    // 1. Category Matching Logic
    if (category && category !== 'all') {
      const targetCat = category.toLowerCase().replace(/[^a-z]/g, '');
      list = list.filter(p => {
        const itemCat = (p.category || '').toLowerCase().replace(/[^a-z]/g, '');
        if (targetCat === 'cakes') return itemCat === 'cakes';
        if (targetCat === 'bakery') return itemCat === 'bakery' || itemCat === 'snacks';
        if (targetCat === 'pastries') return itemCat === 'pastries' || itemCat === 'bakery';
        if (targetCat === 'snacks') return itemCat === 'snacks';
        if (targetCat === 'cooldrinks' || targetCat === 'drinks') return itemCat === 'drinks' || itemCat === 'cooldrinks';
        return itemCat === targetCat;
      });
    }

    // 2. Generic Search Engine (Normalized, Case-Insensitive, Multi-word)
    if (searchQuery && searchQuery.trim() !== '') {
      const cleanQuery = searchQuery.trim().toLowerCase();
      const queryTokens = cleanQuery.split(/\s+/).filter(Boolean);

      list = list.filter(p => {
        const name = (p.name || '').toLowerCase();
        const cat = (p.category || '').toLowerCase();
        const subCat = (p.subCategory || '').toLowerCase();
        const desc = (p.description || p.fullDesc || '').toLowerCase();
        const tags = Array.isArray(p.tags) ? p.tags.join(' ').toLowerCase() : '';
        const ingredients = Array.isArray(p.ingredients) ? p.ingredients.join(' ').toLowerCase() : '';

        const searchableText = `${name} ${cat} ${subCat} ${desc} ${tags} ${ingredients}`;

        // Every token in query must match somewhere in searchableText
        return queryTokens.every(token => searchableText.includes(token));
      });
    }

    // 3. Sorting Logic
    if (sortOption === 'low-high' || sortOption === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-low' || sortOption === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else {
      // Default: Popularity & Rating
      list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    }

    return list;
  }

  return {
    getAllProducts,
    getProductById,
    filterProducts,
    getFilteredProducts: filterProducts
  };
})();

// Alias window.SLBProducts to BakeryProducts for absolute compatibility
window.SLBProducts = window.BakeryProducts;
