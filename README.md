# GameList Application

A user-friendly platform to register an account, log in, browse games, and leave reviews. Built with React/TypeScript, styled with SCSS, and powered by Firebase for database and authentication.

---

## 🚀 Built With

Here are the key technologies that power this project:

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript.
- [SCSS](https://sass-lang.com/) - For styling and maintaining CSS effectively.
- [Firebase](https://firebase.google.com/) - Provides the database and authentication backbone.
- [API](https://api.rawg.io/) - The API used to get the data shown.

## 🛠️ Getting Started

1: Clone this repository and download it on your machine.

2: Install all the dependencies with "npm install" and run "npm run dev" after.

2.5: You could also run the application in docker by running these commands: 
    "docker build -t yourgamelist ."
    then:
    "docker run -p 3000:3000 yourgamelist"

3: Have a firebase account ready and find your own API key, then remove ".example" from the ".env.example" file. 

4: Make a new account in (https://rawg.io/) and find your API key and add it into the .env file.

5: Fill in the keys into the fields in the ".env" file and you should be able to use the added features!
