import Image from 'next/image'
import { useState } from 'react'
import { getRandomPoke } from '../lib/utils'
import styles from '../styles/RandomPokemon.module.css'

const RandomPokemon = ({ allPokemon, initialPokemon }) => {
  const [pokemon, setPokemon] = useState(initialPokemon)

  const clickHandler = () => {
        setPokemon(getRandomPoke(allPokemon))
  }

  return (
      <div className={styles.container} onClick={clickHandler} style={{cursor:"pointer"}}>
        <div className={styles.imageContainer}>
            <Image 
                src={`/images/pokemon/${pokemon.name.toLowerCase()}.png`}
                alt={pokemon.name}
                layout="fill" 
                objectFit='contain'
            />
        </div>
        <div className={styles.details}>
          <h1>{pokemon.name}</h1>
          <p>{pokemon.blurb}</p>
          <button style={{cursor:"pointer"}}>&gt;&gt;&gt; Next</button>
        </div>
      </div>
  )
}

export default RandomPokemon