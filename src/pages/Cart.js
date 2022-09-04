import React ,{useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove, increaseQty, decreaseQty, add, getTotals } from '../store/cartSlice'


const Cart = () => {

    const dispatch = useDispatch();
    const { products, qty, total } = useSelector((state) => state.cart);


    // const handleRemove = (productId) => {
    //     console.log("f", productId)
    //     dispatch(remove(productId));
    // };

    const handleRemove = (product) => {
        dispatch(remove(product));
      };

    // const handleQtyIncrease = () => {
    //     dispatch(increaseQty())
    // }
    // const handleQtyDecrease = () => {
    //     dispatch(decreaseQty())
    // }
    const handleAddToCart = (product) => {
        dispatch(add(product));
      };
      const handleDecreaseCart = (product) => {
        dispatch(decreaseQty(product));
      };
      useEffect(() => {
        dispatch(getTotals());
      }, [products, dispatch]);
    console.log("products", products)
    
    return (
        <div className='bg-[#85929E] pt-40 px-10  flex justify-center'>

            <div className="cartWrapper w-[50%] h-[400px]">

                {products?.map((product) => (

                    <div key={product.id} className="cartCard shadow ">
                        <img className='h-12' src={product.image.type} alt="" />
                        <h5>{product.name}</h5>
                        <h5>${product.price}</h5>
                        <h5>Total : ${ product.price * product.qty}</h5>
                          
                        {/* /// */}

                        <div>
                            <button onClick={() => handleDecreaseCart(product)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="inline-flex w-6 h-6 text-red-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </button>
                            <input
                                type="text"
                                name="qty"
                                value={product?.qty}
                                class="w-12 text-center bg-gray-100 outline-none"
                            />
                          
                            <button onClick={() => handleAddToCart(product)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="inline-flex w-6 h-6 text-green-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </button>
                        </div>



                        {/* /// */}



                        <button
                            className="btn"
                            onClick={() => handleRemove(product)}
                        >
                            Remove
                        </button>
                    </div>

                ))}
                {products?.length <= 0 && <h1 className='text-center font-medium text-2xl'>Cart is empty</h1>}

            </div>

            <div className='bg-[#fff] w-[25%] mr-20 h-[400px] mx-20 p-4 rounded-lg shadow'>
                <div class="mt-2">
                    <div class="py-2 ">
                        <h3 class="text-xl px-4 font-[800] text-blue-600 mb-10">Order Summary</h3>
                        <div class="flex justify-between px-4 py-2">
                            <span class="font-bold">Subtotal</span>
                            <span class="font-bold">${total}</span>
                        </div>
                        <div class="flex justify-between px-4 py-2">
                            <span class="font-bold">Discount</span>
                            <span class="font-bold text-red-600">- $5.00</span>
                        </div>
                        <div class="flex justify-between px-4 py-2">
                            <span class="font-bold">Sales Tax</span>
                            <span class="font-bold">$2.25</span>
                        </div>
                        <div
                            class="
                flex
                items-center
                justify-between
                px-4
                pt-2
                mt-3
                border-t-2">
                            <span class="text-xl font-bold">Total</span>
                            <span class="text-2xl font-bold">${total - 5 + 2.25}.00</span>
                        </div>
                    </div>
                </div>


                <div class="mt-1 text-center">
                    <button class="w-[90%] py-3 font-medium text-lg text-center text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 mt-5">
                        Proceed to Checkout
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Cart;