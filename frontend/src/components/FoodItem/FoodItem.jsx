import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContextDefinition";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const buyNow = async () => {
    if (!token) {
      await addToCart(id);
      return;
    }

    const added = await addToCart(id);
    if (added) {
      navigate("/cart");
    }
  };

  return (
    <div className="m-auto flex h-full w-full flex-col overflow-hidden rounded-[15px] shadow-[0_0_10px_#00000015] transition-all animate-[fadeIn_1s]">
      <div className="relative">
        <img className="aspect-[4/3] w-full object-cover" src={url+'/images/'+image} alt={name} />
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

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2.5 flex min-h-14 items-start justify-between gap-2">
          <p className="line-clamp-2 text-xl font-medium">{name}</p>
          <img className="mt-1 w-[70px] shrink-0" src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="line-clamp-2 min-h-10 text-xs text-[#676767]">{description}</p>
        <p className="my-2.5 text-[22px] font-medium text-[tomato]">₹{price}</p>
        <button
          type="button"
          className="mt-auto w-full cursor-pointer rounded-lg bg-[tomato] py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          onClick={buyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default FoodItem;
