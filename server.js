const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000
const db = require('./db/db.json')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

// The following HTML routes should be created:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//static files are being served from the public folder
app.use(express.static('public'));

// The following API routes should be created:

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
  res.json(db)
})

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  const newNote = {
    title,
    text,
// add an id: property and have it add a unique id
    id: uuidv4()
  }

  const parsedData = db
  parsedData.push(newNote)

  fs.writeFile('./db/db.json', JSON.stringify(parsedData), (error, result)=> {
    if (error) {
      console.error(error)
    } else {
      console.log('notes written')
      res.json(result)
    }
  })

})


// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});
// GET * should return the index.html file.
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);


//listen for the server
app.listen(PORT, () => {
  console.log(`The server is listening at http://localhost:${PORT}`)
})