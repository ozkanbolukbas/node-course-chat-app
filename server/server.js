const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "../public")
app.use(express.static(publicPath));


app.get('/', (req, res, next) => {
  res.send("Hello world");
});



app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});
