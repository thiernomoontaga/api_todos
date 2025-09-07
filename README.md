# API Todo - Guide Complet Backend Node.js

Une API RESTful complète pour gérer une liste de tâches, construite avec Node.js natif. Ce projet m'a permis d'apprendre les fondamentaux du développement backend avec JavaScript.

##  Fonctionnalités

-  **CRUD Complet** : Create, Read, Update, Delete
- **Architecture Modulaire** : Séparation des concerns
- **Persistence des données** : Stockage JSON
-  **Gestion d'erreurs** : Robustesse et validation
-  **API RESTful** : Endpoints standards

##  Structure du Projet

```
api_todo/
├── api/
│   └── todos.js          # Contrôleurs des endpoints
├── functions/
│   └── todo_storage.js   # Couche de données
├── storage/
│   └── todo.json         # Base de données JSON
├── app.js                # Serveur principal
├── package.json          # Dépendances du projet
└── README.md            # Documentation
```

##  Technologies Utilisées

- **Node.js** - Runtime JavaScript
- **HTTP Natif** - Module web intégré
- **File System (fs)** - Gestion des fichiers
- **URL API** - Parsing des URLs

## 📡 Endpoints API

### GET /todos
Récupère toutes les tâches.

**Response:**
```json
[
  {
    "id": 1725020400000,
    "title": "Faire les courses",
    "completed": false
  }
]
```

### GET /todos?id=123
Récupère une tâche spécifique par ID.

### POST /todos
Crée une nouvelle tâche.

**Body:**
```json
{
  "title": "Nouvelle tâche",
  "completed": false
}
```

### PUT /todos?id=123
Met à jour une tâche existante.

**Body:**
```json
{
  "title": "Tâche modifiée",
  "completed": true
}
```

### DELETE /todos?id=123
Supprime une tâche.

**Response:** `204 No Content`

## 🔧 Installation et Démarrage

```bash
# Cloner le projet
git clone <repository-url>
cd api_todo

# Installer les dépendances
npm install

# Démarrer le serveur
node app.js

# Ou avec watcher pour le développement
node watcher.js app.js
```

##  Concepts Appris

### 1. **Création d'un Server HTTP**
```javascript
import { createServer } from 'node:http'

const server = createServer(async (req, res) => {
  // Gestion des requêtes
})

server.listen(3001, () => {
  console.log('Server running on port 3001')
})
```

### 2. **Routage des Requêtes**
```javascript
const url = new URL(req.url, `http://${req.headers.host}`)
const endpoint = `${req.method}:${url.pathname}`

switch (endpoint) {
  case 'GET:/todos':
    // Gérer GET
    break
  case 'POST:/todos':
    // Gérer POST
    break
  // ... autres méthodes
}
```

### 3. **Gestion du Body JSON**
```javascript
import { json } from 'node:stream/consumers'

const body = await json(req)
const { title, completed } = body
```

### 4. **Persistance des Données**
```javascript
import { readFile, writeFile } from 'node:fs/promises'

const data = await readFile('file.json', 'utf-8')
const todos = JSON.parse(data)

await writeFile('file.json', JSON.stringify(todos, null, 2))
```

### 5. **Gestion d'Erreurs**
```javascript
try {
} catch (error) {
  res.writeHead(500)
  res.write(JSON.stringify({ error: "Internal server error" }))
}
```

##  Bonnes Pratiques Implementées

### **Validation des Données**
```javascript
if (!title || typeof title !== 'string') {
  res.writeHead(400)
  return { error: "Title must be a string" }
}
```

### **Codes HTTP Appropriés**
- `200` OK - Succès
- `201` Created - Ressource créée
- `400` Bad Request - Données invalides
- `404` Not Found - Ressource non trouvée
- `500` Internal Error - Erreur serveur

### **Headers Corrects**
```javascript
res.setHeader('Content-Type', 'application/json')
res.writeHead(201) // Status code
```

##  Debugage et Tests

### **Test avec curl**
```bash
# GET all
curl http://localhost:3001/todos

# POST new
curl -X POST -H "Content-Type: application/json" \
  -d '{"title":"Test","completed":false}' \
  http://localhost:3001/todos

# PUT update
curl -X PUT -H "Content-Type: application/json" \
  -d '{"title":"Updated","completed":true}' \
  http://localhost:3001/todos?id=123

# DELETE
curl -X DELETE http://localhost:3001/todos?id=123
```

### **Vérification des Ports**
```bash
# Vérifier si le port est occupé
sudo lsof -i :3001

# Tuer le processus
sudo kill -9 $(sudo lsof -ti :3001)
```

##  Structure des Données

### **Format Todo**
```json
{
  "id": 1725020400000,
  "title": "Faire les courses",
  "completed": false
}
```

### **Fichier de Stockage**
```json
[
  {
    "id": 1725020400000,
    "title": "Faire les courses",
    "completed": false
  }
]
```

## 🚀 Prochaines Étapes

### **Améliorations Possibles**
- [ ] Authentification JWT
- [ ] Base de données SQL/NoSQL
- [ ] Tests unitaires avec Jest
- [ ] Documentation Swagger/OpenAPI
- [ ] Rate limiting
- [ ] Validation avancée avec Zod
- [ ] Logging structuré

### **Évolution Architecture**
- [ ] Separation en routes distinctes
- [ ] Middleware architecture
- [ ] Conteneurisation Docker
- [ ] Déploiement cloud

## 💡 Leçons Apprises

1. **Node.js Natif** : Compréhension profonde du HTTP sans frameworks
2. **Async/Await** : Maîtrise des opérations asynchrones
3. **Gestion d'Erreurs** : Robustesse des applications
4. **API Design** : Principes RESTful
5. **Structure de Code** : Organisation modulaire

## 📚 Ressources Utiles

- [Documentation Node.js](https://nodejs.org/api/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [REST API Best Practices](https://restfulapi.net/)

---
