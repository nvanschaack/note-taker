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
//readFile is reading data as a string (because thats how it was written to the file)
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      //converting data into an array called parsedData so that the client side can extract content (you can't extract content from a string- it has to be an object or an array)
      const parsedData = JSON.parse(data)
      console.log(parsedData[0]);
      res.json(parsedData);
    }
  });

});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  const newNote = {
    title,
    text,
    // add an id: property and have it add a unique id
    id: uuidv4()
  }
//parsedData = data thats been converted from a string into an array/object
  const parsedData = db
  parsedData.push(newNote)
//turning parsedData from an array to a string
  fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 2), (error, result) => {
    if (error) {
      console.error(error)
    } else {
      console.log('notes written')
      console.log(result);
      res.json(result)
    }
  })

});
// DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
app.delete('/api/notes/:id', (req, res) => {
  console.log(req.params.id)
  const currentDataArray = db
  console.log(currentDataArray);
  const filteredArray = [];

  for (let i = 0; i < currentDataArray.length; i++) {
    const element = currentDataArray[i];
    if (element.id !== req.params.id) {
      filteredArray.push(element)
    }
  }

  fs.writeFile('./db/db.json', JSON.stringify(filteredArray, null, 2), (error, result) => {
    if (error) {
      console.error(error)
    } else {
      console.log('notes written')
      res.json('item deleted')

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
});