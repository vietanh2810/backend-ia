# RémyTheChef

Projet IA Semestre 1 5IW1.

## CLONER

Pour cloner ce projet localement, utilisez la commande suivante :

```bash
    git clone git@github.com:vietanh2810/backend-ia.git
```

## INSTALLER
Installez les dépendances du projet en utilisant npm :
```bash
    npm install
```

## .env

On y trouvera 2 clés : 
OPENAI_API_KEY : clé API keys (https://platform.openai.com/api-keys)
jwtSecret= : challengeiadb     (token)

## BDD
dans le ficher :
    ./backend-ia/models/index.js
remplacer les informations par celle de votre base postgres.
```js
const sequelize = new Sequelize({
    //   host: "dpg-cj199pa7l0ft7nl7lot0-a",
    //   port: 5432,
    //   database: "acpostgresdb",
    //   username: "honzikoi",
    //   password: "fP4nPtvwM6dzuNMDRhRE0niKhaU5pUqt",
    host: "localhost",
    port: 5432,
    database: "iadb",
    username: "vietanh",
    password: "ChangeMe@123",
    dialect: "postgres",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
```

## Lancer le projet

```bash
    npm run start
```
## GIT FRONT (peut être en privé)

Github front-end : https://github.com/vietanh2810/frontend-ia

## Participants 
- Viet Anh Bui
- Elodie Jolo
- Remy Scherier