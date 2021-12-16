const { response } = require('express');
const express = require('express');
const { request } = require('http');
const path = require('path');
const { Movie, CastMember, CrewMember } = require('./index');

const app = express();
const port = 3000;

app.use(express.static('__dirname', 'public'));
app.use(express.json());

//create full CRUD routes on each of my three models
  //Read
//find all instances of Movie Model
app.get('/movies', async (request, response) => { //works w/ pics
  const allMovies = await Movie.findAll();
  response.json(allMovies);
});

//find an instance of movie by the primary key/id
app.get('/movies/:id', async (request, response) => { //works w/ pic
  const thisMovie = await Movie.findByPk(request.params.id);
  response.json(thisMovie);
});

//find an instance of the movie model by the title
app.get('/movie-title/:title', async (request, response) => { //works w/ pic
  const thisMovie = await Movie.findOne({where: {title: request.params.title}});
  response.json(thisMovie);
});

//find all instances of the Movie model by the year
app.get('/movie-yr/:year', async (request, response) => { //works w/ pic
  const thisMovie = await Movie.findAll({where: {year: request.params.year}})
  response.json(thisMovie);
});

//find all instances of the Movie model by the genre 
app.get('/movie-genre/:genre', async (request, response) => { //works w/ pic
  const thisMovie = await Movie.findOne({where: {genre: request.params.genre}});
  response.json(thisMovie);
});

//find all instances of the Movie model by the rating
app.get('/movie-rating/:rating', async (request, response) => { //woks w/ pic
  const thisMovie = await Movie.findAll({where: {rating: request.params.rating}})
  response.json(thisMovie);
});


//find all instances of the  CastMember model
app.get('/cast', async (request, response) => { //works w/ pic
  const fullCast = await CastMember.findAll();
  response.json(fullCast);
});

//find an instance of the CastMember model by the primary key/id
app.get('/cast/:id', async (request, response) => { //works
  const thisCastMember = await CastMember.findOne({where: {id: request.params.id}});
  response.json(thisCastMember);
});

//find and instance of the CastMember model by the name
app.get('/cast-name/:name', async (request, response) => { //works w/ pic
  const thisCastMember =  await CastMember.findOne({where: {name: request.params.name}});
  response.json(thisCastMember)
});

//find and instance of the CastMember model by the part
app.get('/cast-part/:part', async (request, response) => { //works w/ pic
  const thisCastMember = await CastMember.findOne({where: {part: request.params.part}});
  response.json(thisCastMember);
});

//find all instances of the CastMember model by the salary
app.get('/cast-salary/:salary', async (request, response) => {  //works w pic
  const thoseCastMembers = await CastMember.findAll({where: {salary: request.params.salary}});
  response.json(thoseCastMembers);
});

//find all instances of the CrewMember Model
app.get('/crew', async (request, response) => { //works w/ pic
  const fullCrew = await CrewMember.findAll();
  response.json(fullCrew);
});

//find and instance of the CrewMember model by the primary key/id
app.get('/crew/:id', async (request, response) => { //works w/ pic
  const thisCrewMember = await CrewMember.findOne({where: {id: request.params.id}});
  response.json(thisCrewMember);
});

//find an instance of the CrewMember model by the name
app.get('/crew-name/:name', async (request, response) => { //works w/ pic
  const thisCrewMember = await CrewMember.findOne({where: {name: request.params.name}});
  response.json(thisCrewMember);
});

//find an instance of the CrewMember model by the role
app.get('/crew-role/:role', async (request, response) => { //works w/ pic
  const thisCrewMember = await CrewMember.findOne({where: {role: request.params.role}});
  response.json(thisCrewMember);
});

//find an instance of the CrewMember model by the salary
app.get('/crew-salary/:salary', async (request, response) => { //works w/ pic
  const thisCrewMember = await CrewMember.findOne({where: {salary: request.params.salary}});
  response.json(thisCrewMember);
});

//find an instance of the CrewMember model by the department
app.get('/crew-department/:department', async (request, response) => { //works w/ pic
  const thisCrewMember = await CrewMember.findOne({where: {department: request.params.department}});
  response.json(thisCrewMember);
});

  //Update
//update a Movie
app.put('/movies/:id', async (request, response) => {
  let updatedMovie = await Movie.update(request.body, 
    {where : {id: request.params.id}
  });
  response.send("Update successful!")
});
//update a CastMember
app.put('/cast/:id', async (request, response) => {
  let updatedCastMember = await CrewMember.update(request.body, 
    {where: {id: request.params.id} 
  });
  response.send("Update successful!")
});
//update a CrewMember  
app.put('/crew/:id', async (request, response) => {
  let updatedCrewMember = await CrewMember.update(request.body, {
    where: {id: request.params.id}
  });
  response.send("Update successful!");
});

  //Delete
//Delete a movie
app.delete('/movies/:id', async (request, response) => { //works!
  const deleted = await Movie.destroy( 
    {where: {id: request.params.id}
  });
  response.send(deleted ? "Movie Deleted Successfully!" : "Movie Still Exists in Database")
});
//delete CastMember
  app.delete('/cast/:id', async (request, response) => { //works!
    const deleted = await CastMember.destroy(
      {where: {id: request.params.id}
    });
    response.send(deleted ? "Cast Member Deleted Successfully!" : "Cast Member Still Exists in Database")
  });  
//delete CrewMember
app.delete('/crew/:id', async (request, response) => { //works!
  const deleted = await CrewMember.destroy(
    {where: {id: request.params.id}
  });
  response.send(deleted ? "Crew Member Deleted Successfully!" : "Crew Member Still Exists in Database")
});

  //Create
//create a new movie
app.post('/movies', async (request, response) => {
  let newMovie = await Movie.create(request.body);
  response.send("New Movie Created!");
});
//create a new Cast Member
app.post('/cast', async (request, response) => {
  let newCastMember = await CastMember.create(request.body)
  response.send("New Cast Member Created!")
});

//create a new Crew Member   //wondering if I can create a cast or crew member like this
app.post('/crew', async (request, response) => {
  let newCrewMember = await CrewMember.create(request.body)
  response.send("New Crew Member Created!")
});


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});