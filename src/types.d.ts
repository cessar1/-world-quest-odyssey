export interface Item {
  id: number
  name: string
  weight: number
  description: string
  type: string
  basePrice: number
  attributes?: Record<AttributeStats>
}

export type ItemId = pick<Item, 'id'>

export interface AttributeStats {
  healPoints?: number
  manaPoints?: number
  phisicalAttack?: number
  phisicalDefence?: number
  magicalAttack?: number
  magicalDefence?: number
  speed?: number
  attackSpeed?: number
  castingSpeed?: number
  critical?: number
}
