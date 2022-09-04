import React, { useState } from 'react';
// import data
import { features } from '../data';
import { useLocation, useNavigate } from "react-router-dom"
import { products } from '../data';
import Header from '../components/Header';
import { BiCart } from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { add } from '../store/cartSlice';


const ViewProduct = () => {
  
  const [allProducts, setAllProducts] = useState([])
  const location = useLocation()
  const navigate= useNavigate()
  const dispatch= useDispatch()
  const { title, subtitle, image, items } = features;
  const { pages } = products;

  const a = pages.map((val) => val).map((v) => v.productList.filter((val) => (val.id === location?.state)))
  // console.log("allProducts", allProducts)
  // a.map((z) => z.length > 0 ? console.log(z) : null)
  // console.log("allProducts", allProducts)


  const handleCart =(product) =>{
    dispatch(add(product))
    // navigate('/cart')
  }


  console.log("location", location?.state)
  return (
    <>
    
    <section className='section bg-[#A6ACAF]'>
      
      <div className='container mx-auto'>


        {
          a.map((product) => product.length > 0 ?
            <div className='flex flex-col lg:flex-row lg:gap-x-[100px] mt-10'>
              {/* image */}
              <div className='flex-1 order-1 lg:-order-1'>
                <img src={product[0].image.type} alt='' className='h-full' />
              </div>
              {/* text */}
              <div className='flex-1 flex flex-col justify-end'>

                <h2 className='title'>{product[0].name}</h2>

                <div className='flex items-center'>
                  <p className='subtitle  mb-2 text-[red] text-lg font-bold  '>Price : </p> <p className='font-bold subtitle mb-2 p-2'>{product[0].price} $</p>
                </div>
                <h2 className='text-lg title'>Details:</h2>
                <p className='mb-4'>{subtitle} High Quality Wholesale Modern Office Desk Chair Office Furniture Commercial Furniture Office Chairs</p>
                {/* items */}
                <div>
                  {items.map((item, index) => {
                    const { icon, title, subtitle } = item;
                    return (
                      <div className='flex mb-6 lg:last:mb-0' key={index}>
                        <div className='text-2xl lg:text-3xl mr-4'>{icon}</div>
                        <div>
                          <h4 className='text-base lg:text-xl font-semibold mb-3'>
                            {title}
                          </h4>
                          <p>{subtitle}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className='w-full flex justify-center'>
                  <button  className='bg-[#aa1818] text-white p-4 rounded w-[50%] mt-5 flex text-lg justify-center hover:bg-black' onClick={()=> handleCart(product[0])}>Add To Cart <span className='text-[25px] px-2'><BiCart /></span></button>

                </div>

              </div>
            </div> : null

          )



        }

      </div>
    </section>
    </>
  );
};

export default ViewProduct;
