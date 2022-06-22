import styles from '../styles/NavBar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { goToTop } from '../lib/funcs'
import pokemonImages from '../data/imgDictionary'
import pokemonCardsContext from '../context/pokemonCardsContext.js'
import NameSelect from './NameSelect'
import TypeSelect from './TypeSelect'
import AbilitySelect from './AbilitySelect'
import ColourSelect from './ColourSelect'
import HabitatSelect from './HabitatSelect'
import StatusSelect from './StatusSelect'
import ShapeSelect from './ShapeSelect'
import RankingSelect from './RankingSelect'

const NavBar = ({ options, allPokemon }) => {
  const [dropshadow, setDropshadow] = useState(false)
  const [dropdown, setDropdown] = useState('name')
  const [pokemonCards, setPokemonCards] = useContext(pokemonCardsContext)
  const router = useRouter()
  const { pokemon } = router.query

  const DROPDOWN_COMPONENTS = {
    'name': <NameSelect options={options.nameOptions} allPokemon={allPokemon}/>,
    'type': <TypeSelect options={options.typeOptions} allPokemon={allPokemon}/>,
    'habitat': <HabitatSelect options={options.habitatOptions} allPokemon={allPokemon}/>,
    'colour': <ColourSelect options={options.colourOptions} allPokemon={allPokemon}/>,
    'shape': <ShapeSelect options={options.shapeOptions} allPokemon={allPokemon}/>,
    'ability': <AbilitySelect options={options.abilityOptions} allPokemon={allPokemon}/>,
    'status': <StatusSelect options={options.statusOptions} allPokemon={allPokemon}/>,
    'rank': <RankingSelect allPokemon={allPokemon} />
  }

  const clickHandler = (dropdown) => {
      setDropdown(dropdown)
      setPokemonCards([])
  }

  useEffect(() => {
    goToTop()
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            setDropshadow(true);
        } else {
            setDropshadow(false);
        }
    })
  }, [pokemonCards])

  return (
       <header className={`${styles.container} ${dropshadow && styles.dropShadow}`}>
              <div className={styles.title}>
                <span className={styles.logo} >
                    <Link href="/"><a>
                      <Image 
                        src={pokemonImages.pichu}
                        alt='The Pokemon Encyclopaedia'
                        quality={100}
                        height={100}
                        width={100}
                        priority
                        onClick={() => clickHandler('name')}
                      />
                    </a></Link>
                </span>
                <div className={styles.titleText}>
                <h1>PokéPaedia</h1>
                <h3>An Encyclopaedia of Pokémon</h3>
                </div>
             </div>
          <div className={styles.navDropdown}>
            <nav className={styles.nav}>
              <Link href="/">
                <ul>
                  <li className={dropdown === "name" ? styles.active : undefined} onClick={() => clickHandler('name')}>
                    &gt;Name
                  </li>
                  <li className={dropdown === "type" ? styles.active : undefined} onClick={() => clickHandler('type')}>
                    &gt;Type
                  </li>
                  <li className={dropdown === "rank" ? styles.active : undefined} onClick={() => clickHandler('rank')}>
                    &gt;Rank
                  </li>
                  <li className={dropdown === "habitat" ? styles.active : undefined} onClick={() => clickHandler('habitat')}>
                    &gt;Habitat
                  </li>
                  <li className={dropdown === "colour" ? styles.active : undefined} onClick={() => clickHandler('colour')}>
                    &gt;Colour
                  </li>
                  <li className={dropdown === "shape" ? styles.active : undefined} onClick={() => clickHandler('shape')}>
                    &gt;Shape
                  </li>
                  <li className={dropdown === "evolution" ? styles.active : undefined} onClick={() => clickHandler('status')}>
                    &gt;Status
                  </li>
                  <li className={dropdown === "ability" ? styles.active : undefined} onClick={() => clickHandler('ability')}>
                    &gt;Ability
                  </li>
                </ul>
              </Link>
            </nav>
            <div className={styles.dropdownContainer}>
               {!pokemon ? DROPDOWN_COMPONENTS[dropdown] : <h1>Back to List</h1>}
            </div>
         </div>
       </header>
  )
  }

export default NavBar