const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const app = express();
const PORT = 5000;
const cors = require('cors');


app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'] 
}));
app.use(bodyParser.json()); 


const client = new Client({
  user: 'postgres',      
  host: 'localhost',     
  database: 'BlogDB',    
  password: '489925Jmio:)!!',       
  port: 5432,            
});

client.connect(err => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

app.post('/signin', async (req, res) => {
  const { user_id, password } = req.body;
  const result = await client.query(
    'SELECT * FROM users WHERE user_id = $1 AND password = $2',
    [user_id, password]
  );
  if (result.rows.length > 0) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});


app.post('/signup', async (req, res) => {
  const { user_id, password, name } = req.body;
  const existingUser = await client.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
  await client.query(
    'INSERT INTO users (user_id, password, name) VALUES ($1, $2, $3)',
    [user_id, password, name]
  );
});

app.get('/', async (req, res) => {
    const result = await client.query('SELECT * FROM blogs ORDER BY date_created DESC');
    res.json(result.rows);
});

app.get('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const result = await client.query('SELECT * FROM blogs WHERE blog_id = $1', [postId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching post:', error);
  }
});

app.post('/', async (req, res) => {
  const { author, title, body } = req.body;
  const result = await client.query(
    'INSERT INTO blogs (title, body, creator_name, date_created) VALUES ($1, $2, $3, NOW()) RETURNING *',
    [title, body, author]
  );
});

app.put('/:id', async (req, res) => {
  const { title, body } = req.body;
  const { author } = req.body; 
  const postId = req.params.id;
  const post = await client.query('SELECT * FROM blogs WHERE blog_id = $1', [postId]);
  const result = await client.query(
    'UPDATE blogs SET title = $1, body = $2 WHERE blog_id = $3 RETURNING *',
    [title, body, postId]
  );
});

app.delete('/:id', async (req, res) => {
  const { id } = req.params;
    const result = await client.query('DELETE FROM blogs WHERE blog_id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
});


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
