/**
* message event
*
*   All events use this template, simply create additional files with different
*   names to add event responses
*
*   See https://api.slack.com/events-api for more details.
*
* @param {object} event The event object provided by Slack API.
* @returns {object} The response object sent to Slack API in a response.
*/
module.exports = (user, channel, text = '', event = {}, botToken = null, callback) => {
  // Only send a response to certain messages
  if (text.match(/\b(?:hey|hello|hi|sup)\b/i)) {
    callback(null, {
      text: `Hey there! <@${user}> said ${text}`
    });
  // C4E4UNSKC is the id for #hacknight
  } else if (channel === 'C4E4UNSKC' && text.match(/something stupid/i)) {
    callback(null, {
      text: `:facepalm:`
    }); 
  } else {
    callback(null, {});
  }
};
