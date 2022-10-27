const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const data = require('./data');


const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const newRecipe = data[0]

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);
   
    await Recipe.deleteMany();

    const tapioca = await Recipe.create({
      title :  "tapioca",
      level : "Easy Peasy",
      ingredients : ["tapioca", "cheese", "ham",],
      cuisine : "brazilian",
      dishType : "breakfast",
      image : "https://img.itdg.com.br/tdg/images/recipes/000/173/202/355374/355374_original.jpg?w=1200",
      duration : 10,
      creator : "gabriela", 
      created : "827-10-22", 
    })
    console.log(tapioca.title)
    
    await Recipe.insertMany(data)
    for (let i=0; i < data.length; i++){
      console.log(data[i].title)
    }

    let updatedDuration = await Recipe.findOneAndUpdate (
      {title: "Rigatoni alla Genovese"},
      {duration: '100'},
      {new: true });
    console.log(updatedDuration);
    
    await Recipe.deleteOne({ title: 'Carrot Cake' });

     dbConnection.disconnect(); 

  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
