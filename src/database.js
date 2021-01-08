const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/proyNode',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true
}).then(db => console.log('DB conectada')).catch(err => console.error(err))