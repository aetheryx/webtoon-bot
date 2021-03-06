require('fs')
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.includes('.'))
  .forEach(filename => {
    const command = require(`${__dirname}/${filename}`);
    for (const trigger of command.triggers) {
      exports[trigger] = command;
    }
  });
