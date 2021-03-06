let express = require('express')
, app = express()
, port = 8080

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/profile.html')
})

app.get('/app.js', (req, res) => {
  res.sendFile(__dirname + '/public/app.js')
})

app.get('/styles.css', (req, res) => {
  res.sendFile(__dirname + '/public/styles.css')
})

app.get('/material-components-web.css', (req, res) => {
  res.sendFile(__dirname + '/node_modules/material-components-web/dist/material-components-web.css')
})

app.get('/material-components-web.min.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/material-components-web/dist/material-components-web.min.js')
})

app.get('/crown.png', (req, res) => {
  res.sendFile(__dirname + '/images/crown.png')
})

app.get('/fire.png', (req, res) => {
  res.sendFile(__dirname + '/images/fire.png')
})

app.listen(8080, () => {
  console.log('listening on ' + port)
})
