const express = require('express')
const app = express()
const port = 3000


app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.json());

app.use(express.static(__dirname + 'dist'));


app.listen(port, () => {
    console.log(`Запуск сервера на порту ${port}`)
});