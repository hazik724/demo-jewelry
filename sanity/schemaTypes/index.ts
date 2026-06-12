import { type SchemaTypeDefinition } from 'sanity'
import {productType} from './productTypes'
import {categoryType} from './categoryType'
import orderType from './orderType'
import contact from "./contactTypes"



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ productType, categoryType, orderType, contact  ],
}
