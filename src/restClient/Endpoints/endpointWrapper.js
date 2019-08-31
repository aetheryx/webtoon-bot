const generateAbstract = require('./generateAbstract');

module.exports = (endpointGenerator) => (...endpointParams) => {
  const [ method, endpoint ] = endpointGenerator(...endpointParams);
  return {
    method,
    endpoint,
    abstract: generateAbstract(endpointGenerator, endpointParams)
  };
};
