import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import './Cart.css'
const Cart = () => {
  const {cartItems,food_list,removeFromCart,getTotalCartAmount} = useContext(StoreContext); 
  return (
    <div className='cart'>
<div className="cart-items">
  <div className="cart-items-title">
    <p>Items</p>
    <p>Title</p>
    <p>Price</p>
    <p>Quantity</p>
    <p>Total</p>
    <p>Remove</p>
  </div>
  <br />
  <hr />
  {food_list.map((item,index)=>{
if(cartItems[item._id]>0){
  return (
    <div>
 <div className="cart-items-title cart-items-item">
      <img  src={item.image}/>
      <p>{item.name}</p>
      <p>₹{item.price}</p>
      <p>{cartItems[item._id]}</p>
      <p>₹{item.price*cartItems[item._id]}</p>
      <p onClick={()=>removeFromCart(item._id)}className='cross'>x</p>
    </div>
     <hr />

    </div>
   
  )
}
  })}
</div>
<div className="cart-bottom">
  <div className="cart-total">
    <h2>Cart Totals</h2>
    <div>
      <div className="cart-total-details">
        <p>Subtotal</p>
        <p>₹{getTotalCartAmount()}</p>
      </div>
      <hr/>
      <div className="cart-total-details">
        <p>Delivery Fee</p>
        <p>₹{2}</p>
      </div>
      <hr/>
      <div className="cart-total-details">
        <b>Total</b>
        <b>₹{getTotalCartAmount()+2}</b>
      </div>
    </div>
     <button>Proceed to Checkout</button>
</div>
<div className="cart-promocode">
  <div>
    <p>If you have a promo code, enter it here </p>
    <div className='cart-promocode-input'>
      <input type='text' placeholder='promo code' />
      <button>Apply</button>

    </div>
  </div>
</div>
</div>
</div>
  )
}

export default Cart