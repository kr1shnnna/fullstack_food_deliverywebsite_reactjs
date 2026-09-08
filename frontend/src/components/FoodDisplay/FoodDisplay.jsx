import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list,searchTerm } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you </h2>
      <div className="food-display-list">
       {food_list
  .filter((item) => {

    const matchesCategory =
      category === "All" || category === item.category;

    const matchesSearch =
      item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;

  })
  .map((item) => (

    <FoodItem
      key={item._id}
      id={item._id}
      name={item.name}
      description={item.description}
      price={item.price}
      image={item.image}
    />

  ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
