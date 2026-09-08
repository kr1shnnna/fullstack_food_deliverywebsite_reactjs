import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {

  const { food_list, searchTerm } = useContext(StoreContext);

  // Filter food based on category and search term
  const filteredFood = food_list.filter((item) => {

    const matchesCategory =
      category === "All" || category === item.category;

    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (

    <div className="food-display" id="food-display">

      {/* Dynamic heading */}
      <h2>
        {searchTerm
          ? `Search results for "${searchTerm}"`
          : "Top dishes near you"}
      </h2>

      {/* Show food if results exist */}
      {filteredFood.length > 0 ? (

        <div className="food-display-list">

          {filteredFood.map((item, index) => (

            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />

          ))}

        </div>

      ) : (

        <div className="no-results">

          <h3>No dishes found 😔</h3>

          <p>
            We couldn't find any food matching "{searchTerm}".
          </p>

          <p>Try searching for something else.</p>

        </div>

      )}

    </div>
  );
};

export default FoodDisplay;