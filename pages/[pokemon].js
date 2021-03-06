import Head from 'next/head'
import Detail from '../components/detail/Detail'
import { capitalise } from '../lib/funcs'
import data from '../data/all.json'
import Footer from '../components/layout/Footer'
import NavBar from '../components/layout/NavBar'

export const getStaticPaths = async () => {
  const pokemonNames = data.pokemon.map(poke => poke.name)

  const paths = pokemonNames.map(poke => ({
    params: { 
      pokemon: poke.toLowerCase()
    }
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
    const onePokemon = data.pokemon.find(poke => poke.name === capitalise(params.pokemon))

    return {
      props : { onePokemon }
    }
}

 const PokemonDetail = ({ onePokemon }) => {

  return (
    <>
      <Head>
        <title>{onePokemon.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar options={"backToList"}/>
        <Detail pokemon={onePokemon}/>
        <Footer />
      </main>
    </>
  )
}

export default PokemonDetail