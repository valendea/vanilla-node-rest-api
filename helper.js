const fs = require('fs');

const getBody = request => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      
      request.on('data', chunk => {
        console.log(chunk.toString());
        console.log("-----------");
        body += chunk.toString();
      });

      request.on('end', () => resolve(body));
    } catch (error) {
      reject(error);
    }
  })
}

const writeDataToFile = (file, content) => {
  if (process.env.NODE_ENV === 'test') { return }
  
  fs.writeFileSync(file, JSON.stringify(content), 'utf8', (error) => {
    console.log(error);
  })
}

const findId = (url) => {
  return url.split('/')[3];
}

module.exports = {
  getBody,
  writeDataToFile,
  findId
}