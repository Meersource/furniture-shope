import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        products: [],
        qty:0,
        total:0,
        token:'',
       isLiggedIn: false,

        
    },
    reducers:{

      authToken(state, action){
        const res= action?.payload
        console.log("tokrn", res)
        state.token=res
        state.isLiggedIn=true;
            // state?.token.push(action?.payload)
      },
      Logout(state) {
        state.isLiggedIn = false;
        state.token = null;
      },
        add(state, action) {
            console.log("payload", action.payload)
            // state?.products?.push(action.payload)
            const existingIndex = state.products.findIndex(
                (item) => item.id === action.payload.id
              );        
              if (existingIndex >= 0) {
                state.products[existingIndex] = {
                  ...state.products[existingIndex],
                  qty: state.products[existingIndex].qty + 1,
                };
                toast.info("Increased product quantity", {
                  position: "top-left",
                });
              } else {
                let tempProductItem = { ...action.payload, qty: 1 };
                state.products.push(tempProductItem);
                toast.success("Product added to cart", {
                  position: "bottom-left",
                });
              }
      },
        remove(state, action) {
            // return [state?.products?.filter?.(item => item.id !== action.payload)]
                state.products.map((cartItem) => {
                  if (cartItem.id === action.payload.id) {
                    const nextProducts = state.products.filter(
                      (item) => item.id !== cartItem.id
                    );
          
                    state.products = nextProducts;
          
                    toast.error("Product removed from cart", {
                      position: "bottom-left",
                    });
                  }
                //   localStorage.setItem("productsCart", JSON.stringify(state.products));
                  return state;
                });
           
        },
        // increaseQty(state, action) {
        //     let total;
        //  state.qty = state.qty + 1
        //  state.total= state.products.map((item) => total = item.price * state.qty) 
        //  state.total = total
        // },
        decreaseQty(state, action) {
                const itemIndex = state.products.findIndex(
                  (item) => item.id === action.payload.id
                );
          
                if (state.products[itemIndex].qty > 1) {
                  state.products[itemIndex].qty -= 1;
          
                  toast.info("Decreased product quantity", {
                    position: "bottom-left",
                  });
                } else if (state.products[itemIndex].qty === 1) {
                  const nextProducts = state.products.filter(
                    (item) => item.id !== action.payload.id
                  );
          
                  state.products = nextProducts;
          
                  toast.error("Product removed from cart", {
                    position: "bottom-left",
                  });
                } 
           },
           getTotals(state, action) {
            let { total, qty } = state.products.reduce(
              (cartTotal, cartItem) => {
                const { price, qty } = cartItem;
                const itemTotal = price * qty;
      
                cartTotal.total += itemTotal;
                cartTotal.qty += qty;
      
                return cartTotal;
              },
              {
                total: 0,
                qty: 0,
              }
            );
            total = parseFloat(total.toFixed(2));
            state.qty = qty;
            state.total = total;
          },
    }
})
export const { add, remove, increaseQty, decreaseQty, getTotals, authToken, Logout } = cartSlice.actions

export default cartSlice.reducer