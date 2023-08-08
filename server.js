const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const memberRoutes = require('./routes/members')

require('dotenv').config()

const app = express()
app.use(cors());
app.options('*', cors());


app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method, req.body)
    next()
})

app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.use(express.static(__dirname));

app.use('/api/members', memberRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
                console.log('listening on port', port)
        }) 
}
).catch((error) => {console.log(error)})