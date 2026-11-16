import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContextDefinition";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {

  const { food_list, searchTerm } = useContext(StoreContext);
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  // Filter food based on category and search term
  const filteredFood = food_list.filter((item) => {

    const matchesCategory =
      Boolean(normalizedSearchTerm) || category === "All" || category === item.category;

    const matchesSearch =
      item.name.toLowerCase().includes(normalizedSearchTerm);

    return matchesCategory && matchesSearch;
  });

  return (

    <div className="mt-[30px]" id="food-display">

      {/* Dynamic heading */}
      <h2 className="text-[max(2vw,24px)] font-semibold">
        {searchTerm
          ? `Search results for "${searchTerm}"`
          : "Top dishes near you"}
      </h2>

      {/* Show food if results exist */}
      {filteredFood.length > 0 ? (

        <div className="mt-[30px] grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-x-[30px] gap-y-[50px]">

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

        <div className="p-[60px_20px] text-center text-[#49557e]">

          <h3 className="mb-2.5 text-2xl">No food found</h3>

          <p className="my-[5px] text-base text-[#747474]">
            No food matches "{searchTerm}".
          </p>

          <p className="my-[5px] text-base text-[#747474]">Try searching for something else.</p>

        </div>

      )}

    </div>
  );
};

export default FoodDisplay;