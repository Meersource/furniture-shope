import React, { useState, useEffect } from 'react';

// import logo
import Logo from '../assets/img/logo.svg';
// import icons
import { CgMenuRight, CgClose } from 'react-icons/cg';
// import data
import { navigation } from '../data';
// import components
import NavMobile from './NavMobile';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiCart } from "react-icons/bi";


import { Logout } from '../store/cartSlice';



const Header = () => {
  const isLogin = useSelector((state) => state?.cart?.isLiggedIn);
  const token = useSelector((state) => state?.cart?.token);

  const dispatch = useDispatch();


  const [bg, setBg] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const cart = useSelector((state) => state.cart.products)
  console.log("cart", cart)
  useEffect(() => {
    // add event listener
    window.addEventListener('scroll', () => {
      // when scrollY is bigger than 50px setBg to true, else false
      return window.scrollY > 10 ? setBg(true) : setBg(false);
    });
  });

  return (
    <header
      className={`${
        // if bg is true
        bg
          ? 'bg-primary py-4 lg:py-6'
          : // if bg is false
          'bg-none'
        }
      fixed left-0 py-8 z-10 w-full transition-all duration-200`}
    >
      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
          {/* logo */}
          <Link to='/'>
            <img className='h-6 lg:h-8' src={Logo} alt='' />
          </Link>
          {/* menu icon */}
          <div
            onClick={() => setMobileNav(!mobileNav)}
            className='md:hidden text-2xl lg:text-3xl text-white cursor-pointer'
          >
            {mobileNav ? <CgClose /> : <CgMenuRight />}
          </div>
          {/* nav */}
          <nav className='hidden md:flex'>
            <ul className='md:flex md:gap-x-12'>
              {navigation.map((item, index) => {
                return (
                  isLogin && token && (
                    <li key={index}>

                      <Link
                        className='capitalize text-white hover:border-b transition-all' to={item.to}>
                        {item.name}
                      </Link>
                    </li>)

                );
              })
              
              
              }
            { isLogin && token && (  <li><Link to='/cart'> <span className='text-[30px] px-2 flex text-white'><BiCart /> <p className=' bg-red-500 text-xs text-center rounded-[50%] w-4 h-4'>{cart?.length < 0 ? '0' : cart?.length}</p> </span> </Link> </li>) }
              {/* <li><Link to='/logout'> Logout </Link> </li> */}
              {isLogin  && token && (
                <li>
                  <button className='capitalize text-white bg-[red] w-20 rounded hover:pink transition-all' onClick={() => dispatch(Logout())}>
                    Logout
                  </button>
                </li>
              )
              }
              {/* {!isLogin && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )} */}
            </ul>
          </nav>
          {/* nav mobile */}
          <div
            className={`${mobileNav ? 'left-0' : '-left-full'
              } md:hidden fixed bottom-0 w-full max-w-xs h-screen transition-all`}
          >
            <NavMobile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
