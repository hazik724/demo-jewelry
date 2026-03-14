import { defineType, defineField } from "sanity"

export default defineType({
  name: "order",
  title: "Orders",
  type: "document",

  fields: [
    defineField({
      name: "orderId",
      title: "Order ID",
      type: "string",
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),

    // Shipping Address
    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "object",
      fields: [
        defineField({ name: "addressLine1", type: "string", title: "Address Line 1" }),
        defineField({ name: "addressLine2", type: "string", title: "Address Line 2" }),
        defineField({ name: "city", type: "string", title: "City" }),
        defineField({ name: "state", type: "string", title: "State" }),
        defineField({ name: "postalCode", type: "string", title: "Postal Code" }),
        defineField({ name: "country", type: "string", title: "Country" }),
        defineField({ name: "deliveryInstructions", type: "text", title: "Delivery Instructions" }),
      ],
    }),

    // Order Items
    defineField({
      name: "items",
      title: "Order Items",
      type: "array",
      of: [
        defineField({
          type: "object",
          name: "item",
          title: "Item",
          fields: [
            defineField({ name: "title", type: "string", title: "Product Title" }),
            defineField({ name: "price", type: "number", title: "Price" }),
            defineField({ name: "quantity", type: "number", title: "Quantity" }),
            defineField({ name: "image", type: "image", title: "Product Image" }),
          ],
          preview: {
            select: {
              title: "title",
              quantity: "quantity",
              price: "price",
              media: "image",
            },
            prepare({ title, quantity, price }) {
              return {
                title: title,
                subtitle: `Qty: ${quantity} • $${price}`,
              };
            },
          },
        }),
      ],
    }),

    defineField({
      name: "totalAmount",
      title: "Total Amount",
      type: "number",
    }),

    defineField({
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Cash on Delivery", value: "cod" },
          { title: "Online Payment", value: "online" },
        ],
      },
    }),

    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: ["pending", "processing", "shipped", "delivered", "cancelled"],
      },
      initialValue: "pending",
    }),

    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      orderId: "orderId",
      name: "customerName",
      total: "totalAmount",
      status: "status",
    },
    prepare({ orderId, name, total, status }) {
      return {
        title: `#${orderId} • ${name}`,
        subtitle: `$${total} • ${status}`,
      };
    },
  },
})