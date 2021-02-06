const users = require('../data/users.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../helper');

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(users);
  })
}

const find = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((us) => us.id === id);
    resolve(user);
  })
}

const create = (userParams) => {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...userParams };
    users.push(newUser);

    writeDataToFile('./data/users.json', users);
    resolve(newUser);
  })
}

const update = (id, userParams) => {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((us) => us.id === id);
    users[index] = { id, ...userParams };

    writeDataToFile('./data/users.json', users);
    resolve(users[index]);
  })
}

const remove = (id) => {
  return new Promise((resolve, reject) => {
    const newUsers = users.filter((us) => us.id !== id);
  
    writeDataToFile('./data/users.json', newUsers);
    resolve();
  })
}

module.exports = {
  findAll,
  find,
  create,
  update,
  remove
}