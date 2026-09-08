import './Add.css'

import { assets } from '../../assets/assets'

import { useState } from 'react'

import axios from 'axios'

import { toast } from 'react-toastify'

const Add = ({ url }) => {

    const [image, setImage] = useState(false)

    const [data, setData] = useState({

        name: '',

        description: '',

        price: '',

        category: '',

        stock: ''

    })

    const onChangeHandler = (event) => {

        const name = event.target.name

        const value = event.target.value

        setData(data => ({

            ...data,

            [name]: value

        }))
    }

    const onSubmitHandler = async (event) => {

        event.preventDefault()

        if (!data.category) {

            toast.error('Please select a category')

            return

        }

        if (!image) {

            toast.error('Please upload an image')

            return

        }

        const formData = new FormData()

        formData.append('name', data.name)

        formData.append('description', data.description)

        formData.append('price', Number(data.price))

        formData.append('category', data.category)

        formData.append('stock', Number(data.stock))

        formData.append('image', image)

        try {

            const response = await axios.post(

                `${url}/api/food/add`,

                formData

            )

            if (response.data.success) {

                setData({

                    name: '',

                    description: '',

                    price: '',

                    category: '',

                    stock: ''

                })

                setImage(false)

                toast.success(response.data.message)

            } else {

                toast.error(response.data.message)

            }

        } catch (error) {

            console.log(error)

            toast.error('Something went wrong')

        }

    }

    return (

        <div className='add'>

            <form className='flex-col' onSubmit={onSubmitHandler}>

                <div className="add-image-upload flex-col">

                    <p>
                        Upload Image
                    </p>

                    <label htmlFor='image'>

                        <img

                            src={

                                image

                                    ? URL.createObjectURL(image)

                                    : assets.upload_area

                            }

                        />

                    </label>

                    <input

                        onChange={(e) => setImage(e.target.files[0])}

                        type="file"

                        id='image'

                        hidden

                        required

                    />

                </div>


                <div className="add-product-name flex-col">

                    <p>
                        Product Name
                    </p>

                    <input

                        onChange={onChangeHandler}

                        value={data.name}

                        type="text"

                        name='name'

                        placeholder='Product Name'

                        required

                    />

                </div>


                <div className="add-product-description flex-col">

                    <p>
                        Product Description
                    </p>

                    <textarea

                        onChange={onChangeHandler}

                        value={data.description}

                        name="description"

                        rows='6'

                        placeholder='Product Description'

                        required

                    />

                </div>


                <div className="add-category-price">


                    <div className="add-category flex-col">

                        <p>
                            Product Category
                        </p>

                        <select

                            onChange={onChangeHandler}

                            value={data.category}

                            name='category'

                            required

                        >

                            <option value="">
                                Select Category
                            </option>

                            <option value="Salad">
                                Salad
                            </option>

                            <option value="Rolls">
                                Rolls
                            </option>

                            <option value="Deserts">
                                Deserts
                            </option>

                            <option value="Sandwich">
                                Sandwich
                            </option>

                            <option value="Non-Veg">
                                Non-Veg
                            </option>

                            <option value="Pure Veg">
                                Pure Veg
                            </option>

                            <option value="Pasta">
                                Pasta
                            </option>

                            <option value="Noodles">
                                Noodles
                            </option>

                        </select>

                    </div>


                    <div className="add-price flex-col">

                        <p>
                            Product Price
                        </p>

                        <input

                            onChange={onChangeHandler}

                            value={data.price}

                            type='number'

                            name='price'

                            placeholder='₹100'

                            min='1'

                            required

                        />

                    </div>


                    {/* NEW STOCK FIELD */}

                    <div className="add-price flex-col">

                        <p>
                            Available Stock
                        </p>

                        <input

                            onChange={onChangeHandler}

                            value={data.stock}

                            type='number'

                            name='stock'

                            placeholder='Available quantity'

                            min='1'

                            required

                        />

                    </div>

                </div>


                <button

                    type='submit'

                    className='add-btn'

                >

                    ADD

                </button>

            </form>

        </div>

    )

}

export default Add