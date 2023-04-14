const express = require('express')
const router = require ('./routes/simplerouter')

// Получаем массив данных из таблицы
const app = express()
const PORT = process.env.PORT || 5000

app.use('/api',router)
const start = async () => {
// Выводим данные в консоль
    try {
        app.listen(PORT, ()=> console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }

}

start()