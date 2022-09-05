const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')

//configuracion de rutas
const authRoutes = require('./routes/auth')
const dashboardRoutes = require('./routes/dashboard')
const verifyFotken = require('./routes/validate-token')
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
const corsOptions = {
    origin:"*",
    optionsSuccessStatus: 200
}

const app = express()
const uri = `mongodb+srv://appDany:appDany@cluster0.lskghqv.mongodb.net/?retryWrites=true&w=majority`
const PORT = process.env.PORT || 3001

require('dotenv').config()

mongoose.connect(uri, options)
    .then( () => console.log('Conexion exitosa'))
    .catch( e => console.log('Error en la base de datos:' + e))

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(cors(corsOptions))
app.use('/api/user', authRoutes)
app.use('/api/dashboard', verifyFotken, dashboardRoutes)
app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'Esta funcionando'
    })
})

app.listen(PORT, () => {
    console.log(`Servidor trabajando en el puerto: ${PORT}`)
})


