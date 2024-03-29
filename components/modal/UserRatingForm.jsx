'use client'

import { useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import userContext from '../../context/userContext'
import { getOrdinalNumbers } from '../../utils/helpers'
import { useGetAllPokemonDb } from '../../data/swr'
import ReactStars from 'react-rating-stars-component'

const buttonVariants = {
  hover: {
    backgroundColor: '#FFA500',
    transition: { duration: 0.1 },
  },
  tap: { scale: 1 },
}

const UserRatingForm = ({
  pokedex,
  formData,
  setFormData,
  setShowRatingForm,
}) => {
  const [user, setUser] = useContext(userContext)
  const { allPokemonDb, mutateAllPokemonDb } = useGetAllPokemonDb()

  const handleFormChange = e => {
    if (typeof e === 'number') {
      setFormData({
        ...formData,
        rating: e,
      })
    } else {
      const { name, value } = e.target
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleFormSubmit = async e => {
    e.preventDefault()
    if (!formData.comment) {
      alert(
        "Whoa, holdup! You haven't told us how you feel about this pokemon!"
      )
    } else {
      setShowRatingForm(false)

      const optimisticNoRank = allPokemonDb.map(poke => {
        if (poke.pokedex === pokedex) {
          const newRatings = [
            ...poke.ratings,
            {
              name: user,
              comment: formData.comment,
              pokedex: poke.pokedex,
              rating: formData.rating,
            },
          ]
          const newOverall =
            newRatings.reduce((total, current) => total + current.rating, 0) /
            newRatings.length
          const newOverallRating = Number(newOverall.toFixed(1))

          return {
            ...poke,
            ratings: newRatings,
            ratingOverall: newOverallRating,
          }
        }
        return poke
      })

      const sortedRanking = optimisticNoRank.sort(
        (a, b) =>
          b.ratingOverall - a.ratingOverall ||
          b.ratings.length - a.ratings.length ||
          a.pokedex - b.pokedex
      )

      const optimisticWithRank = sortedRanking.map(poke => ({
        ...poke,
        ranking: getOrdinalNumbers(sortedRanking.indexOf(poke) + 1),
      }))

      const payload = {
        pokedex: pokedex,
        name: user,
        comment: formData.comment,
        rating: formData.rating,
      }

      try {
        await mutateAllPokemonDb(() => optimisticWithRank, false)
        await axios.post('/api/ratings', payload)
      } catch (error) {
        throw new Error(error)
      }
    }
  }

  const removeForm = () => {
    setShowRatingForm(false)
  }

  return (
    <AnimatePresence mode="wait">
      <div className="flex h-full w-full flex-col justify-center rounded-lg px-10 text-center">
        <div className="flex flex-row items-center justify-center space-x-2">
          <h3 className="text-base">Your Rating:</h3>
          <div className="flex flex-col justify-center align-middle">
            <ReactStars
              size={30}
              value={formData.rating}
              color="gray"
              onChange={e => handleFormChange(e)}
            />
          </div>
        </div>
        <form
          className="align-middle"
          action="/api/ratings"
          method="post"
          onSubmit={e => e.preventDefault()}
        >
          <textarea
            type="text"
            placeholder="Your Comment..."
            className="mt-4 h-[200px] w-full rounded-lg p-4 font-mono text-lg drop-shadow-lg"
            name="comment"
            value={formData.comment}
            required
            onChange={e => handleFormChange(e)}
          />
          <motion.button
            type="submit"
            variants={buttonVariants}
            className="mt-4 w-full rounded-lg bg-[#47a8bd] p-2 text-xl text-white"
            whileHover="hover"
            whileTap="tap"
            onClick={handleFormSubmit}
          >
            Submit
          </motion.button>
        </form>
      </div>
      <p
        className="cursor-pointer p-4 text-xs hover:font-semibold"
        onClick={removeForm}
      >
        &larr; Back to comments...
      </p>
    </AnimatePresence>
  )
}
export default UserRatingForm
