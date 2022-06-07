import styles from '../styles/NavBar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import DropdownName from './DropdownName'
import DropdownType from './DropdownType'
import DropdownHabitat from './DropdownHabitat'
import DropdownColour from './DropdownColour'
import { getRandomPoke } from '../lib/utils'


const NavBar = ({ allPokemon, setSelection }) => {
  const router = useRouter()
  const { category } = router.query
  const { name } = getRandomPoke(allPokemon)

  const dropdowns = {
    'all': null,
    'by-name': <DropdownName allPokemon={allPokemon} setSelection={setSelection}/>,
    'by-type': <DropdownType allPokemon={allPokemon} setSelection={setSelection}/>,
    'by-habitat': <DropdownHabitat allPokemon={allPokemon} setSelection={setSelection}/>,
    'by-colour': <DropdownColour allPokemon={allPokemon} setSelection={setSelection}/>,
  }

  const clickHandler = (selection) => {
    setSelection(selection)
  }

  return (
       <header className ={styles.container}>
          <Link href="/">
              <a>
              <div className={styles.title}>
                <span className={styles.logo}>
                    <Image 
                        src={`/images/pokemon/${name.toLowerCase()}.png`}
                        alt="PokéPaedia"
                        width={120}
                        height={120}
                    />
                </span>
                <div className={styles.titleText}>
                <h1>PokéPaedia</h1>
                <h3>An Encyclopaedia of Pokémon</h3>
                </div>
             </div>
             </a>
          </Link>
          <div className={styles.navDropdown}>
            <nav className={styles.nav}>
              <ul>
                <li className={router.asPath == "/pokemon/by-name" ? styles.active : undefined} >
                  <Link href={"/pokemon/by-name"}>&gt;&gt;By Name</Link>
                </li>
                <li className={router.asPath == "/pokemon/by-type" ? styles.active : undefined} >
                  <Link href={"/pokemon/by-type"}>&gt;&gt;By Type</Link>
                </li>
                <li className={router.asPath == "/pokemon/by-habitat" ? styles.active : undefined} >
                  <Link href={"/pokemon/by-habitat"}>&gt;&gt;By Habitat</Link>
                </li>
                <li className={router.asPath == "/pokemon/by-colour" ? styles.active : undefined} >
                  <Link href={"/pokemon/by-colour"}>&gt;&gt;By Colour</Link>
                </li>
                {/* <li className={router.asPath == "/pokemon/by-rating" ? styles.active : undefined} >
                  <Link href={"/pokemon/by-rating"}>&gt;&gt;By Rating</Link>
                </li> */}
                <button className={styles.login}>LOGIN</button>
              </ul>
            </nav>
              {dropdowns[category]}
            </div>
       </header>
  )
  }

export default NavBar