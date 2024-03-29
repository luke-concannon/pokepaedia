import prisma from '../../prisma/client'

const ratingsApiHandler = async (req, res) => {
  const { rating, pokedex, name, comment } = req.body

  const newRating = await prisma.rating.create({
    data: {
      rating: rating,
      name: name,
      comment: comment,
      pokemon: { connect: { pokedex: pokedex } },
    },
  })

  const allRatings = await prisma.rating.findMany({
    where: {
      pokedex: pokedex,
    },
    select: {
      rating: true,
    },
  })

  const avg =
    allRatings.reduce((total, current) => total + current.rating, 0) /
    allRatings.length
  const average = Number(avg.toFixed(1))

  const updatePokemon = await prisma.pokemon.update({
    where: {
      pokedex: pokedex,
    },
    data: {
      ratingOverall: average,
    },
    select: {
      pokedex: true,
      name: true,
      ratingOverall: true,
      ratings: true,
    },
  })

  console.log(
    `You gave ${updatePokemon.name} ${rating} stars! ${updatePokemon.name}'s average rating is now ${updatePokemon.ratingOverall} from ${allRatings.length} ratings!`
  )
  return res.status(200).json(updatePokemon)
}

export default ratingsApiHandler
