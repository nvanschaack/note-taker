const express = require('express')
const path = require ('path')
const app = express()
const PORT = 3000

// The following HTML routes should be created:

//static files are being served from the public folder
app.use(express.static('public'));
// GET /notes should return the notes.html file.
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});
// GET * should return the index.html file.
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);
//tell the server it needs to be listening for input
app.listen(PORT, () => {
    console.log(`The server is listening at http://localhost:${PORT}`)
})
// The following API routes should be created:

// GET /api/notes should read the db.json file and return all saved notes as JSON.

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).


// THE DB.JSON will be used to store and retrieve notes using the fs module.