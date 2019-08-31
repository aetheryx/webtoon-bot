module.exports = (endpointGenerator, endpointParams) => {
  let [ method, abstract ] = endpointGenerator(
    endpointParams[0],
    ...'?'.repeat(9).split('')
  );

  abstract = abstract
    .split('/')
    .filter(segment => segment !== '?')
    .join('/');

  // Seperate ratelimit bucket for DELETE_MESSAGE
  if (method === 'DELETE' && abstract.endsWith('/messages')) { 
    abstract += '/:delete';
  }

  return abstract;
}