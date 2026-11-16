import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContextDefinition";
import { useContext } from "react";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext);
  return (
    <div className="m-auto w-full rounded-[15px] shadow-[0_0_10px_#00000015] transition-all animate-[fadeIn_1s]">
      <div className="relative">
        <img className="w-full rounded-[15px_15px_0_0]" src={url+'/images/'+image} alt={name} />
        {!cartItems[id] ? (
          <img
            className="absolute bottom-[15px] right-[15px] w-[35px] cursor-pointer rounded-full"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
          />
        ) : (
          <div className="absolute bottom-[15px] right-[15px] flex items-center gap-2.5 rounded-full bg-white p-1.5">
            <img
              onClick={() => removeFromCart(id)}
              className="w-[30px] cursor-pointer"
              src={assets.remove_icon_red}
            />
            <p>{cartItems[id]}</p>
            <img className="w-[30px] cursor-pointer" onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-2.5 flex items-center justify-between">
          <p className="text-xl font-medium">{name}</p>
          <img className="w-[70px]" src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="text-xs text-[#676767]">{description}</p>
        <p className="my-2.5 text-[22px] font-medium text-[tomato]">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
