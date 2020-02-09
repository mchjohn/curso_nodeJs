// carregando os modulos #1
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin') // #7
const path = require('path') // #8
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')


// configurações
//sessão
app.use(session({
    secret: 'celkeonesession',
    resave: true,
    saveUninitialized: true
}))

// flash
app.use(flash())

//middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

// body-parser #3
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// handle-bars #3
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// conexão com banco de dados
mongoose.connect('mongodb://localhost/celke', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexão estabelecida com o MongoDB')
}).catch((erro) => {
    console.log('Erro: Conexão com o MongoDB não estabelecida. ' + erro)
})

// arquivos estáticos #8
app.use(express.static(path.join(__dirname, 'public')))

// rotas #7
app.use('/admin', admin)

// iniciando o servidor #2
const PORT = 8080
app.listen(PORT, () => {
    console.log('Servidor rodando!')
})