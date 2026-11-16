import { useState, useEffect, useContext, useCallback } from 'react';
import { StoreContext } from '../../Context/StoreContextDefinition'
import axios from 'axios'
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const {url,token} =useContext(StoreContext);
    const [data,setData]=useState([]);

    const fetchOrders=useCallback(async()=>{
        const response= await axios.post(url+'/api/placeorder/userorders',{},{headers:{token}})
        setData(response.data.data);
    }, [token, url])


    useEffect(()=>{
    if(!token) return;
    const timeoutId = setTimeout(fetchOrders, 0);
    return () => clearTimeout(timeoutId);
    },[fetchOrders, token])


  return (
    <div className='my-[50px]'>
      {data.length > 0 && <h2>My Orders</h2>}
        <div className="mt-[30px] flex flex-col gap-5">
            {data.length === 0 ? (
                <p className="py-16 text-center text-lg text-[#777]">No orders yet.</p>
            ) : data.map((order,index)=>{
                return (
                    <div key={index} className='grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-[30px] border border-[tomato] px-5 py-2.5 text-sm text-[#454545] max-[900px]:grid-cols-[1fr_2fr_1fr] max-[900px]:gap-y-[5px] max-[900px]:text-xs'>
                        <img className="w-[50px]" src={assets.parcel_icon} alt="Order" />
                        <p>{order.items.map((item,index)=>{

                            if(index===order.items.length-1){
                                return item.name+'x'+item.quantity
                            }

                            else{
                                return item.name+'x'+item.quantity+','
                            }

                        })}</p>

                        <p>₹{order.amount}</p>
                        <p>Items:{order.items.length}</p>
                        <p><span className="text-[tomato]">&#x25cf;</span><b className="font-medium text-[#454545]">{order.status}</b></p>
                        <button className="cursor-pointer rounded border-none bg-[#ffe1e1] py-3 text-[#454545] max-[900px]:text-[10px]" onClick={fetchOrders}>Track Order</button>

                    </div>
                )
            })}
        </div>


    </div>
  )
}

export default MyOrders