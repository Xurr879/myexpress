// index.js
const express = require('express');
const line = require('@line/bot-sdk');

const app = express();

// ตั้งค่าจาก LINE Developers Console
const config = {
  channelAccessToken: 'tQzLIvlx7muSgESigGJ5rTSvBsam/DauEXdQ1bF57+A8pdn9AKCnsjZEpMlJd0PfYA3lY4CK7UKHTV8IrbhEDQIpUvUC0nOTe+M1ByLb1RZXr4Bdg84w9tvIi8lRrT4W7IUdmlMKMw6UUJYKx9VMTgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '576d64cc394127ac3f3cbebb58f02bc5'
};

app.use('/webhook', line.middleware(config));

// รับ webhook
app.post('/webhook', (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then(result => res.json(result));
});

// ตอบกลับข้อความ
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: `คุณพิมพ์ว่า: ${event.message.text}`
  });
}

const client = new line.Client(config);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
