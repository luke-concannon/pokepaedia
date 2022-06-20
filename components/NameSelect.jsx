import Select from 'react-select'
import { useContext } from 'react'
import pokemonCardsContext from '../lib/context/pokemonCardsContext.js'

const NameSelect = ({ allPokemon, options }) => {
  const [pokemonCards, setPokemonCards] = useContext(pokemonCardsContext)

  const changeHandler = (selection) => {
      const pokedexList = selection.map(element => element.value)
      const newSelection = []
      for (let i = 0; i < pokedexList.length; i++) {
        newSelection.push(allPokemon.find(({ pokedex }) => pokedex === pokedexList[i]))
      }
      setPokemonCards(newSelection.slice(0).reverse())
  }

  return (
    <>
      <Select
            isMulti
            maxMenuHeight={400}
            placeholder={`Search Pokemon by Name`}
            options={options}
            instanceId="name-value-select"
            onChange={event => changeHandler(event)}
            />
    </>
  )
}

export default NameSelect