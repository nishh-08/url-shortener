const express = require('express');
const router = express.Router();
const db = require('./database');
const { nanoid } = require('nanoid');

// Shorten a URL
router.post('/shorten', async (req, res) => {
  const { original_url, custom_code } = req.body;

  if (!original_url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const short_code = custom_code || nanoid(6);

  if (custom_code) {
    const exists = await new Promise((resolve) => {
      db.get('SELECT * FROM urls WHERE short_code = ?', [short_code], (err, row) => {
        resolve(row);
      });
    });
    if (exists) {
      return res.status(400).json({ error: 'Custom code already taken. Try another.' });
    }
  }

  db.run(
    'INSERT INTO urls (original_url, short_code) VALUES (?, ?)',
    [original_url, short_code],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({
        original_url,
        short_code,
        short_url: `http://localhost:5000/${short_code}`,
      });
    }
  );
});


// Get analytics for a short code
router.get('/analytics/:short_code', (req, res) => {
  const { short_code } = req.params;

  db.get(
    'SELECT * FROM urls WHERE short_code = ?',
    [short_code],
    (err, url) => {
      if (err || !url) {
        return res.status(404).json({ error: 'URL not found' });
      }

      db.all(
        'SELECT clicked_at FROM clicks WHERE short_code = ? ORDER BY clicked_at DESC',
        [short_code],
        (err, clicks) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' });
          }
          res.json({
            original_url: url.original_url,
            short_code,
            total_clicks: clicks.length,
            clicks,
          });
        }
      );
    }
  );
});


// Redirect to original URL
router.get('/:short_code', (req, res) => {
  const { short_code } = req.params;

  db.get(
    'SELECT * FROM urls WHERE short_code = ?',
    [short_code],
    (err, row) => {
      if (err || !row) {
        return res.status(404).json({ error: 'URL not found' });
      }

      // Record the click
      db.run(
        'INSERT INTO clicks (short_code) VALUES (?)',
        [short_code]
      );

      res.redirect(row.original_url);
    }
  );
});
module.exports = router;