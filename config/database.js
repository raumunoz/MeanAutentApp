require('dotenv').config();
module.exports = {
    database: process.env.MONGOURI,
    secret: 'secreto'
  }
  