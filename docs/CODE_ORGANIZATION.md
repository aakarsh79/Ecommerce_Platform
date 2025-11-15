# Code Organization Guide

## Homepage Structure (`app/page.tsx`)
The homepage is now clean and organized into logical sections:

1. **Hero Section** - Main banner with watch image
2. **Welcome Section** - Introduction to ElectroMart
3. **Category Menu** - Browse categories
4. **Deals Carousel** - Featured deals
5. **Product Sections** - All product sections grouped together
6. **Newsletter** - Newsletter signup

## Component Organization

### Main Components
- `Hero.tsx` - Hero banner with animated watch
- `IntroducingSection.tsx` - Welcome section
- `CategoryMenu.tsx` - Category browsing
- `DealsCarousel.tsx` - Deals carousel
- `HomeProductSections.tsx` - **NEW** - Groups all product sections
- `ProductsSection.tsx` - Individual product section (reusable)
- `ProductItem.tsx` - Single product card

### Product Sections Configuration
All product sections are now configured in one place:
- File: `components/HomeProductSections.tsx`
- Configuration array: `PRODUCT_SECTIONS`
- Easy to add/remove/modify sections

## File Structure

```
app/
  page.tsx                    # Clean homepage (now organized)
  
components/
  HomeProductSections.tsx     # Groups all product sections
  ProductsSection.tsx         # Reusable product section component
  ProductItem.tsx             # Single product card
  Hero.tsx                    # Hero banner
  IntroducingSection.tsx      # Welcome section
  CategoryMenu.tsx            # Categories
  DealsCarousel.tsx           # Deals
  ...
```

## Benefits of This Organization

1. **Single Source of Truth** - All product sections defined in one array
2. **Easy to Modify** - Add/remove sections by editing one array
3. **Clean Homepage** - `app/page.tsx` is now readable and maintainable
4. **Reusable Components** - `ProductsSection` can be used anywhere
5. **Consistent Styling** - Alternating backgrounds handled automatically

## How to Add a New Product Section

1. Open `components/HomeProductSections.tsx`
2. Add to `PRODUCT_SECTIONS` array:
```typescript
{ title: "New Category", category: "category-name", limit: 24 }
```
3. Done! It will automatically appear on homepage with proper styling.

## How to Modify Product Sections

Edit the `PRODUCT_SECTIONS` array in `components/HomeProductSections.tsx`:
- Change `limit` to show more/fewer products
- Change `category` to filter by category
- Remove items to remove sections
- Reorder array to change display order

