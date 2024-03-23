const nt = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the feedback
nt.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
nt.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNotes = {
      title,
      text,
      text_id: crypto.randomUUID(),
    };

    readAndAppend(newNotes, './db/db.json');

    const response = {
      status: 'success',
      body: newNotes,
    };

    res.json(response);
  } else {
    res.json('Error in posting notes');
  }
});

module.exports = nt;