require('dotenv').config();


let Person;
const mongoose = require('mongoose');

const paramsMongoose = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(process.env.MONGO_URI, paramsMongoose)



const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String]
});

Person = mongoose.model('Person', personSchema);



const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: 'Muhamad John',
    age: 26,
    favoriteFoods: ['Burger', 'Pizza']
  });

  newPerson.save(function(err, data) {
    if (err) return done(err)
    done(null, data)
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if(err) return console.log(err)
    done(null, people)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, people) {
    if(err) return done(err)
    done(null, people)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, result) {
    if(err) return done(err)
    done(null, result)
  })
  
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, people) {
    if(err) return done(err)
    done(null, people)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, updateDoc) {
    if(err) return done(err)
    done(null, updateDoc)
  })
};

const removeById = (personId, done) => {
  
  Person.findByIdAndRemove({_id: personId}, function(err, people) {
    if(err) return done(err)
    done(null, people)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, function(err, people) {
    if(err) return done(err)
    done(null, people)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  // Gunakan query chaining untuk membangun permintaan pencarian
  Person.find({ favoriteFoods: foodToSearch }) // Temukan orang yang suka makanan tertentu
    .sort({ name: 1 }) // Urutkan berdasarkan nama (ascending)
    .limit(2) // Batasi hasil hingga 2 dokumen
    .select("-age") // Sembunyikan kolom usia
    .exec((err, data) => {
      if (err) {
        done(err);
      } else {
        done(null, data);
      }
    });
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;