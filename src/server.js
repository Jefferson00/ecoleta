const express = require('express')
const server = express()

//pegar o banco de dados
const db = require('./database/db')

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na aplicação
server.use(express.urlencoded({extended: true}))

//utilizar temlate engine
const nunjucks = require("nunjucks")
//configuração do nunjucks, informando inde estão as páginas
// html, servidor e que não utilizará cache
nunjucks.configure("src/views", {
    express: server, 
    noCache: true
})

//configurar rotas

server.get("/", (req, res) =>{
    return res.render("index.html")
}) 

server.get("/create-point", (req, res) =>{
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) =>{
//inserir dados no banco de dados

    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
       req.body.image,
       req.body.name,
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.items,
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.render("create-point.html", {saved: false})
        }

        console.log("Cadastro com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)

})


server.get("/search", (req, res) =>{

    const search = req.query.search

    if (search == ""){
        return res.render("search.html", {total:0})
    }

    //pegar dados do banco de dados

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){

        if(err){
            return console.log(err)
        }
        const total = rows.length

        return res.render("search.html", {places: rows, total})
    })
    
})


//ligar server

server.listen(3000)