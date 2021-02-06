const http = require('http');
const { getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser } = require('./controllers/userController');
const { findId } = require('./helper');

const server = http.createServer((request, response) => {
  console.log(`${request.method} method on url ${request.url}`);

  if (request.url === '/' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application-json' });
    response.end(JSON.stringify({ 'message': 'Hello!' }));
  } else if (request.url === '/api/users' && request.method === 'GET') {
    getUsers(request, response);
  } else if ((/\/api\/users\/(\w+)/).test(request.url) && request.method === 'GET') {
    const id = findId(request.url);
    getUser(request, response, id);
  } else if (request.url === '/api/users' && request.method === 'POST') {
    createUser(request, response);
  } else if ((/\/api\/users\/(\w+)/).test(request.url) && request.method === 'PUT') {
    const id = findId(request.url);
    updateUser(request, response, id);
  } else if ((/\/api\/users\/(\w+)/).test(request.url) && request.method === 'DELETE') {
    const id = findId(request.url);
    deleteUser(request, response, id);
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ 'message': 'Route not found' }))
  }
})

const PORT = process.env.PORT || 9000;

server.listen(PORT, () => console.log(`-> Server is running on port ${PORT}`));

module.exports = server;