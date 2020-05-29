const { connect } = require('mongoose')

const URL = process.env.DATABASE || 'mongodb://localhost/documentMapping'
connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(db => console.log('Mongodb is connected'))
.catch( err  => console.error(err))
