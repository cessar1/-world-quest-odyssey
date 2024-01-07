import { useState } from 'react'
import { type Item } from '../types'

export function useInventory (initialValue: Item[]) {
  const [inventory, setInventory] = useState<Item[]>(initialValue)
  // Evitar problemas de concurrencia usando el callback en useState.
  const addItemToInventory = (item: Item) => {
    setInventory(prevInventory => [...prevInventory, item])
  }

  const removeItemFromInventory = (item: Item) => {
    setInventory(prevInventory => prevInventory.filter(i => i.id !== item.id))
  }

  return { inventory, addItemToInventory, removeItemFromInventory }
}
