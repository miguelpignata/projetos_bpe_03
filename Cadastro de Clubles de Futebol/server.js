const express = require('express')
const clubes = require('./dados.json')
const listarClubes = (req, res) => {
    clubes.forEach(clube => {
        let jogos = Number(clube.vitorias) + Number(clube.empates) + Number(clube.derrotas)
        let pontos = (Number(clube.vitorias) * 3) + Number(clube.empates)
        clube.jogos = jogos
        clube.pontos = pontos
    })
    res.send(clubes)
}
const novoClube = (req, res) => {
    if (req.body) {
        let jogos = Number(req.body.vitorias) + Number(req.body.empates) + Number(req.body.derrotas)
        let pontos = (Number(req.body.vitorias) * 3) + Number(req.body.empates)
        req.body.jogos = jogos
        req.body.pontos = pontos
        clubes.push(req.body)
        res.send("Clube recebido, em processamento")
    } else {
        res.send("Erro ao receber clube")
    }
}
const porta = 3000
const app = express()
app.use(express.urlencoded({ extended: true }))
app.post("/", novoClube)
app.get("/", listarClubes)

app.listen(porta, () => {
    console.log(`Servidor http://127.0.0.1:${porta}`)
    console.log(`Cliente http://127.0.0.1:5500/cliente/`)
})