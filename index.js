const express = require("express");
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const publisher = require('./producer');
const subcriber = require('./consumer');

const PORT = parseInt(process.env.PORT) || 3000;

app.use(express.json());

const cb = (message, _topic, _partition) => {
  console.log('Logging...');
  const text = message.value.toString();
  if (text === 'kaon') {
    console.log(`Consumer listening & get text: ${text}`);
  }
};

subcriber.run('test', cb);

app.get("/", (_req, res) => {
  return res.status(200).json({
    data: 'Hello kafka!'
  });
});

app.get("/testing", async (req, res) => {
  const { q } = req.query;

  await publisher.run('test', q);

  return res.status(200).json({
    data: q
  });
});

const start = async () => {
  try {
    app.listen(PORT, () => console.log("Server started on port 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
