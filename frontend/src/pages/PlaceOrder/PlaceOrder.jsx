import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContextDefinition";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);

  const [data,setData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })
  const [profileStatus, setProfileStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${url}/api/user/profile`, {
          headers: { token },
        });

        if (!response.data.success) {
          setProfileStatus(response.data.message || "Unable to load your saved profile.");
          return;
        }

        const profile = response.data.data;
        const nameParts = (profile.name || "").trim().split(/\s+/);

        setData({
          firstName: nameParts.shift() || "",
          lastName: nameParts.join(" "),
          email: profile.email || "",
          street: profile.address?.street || "",
          city: profile.address?.city || "",
          state: profile.address?.state || "",
          zipcode: profile.address?.zipcode || "",
          country: profile.address?.country || "",
          phone: profile.phone || "",
        });
      } catch {
        setProfileStatus("Unable to load your saved profile.");
      }
    };

    fetchProfile();
  }, [token, url]);

  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder=async(event)=>{

    event.preventDefault();
    setOrderStatus("");
    setIsSubmitting(true);
    let orderItems=[];
    food_list.map((item)=>{

if(cartItems[item._id]>0){
  
  let itemInfo = {
  ...item,
  quantity: cartItems[item._id]
};
  orderItems.push(itemInfo)
}
    })

    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+40
    }

    try {
      const response= await axios.post(url+'/api/placeorder/placeorder',orderData,{headers:{token}});
      if(response.data.success){
        const {session_url}=response.data;
        window.location.replace(session_url);
        return;
      }

      setOrderStatus(response.data.message || "Unable to start payment.");
    } catch {
      setOrderStatus("Unable to start payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const navigate=useNavigate();

  useEffect(()=>{
if(!token){
  navigate('/cart')
}
else if(getTotalCartAmount()===0){
  navigate('/cart')
}
  },[token, getTotalCartAmount, navigate])

 


  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 40;
  return (
    <form onSubmit={placeOrder} className="mx-auto flex w-full max-w-[1100px] items-start justify-between gap-12 px-1 py-12 max-[750px]:flex-col max-[750px]:gap-8 max-[750px]:py-8">
      <div className="w-full max-w-[max(30%,500px)]">
        <p className="mb-7 text-[30px] font-semibold max-[500px]:text-2xl">Delivery Information</p>
        {profileStatus && <p className="mb-5 text-sm text-red-600">{profileStatus}</p>}
        {orderStatus && <p className="mb-5 rounded-lg bg-[#fff0ed] px-4 py-3 text-sm text-[#c0392b]">{orderStatus}</p>}
        <div className="flex gap-2.5 max-[500px]:flex-col">
          <input className="mb-[15px] w-full rounded border border-[#c5c5c5] p-2.5 outline-[tomato]" required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
          <input className="mb-[15px] w-full rounded border border-[#c5c5c5] p-2.5 outline-[tomato]" required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input className="mb-[15px] w-full rounded border border-[#c5c5c5] p-2.5 outline-[tomato]" required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" />
        <input className="mb-[15px] w-full rounded border border-[#c5c5c5] p-2.5 outline-[tomato]" required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" />

        <div className="flex gap-2.5 max-[500px]:flex-col">
          <input className="mb-[15px] w-full rounded border border-[#c5c5c5] p-2.5 outline-[tomato]" required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" />
          <input className="mb-[15px] w-full rounded border border-[#c5c5c5] p-2.5 outline-[tomato]" required name='state'onChange={onChangeHandler} value={data.state}type="text" placeholder="State" />
        </div>

        <div className="flex gap-2.5 max-[500px]:flex-col">
          <input className="mb-[15px] w-full rounded border border-[#c5c5c5] p-2.5 outline-[tomato]" required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" />
          <input className="mb-[15px] w-full rounded border border-[#c5c5c5] p-2.5 outline-[tomato]" required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" />
        </div>

        <input className="mb-[15px] w-full rounded border border-[#c5c5c5] p-2.5 outline-[tomato]" required name='phone' onChange={onChangeHandler} value={data.phone} type="tel" placeholder="Phone" />
      </div>
      <div className="w-full max-w-[max(40%,500px)] rounded-xl bg-[#fafafa] p-6 sm:p-8 max-[500px]:p-5">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-semibold">Cart Totals</h2>
          <div>

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
          <button disabled={isSubmitting} className="mt-[30px] w-[max(15vw,200px)] cursor-pointer rounded border-none bg-[tomato] py-3 text-white disabled:cursor-not-allowed disabled:opacity-60 max-[500px]:w-full" type='submit'>
            {isSubmitting ? "Starting payment..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
