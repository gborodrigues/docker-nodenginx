const express = require('express')
const mysql = require('mysql')
const random = require('random-name')

const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database:'nodedb'
}

const connection = mysql.createConnection(config)

const tableSql = `
  CREATE TABLE IF NOT EXISTS people (
    id int not null auto_increment, 
    name varchar(255), primary key(id)
  );`

connection.query(tableSql)

const sql = `INSERT INTO people(name) values('${random.first()}')`
connection.query(sql)

function getNames() {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM people;',
      (err, result) => {
        return err ? reject(err) : resolve(result)
      }
    )
  })
}

app.get('/', async (req,res) => {
  const result = await getNames()
  const listName = result.map(({name}) => `<li>${name}</li>`)

  res.send(`
    <h1>Full Cycle Rocks!</h1>
    <ul>${listName.join('')}</ul>
  `)
})

app.listen(port, ()=> {
  console.log('Rodando na porta ' + port)
})