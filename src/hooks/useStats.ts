import { useState } from 'react'
import type { AttributeStats } from '../types'
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

export function useStats () {
  const [stats, setStats] = useState({
    healPoints: 100,
    manaPoints: 50,
    phisicalAttack: 50,
    phisicalDefence: 30,
    magicalAttack: 20,
    magicalDefence: 40,
    speed: 10,
    attackSpeed: 60,
    castingSpeed: 80
  })

  const applyStats = (attributes: AttributeStats) => {
    // Corrige problemas de concurrencia.
    setStats(prevStats => {
      const newStats = { ...prevStats }
      Object.keys(attributes).forEach((key) => {
        const typedKey = key as CharacterStatsKey

        if (Object.keys(attributes).includes(typedKey)) {
          newStats[typedKey] += attributes[typedKey] ?? 0
        }
      })
      return newStats
    })
  }

  const removeStats = (attributes: AttributeStats) => {
    // Corrige problemas de concurrencia.
    setStats(prevStats => {
      const newStats = { ...prevStats }
      Object.keys(attributes).forEach((key) => {
        const typedKey = key as CharacterStatsKey

        if (Object.keys(attributes).includes(typedKey)) {
          const attibuteValue = attributes[typedKey]
          newStats[typedKey] -= attibuteValue ?? 0
        }
      })
      return newStats
    })
  }

  return { stats, applyStats, removeStats }
}
