const express = require('express')
const PORT = 3000



const app = express()

// app.use(express.json());

app.use(express.static(__dirname + '/dist'));


app.listen(PORT, () => {
    console.log(`Запуск сервера на порту ${PORT}`)
});