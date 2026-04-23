import { client } from "@/sanity/lib/client"

export async function GET() {
  const baseUrl = "https://jhumkara.com"

  const products = await client.fetch(`
    *[_type == "product"]{
      title,
      "slug": slug.current,
      price,
      images,
      _updatedAt
    }
  `)

  const xmlItems = products
    .map((p: any) => {
      const image =
        p.images?.[0]
          ? p.images[0].asset?.url || ""
          : ""

      return `
<item>
  <g:id>${p.slug}</g:id>
  <g:title>${escapeXml(p.title)}</g:title>
  <g:description>${escapeXml(p.title + " premium handcrafted jewelry by Jhumkara")}</g:description>
  <g:link>${baseUrl}/product/${p.slug}</g:link>
  <g:image_link>${image}</g:image_link>
  <g:price>${p.price} PKR</g:price>
  <g:availability>in stock</g:availability>
  <g:brand>Jhumkara by Zyra</g:brand>
</item>
`
    })
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
<title>Jhumkara Jewelry</title>
<link>${baseUrl}</link>
<description>Premium handcrafted jewelry Pakistan</description>

${xmlItems}

</channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}

/* ---------------- SAFE XML ESCAPE ---------------- */
function escapeXml(unsafe: string) {
  return unsafe
    ?.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}