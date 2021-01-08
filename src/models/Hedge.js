const mongoose = require('mongoose')

const {Schema} = mongoose;

const HedgeSchema = new Schema({
    user: {type: String, default: "normal"},
    title:{type:String, required: true},
    descripcion: {type: String, required: true},
    date: {type: Date, default: Date.now}
    
});


module.exports = mongoose.model('Hedge', HedgeSchema)