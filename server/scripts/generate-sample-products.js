// Generate realistic INR-priced products into the database
// Run: node server/scripts/generate-sample-products.js

const prisma = require("../utills/db");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 12);

const CATEGORIES = [
  { name: "smart-phones", min: 6999, max: 129999, images: ["smart phone 1.png", "smart phone 2.png", "smart phone 3.png", "product1.webp", "product2.webp", "product3.webp"] },
  { name: "laptops", min: 24999, max: 299999, images: ["laptop 1.webp", "laptop 2.webp", "laptop 3.webp", "laptop 4.webp", "laptop 1.png", "laptop 2.png"] },
  { name: "earbuds", min: 499, max: 14999, images: ["earbuds 1.png", "earbuds 2.png", "earbuds 3.png", "product4.webp", "product5.webp", "product6.webp"] },
  { name: "headphones", min: 799, max: 24999, images: ["headphones 1.png", "headphones 2.png", "headphones 3.png", "product7.webp", "product8.webp", "product9.webp"] },
  { name: "cameras", min: 4999, max: 249999, images: ["camera 1.png", "camera 2.png", "camera 3.png", "product10.webp", "product11.webp", "product12.webp"] },
  { name: "tablets", min: 7999, max: 149999, images: ["tablet 1 1.png", "tablet 2 1.png", "tablet 3 1.png", "product1.webp", "product2.webp", "product3.webp"] },
  { name: "printers", min: 2999, max: 49999, images: ["printer 1.png", "printer 2.png", "printer 3.png", "product4.webp", "product5.webp", "product6.webp"] },
  { name: "computers", min: 19999, max: 299999, images: ["pc 1.png", "pc 2.png", "pc 3.png", "laptop 1.webp", "laptop 2.webp", "product7.webp"] },
  { name: "mouses", min: 299, max: 4999, images: ["mouse 1.png", "mouse 1 2.png", "mouse 1 3.png", "mouse 2 1.png", "mouse 2 2.png", "mouse 2 3.png", "mouse 3 1.png", "mouse 3 2.png", "mouse 3 3.png"] },
  { name: "watches", min: 999, max: 59999, images: ["smart watch 1.png", "smart watch 2.png", "smart watch 3.png", "smart watch.png", "product8.webp", "product9.webp"] },
];

const MANUFACTURERS = ["Samsung", "Apple", "Sony", "LG", "Dell", "HP", "Lenovo", "OnePlus", "Xiaomi", "Realme"];

function randBetween(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function ensureMerchant() {
  let merchant = await prisma.merchant.findFirst();
  if (!merchant) {
    merchant = await prisma.merchant.create({
      data: {
        id: nanoid(),
        name: "ElectroMart",
        description: "Your trusted electronics store",
        email: "aakarsh123@gmail.com",
        phone: "+91 98738 92872",
        address: "ElectroMart Headquarters",
        status: "ACTIVE",
      },
    });
    console.log("Created default merchant");
  }
  return merchant.id;
}

async function ensureCategories() {
  for (const c of CATEGORIES) {
    const exists = await prisma.category.findFirst({ where: { name: c.name } });
    if (!exists) {
      await prisma.category.create({ data: { id: nanoid(), name: c.name } });
    }
  }
}

async function generateProducts(productsPerCategory = 30) {
  const merchantId = await ensureMerchant();
  await ensureCategories();
  const allCategories = await prisma.category.findMany();
  const getCatId = (name) => allCategories.find((c) => c.name === name)?.id;

  const items = [];
  let productCounter = 1;

  // Generate products evenly distributed across categories
  for (const category of CATEGORIES) {
    const categoryId = getCatId(category.name);
    if (!categoryId) {
      console.log(`Warning: Category "${category.name}" not found, skipping...`);
      continue;
    }

    for (let i = 0; i < productsPerCategory; i++) {
      const price = randBetween(category.min, category.max);
      const manufacturer = randomChoice(MANUFACTURERS);
      const modelNum = 1000 + productCounter;
      const title = `${manufacturer} ${category.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ${modelNum}`;
      
      // Select image from category-specific images, cycling through them
      const imageIndex = i % category.images.length;
      const mainImage = category.images[imageIndex] || "product_placeholder.jpg";
      
      items.push({
        id: nanoid(),
        slug: `${category.name}-${manufacturer.toLowerCase()}-${modelNum}`,
        title,
        mainImage,
        price,
        description: `Premium ${category.name.replace(/-/g, ' ')} from ${manufacturer} with advanced features, excellent build quality, and reliable performance. Perfect for your daily needs.`,
        manufacturer,
        categoryId,
        merchantId,
        inStock: Math.random() > 0.2 ? 1 : 0, // 80% in stock
        rating: Math.round(3 + Math.random() * 2), // Rating between 3-5
      });
      productCounter++;
    }
  }

  console.log(`Creating ${items.length} products across ${CATEGORIES.length} categories...`);
  console.log(`Products per category: ${productsPerCategory}`);
  
  for (const chunk of chunkArray(items, 100)) {
    await prisma.product.createMany({ data: chunk, skipDuplicates: true });
    process.stdout.write(".");
  }
  console.log("\n✅ Done! Products created successfully.");
  
  // Show summary
  const categoryCounts = {};
  for (const cat of CATEGORIES) {
    const count = await prisma.product.count({
      where: { category: { name: cat.name } }
    });
    categoryCounts[cat.name] = count;
  }
  
  console.log("\n📊 Products per category:");
  for (const [name, count] of Object.entries(categoryCounts)) {
    console.log(`   ${name}: ${count} products`);
  }
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

// Generate 30 products per category (270 total products)
generateProducts(30)
  .catch((e) => {
    console.error("❌ Error generating products:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


