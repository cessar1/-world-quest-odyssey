import items from './items.json'
import './App.css'
import { equipmentPart } from './constants'
import { useInventory } from './hooks/useInventory'
import { useEquipment } from './hooks/useEquipment'
import { useStats } from './hooks/useStats'
import Inventory from './components/Inventory'
// export function deleteItem (itemId) {
//   const newItems = items.filter(i => i.id !== itemId)
//   localStorage.setItem('items', JSON.stringify(newItems))
// }
// tomar el bonus de atributos que ofrece un item y aplicarl se los al personaje.

const App = () => {
  const { stats, applyStats, removeStats } = useStats()
  const { inventory, addItemToInventory, removeItemFromInventory } = useInventory(items)
  const { equippedItems, toggleEquipment } = useEquipment({ addItemToInventory, removeItemFromInventory, applyStats, removeStats })

  const headers = [
    { label: 'Estado', key: 'label' },
    { label: 'Valor', key: 'value' }
  ]

  const rows = [
    { label: 'Nivel', value: stats.healPoints },
    { label: 'Experiencia', value: `${stats.healPoints} / ${stats.healPoints}` },
    { label: 'Puntos de vida', value: `${stats.healPoints} + 10` },
    { label: 'Puntos de mana', value: stats.manaPoints },
    { label: 'Daño Físico', value: stats.phisicalAttack },
    { label: 'Defensa Física', value: stats.phisicalDefence },
    { label: 'Daño Mágico', value: stats.magicalAttack },
    { label: 'Defensa Mágica', value: stats.magicalDefence },
    { label: 'Velocidad de Movimiento', value: stats.speed },
    { label: 'Velocidad de Ataque', value: stats.attackSpeed },
    { label: 'Velocidad de Conjuro', value: stats.attackSpeed }
  ]

  return (
    <div>
      <h1>Dungeon Adventure</h1>
      <Inventory inventory={inventory} toggleEquipment={toggleEquipment} removeItemFromInventory={removeItemFromInventory} />
      <section className='equipamiento'>
        <h2>Equipamiento</h2>
        <ul>
          <li>{`Head: ${equippedItems[equipmentPart.HEAD]?.name ?? 'none'}`}</li>
          <li>{`Chest: ${equippedItems[equipmentPart.CHEST]?.name ?? 'none'}`}</li>
          <li>{`Legs: ${equippedItems[equipmentPart.LEGS]?.name ?? 'none'}`}</li>
          <li>{`Hands: ${equippedItems[equipmentPart.HANDS]?.name ?? 'none'}`}</li>
          <li>{`Feet: ${equippedItems[equipmentPart.FEET]?.name ?? 'none'}`}</li>
          <li>{`Weapon: ${equippedItems[equipmentPart.WEAPON]?.name ?? 'none'}`}</li>
        </ul>
      </section>
      <section>
        <h2>Estadisticas</h2>

        <table>
          <thead>
            {headers.map(header => {
              return <th key={header.key}>{header.label}</th>
            })}
          </thead>
          <tbody>
            {rows.map((row) => {
              return <tr key={row.label}>
                <td>{row.label}</td>
                <td>{row.value}</td>
              </tr>
            })}
          </tbody>
        </table>
      </section>

    </div>
  )
}

export default App
