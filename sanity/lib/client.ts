import { createClient } from "next-sanity"
import { apiVersion, dataset, projectId } from "../env"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // MUST be false for write operations
  token: process.env.SANITY_API_TOKEN, // add this
})