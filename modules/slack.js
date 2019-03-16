const { WebClient } = require('@slack/client');

function sendToSlackChannel(message, config, onSuccess, onError) {
  const web = new WebClient(config.slack.token);
  const conversationId = config.slack.channelId;

  (async () => {
    try {
      await web.chat.postMessage({
        channel: conversationId,
        text: message
      });

      onSuccess();
    } catch (e) {
      onError(e);
    }
  })();
}

module.exports = {
  sendToSlackChannel: sendToSlackChannel
};
