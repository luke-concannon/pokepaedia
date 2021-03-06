import { useContext } from 'react'
import Select from 'react-select'
import pokemonCardsContext from '../../context/pokemonCardsContext.js'
import { goToTop } from '../../lib/funcs.js'


const TypeSelect = ({ allPokemon, options }) => {
  const [pokemonCards, setPokemonCards] = useContext(pokemonCardsContext)

  const changeHandler = (typeName) => {
    goToTop()
    const newSelection = []
      allPokemon.forEach(poke => {
        poke.type.forEach(element => element.type == typeName && newSelection.push(poke))
      })
    setPokemonCards(newSelection)
  }

return (
  <>
    <Select
          placeholder={`Search Pokemon by Type`}
          maxMenuHeight={400}
          options={options}
          instanceId="type-value-select"
          onChange={event => changeHandler(event.value)}
          blurInputOnClear={true}
          focusInputOnMenuOpen={false}
    />
  </>
)
}

export default TypeSelect