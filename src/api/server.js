import express from 'express'
import { readFile } from 'fs/promises'
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

app.get('/api/products', async (req, res) => {
  try {
    const data = await readFile(new URL('./products.json', import.meta.url), 'utf-8')
    const products = JSON.parse(data)
    res.send(JSON.stringify(products))
  } catch (error) {
    console.error('Error:', error)
  }
})

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'")
  next()
})

app.get('/', (req, res) => {
  res.send('Hello, this is your API!')
})

app.use(express.static('public'))
app.use(cors())

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
