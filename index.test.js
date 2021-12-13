const {sequelize} = require('./db');
const { Movie, CastMember, CrewMember } = require('./index');


describe('Movie database', () => {
  beforeAll(async() => {
    await sequelize.sync({force:true});

    const testMovies = [
      {
        title: 'Wanted',
        year: 2008, 
        genre: 'Action', 
        rating: 'R', 
        director: 'Kay Cannon'
      },
      {
        title: 'Cinderella', 
        year: 2021,
        genre: 'Family', 
        rating: 'PG', 
        director: 'Kay Cannon'
      },
      {
        title: 'Life', 
        year: 1999,
        genre: 'Dramedy', 
        rating: 'R', 
        director: 'Ted Demme'
      }
    ]
    
    const testCastMembers = [
      {
        name: 'James McAvoy', 
        part: 'Wesley',  
        salary: 20000000000
      },
      {
        name: 'Angelina Jolie', 
        part: 'Fox', 
        salary: 20000000000
      },
      {
        name: 'Morgan Freeman', 
        part: 'Sloan', 
        salary: 20000000000
      },
      {
        name: 'Camila Cabello', 
        part: 'Cinderella', 
        salary: 20000000000
      },
      {
        name: 'Eddie Murphy', 
        part: 'Rayford Gibson', 
        salary: 20000000000
      },
      {
        name: 'Martin Lawrence', 
        part: 'Claude Banks', 
        salary: 20000000000
      }
    ]
    
    const testCrewMembers = [
      {
        name: 'Michael Brandt', 
        role: 'writer', 
        salary: 20000000000, 
        department: 'Production'
      },
      {
        name: 'Geoffrey Simpson', 
        role: 'cinematographer', 
        salary: 10000000000, 
        department: 'Photography'
      },
      {
        name: 'Ellen Mirojnick', 
        role: 'costume designer', 
        salary: 20000000000, 
        department: 'Costume Design'
      },
      {
        name: 'Chris Lyons', 
        role: 'Special Effects - Teeth', 
        salary: 2000000, 
        department: 'Makeup'
      },
      {
        name: 'Maria L. Baker', 
        role: 'Set Designer', 
        salary: 4000000, 
        department: 'Art'
      },
      {
        name: 'Tomas Cervenka', 
        role: 'Boom Operator', 
        salary: 2000000, 
        department: 'Sound'
      }
    ]
    
    Movie.bulkCreate(testMovies);
    CastMember.bulkCreate(testCastMembers);
    CrewMember.bulkCreate(testCrewMembers);

    //Connecting the Movie and CastMember Models
      //McAvoy was added in the testing below
    //adding Jolie (id of 2) to Wanted (id of 1)
    const movie1 = await Movie.findOne({where: {title: 'Wanted'}});
    const castMember2 = await CastMember.findOne({where: {name: 'Angelina Jolie'}});
    movie1.addCastMember(castMember2);
    //adding Freeman (id of 3) to Wanted (id of 1)
    const castMember3 = await CastMember.findOne({where: {name: 'Morgan Freeman'}});
    movie1.addCastMember(castMember3);

    //adding Cabello (id of 4) to Cinderella (id of 2)
    const movie2 = await Movie.findOne({where: {title: 'Cinderella'}});
    const castMember4 = await CastMember.findOne({where: {name: 'Camila Cabello'}});
    movie2.addCastMember(castMember4);

    //adding Murphy (id of 5) to Life (id of 3)
    const movie3 = await Movie.findOne({where: {title: 'Life'}});
    const castMember5 = await CastMember.findOne({where: {name: 'Eddie Murphy'}});
    movie3.addCastMember(castMember5);
    //adding Lawrence (id of 6) to Life (id of 3)
    const castMember6 = await CastMember.findOne({where: {name: 'Martin Lawrence'}});
    movie3.addCastMember(castMember6);


    //Connecting the Movie and CrewMember Models
      //Brandt was added in the testing below
    //adding Simpson to Life
    const crewMember2 = await CrewMember.findOne({where: {name: 'Geoffrey Simpson'}})
    movie1.addCrewMember(crewMember2);
    //adding Mirojnick to Cinderella
    const crewMember3 = await CrewMember.findOne({where: {name: 'Ellen Mirojnick'}});
    movie2.addCrewMember(crewMember3);
    //adding Lyons to Cinderella
    const crewMember4 = await CrewMember.findOne({where: {name: 'Chris Lyons'}})
    movie2.addCrewMember(crewMember4);
    //adding Baker to Life  
    const crewMember5 = await CrewMember.findOne({where: {name: 'Maria L. Baker'}})
    movie3.addCrewMember(crewMember5);
    //adding Cervenka to Life
    const crewMember6 = await CrewMember.findOne({where: {name: 'Tomas Cervenka'}})
    movie3.addCrewMember(crewMember6);
  });

  test('can create a movie', async () => {

    const testMovie = await Movie.findOne({where: {title: 'Wanted'}});
    expect(testMovie.title).toBe('Wanted');
    expect(testMovie.year).toEqual(2008);
    expect(testMovie.genre).toBe('Action');
    expect(testMovie.rating).toBe('R');
  });

  test('can create CastMember', async () => {
    const testCastMember = await CastMember.findOne({where: {name: 'James McAvoy'}})
    expect(testCastMember.name).toBe('James McAvoy');
    expect(testCastMember.part).toBe('Wesley');
    expect(testCastMember.salary).toEqual(20000000000);
  });

  test('can create CrewMember', async () => {
    const testCrewMember = await CrewMember.findOne({where: {id: 1}})
    expect(testCrewMember.name).toBe('Michael Brandt')
    expect(testCrewMember.role).toBe('writer');
    expect(testCrewMember.salary).toEqual(20000000000);
    expect(testCrewMember.department).toBe('Production');
  });

  test('Movies can have many CastMembers', async () => {
    //adding McAvoy (id of 1) to Wanted (id of 1)
    const testMovie = await Movie.findOne({where: {id: 1}})
    const testCastMember = await CastMember.findOne({where: {id: 1}})
    testMovie.addCastMember(testCastMember);
  });

  test('Movies can have many CrewMembers', async () => {
    //adding Brandt (id of 1) to Wanted (id of 1)
    const testMovie = await Movie.findOne({where: {title: 'Wanted'}})
    const testCrewMember = await CrewMember.findOne({where: {name: 'Michael Brandt'}})
    testMovie.addCrewMember(testCrewMember);
  })

  afterAll(async () => {
    sequelize.close()
  });
});