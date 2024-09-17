const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";

async function connectToMongo(collectionName) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connecté à MongoDB");
    //taskManager = nom de la base de données à l'url : mongodb://localhost:27017
    return client.db("taskManager").collection(collectionName);
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    throw error;
  }
}

function findAllTasks(collection) {
  return collection.find({}).toArray();
}

function main() {
  //task : nom de la collection
  connectToMongo("task")
    .then(collection => {
      return findAllTasks(collection);
    })
    .then(tasks => {
      console.log("Tâches trouvées :");
      console.log(tasks);
    })
    .catch(error => {
      console.error("Une erreur est survenue :", error);
    });
}

main();

module.exports = {
  main
};