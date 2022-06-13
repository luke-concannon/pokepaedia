import { useEffect, useState, useContext } from 'react'
import Select from 'react-select'
import { getAbilityOptions } from '../lib/utils'
import styles from '../styles/Dropdown.module.css'
import allPokemonContext from '../context/allPokemonContext'
import pokemonCardsContext from '../context/pokemonCardsContext'


const DropdownAbility = () => {
    const [allPokemon, setAllPokemon] = useContext(allPokemonContext)
    const [pokemonCards, setPokemonCards] = useContext(pokemonCardsContext)
    const [options, setOptions] = useState({})

useEffect(() => {
  setOptions(getAbilityOptions(allPokemon))
}, []);

const changeHandler = (abilityName) => {
  const newSelection = []
    allPokemon.forEach(poke => {
      poke.ability.forEach(element => element.ability == abilityName && newSelection.push(poke))
    })
  setPokemonCards(newSelection)
}

return (
  <div className={styles.container}>
    <Select
          placeholder={`Search Pokemon by Ability`}
          maxMenuHeight={400}
          options={options}
          instanceId="ability-value-select"
          onChange={event => changeHandler(event.value)}
        />
  </div>
)
}

export default DropdownAbility