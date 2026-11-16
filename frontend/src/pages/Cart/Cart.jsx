import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContextDefinition'
import AuthAlert from '../../components/AuthAlert/AuthAlert'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const {cartItems,food_list,removeFromCart,getTotalCartAmount,url,token} = useContext(StoreContext);

  const navigate=useNavigate();

  if (!token) {
    return <AuthAlert onClose={() => navigate('/')} />;
  }

  const cartItemsList = food_list.filter((item) => cartItems[item._id] > 0);

  if (cartItemsList.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center gap-4 pb-20 pt-[100px] text-center">
        <svg
          className="size-24 text-[#8d96b2]"
          viewBox="0 0 64 64"
          fill="none"
          role="img"
          aria-label="Empty shopping cart"
        >
          <path d="M8 12h7l5.5 31h29L56 22H18" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 50a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM48 50a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" fill="currentColor" />
          <path d="M27 29h16M29 36h12" stroke="white" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <h1 className="text-2xl font-semibold text-[#333]">Your cart is empty</h1>
        <p className="text-[#777]">Add some delicious food to get started.</p>
        <button
          type="button"
          className="mt-2 cursor-pointer rounded bg-[tomato] px-6 py-3 font-medium text-white hover:opacity-90"
          onClick={() => navigate('/')}
        >
          Browse Menu
        </button>
      </div>
    );
  }

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 40;
   
  return (
    <div className='min-h-[calc(100vh-100px)] pb-20 pt-[100px]'>
<div>
  <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-[max(1vw,12px)] text-gray-500 max-[750px]:text-[11px]">
    <p>Items</p>
    <p>Title</p>
    <p>Price</p>
    <p>Quantity</p>
    <p>Total</p>
    <p>Remove</p>
  </div>
  <br />
  <hr />
  {cartItemsList.map((item)=>{
if(cartItems[item._id]>0){
  return (
    <div key={item._id}>
 <div className="my-2.5 grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-black">
   <img className="w-[50px]" src={url+'/images/'+item.image} alt={item.name}/>
      <p>{item.name}</p>
      <p>₹{item.price}</p>
      <p>{cartItems[item._id]}</p>
      <p>₹{item.price*cartItems[item._id]}</p>
      <p onClick={()=>removeFromCart(item._id)} className='cursor-pointer text-[tomato]'>x</p>
    </div>
     <hr />

    </div>
   
  )
}
  })}
</div>
<div className="mt-20 flex justify-between gap-[max(12vw,20px)] max-[750px]:flex-col-reverse">
  <div className="flex min-w-0 flex-1 flex-col gap-5">
    <h2>Cart Totals</h2>
    <div>
      <div className="flex justify-between text-[#555]">
        <p>Subtotal</p>
        <p>₹{getTotalCartAmount()}</p>
      </div>
      <hr/>
      <div className="flex justify-between text-[#555]">
        <p>Delivery Fee</p>
        <p>₹{deliveryFee}</p>
      </div>
      <hr/>
      <div className="flex justify-between text-[#555]">
        <b>Total</b>
        <b>₹{getTotalCartAmount()+deliveryFee}</b>
      </div>
    </div>
     <button className="w-[max(15vw,200px)] cursor-pointer rounded border-none bg-[tomato] py-3 text-white" onClick={()=>navigate('/order')}>Proceed to Checkout</button>
</div>
<div className="min-w-0 flex-1">
  <div>
    <p>If you have a promo code, enter it here </p>
    <div className='mt-2.5 flex items-center justify-between rounded bg-[#eaeaea]'>
      <input className="border-none bg-transparent pl-2.5 outline-none" type='text' placeholder='promo code' />
      <button className="w-[max(10vw,150px)] cursor-pointer rounded border-none bg-black px-[5px] py-3 text-white">Apply</button>

    </div>
  </div>
</div>
</div>
</div>
  )
}

export default Cart