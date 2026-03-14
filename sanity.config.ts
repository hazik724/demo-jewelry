'use client'

/**
 * Sanity Studio configuration
 * Mounted on: /app/studio/[[...tool]]/page.tsx
 */

import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"

// Environment settings
import { apiVersion, dataset, projectId } from "./sanity/env"

// Schemas
import { schema } from "./sanity/schemaTypes"

// Custom dashboard structure
import { structure } from "./sanity/structure"

export default defineConfig({
  title: "Store Admin Dashboard",
  basePath: "/studio",

  projectId,
  dataset,

  // Content schemas
  schema,

  plugins: [
    structureTool({ structure }),

    // Vision tool only visible in development (not to clients)
    ...(process.env.NODE_ENV === "development"
      ? [visionTool({ defaultApiVersion: apiVersion })]
      : []),
  ],
})