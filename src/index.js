const express = require('express')
const cors = require('cors')
const app = express()

app.set('port', process.env.PORT || 4000)

require('./database')
app.use( express.json() )
app.use( express.urlencoded({extended:false}))
app.use( cors() )

app.use( require('./router/user') )

app.listen (app.get('port'), () => console.log(`Server on port ${app.get('port')}`))