const User = require('../model/userModel');
const { getBody } = require('../helper');

// @desc      Get all users
// @route     GET /api/users
const getUsers = async(request, response) => {
  try {
    const users = await User.findAll();

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

// @desc      Get a user
// @route     GET /api/users/:id
const getUser = async (request, response, id) => {
  try {
    const user = await User.find(id);

    if (user) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(user));
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ 'message': 'User not found!' }))
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc      Create a user
// @route     POST /api/users
const createUser = async (request, response) => {
  try {
    const body = await getBody(request);

    const { name, username, email } = JSON.parse(body);

    const userParams = {
      name,
      username,
      email
    }

    const newUser = await User.create(userParams);

    response.writeHead(201, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

// @desc      Update a user
// @route     GET /api/users/:id
const updateUser = async (request, response, id) => {
  try {
    const user = await User.find(id);

    if (user) {
      const body = await getBody(request);

      const { name, username, email } = JSON.parse(body);

      const userParams = {
        name: name || user.name,
        username: username || user.username,
        email: email || user.email
      }

      const updatedUser = await User.update(id, userParams);

      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(updatedUser));
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ 'message': 'User not found!' }))
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc      Delete a user
// @route     DELETE /api/users/:id
const deleteUser = async (request, response, id) => {
  try {
    const user = await User.find(id);

    if (user) {
      await User.remove(id);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ 'message': `User ${id} has been removed.`}));
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ 'message': 'User not found!' }))
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}