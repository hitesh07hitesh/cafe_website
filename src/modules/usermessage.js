const { error } = require('jquery')
const mongose = require('mongoose')
const validator = require('validator')

const userSchema = mongose.Schema({
    name:{
        type:String,
        require:true,
        minLength:3
    },
    email:{
        type:String,
        require:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new error("invalid Email id")
            }
        }
    },
    phone:{
        type:Number,
        require:true,
        minLength:10
    },
    message:{
        type:String,
        require:true,
        minLength:3
    },
})


const user = mongose.model('user',userSchema)
module.exports = user