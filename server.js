const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your-username',
  password: 'your-password',
  database: 'dummy_website_db'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Dummy payment route
app.post('/dummy-payment', (req, res) => {
  const { userId, courseId, amount } = req.body;
  // Simulate payment processing
  setTimeout(() => {
    const paymentId = 'DUMMY12345';
    const status = 'success';

    // Insert transaction into the database
    const sql = 'INSERT INTO transactions (user_id, course_id, amount, payment_id, status) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [userId, courseId, amount, paymentId, status], (err, result) => {
      if (err) {
        console.error('Error inserting transaction:', err);
        res.status(500).send('Payment processing failed');
        return;
      }
      res.json({ success: true, message: 'Payment processed successfully!', paymentId });
    });
  }, 2000);
});

// Fetch blog posts
app.get('/blog-posts', (req, res) => {
  const sql = 'SELECT * FROM blog_posts';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching blog posts:', err);
      res.status(500).send('Failed to fetch blog posts');
      return;
    }
    res.json(results);
});

// Fetch courses
app.get('/courses', (req, res) => {
  const sql = 'SELECT * FROM courses';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching courses:', err);
      res.status(500).send('Failed to fetch courses');
      return;
    }
    res.json(results);
  });
});

// Fetch transactions for a user
app.get('/transactions/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = 'SELECT * FROM transactions WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching transactions:', err);
      res.status(500).send('Failed to fetch transactions');
      return;
    }
    res.json(results);
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
