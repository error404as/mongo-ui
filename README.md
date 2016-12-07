# mongo ui

I assume that you've already installed [MongoDB](https://www.mongodb.com/download-center#enterprise) and put it to system PATH.

Run `npm install` to install dependencies.

To start local server: `npm start`

Open `http://localhost:1111`

**Mongod** should be running.<br>
E.g. you may run `mongod --dbpath mydb` in the same directory, but make sure that you alreay created 'mydb' folder in this directory.

`server.js` is working with DB named `local`. Please change it if required.

Current functionality:
- getting all collections from DB
- show items from collection (all or filtered by query)
- drop collection
- insert item to existing collection or creating a new one
