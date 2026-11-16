import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const initialData = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
};

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState(initialData);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((current) => ({ ...current, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!data.category) {
      toast.error("Please select a category");
      return;
    }

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("stock", Number(data.stock));
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }

      setData(initialData);
      setImage(false);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const inputClass =
    "rounded border border-[#c9c9c9] bg-white px-2.5 py-2.5 outline-none focus:border-[tomato]";

  return (
    <div className="ml-[max(5vw,25px)] mt-12 w-[70%] max-w-3xl text-[#6d6d6d]">
      <form className="flex flex-col gap-5" onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-2.5">
          <p>Upload Image</p>
          <label htmlFor="image" className="cursor-pointer">
            <img
              className="w-[120px]"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload preview"
            />
          </label>
          <input
            onChange={(event) => setImage(event.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <label className="flex w-[max(40%,280px)] flex-col gap-2.5">
          Product Name
          <input className={inputClass} onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Product Name" required />
        </label>

        <label className="flex w-[max(40%,280px)] flex-col gap-2.5">
          Product Description
          <textarea className={inputClass} onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Product Description" required />
        </label>

        <div className="flex flex-wrap gap-[30px]">
          <label className="flex flex-col gap-2.5">
            Product Category
            <select className={`${inputClass} max-w-[160px]`} onChange={onChangeHandler} value={data.category} name="category" required>
              <option value="">Select Category</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </label>

          <label className="flex flex-col gap-2.5">
            Product Price
            <input className={`${inputClass} max-w-[120px]`} onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="₹100" min="1" required />
          </label>

          <label className="flex flex-col gap-2.5">
            Available Stock
            <input className={`${inputClass} max-w-[120px]`} onChange={onChangeHandler} value={data.stock} type="number" name="stock" placeholder="Quantity" min="0" required />
          </label>
        </div>

        <button type="submit" className="max-w-[120px] cursor-pointer border-0 bg-black px-2.5 py-2.5 text-white">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
