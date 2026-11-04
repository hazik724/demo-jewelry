import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    // Pricing
    defineField({
      name: 'price',
      title: 'Actual Price',
      type: 'number',
      description: 'The real price the customer pays',
      validation: (rule) => rule.required().min(0),
    }),

    defineField({
      name: 'compareAtPrice',
      title: 'Showcase Price (Crossed Out)',
      type: 'number',
      description: 'Higher "original" price shown crossed out. Leave empty for no sale.',
      validation: (rule) =>
        rule.min(0).custom((value, context) => {
          const price = (context.document as { price?: number })?.price
          if (value && price && value <= price) {
            return 'Showcase price must be higher than the actual price'
          }
          return true
        }),
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
  ],

  preview: {
    select: { title: 'title', media: 'images.0', price: 'price' },
    prepare: ({ title, media, price }) => ({
      title,
      media,
      subtitle: price !== undefined ? `Rs ${price}` : 'No price',
    }),
  },
})