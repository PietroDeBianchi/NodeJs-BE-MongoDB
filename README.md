# 🚀 NodeJs-BE w MongoDB

A Backend API for user authentication and management built with Node.js and MongoDB.
The project includes user registration, login, and route protection using JWT authentication.

## 📌 Features

- 🌍 **REST API** with **Express.js**
- 🔒 **Auth JWT** with roles
- 🛡 **Protection Middleware**
- 💾 **MongoDB** with **Mongoose**
- 🚀 **Utility for debugging** (in `utils/terminal`)
- 🎨 **Prettier & ESLint** for clean clode

## 🛠️Stacks

- [Node.js](https://nodejs.org/) 20+
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT (jsonwebtoken)](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [nodemon](https://www.npmjs.com/package/nodemon)

---

## 🔌 Install

### 1 Clone repository and Install dependecies:

`git clone git@github.com:PietroDeBianchi/Trezorl-BE.git`
`cd NodeJs-BE-MongoDB`
`yarn install`

### 2 Set .ENV :

Check .env.example – only `MONGO_URI` is required to start the application. 

### 3 Run Server :

`yarn dev` for Nodemon or `yarn start` for Node

---

## 📂 Project structure `yarn scaffold`

|||Project in: NodeJs-BE-MongoDB
├── .env
├── .gitignore
├── .prettierrc
├── .vscode/
│ └── launch.json
├── package.json
├── src/
│ ├── app.js
│ ├── config/
│ │ ├── database.js
│ │ └── express.js
│ ├── controllers/
│ │ └── authController.js
│ ├── helpers/
│ │ └── authHelper.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── models/
│ │ └── User.js
│ ├── routes/
│ │ ├── auth.routes.js
│ │ └── index.js
│ └── utils/
│ └── terminal/
│ ├── list-endpoints.js
│ └── scaffold-viewer.js
└── yarn.lock

## 🔥 API Endpoints `yarn api-list`

[
  {
    path: '/api/v1/auth/login',
    methods: [ 'POST' ],
    middlewares: [ 'login' ]
  },
  {
    path: '/api/v1/auth/register',
    methods: [ 'POST' ],
    middlewares: [ 'register' ]
  },
  {
    path: '/api/v1/auth/me',
    methods: [ 'GET' ],
    middlewares: [ 'authMiddleware', 'me' ]
  }
]
