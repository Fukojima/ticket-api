const express = require('express')
const cors = require('cors')
const routes = require('./routes')
require('dotenv').config()

const app = express()

let corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept, token, Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api', routes)

app.all('*', (req, res, next) => {
    return res.status(404).json({
        erro: {
            message: 'Rota não encontrada.',
        },
    })
})

app.use((erro, req, res, next) => {
    return res.status(erro.status || 500).json({
        erro: {
            message: 'Erro interno do Servidor.',
        },
    })
})

app.listen(process.env.PORT || 3333, '0.0.0.0', () => {
    console.log(`Aplicação inicializada. Porta utilizada ${process.env.PORT || 3333}`)
})
