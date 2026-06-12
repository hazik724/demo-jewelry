import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN, // 🔐 must be private
  useCdn: false,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const doc = {
      _type: "contact",
      name: body.name,
      email: body.email,
      message: body.message,
      createdAt: new Date().toISOString(),
    }

    await client.create(doc)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error })
  }
}