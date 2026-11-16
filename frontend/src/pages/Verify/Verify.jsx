import { useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContextDefinition'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useCallback } from 'react'

const Verify = () => {
    const [searchParams]=useSearchParams();
    const success=searchParams.get('success');
    const orderId=searchParams.get('orderId');
    const sessionId=searchParams.get('session_id');
    const {url, token, setCartItems}=useContext(StoreContext);
    const navigate=useNavigate();

    const verifyPayment=useCallback(async()=>{
        const response= await axios.post(url+'/api/placeorder/verify',{success,orderId,sessionId},{headers:{token}})
        if(response.data.success){
            setCartItems({});
            navigate('/myorders')
        }
        else{
            navigate('/cart')
        }
    }, [navigate, orderId, sessionId, setCartItems, success, token, url])

  useEffect(()=>{
    verifyPayment();
  },[verifyPayment])



  return (
    <div className='grid min-h-[60vh]'>
        <div className="size-[100px] place-self-center rounded-full border-[5px] border-[#bdbdbd] border-t-[tomato] animate-[rotate_1s_infinite]">

        </div>
    </div>
  ) 
}

export default Verify