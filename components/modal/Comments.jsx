'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useContext } from 'react'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useGetAllPokemonDb } from '../../data/swr'
import Comment from './Comment'

const Comments = ({ pokedex }) => {
  const [comment, setComment] = useState(0)
  const { allPokemonDb } = useGetAllPokemonDb()

  const pokemon = allPokemonDb.find(poke => poke.pokedex === pokedex)
  const ratings = [...pokemon.ratings]
    .reverse()
    .filter(rating => rating.comment.length !== 0)

  const clickHandlerRight = () => {
    setComment(comment === ratings.length - 1 ? 0 : comment + 1)
  }

  const clickHandlerLeft = () => {
    setComment(comment === 0 ? ratings.length - 1 : comment - 1)
  }

  return (
    <div className="flex h-full w-full flex-row items-center justify-between  space-x-2">
      <ChevronLeftIcon
        className={`${
          !ratings.length || comment === 0 ? 'invisible' : ''
        } w-10 cursor-pointer rounded-full bg-white p-2 drop-shadow-xl hover:scale-105 active:scale-95`}
        onClick={clickHandlerLeft}
      />
      <AnimatePresence>
        {ratings.length ? (
          <Comment
            comment={ratings[comment].comment}
            name={ratings[comment].name}
            rating={ratings[comment].rating}
            date={ratings[comment].createdAt}
          />
        ) : (
          <p>No Comments...</p>
        )}
      </AnimatePresence>
      <ChevronRightIcon
        className={`${
          !ratings.length || comment === ratings.length - 1 ? 'invisible' : ''
        } w-10 cursor-pointer rounded-full bg-white p-2 drop-shadow-xl hover:scale-105 active:scale-95`}
        onClick={clickHandlerRight}
      />
    </div>
  )
}
export default Comments
