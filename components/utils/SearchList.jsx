'use client'

import { useContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import Card from '../card/Card'
import pokemonCardsContext from '../../context/pokemonCardsContext.js'

const SearchList = () => {
  const [pokemonCards, setPokemonCards] = useContext(pokemonCardsContext)

  return (
    <div className="m-auto mt-[5vh] mb-[15vh] flex max-w-[1920px] flex-row flex-wrap px-[3vw]">
      <AnimatePresence exitBeforeEnter>
        {pokemonCards.map(poke => (
          <Card key={poke.pokedex} pokemon={poke} />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default SearchList
