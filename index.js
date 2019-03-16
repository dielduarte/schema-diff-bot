#!/usr/bin/env node
const ora = require('ora');
const graphqlSchemaDiff = require('graphql-schema-diff');
const cosmiconfig = require('cosmiconfig');

const message = require('./modules/message');
const slack = require('./modules/slack');

const MODULE_NAME = 'schemaDiffBot';
const spinner = ora('getting config file...').start();

(async () => {
  const programVariables = await cosmiconfig(MODULE_NAME).search();

  if (!programVariables) {
    spinner.fail('no config file found.');
    return;
  }

  if (programVariables.isEmpty) {
    spinner.fail('config file is empty.');
  }

  spinner.info('config file found.');
  spinner.info('comparing schemas...');

  const diffs = await await graphqlSchemaDiff.getDiff(
    programVariables.config.leftSchema,
    programVariables.config.rightSchema || programVariables.config.leftSchema,
    programVariables.config.options || {}
  );

  if (!diffs) {
    spinner.succeed('Schemas are identical, no message to send! 0/').stop();
    return;
  }

  spinner.info('creating message with differences...');
  const allChanges = [...diffs.dangerousChanges, ...diffs.breakingChanges];
  const mountedMessage = message.mountMessage(
    allChanges,
    programVariables.config
  );

  slack.sendToSlackChannel(
    mountedMessage,
    programVariables.config,
    () => spinner.succeed('Message sent to slack.').stop(),
    error => spinner.fail(`Something went wrong\n${error}`).stop()
  );
})();
