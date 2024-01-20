import express from 'express'
import { readFile, writeFile } from 'fs/promises'
import cors from 'cors'

const app = express()
const port = 3000

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

const calculateFavoriteId = (favorites) => {
  return favorites.map((favorite, index) => ({ ...favorite, favorite_id: index + 1 }))
}

app.get('/api/products', async (req, res) => {
  try {
    const data = await readFile(new URL('./products.json', import.meta.url), 'utf-8')
    let products = JSON.parse(data)

    const sortOption = req.query.sort
    const searchQuery = req.query.title ? req.query.title.toLowerCase() : ''

    if (sortOption === 'priceHighToLow') {
      products.sort((a, b) => b.price - a.price)
    } else if (sortOption === 'priceLowToHigh') {
      products.sort((a, b) => a.price - b.price)
    }

    const filteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery) ||
        product.subtitle.toLowerCase().includes(searchQuery)
    )

    res.json(filteredProducts)
  } catch (error) {
    console.error('Error:', error)
  }
})

app.get('/api/favorites', async (req, res) => {
  try {
    const favoritesData = await readFile(new URL('./favorites.json', import.meta.url), 'utf-8')
    const favorites = JSON.parse(favoritesData)
    res.json(favorites)
  } catch (error) {
    console.log('Error:', error)
  }
})

app.post('/api/favorites', async (req, res) => {
  try {
    const favorite = req.body
    const favoritesData = await readFile(new URL('./favorites.json', import.meta.url), 'utf-8')
    const favorites = JSON.parse(favoritesData)
    if (favorite.favorite_id) {
      favorites.push(favorite)
    } else {
      const lastFavorite = favorites[favorites.length - 1]
      const newFavorite = {
        favorite_id: lastFavorite ? lastFavorite.favorite_id + 1 : 1,
        item_id: favorite.item_id
      }
      favorites.push(newFavorite)
    }
    await writeFile(new URL('./favorites.json', import.meta.url), JSON.stringify(favorites))
    res.json(favorites)
  } catch (error) {
    console.error('Error:', error)
  }
})

app.delete('/api/favorites/:favorite_id', async (req, res) => {
  try {
    const favoriteIdDelete = parseInt(req.params.favorite_id, 10)
    const favoritesData = await readFile(new URL('./favorites.json', import.meta.url), 'utf-8')
    let favorites = JSON.parse(favoritesData)

    const indexToDelete = favorites.findIndex(
      (favorite) => favorite.favorite_id === favoriteIdDelete
    )
    if (indexToDelete !== -1) {
      favorites.splice(indexToDelete, 1)
      favorites = calculateFavoriteId(favorites)
      await writeFile(new URL('./favorites.json', import.meta.url), JSON.stringify(favorites))
      res.json(favorites)
    }
  } catch (error) {
    console.error('Error:', error)
  }
})

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'")
  next()
})
app.use(cors())

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
