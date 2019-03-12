const graphqlSchemaDiff = require('graphql-schema-diff');
const cosmiconfig = require('cosmiconfig');
const message = require('./modules/message');
const slack = require('./modules/slack');

const MODULE_NAME = 'schemaDiffBot';

(async () => {
  const programVariables = await cosmiconfig(MODULE_NAME).search();

  if (!programVariables) {
    console.log('no config file founded.');
    return;
  }

  if (programVariables.isEmpty) {
    console.log('config file is empty.');
  }

  const diffs = await await graphqlSchemaDiff.getDiff(
    programVariables.config.base_schema,
    programVariables.config.comparable_schema ||
      programVariables.config.base_schema,
    programVariables.config.options.headers || {}
  );

  if (!diffs) {
    console.log('Schemas are identical, no message to send! 0/');
    return;
  }

  const allChanges = [...diffs.dangerousChanges, ...diffs.breakingChanges];
  const mountedMessage = message.mountMessage(allChanges);

  slack.sendToSlackChannel(mountedMessage, programVariables.config);
})();
