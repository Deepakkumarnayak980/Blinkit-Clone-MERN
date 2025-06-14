import mongoose from "mongoose";

const categorySchems=new mongoose.Schema({
    name:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:''
    },

},{
    timestamps:true
})


const CategoryModel=mongoose.model('category',categorySchems)

export default CategoryModel