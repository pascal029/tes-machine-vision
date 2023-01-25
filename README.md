# tes-machine-vision Maulana Pascal Virgiawan

## How to start ?

- make sure you already install node, postgre, and npm package on your laptop/computer
- clone this repository
- run a terminal go to path /tes-machine-vision that you already clone before
- cd backend ~> npm install (wait till the process is done)
- if file .env does not exist on the backend, create a new one with the key on .env.template then give it value as you wish
- run database create and migration with command
- npx sequelize-cli db:create
- npx sequelize-cli db:migrate
- run server with the command : npx nodemon app.js
- run a new terminal
- cd frontend/client
- npm install
- npm run dev
- open http://localhost:5173

#

\*list of available end points serve in api-doc.md
