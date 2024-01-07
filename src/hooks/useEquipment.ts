import { useState } from 'react'
import { equipmentPart } from '../constants'
import type { Item, AttributeStats } from '../types'

interface useEquipmentArgs {
  addItemToInventory: (item: Item) => void
  removeItemFromInventory: (item: Item) => void
  applyStats: (attributes: AttributeStats) => void
  removeStats: (attributes: AttributeStats) => void

}
// @Todo:
// Guardar cuanto modificar el estado base un item, ejemplo ataque base = 30 y arma aumenta + 10 entonces guardar esa info y mostrar en stats cuando se hace hover.
export function useEquipment ({ addItemToInventory, removeItemFromInventory, applyStats, removeStats }: useEquipmentArgs) {
  const [equippedItems, setEquipedItems] = useState<Record<string, Item | null>>({
    [equipmentPart.HEAD]: null,
    [equipmentPart.CHEST]: null,
    [equipmentPart.HANDS]: null,
    [equipmentPart.FEET]: null,
    [equipmentPart.RING1]: null,
    [equipmentPart.RING2]: null,
    [equipmentPart.NECKLASE]: null,
    [equipmentPart.EARRING1]: null,
    [equipmentPart.EARRING2]: null,
    [equipmentPart.LEGS]: null,
    [equipmentPart.WEAPON]: null
  })

  // aplicar estados cuando se equipa, quitar cuando se desequipan
  // donde guardo la informacion de los items que estan equipados?
  const toggleEquipment = (item: Item) => {
    const newEquipedItems = { ...equippedItems }

    // recupero el objeto que el jugador actualmente tiene equipado.
    const equippedItem = newEquipedItems[item.type]
    // Eliminar el objeto a equipar del inventario.
    removeItemFromInventory(item)
    // si habia un objeto equipado de este mismo tipo, entonces se lo devuelve al inventario.
    if (equippedItem !== null && equippedItem !== undefined) {
      // deberia agregar al inventario el item que estaba equipado y al mismo tiempo eliminar el que se va a equipar.
      addItemToInventory(equippedItem)
      removeStats(equippedItem.attributes)
    }
    newEquipedItems[item.type] = item
    setEquipedItems(newEquipedItems)
    applyStats(item.attributes)
  }

  return { equippedItems, toggleEquipment }
}
