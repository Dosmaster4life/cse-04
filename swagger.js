const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Use Contacts API to manage your contacts'
  },
  host: 'cse04contacts.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);

