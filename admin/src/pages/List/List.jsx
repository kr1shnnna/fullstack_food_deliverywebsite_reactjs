import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [stockDrafts, setStockDrafts] = useState({});
  const [priceDrafts, setPriceDrafts] = useState({});

  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error in fetching list");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching list");
    }
  }, [url]);

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }
      await fetchList();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Error in removing food item");
    }
  };

  const updateFoodDetails = async (foodId, currentPrice, currentStock) => {
    const stock = stockDrafts[foodId] ?? currentStock;
    const price = priceDrafts[foodId] ?? currentPrice;
    if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
      toast.error("Price must be greater than zero");
      return;
    }
    if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
      toast.error("Stock must be a non-negative whole number");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/food/update`, {
        id: foodId,
        price: Number(price),
        stock: Number(stock),
      });

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      setList((current) =>
        current.map((item) =>
          item._id === foodId
            ? { ...item, price: Number(price), stock: Number(stock) }
            : item
        )
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Error while updating stock");
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(fetchList, 0);
    return () => clearTimeout(timeoutId);
  }, [fetchList]);

  return (
    <div className="ml-[max(5vw,25px)] mt-12 w-[70%] max-w-5xl text-[#6d6d6d]">
      <p className="mb-5 text-lg font-medium text-[#333]">All Food Items</p>
      <div className="w-full text-[13px]">
        <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.7fr_0.5fr] items-center gap-2.5 border border-[#cacaca] bg-[#f9f9f9] px-4 py-3 font-semibold max-[600px]:hidden">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Stock</b>
          <b>Action</b>
        </div>

        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.7fr_0.5fr] items-center gap-2.5 border border-t-0 border-[#cacaca] px-4 py-3 max-[600px]:grid-cols-[1fr_3fr_1fr] max-[600px]:gap-4"
          >
            <img className="w-[50px]" src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <input
              className="w-24 rounded border border-[#c9c9c9] px-2 py-1.5 outline-none focus:border-[tomato]"
              type="number"
              min="0.01"
              step="0.01"
              value={priceDrafts[item._id] ?? item.price}
              onChange={(event) =>
                setPriceDrafts((current) => ({ ...current, [item._id]: event.target.value }))
              }
              aria-label={`Price for ${item.name}`}
            />
            <div className="flex items-center gap-2 max-[600px]:col-span-2">
              <input
                className="w-20 rounded border border-[#c9c9c9] px-2 py-1.5 outline-none focus:border-[tomato]"
                type="number"
                min="0"
                value={stockDrafts[item._id] ?? item.stock}
                onChange={(event) =>
                  setStockDrafts((current) => ({ ...current, [item._id]: event.target.value }))
                }
                aria-label={`Stock for ${item.name}`}
              />
              <button
                type="button"
                className="cursor-pointer rounded bg-[tomato] px-2.5 py-1.5 text-white hover:opacity-90"
                onClick={() => updateFoodDetails(item._id, item.price, item.stock)}
              >
                Save
              </button>
            </div>
            <button
              type="button"
              onClick={() => removeFood(item._id)}
              className="cursor-pointer border-0 bg-transparent text-lg text-[tomato]"
              aria-label={`Remove ${item.name}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
