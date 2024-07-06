import express from 'express'
import cors from 'cors'
import pool from './db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express()
const port = 3000
const secretKey = 'very_secret_key';

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

app.get('/', (req, res) => {
  try {
    res.send('Server is running')
  } catch (error) {
    console.error('Error:', error)
  }
})

app.post('/api/signup', async (req, res) => {
  const { name, email, password, is_admin } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, is_admin]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    let isValidPassword;
    if (user.is_admin) {
      isValidPassword = (password === user.password);
    } else {
      isValidPassword = await bcrypt.compare(password, user.password);
    }

   
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

    res.json({ token, user: { id: user.id, email: user.email, name: user.name , is_admin: user.is_admin }});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/users', async (req, res) => {
  const { name, email, password, is_admin } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, is_admin]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.patch('/api/users/:id/admin', async (req, res) => {
  const userId = req.params.id;
  const { is_admin } = req.body;

  try {
    await pool.query('UPDATE users SET is_admin = $1 WHERE id = $2', [is_admin, userId]);
    res.status(200).send('Admin status updated');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1', [userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    let products = result.rows;

    products = products.map(product => ({
      ...product,
      price: parseFloat(product.price)
    }));

    const sortOption = req.query.sort;
    const searchQuery = req.query.title ? req.query.title.toLowerCase() : '';

    if (sortOption === 'priceHighToLow') {
      products.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'priceLowToHigh') {
      products.sort((a, b) => a.price - b.price);
    }

    const filteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery) ||
        product.subtitle.toLowerCase().includes(searchQuery)
    );

    res.json(filteredProducts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
})

app.post('/api/products', async (req, res) => {
  const { title, subtitle, price, imageurl } = req.body;

  if (!title || !subtitle || !price || !imageurl) {
    return res.status(400).send('All fields are required');
  }

  try {
    const result = await pool.query(
      'INSERT INTO products (title, subtitle, price, imageurl) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, subtitle, price, imageurl]
    );
    

    const newProduct = result.rows[0];
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [productId]);

    if (result.rowCount === 0) {
      return res.status(404).send('Product not found');
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/favorites', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM favorites');
    res.json(result.rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
})

app.post('/api/favorites', async (req, res) => {
  try {
    const favorite = req.body;

    const productResult = await pool.query('SELECT * FROM products WHERE id = $1', [favorite.item_id]);
    const product = productResult.rows[0];

    if (product) {
      const result = await pool.query(
        'INSERT INTO favorites (item_id, title, subtitle, price, imageurl) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [favorite.item_id, product.title, product.subtitle, product.price, product.imageurl]
      );
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
})

app.delete('/api/favorites/:favorite_id', async (req, res) => {
  try {
    const favoriteId = parseInt(req.params.favorite_id, 10);
    await pool.query('DELETE FROM favorites WHERE favorite_id = $1', [favoriteId]);
    res.status(204).send();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
})

app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);

  } catch (error) {
    console.log('Error:', error)
  }
})

app.post('/api/orders', async (req, res) => {
  try {
    const order = req.body;

    const orderResult = await pool.query('INSERT INTO orders (total_price) VALUES ($1) RETURNING id', [order.totalPrice]);
    const orderId = orderResult.rows[0].id;

    for (const item of order.items) {
      await pool.query('INSERT INTO order_items (order_id, product_id) VALUES ($1, $2)', [orderId, item.id]);
    }

    res.status(201).json({ message: 'Order created successfully' });
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
