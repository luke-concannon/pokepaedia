import { useState } from 'react'
import { motion } from "framer-motion"
import { useGetAllPokemonDb } from '../../lib/swr/useGetAllPokemonDb'
import CardStats from './CardStats'
import CardAbout from './CardAbout'
import CardTypes from './CardTypes'
import styles from './Card.module.css'
import CardRating from './CardRating'
import CardImage from './CardImage'
import RatingModal from '../modal/Modal'

const CARD_COLOURS = {
    'red': {backgroundColor: '#AB1E23', color: 'white'},
    'blue': {backgroundColor:'#1452E2', color: 'white'},
    'yellow': {backgroundColor:'#E3E32A', color: 'black'},
    'green': {backgroundColor:'#147B3E', color: 'white'},
    'black':{backgroundColor:'#313639', color: 'white'},
    'brown': {backgroundColor:'#994022', color: 'white'},
    'purple': {backgroundColor:'#5E2E87', color: 'white'},
    'gray': {backgroundColor:'#D1D1E0', color: 'black'},
    'white': {backgroundColor:'#f5f5f5', color: 'black'},
    'pink': {backgroundColor:'#A72B6E', color: 'white'}
    }

const Card = ({ pokemon }) => {
  const [cardFace, setCardFace] = useState('image')
  const [isOpen, setIsOpen] = useState(false)
  const { allPokemonDb, isLoading, isError } = useGetAllPokemonDb()

  const { 
    pokedex, 
    hp, 
    image, 
    name, 
    blurb, 
    colour, 
    happiness, 
    ability, 
    shape, 
    habitat, 
    attack, 
    defense, 
    specialAttack, 
    speed, 
    weight, 
    specialDefense, 
    height, 
    experience, 
    type 
  } = pokemon

  const { backgroundColor, color } = CARD_COLOURS[colour]

  const pokemonRatings = allPokemonDb.find(poke => poke.pokedex === pokedex)
  const { ratingOverall, ratings, ranking } = pokemonRatings
  
  const clickHandler = (component) => {
      setCardFace(component) 
  }

  const cardFaceComponent = ({
      about: <CardAbout 
               name={name} 
               image={image} 
               blurb={blurb} 
               pokedex={pokedex} 
               ratingOverall={ratingOverall} 
              />,
      types: <CardTypes 
               name={name} 
               image={image} 
               type={type} 
               attack={attack} 
               defense={defense} 
               specialAttack={specialAttack} 
               speed={speed} 
               weight={weight} 
               specialDefense={specialDefense} 
               height={height} 
               experience={experience} 
              />,
      ability: <CardStats name={name} image={image} hp={hp} happiness={happiness} shape={shape} habitat={habitat} ability={ability} />,
      rate: <CardRating name={name} image={image} ratingOverall={ratingOverall} ratings={ratings} pokedex={pokedex} />,
      image: <CardImage name={name} image={image} ratingOverall={ratingOverall} />,
  })

  return (
    <>
    <div style={{border:`solid 5px ${backgroundColor}`}} className={styles.container} >
      <motion.div 
        animate={{ scale: 2 }} 
        transition={{ duration: 0.5 }} 
      />
      <div className={styles.topDetails}>
          <span className={styles.rank}><h4>Rank:</h4><h3>{ranking}</h3></span>
        <div className={styles.imageText}>
          <h4>Stars:</h4><h3>{ratingOverall}</h3>
          <h4>Ratings:</h4><h3>{ratings.length}</h3>
          <h4>Pokédex:</h4><h3>{pokedex}</h3>
        </div>
      </div>
      {cardFaceComponent[cardFace]}
      <div style={{backgroundColor:`${backgroundColor}`}} className={styles.footer}>
        <ul>
          <li 
            className={cardFace === 'image' ? styles.active : undefined} 
            style={{backgroundColor: `${backgroundColor}`, color:`${color}`, cursor:`pointer`}} 
            onClick={() => clickHandler('image')}
            >
            Image
          </li>
          <li 
            className={cardFace === 'about' ? styles.active : undefined} 
            style={{backgroundColor: `${backgroundColor}`, color:`${color}`, cursor:`pointer`}} 
            onClick={() => clickHandler('about')}
            >
            About
          </li>
          <li 
            className={cardFace === 'types' ? styles.active : undefined} 
            style={{backgroundColor: `${backgroundColor}`, color:`${color}`, cursor:`pointer`}} 
            onClick={() => clickHandler('types')}
            >
            Type
          </li>
          <li 
            className={cardFace === 'ability' ? styles.active : undefined} 
            style={{backgroundColor: `${backgroundColor}`, color:`${color}`, cursor:`pointer`}} 
            onClick={() => clickHandler('ability')}
            >
            Ability
          </li>
           <li 
            className={cardFace === 'rate' ? styles.active : undefined} 
            style={{backgroundColor: `${backgroundColor}`, color:`${color}`, cursor:`pointer`}} 
            onClick={() => setIsOpen(true)}
            >
            Rate
          </li>
        </ul>
      </div>
    </div>
    <RatingModal handleClose={() => setIsOpen(false)} isOpen={isOpen} totalRatings={ratings.length} ratingOverall={ratingOverall} image={image} name={name} pokedex={pokedex} blurb={blurb} />
  </>
  )
  }

export default Card
  