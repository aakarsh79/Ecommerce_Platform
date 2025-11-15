// Update all products that don't have images or have placeholder images
// Run: node server/scripts/update-product-images.js

const prisma = require("../utills/db");

const CATEGORY_IMAGES = {
  "smart-phones": ["smart phone 1.png", "smart phone 2.png", "smart phone 3.png", "product1.webp", "product2.webp", "product3.webp"],
  "laptops": ["laptop 1.webp", "laptop 2.webp", "laptop 3.webp", "laptop 4.webp", "laptop 1.png", "laptop 2.png"],
  "earbuds": ["earbuds 1.png", "earbuds 2.png", "earbuds 3.png", "product4.webp", "product5.webp", "product6.webp"],
  "headphones": ["headphones 1.png", "headphones 2.png", "headphones 3.png", "product7.webp", "product8.webp", "product9.webp"],
  "cameras": ["camera 1.png", "camera 2.png", "camera 3.png", "product10.webp", "product11.webp", "product12.webp"],
  "tablets": ["tablet 1 1.png", "tablet 2 1.png", "tablet 3 1.png", "product1.webp", "product2.webp", "product3.webp"],
  "printers": ["printer 1.png", "printer 2.png", "printer 3.png", "product4.webp", "product5.webp", "product6.webp"],
  "computers": ["pc 1.png", "pc 2.png", "pc 3.png", "laptop 1.webp", "laptop 2.webp", "product7.webp"],
  "mouses": ["mouse 1.png", "mouse 1 2.png", "mouse 1 3.png", "mouse 2 1.png", "mouse 2 2.png", "mouse 2 3.png", "mouse 3 1.png", "mouse 3 2.png", "mouse 3 3.png"],
  "watches": ["smart watch 1.png", "smart watch 2.png", "smart watch 3.png", "smart watch.png", "product8.webp", "product9.webp"],
};

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function updateProductImages() {
  console.log("🔄 Updating products without images...\n");
  
  // Get all products with their categories
  const products = await prisma.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  let updatedCount = 0;
  let skippedCount = 0;

  for (const product of products) {
    const categoryName = product.category?.name;
    const currentImage = product.mainImage || "";
    
    // Check if product needs image update
    const needsUpdate = 
      !currentImage || 
      currentImage === "" || 
      currentImage === "product_placeholder.jpg" ||
      currentImage.includes("placeholder");

    if (needsUpdate && categoryName && CATEGORY_IMAGES[categoryName]) {
      const images = CATEGORY_IMAGES[categoryName];
      const newImage = randomChoice(images);
      
      await prisma.product.update({
        where: { id: product.id },
        data: { mainImage: newImage },
      });
      
      updatedCount++;
      if (updatedCount % 10 === 0) {
        process.stdout.write(".");
      }
    } else {
      skippedCount++;
    }
  }

  console.log(`\n\n✅ Updated ${updatedCount} products with images`);
  console.log(`⏭️  Skipped ${skippedCount} products (already have images)`);
  
  // Show summary by category
  const categoryCounts = {};
  for (const product of products) {
    const catName = product.category?.name || "unknown";
    if (!categoryCounts[catName]) {
      categoryCounts[catName] = { total: 0, withImages: 0 };
    }
    categoryCounts[catName].total++;
    if (product.mainImage && product.mainImage !== "product_placeholder.jpg") {
      categoryCounts[catName].withImages++;
    }
  }
  
  console.log("\n📊 Products by category:");
  for (const [name, stats] of Object.entries(categoryCounts)) {
    console.log(`   ${name}: ${stats.withImages}/${stats.total} have images`);
  }
}

updateProductImages()
  .catch((e) => {
    console.error("❌ Error updating product images:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



