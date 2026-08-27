const express = require('express')
const consultas = require('./dados.json')
const listarConsultas = (req, res) => {
    consultas.forEach(consulta => {
        let imc = Number(consulta.peso) / (Number(consulta.altura) * Number(consulta.altura))
        consulta.imc = Number(imc.toFixed(2))
    })
    res.send(consultas)
}

const novaConsulta = (req, res) => {
    if (req.body) {
        let imc = Number(req.body.peso) / (Number(req.body.altura) * Number(req.body.altura))
        req.body.imc = Number(imc.toFixed(2))
        consultas.push(req.body)
        res.send("Consulta recebida, em processamento")
    } else {
        res.send("Erro ao receber consulta")
    }
}

const porta = 3000
const app = express()

app.use(express.urlencoded({ extended: true }))

app.post("/", novaConsulta)
app.get("/", listarConsultas)

app.listen(porta, () => {
    console.log(`Servidor http://127.0.0.1:${porta}`)
    console.log(`Cliente http://127.0.0.1:5500/cliente/`)
})