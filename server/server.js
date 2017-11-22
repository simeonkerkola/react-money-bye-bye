const express = require('express')
const path = require('path')

const app = express()
const publicPath = path.join(__dirname, '..', 'public') // current, go back, go public
const port = process.env.PORT || 3000

app.use(express.static(publicPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html')) // serve index.html every time we get a 404
})

app.listen(port, () => {
  console.log('Running on a port', port);
})
