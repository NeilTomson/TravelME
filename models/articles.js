const mongoose =require("mongoose")
const slugify =require("slugify")
const marked =require("marked") 
const createDomPurifiy=require("dompurify")
const {JSDOM}=require("jsdom")

const dompurify =createDomPurifiy(new JSDOM().window)


const articleSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    descrition:{
        type:String,

    },
    // markdown:{
    //     type:String,
    //     required:true
    // },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    slug:{
        type:String,
        require:true,
        unique:true
    },


})
articleSchema.pre("validate",function(next){
    if(this.title){
        this.slug=slugify(this.title,{lower:true,strict:true})
        
    }
    next()
})


module.exports =mongoose.model("Article",articleSchema)