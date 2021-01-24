//1- Connect Db
const mongoose=require("mongoose")
require('dotenv').config({ path: './.env' })

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=> console.log("Database is connected"))
.catch(err => 
    console.error('Database connection error'))

//Create a person having this prototype:
let personSchema = new mongoose.Schema({
    name: {type:String, required:true},
    age: Number,
    favoriteFoods :[String]
  })
  const Person = mongoose.model('Person', personSchema);
  //Create and Save a Record of a Model:
  let Pers= new Person({
      name:'Hasnia',
      age: 33,
      favoriteFoods :['Spagetti','Tajin']
  })
      Pers.save((err, data) => {
          err ? console.log(error) : console.log('person is saved', data) 
      })
  //Create Many Records with model.create()
  let Persons= Person.create([{"name":"Aymen", age: 13, "favoriteFoods":['jolbana', 'kamounia', 'ojja']},
            {"name":"Safa", age: 43, "favoriteFoods":['koskous', 'pizza']},
            {"name":"Arij", age: 5, "favoriteFoods":['Felfoul', 'pizza']}
])
.then((persons)=>{
    console.log("persons are saved",persons)
    })
    .catch(err=>console.log(err))
//Use model.find() to Search Your Database
Person.find({name:'Aymen'})
.then((person)=>{
    console.log('person find', person)
    })
    .catch(err=>console.log(err))
//Use model.findOne() to Return a Single Matching Document from Your Database
Person.findOne({favoriteFoods: 'Felfoul'})
.then((person)=>{
    console.log('person find', person)
    })
    .catch(err=>console.log(err))
//Use model.findById() to Search Your Database By _id
    var findPersonById = (personId, done) => {
        Person.findById(personId, (err, data) => err ? done(err) : done(null, data)); 
      };
//Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById(personId, (err, data) => {
      if (err) return console.log(err);
      data.favoriteFoods.push(foodToAdd);
      data.save((err, dataNext) =>
        err
          ? console.error("error saving data: ", err.message)
          : done(null, dataNext)
      );
    });
  };
  
    
    //Perform New Updates on a Document Using model.findOneAndUpdate()
    var findAndUpdate = function(personName, doc) {
        var ageToSet = 20;
        
        Person.findOneAndUpdate(
          {"name": personName},
          {$set: {"age":ageToSet}},
          {new : true},
          function(err,done){
            if(err){
              console.log("Error Ocurred")
            }
            console.log(done)
          }    
      )};
    
      //Delete One Document Using model.findByIdAndRemove
      const removeById = (personId, done) => {
        Person.findByIdAndRemove(personId, (err, data) =>
          err ? done(err, data) : done(null, data)
        );
      };
      //MongoDB and Mongoose - Delete Many Documents with model.remove()
      const removeManyPeople = (done) => {
        const nameToRemove = "Safa";
        Person.remove({ name: nameToRemove }, (err, data) =>
          err ? done(err, data) : done(null, data)
        );
      };
      //Chain Search Query Helpers to Narrow Search Results
      var queryChain = function(done) {
        var foodToSearch = "ojja";
        Person.find({favoriteFoods:foodToSearch}).sort({name : 1}).limit(2).select("-age").exec((err, data) => {
           if(err)
             done(err);
          done(null, data);
        })
      };