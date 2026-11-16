import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";
import Stripe from "stripe";
import 'dotenv/config'

const stripe= new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from frontend

const placeOrder = async (req, res) => {

    const frontend_url = process.env.FRONTEND_URL || 'http://localhost:5173';

    try {

        const requestedItems = Array.isArray(req.body.items) ? req.body.items : [];
        if (requestedItems.length === 0) {
            return res.json({success:false,message:'Your cart is empty'});
        }

        const orderItems = [];
        let subtotal = 0;

        for (const item of requestedItems) {
            const quantity = Number(item.quantity);
            if (!Number.isInteger(quantity) || quantity <= 0) {
                return res.json({success:false,message:'Invalid item quantity'});
            }

            const food = await foodModel.findById(item._id);

            if (!food) {
                return res.json({
                    success: false,
                    message: 'A food item is no longer available'
                });
            }

            if (quantity > food.stock) {
                return res.json({
                    success: false,
                    message: `Only ${food.stock} ${food.name} available in stock`
                });
            }

            const foodItem = food.toObject();
            foodItem.quantity = quantity;
            orderItems.push(foodItem);
            subtotal += food.price * quantity;
        }


        const newOrder = new orderModel({

            userId: req.body.userId,
            items: orderItems,
            amount: subtotal + 40,
            address: req.body.address

        });

        await newOrder.save();

        const line_items = orderItems.map((item) => ({

            price_data: {

                currency: 'inr',

                product_data: {
                    name: item.name
                },

                unit_amount: item.price * 100

            },

            quantity: item.quantity

        }));


        line_items.push({

            price_data: {

                currency: 'inr',

                product_data: {
                    name: 'Delivery Charges'
                },

                unit_amount: 40 * 100

            },

            quantity: 1

        });


        const session = await stripe.checkout.sessions.create({

            line_items: line_items,

            mode: 'payment',

            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}&session_id={CHECKOUT_SESSION_ID}`,

            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,

            metadata: {
                orderId: String(newOrder._id)
            }

        });


        res.json({
            success: true,
            session_url: session.url
        });

    }

    catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: 'Error while placing order'
        });

    }

}

const verifyOrder = async (req, res) => {

    const { orderId, success, sessionId, userId } = req.body;

    try {
        const order = await orderModel.findById(orderId);

        if (!order || String(order.userId) !== String(userId)) {
            return res.json({
                success: false,
                message: 'Order not found'
            });
        }

        if (success === 'true') {
            if (!sessionId) {
                return res.json({success:false,message:'Payment session is missing'});
            }

            const session = await stripe.checkout.sessions.retrieve(sessionId);
            if (
                session.payment_status !== 'paid' ||
                session.metadata?.orderId !== String(order._id)
            ) {
                return res.json({success:false,message:'Payment was not confirmed'});
            }

            // Prevent stock from being reduced twice
            if (order.payment) {
                return res.json({
                    success: true,
                    message: 'Order already verified'
                });
            }


            // Check stock again before reducing it
            for (const item of order.items) {

                const food = await foodModel.findById(item._id);

                if (!food || food.stock < item.quantity) {

                    return res.json({
                        success: false,
                        message: `${item.name} is out of stock`
                    });

                }
            }


            // Reduce stock
            for (const item of order.items) {

                await foodModel.findByIdAndUpdate(
                    item._id,
                    {
                        $inc: {
                            stock: -item.quantity
                        }
                    }
                );

            }


            await orderModel.findByIdAndUpdate(
                orderId,
                { payment: true }
            );

            await userModel.findByIdAndUpdate(
                order.userId,
                { cartData: {} }
            );


            res.json({
                success: true,
                message: 'Payment successful'
            });

        }

        else {
            if (!order.payment) {
                await orderModel.findByIdAndDelete(orderId);
            }

            res.json({
                success: false,
                message: 'Payment failed'
            });

        }

    }

    catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: 'Error while verifying order'
        });

    }

}


// user orders for frontend
// users orders for frontend

const userOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({
            userId: req.body.userId,
            payment: true
        });

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error while fetching orders"
        });
    }
};

//listing orders for admin panel

const listOrders=async(req,res)=>{
try{
const orders=await orderModel.find({payment:true}).sort({date:-1});
res.json({success:true,data:orders})
}
catch(error){
    console.log(error);
    res.json({success:false,message:'Error while listing orders'})
}
}


//api for updating order status 
const updateStatus= async(req,res)=>{

    try{
        const allowedStatuses = ['Food Processing', 'Out for delivery', 'Delivered'];
        if (!allowedStatuses.includes(req.body.status)) {
            return res.json({success:false,message:'Invalid delivery status'});
        }

        const order = await orderModel.findOneAndUpdate(
            {_id:req.body.orderId, payment:true},
            {status:req.body.status},
            {new:true}
        );
        if (!order) {
            return res.json({success:false,message:'Paid order not found'});
        }
        res.json({success:true,message:'Order status updated successfully'})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:'Error while updating order status'})

    }

}


export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus};