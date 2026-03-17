export const categories = [
  {
    id: 1,
    slug: "tracksuits",
    name: "Tracksuits",
    heroImage: "/hero-tracksuit.png",
    tileImage: "/category-01.png",
    productCountLabel: "60+ Products",
    shortDescription:
      "Premium athletic tracksuits engineered for performance, training, and team identity. Custom-manufactured to your brand specifications.",
    tags: ["Performance", "Training", "Casual", "Team"],
    navIcon: "🏃",
    quoteLabel: "Tracksuits",
    isActive: true,
    subcategories: [
      {
        slug: "performance-tracksuits",
        name: "Performance Tracksuits",
        heroImage: "/category-tracksuit.png",
        productCountLabel: "16 Products",
        description: "Moisture-wicking tracksuits designed for high-intensity training and competition.",
      },
      {
        slug: "training-suits",
        name: "Training Suits",
        heroImage: "/category-tracksuit.png",
        productCountLabel: "18 Products",
        description: "Versatile training sets for gyms, clubs, and athletic programs.",
      },
      {
        slug: "casual-tracksuits",
        name: "Casual Tracksuits",
        heroImage: "/category-tracksuit.png",
        productCountLabel: "14 Products",
        description: "Lifestyle tracksuits combining comfort with modern streetwear aesthetics.",
      },
      {
        slug: "custom-teamwear",
        name: "Custom Teamwear",
        heroImage: "/category-tracksuit.png",
        productCountLabel: "12 Products",
        description: "Fully branded team tracksuits for clubs, schools, and organizations.",
      },
    ],
  },
  {
    id: 2,
    slug: "jackets",
    name: "Jackets",
    heroImage: "/hero-jacket.png",
    tileImage: "/category2.png",
    productCountLabel: "50+ Products",
    shortDescription:
      "Versatile sports jackets from lightweight windbreakers to insulated bombers — built for performance and style.",
    tags: ["Bomber", "Windbreaker", "Coach", "Puffer"],
    navIcon: "🧥",
    quoteLabel: "Jackets",
    isActive: true,
    subcategories: [
      {
        slug: "bomber-jackets",
        name: "Bomber Jackets",
        heroImage: "/category-jacket.png",
        productCountLabel: "14 Products",
        description: "Classic bomber silhouettes with ribbed cuffs and custom branding options.",
      },
      {
        slug: "windbreaker-jackets",
        name: "Windbreaker Jackets",
        heroImage: "/category-jacket.png",
        productCountLabel: "12 Products",
        description: "Lightweight, packable windbreakers for outdoor training and active lifestyles.",
      },
      {
        slug: "coach-jackets",
        name: "Coach Jackets",
        heroImage: "/category-jacket.png",
        productCountLabel: "10 Products",
        description: "Minimalist snap-button coach jackets ideal for team sideline and casual wear.",
      },
      {
        slug: "puffer-jackets",
        name: "Puffer Jackets",
        heroImage: "/category-jacket.png",
        productCountLabel: "14 Products",
        description: "Insulated puffer jackets for cold-weather training and everyday warmth.",
      },
    ],
  },
  {
    id: 3,
    slug: "hoodies",
    name: "Hoodies & Sweatshirts",
    heroImage: "/hero-teamwear.png",
    tileImage: "/category03.png",
    productCountLabel: "45+ Products",
    shortDescription:
      "Premium heavyweight hoodies and sweatshirts — from pullover classics to zip-up performance pieces.",
    tags: ["Pullover", "Zip-Up", "Performance", "Fleece"],
    navIcon: "👕",
    quoteLabel: "Hoodies",
    isActive: true,
    subcategories: [
      {
        slug: "pullover-hoodies",
        name: "Pullover Hoodies",
        heroImage: "/category-hoodie.png",
        productCountLabel: "14 Products",
        description: "Classic pullover hoodies with kangaroo pocket and adjustable drawstring.",
      },
      {
        slug: "zip-up-hoodies",
        name: "Zip-Up Hoodies",
        heroImage: "/category-hoodie.png",
        productCountLabel: "12 Products",
        description: "Full-zip hoodies with premium YKK zippers and custom detailing.",
      },
      {
        slug: "performance-hoodies",
        name: "Performance Hoodies",
        heroImage: "/category-hoodie.png",
        productCountLabel: "10 Products",
        description: "Technical fabric hoodies with moisture-wicking and four-way stretch.",
      },
      {
        slug: "team-hoodies",
        name: "Team Hoodies",
        heroImage: "/category-hoodie.png",
        productCountLabel: "9 Products",
        description: "Team-branded hoodies with sublimated graphics and custom embroidery.",
      },
    ],
  },
  {
    id: 4,
    slug: "team-uniforms",
    name: "Team Uniforms",
    heroImage: "/hero-teamwear.png",
    tileImage: "/category04.png",
    productCountLabel: "40+ Products",
    shortDescription:
      "Complete team uniform solutions — from warm-up kits to sideline apparel, fully customized with your branding.",
    tags: ["Full Kits", "Warm-Up", "Sideline", "Custom"],
    navIcon: "⚽",
    quoteLabel: "Team Uniforms",
    isActive: true,
    subcategories: [
      {
        slug: "full-team-kits",
        name: "Full Team Kits",
        heroImage: "/category-teamwear.png",
        productCountLabel: "10 Products",
        description: "Complete matching sets including jacket, pants, and training top.",
      },
      {
        slug: "warm-up-sets",
        name: "Warm-Up Sets",
        heroImage: "/category-teamwear.png",
        productCountLabel: "12 Products",
        description: "Pre-game warm-up tracksuits designed for team identity and movement.",
      },
      {
        slug: "sideline-apparel",
        name: "Sideline Apparel",
        heroImage: "/category-teamwear.png",
        productCountLabel: "10 Products",
        description: "Coach jackets, bench coats, and sideline gear for staff and reserves.",
      },
      {
        slug: "custom-designs",
        name: "Custom Designs",
        heroImage: "/category-teamwear.png",
        productCountLabel: "8 Products",
        description: "Bespoke team apparel with full sublimation, embroidery, and custom patterns.",
      },
    ],
  },
];

export function getCategoryBySlug(slug) {
  if (!slug) return undefined;
  return categories.find((category) => category.slug === slug);
}

export function getSubcategoryBySlugs(categorySlug, subCategorySlug) {
  if (!categorySlug || !subCategorySlug) return undefined;
  const category = getCategoryBySlug(categorySlug);
  if (!category || !Array.isArray(category.subcategories)) return undefined;
  return category.subcategories.find((sub) => sub.slug === subCategorySlug);
}

export function getSubcategoriesForCategory(categorySlug, { includeAll = false } = {}) {
  const category = getCategoryBySlug(categorySlug);
  if (!category || !Array.isArray(category.subcategories)) return [];

  const subs = category.subcategories.map((sub) => ({
    slug: sub.slug,
    name: sub.name,
  }));

  if (includeAll) {
    return [{ slug: "all", name: "All" }, ...subs];
  }

  return subs;
}
