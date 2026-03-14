import type { StructureResolver } from "sanity/structure"

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Store Dashboard")
    .items([
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("order").title("Orders"),
      S.documentTypeListItem("customer").title("Customers"),
      S.documentTypeListItem("post").title("Blog / Posts"),
    ])