#
PixMovement - Project Full Stack (Back-end)
===
Projeto criado para estudos de desenvolvimento full stack. Trata-se de um repositório de imagem com objetivo de tentar incentivar 
as pessoas a se exercitar através de referências imagéticas.


* Heroku: https://pix-moviment.herokuapp.com
* Front-end: https://github.com/indiomedeiros/pixeidos-front-end/blob/master/README.md


What works:
----
Endpoints:
1. Registration (with tests)
2. Login (with tests)
3. Get user data by id
4. Create image (with tests)
5. Get all the images
6. Endpoint of taking image by id
7. Image search endpoint with letters / phrases 

Instructions
===
`npm install`: Installs the project's dependencies.
The .env file must be created with the information from your database.
```
DB_HOST = host
DB_USER = user
DB_PASSWORD = password
DB_NAME = database-name
BCRYPT_COST = password complexity in numbers (10)
JWT_KEY =  key to JWT
JWT_EXPIRES_IN = token expiration time (1d, 1y)
```
Create tables
---
* `npm run createTables` - Creates the necessary tables for the project.
* `npm run start` - Starts the connection to the database and runs the project. You need to give the command ctrl + C to stop the execution.
* `npm run dev`: Restart the server automatically every time the project is saved.
* `npm run test`: Run unit tests

How to test API endpoints?
---

* search and install the extension on your vscode: `humao.rest-client`
* use the `request.rest` file to make requests by clicking on the text` Send Request`.

Request:
```

### login
POST http://localhost:3003/user/login
Content-Type: application/json

{
   "email": "bboyindio@gmail.com",
   "password": "12345678"    
}
```
Response:
```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 199
ETag: W/"c7-4VK5QfWwQEsqXM8iYwmTlWs05PY"
Date: Thu, 18 Mar 2021 18:56:00 GMT
Connection: close

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTY2M2FlLWQ5YjUtNGI3ZS04NTQxLWRlNjI5MTViNjMwNSIsImlhdCI6MTYxNjA5Mzc2MCwiZXhwIjoxNjE2MTgwMTYwfQ.DznF5S9G7LuEMI4vVulfWmN9kf21Kgg1FpWJxjL8Bjc"
}
```
