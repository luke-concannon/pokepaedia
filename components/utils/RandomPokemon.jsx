import Image from 'next/image'
import { useState, useContext, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getRandomPoke } from '../../lib/funcs'
import styles from './RandomPokemon.module.css'
import Loading from './Loading'
import pokemonCardsContext from '../../context/pokemonCardsContext.js'

const containerVariants = {
  hidden: {
    opacity: 0,
    translateX: -50,
    transition: { duration: 0.5, delay: 0.2 }
  },
  visible: {
    opacity: 1,
    translateX: 0,
    transition: { duration: 0.5, delay: 0.2 } 
  },
  exit: {
    opacity: 0,
    translateX: 50,
    transition: { duration: 0.3 }
  }
}

const RandomPokemon = ({ allPokemon }) => {
  const [pokemon, setPokemon] = useState({})
  const [pokemonCards, setPokemonCards] = useContext(pokemonCardsContext)
  const [isLoading, setIsLoading] = useState(true)

  const clickHandler = () => {
    setIsLoading(true)
    setPokemon(getRandomPoke(allPokemon))
    setIsLoading(false)
  }

  useEffect(() => {
    setPokemon(getRandomPoke(allPokemon))
    setIsLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonCards])

  return (
    <AnimatePresence exitBeforeEnter>
    {!isLoading 
      ? <motion.div 
          className={styles.container} 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className={styles.imageContainer}>
            <Image 
                src={pokemon.image}
                alt={pokemon.name}
                layout='fill'
                objectFit='contain'
                priority
            />
          </div>
          <div className={styles.details}>
            <button 
              style={{ cursor:"pointer" }}
              onClick={clickHandler}
            >
              &gt;&gt;&gt; Next Pokémon
            </button>
            <h1>{pokemon.name}</h1>
            <p>{pokemon.blurb}</p>
          </div>
        </motion.div>
      : <Loading />
    }
    </AnimatePresence>
  )
}

export default RandomPokemon