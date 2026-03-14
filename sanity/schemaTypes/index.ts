import { type SchemaTypeDefinition } from 'sanity'
import {postType} from './postType'
import {customerType} from './customerType'
import {productType} from './productTypes'
import {categoryType} from './categoryType'
import orderType from './orderType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, customerType, productType, categoryType, orderType  ],
}
