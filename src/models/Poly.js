const mongoose = require('mongoose')

const {Schema} = mongoose;

const PolySchema = new Schema({
    name:{type:String, required: true},
    decription: {type: String, required: true},
    points: {type: Array, required:true, "default" : []},
    user:{type:String, required:true}
});


module.exports = mongoose.model('Poly', PolySchema)