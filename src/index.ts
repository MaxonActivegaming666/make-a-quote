import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Home route - HTML
app.get('/', (req, res) => {
  res.type('html').send(`
    
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote Maker with Database</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .container {
      background: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      width: 400px;
      max-height: 90vh;
      overflow-y: auto;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    label {
      display: block;
      margin-top: 10px;
      font-weight: bold;
    }
    input, textarea, button {
      width: 100%;
      margin-top: 6px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 14px;
    }
    button {
      background-color: #007bff;
      color: #fff;
      border: none;
      margin-top: 15px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    .output {
      margin-top: 20px;
      background: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #007bff;
    }
    .quote-item {
      margin-bottom: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Quote Maker</h1>

    <label for="name">Your Name</label>
    <input type="text" id="name" placeholder="Enter your name">

    <label for="quote">Your Quote</label>
    <textarea id="quote" rows="3" placeholder="Write your quote here"></textarea>

    <button onclick="addQuote()">Add Quote</button>

    <div id="quotesList" class="output">
      <h3>All Quotes</h3>
      <div id="quotes"></div>
    </div>
  </div>

  <script>
    const quotes = JSON.parse(localStorage.getItem('quotesDB')) || [];

    function displayQuotes() {
      const quotesDiv = document.getElementById('quotes');
      quotesDiv.innerHTML = '';
      if (quotes.length === 0) {
        quotesDiv.innerHTML = '<p>No quotes yet.</p>';
        return;
      }
      quotes.forEach((entry, index) => {
        quotesDiv.innerHTML += `
          <div class="quote-item">
            <p>"${entry.quote}"</p>
            <p><strong>- ${entry.name}</strong></p>
          </div>
        `;
      });
    }

    function addQuote() {
      const name = document.getElementById('name').value.trim();
      const quote = document.getElementById('quote').value.trim();

      if (!name || !quote) {
        alert('Please enter both name and quote.');
        return;
      }

      quotes.push({ name, quote });
      localStorage.setItem('quotesDB', JSON.stringify(quotes));

      document.getElementById('name').value = '';
      document.getElementById('quote').value = '';
      displayQuotes();
    }

    displayQuotes();
  </script>
</body>
</html>

  `)
})

app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'components', 'about.htm'))
})

// Example API endpoint - JSON
app.get('/api-data', (req, res) => {
  res.json({
    message: 'Here is some sample API data',
    items: ['apple', 'banana', 'cherry'],
  })
})

// Health check
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
