const express = require('express');
const path = require('path');
const { Movie, CastMember, CrewMember } = require('./index');

const app = express();
const port = 3000;

app.use(express.json());

//create full CRUD routes on each of my three models

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});