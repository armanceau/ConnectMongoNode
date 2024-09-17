
# Connexion Mongodb via node

Pour cet exemple de connexion on connecter une base de tâche.

Dans mongodb compass on créer une nouvelle base nommée "taskManager", et une nouvelle collection nommée "task".



## Initialisation

Cloner le repos

```bash
  git clone https://github.com/armanceau/ConnectMongoNode.git
```

Ouvrir le projet
```bash
  cd ConnectMondoNode
```

Initialisation de npm
```bash
  npm init
```

Installer express :
```bash
  npm install express
```

Installer mongodb dans le projet :
```bash
  npm install mongodb
```

### App.mjs

```js
import express  from 'express'
import { main } from './db_utils.js'; // Import des fonctions depuis db_utils.js


const app = express()
app.use(express.json())//permet de récupérer
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Route pour récupérer les tâches
app.get('/tasks', async (req, res) => {
  try {   
    res.json(main);                                   
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des tâches.' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

### db_utils.js

```js
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
```