let express = require('express')
, app = express()
, port = 8080

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/profile.html')
})

app.get('/material-components-web.css', (req, res) => {
  res.sendFile(__dirname + '/node_modules/material-components-web/dist/material-components-web.css')
})

app.get('/material-components-web.min.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/material-components-web/dist/material-components-web.min.js')
})

app.listen(8080, () => {
  console.log('listening on ' + port)
})
