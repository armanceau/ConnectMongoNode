import express  from 'express'
import { main } from './db_utils.js'; // Import des fonctions depuis db_utils.js


const app = express()
app.use(express.json())//permet de récupérer
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hello/:name', (req, res) => {
    res.send('Bonjour ' + req.params.name + "👋")
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

