import { useEffect, useState } from "react";
import axios from "axios";
import StockModal from "../components/StockModal/StockModal";
import AuthAlert from "../components/AuthAlert/AuthAlert";
import { StoreContext } from "./StoreContextDefinition";

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url='http://localhost:4000';
  const [token,setToken]=useState(() => localStorage.getItem('token') || '');
  const [food_list,setFoodList]=useState([]);

  const [showStockModal, setShowStockModal] = useState(false);

const [stockInfo, setStockInfo] = useState({
  foodName: "",
  stock: 0
});

const [searchTerm, setSearchTerm] = useState("");
const [showAuthAlert, setShowAuthAlert] = useState(false);






  const addToCart = async (itemId) => {

  if (!token) {
    setShowAuthAlert(true);
    return false;
  }

  const foodItem = food_list.find((item) => item._id === itemId);

  if (!foodItem) {
    return false;
  }

  const currentQuantity = cartItems[itemId] || 0;

  // Check available stock
  
  if (currentQuantity >= foodItem.stock) {

  setStockInfo({
    foodName: foodItem.name,
    stock: foodItem.stock
  });

  setShowStockModal(true);

  return;
}


  if (!cartItems[itemId]) {

    setCartItems((prev) => ({
      ...prev,
      [itemId]: 1
    }));

  } else {

    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1
    }));

  }

  if (token) {

    await axios.post(
      url + '/api/cart/add',
      { itemId },
      { headers: { token } }
    );

  }

  return true;

};

  const removeFromCart = async(itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }

  const fetchFoodList = async () => {
    const response=await axios.get(url+'/api/food/list');
    setFoodList(response.data.data);
  }

  const loadCartData= async(token)=>{
    const response=await axios.post(url+'/api/cart/get',{},{headers:{token}});
    setCartItems(response.data.cartData || {});

  }


useEffect(()=>{
  
  async function loadData(){
    await fetchFoodList();
    const storedToken = localStorage.getItem('token');
    if(storedToken){
      await loadCartData(storedToken);
    }
  }
  loadData();
},[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    searchTerm,
    setSearchTerm
    
  };



 
  return (
  <StoreContext.Provider value={contextValue}>

    {props.children}

    <StockModal
      show={showStockModal}
      onClose={() => setShowStockModal(false)}
      foodName={stockInfo.foodName}
      stock={stockInfo.stock}
    />
    {showAuthAlert && (
      <AuthAlert onClose={() => setShowAuthAlert(false)} />
    )}

  </StoreContext.Provider>
);
};

export default StoreContextProvider;
