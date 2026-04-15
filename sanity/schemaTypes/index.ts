import { type SchemaTypeDefinition } from 'sanity'
import {productType} from './productTypes'
import {categoryType} from './categoryType'
import orderType from './orderType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ productType, categoryType, orderType  ],
}
