import foodModel from "../models/foodModel.js";
import fs from 'fs';


// add food item

const addFood = async(req,res)=>{
let image_filename=`${req.file.filename}`;

const food=new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    image:image_filename,
    category:req.body.category,
    stock:req.body.stock
})
try{
    await food.save();
    res.json({success:true,message:'Food item added successfully'})
}
catch(error){
    console.log(error);
    res.json({success:false,message:'Error while adding food item'})
}
}


//all food-list
const listFood=async(req,res)=>{
try{
    const foods=await foodModel.find({});
    res.json({success:true,data:foods})
}
catch(error){
    console.log(error);
    res.json({success:false,message:'Error while fetching food list'})
}

}

//remove food item

const removeFood=async(req,res)=>{
    try{
    const food=await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})

await foodModel.findByIdAndDelete(req.body.id);
res.json({success:true,message:'Food item removed successfully'})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:'Error while removing food item'})
    }
}

const updateStock = async (req, res) => {
    const { id, stock } = req.body;
    const parsedStock = Number(stock);

    if (!id || !Number.isInteger(parsedStock) || parsedStock < 0) {
        return res.json({success:false,message:'Stock must be a non-negative whole number'});
    }

    try {
        const food = await foodModel.findByIdAndUpdate(
            id,
            {stock: parsedStock},
            {new:true, runValidators:true}
        );

        if (!food) {
            return res.json({success:false,message:'Food item not found'});
        }

        res.json({success:true,message:'Stock updated successfully',data:food});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:'Error while updating stock'});
    }
}

const updateFoodDetails = async (req, res) => {
    const { id, price, stock } = req.body;
    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (
        !id ||
        !Number.isFinite(parsedPrice) ||
        parsedPrice <= 0 ||
        !Number.isInteger(parsedStock) ||
        parsedStock < 0
    ) {
        return res.json({success:false,message:'Price must be positive and stock must be a non-negative whole number'});
    }

    try {
        const food = await foodModel.findByIdAndUpdate(
            id,
            {price: parsedPrice, stock: parsedStock},
            {new:true, runValidators:true}
        );

        if (!food) {
            return res.json({success:false,message:'Food item not found'});
        }

        res.json({success:true,message:'Price and stock updated successfully',data:food});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:'Error while updating food details'});
    }
}

export {addFood,listFood,removeFood,updateStock,updateFoodDetails}