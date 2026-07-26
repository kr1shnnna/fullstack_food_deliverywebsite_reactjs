import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import './Cart.css'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url} = useContext(StoreContext);

  const navigate=useNavigate();
  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 40;
   
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
  {food_list.map((item)=>{
if(cartItems[item._id]>0){
  return (
    <div>
 <div className="cart-items-title cart-items-item">
      <img  src={url+'/images/'+item.image}/>
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
        <p>₹{deliveryFee}</p>
      </div>
      <hr/>
      <div className="cart-total-details">
        <b>Total</b>
        <b>₹{getTotalCartAmount()+deliveryFee}</b>
      </div>
    </div>
     <button onClick={()=>navigate('/order')}>Proceed to Checkout</button>
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