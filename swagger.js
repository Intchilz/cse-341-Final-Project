const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Primary School API',
        description: 'A simple Express Primary School API',
    },
    host: 'cse-341-final-project-tb2p.onrender.com',
    schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);