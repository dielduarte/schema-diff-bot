const { WebClient } = require('@slack/client');

function sendToSlackChannel(message, config) {
  const web = new WebClient(config.options.slack.token);
  const conversationId = config.options.slack.chatId;

  (async () => {
    const res = await web.chat.postMessage({
      channel: conversationId,
      text: message
    });

    console.log('Message sent: ', res.ts);
  })();
}

module.exports = {
  sendToSlackChannel: sendToSlackChannel
};
