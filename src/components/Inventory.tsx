import { useState } from 'react'
import type { Item, AttributeStats } from '../types'
// @Todo: Comparar atributos de los item en inventario con los ya equipados?
interface InventoryProps {
  inventory: Item[]
  toggleEquipment: (item: Item) => void
  removeItemFromInventory: (item: Item) => void
}
// @Todo: onRemoveItem, onToggleEquip --> renombrar props.
function Inventory ({ inventory, toggleEquipment, removeItemFromInventory }: InventoryProps) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const handleClick = (item: Item) => {
    setSelectedItem(item)
  }
  // comparar un objeto del inventario con uno del mismo tipo ya equipado y devuelve la diferencia entre sus atributos (positivo o negativo).
  // Podria ser un objeto si se quiere colocar junto a los atributos mostrados de un objeto, o un string si se coloca debajo.
  const labelsMaps = {
    healPoints: 'Max. Hp',
    manaPoints: 'Max. Mp',
    phisicalAttack: 'P. Atk.',
    magicAttack: 'M. Atk',
    phisicalDefense: 'p. Def.',
    magicDefense: 'M. Def',
    speed: 'Speed',
    attackSpeed: 'Atk. Spd',
    castingSpeed: 'Casting. Spd.',
    critical: 'Critical'
  }

  type CharacterStatsKey =
    | 'healPoints'
    | 'manaPoints'
    | 'phisicalAttack'
    | 'phisicalDefence'
    | 'magicalAttack'
    | 'magicalDefence'
    | 'speed'
    | 'attackSpeed'
    | 'castingSpeed'
    | 'critical'

  const getEquipmentAttributeComparison = (inventoryItemAttributes: AttributeStats, equippedItemattributes: AttributeStats) => {
    const differences = []
    for (const key in inventoryItemAttributes) {
      const typedKey = key as CharacterStatsKey

      if (key in inventoryItemAttributes && key in equippedItemattributes) {
        const difference = (inventoryItemAttributes[typedKey] ?? 0) - (equippedItemattributes[typedKey] ?? 0)
        const singn = difference > 0 ? '+' : '-'
        differences.push(`${singn} ${difference} ${key}`)
      }
    }

    for (const key in inventoryItemAttributes) {
      if (key in inventoryItemAttributes && !(key in equippedItemattributes)) {
        const typedKey = key as CharacterStatsKey
        differences.push(`+${inventoryItemAttributes[typedKey]} ${typedKey}`)
      }
    }

    for (const key in equippedItemattributes) {
      if (key in equippedItemattributes && !(key in inventoryItemAttributes)) {
        const typedKey = key as CharacterStatsKey
        differences.push(`-${equippedItemattributes[typedKey]} ${typedKey}`)
      }
    }

    return differences
  }

  return (<section className='inventory'>
    <h2>Inventario</h2>
    <section className='inventory__items'>
      <ul>
        {
          inventory.map(item =>
            <li key={item.id} onClick={() => { handleClick(item) }}>
              {item.name}
            </li>
          )
        }
      </ul>
    </section>
    {selectedItem !== null && <section className='inventory__items-info'>
      <h3>{selectedItem.name}</h3>
      <button onClick={() => { setSelectedItem(null) }}>x</button>
      <p>{selectedItem.description}</p>
      <ul>
        {Object.entries(selectedItem.attributes).map(([attribute, value]) => (
          <li key={attribute}>
            <strong>{attribute}:</strong> {value}
          </li>
        ))}
      </ul>
      <h4>Comparacion con objeto equipado</h4>
      {}
      <p> -5 physical attack +10 Heal Point</p>
      <button onClick={() => { toggleEquipment(selectedItem) }}>Equipar</button>
      <button onClick={() => { removeItemFromInventory(selectedItem) }}>Eliminar</button>
    </section>}
  </section>)
}

export default Inventory
