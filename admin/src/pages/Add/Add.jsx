import './Add.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
const Add = () => {

    const [image, setImage]=useState(false)

  return (
    <div className='add'>

        <form className='flex-col'>

            <div className="add-image-upload flex-col">
                <p>
                    Upload Image
                </p>

                <label  htmlFor='image'>
                <img src={image?URL.createObjectURL(image):assets.upload_area} />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])}type="file" id='image' hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>
                    Product Name
                </p>

                <input type="text"  namme='name'placeholder='Product Name' required />
            </div>

            <div className="add-product-description flex-col">
                <p>
                    Product Description
                </p>

                <textarea name="description" rows='6' placeholder='Product Description' required>

                    </textarea> 

            </div>

            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>
                        Product Category
                    </p>
                    <select name='category'>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>
                        Product Price
                    </p>
                    <input  type='number' name='price' placeholder='₹100'/>
                    </div> 
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </form>
       
    </div>
  )
}

export default Add
