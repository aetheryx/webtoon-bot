const mentionRegex = RegExp(`<@!?${process.env.BOT_ID}> ?`);

module.exports = (msg) => {
  const mentionMatch = msg.content.match(mentionRegex);
  if (mentionMatch) {
    if (msg.content.lastIndexOf(mentionMatch[0]) === 0) {
      msg.mentions = msg.mentions.filter(user => user.id !== process.env.BOT_ID);
    }

    return mentionMatch[0];
  }

  return process.env.PREFIX;
};
