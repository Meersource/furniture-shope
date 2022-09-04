import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { authToken } from '../../store/cartSlice';



const SignUpSchema = Yup.object().shape({

    email: Yup.string().email("Invalid email").required("email is required"),
    password: Yup.string()
        .required("This field is required")
        .min(6, "must be of 6 characters long."),
});

const SignInForm = () => {
    const dispatch= useDispatch()

    const [signup, setSignup] = useState();



    return (
        <>
            <Formik
                initialValues={{

                    email: "",
                    password: "",

                }}
                validationSchema={SignUpSchema}
                // onSubmit= {Submit}
                onSubmit={async (values) => {


////

// async function loginUser(event) {
//     event.preventDefault()

//     const response = await fetch('http://localhost:1337/api/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             email,
//             password,
//         }),
//     })

//     const data = await response.json()

//     if (data.user) {
//         localStorage.setItem('token', data.user)
//         alert('Login successful')
//         window.location.href = '/dashboard'
//     } else {
//         alert('Please check your username and password')
//     }
// }


////


                  const  {email, password }=values
                    try {
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email, password })
                        };

                        let result = await fetch("http://localhost:3004/api/auth/login", requestOptions)
                        // console.log("sign in", result)
                        result = await result.json()
                        console.log("sign in", result)

                        if(result){
                            dispatch(authToken(result?.jwtToken))
                        }

                    } catch (err) {
                        console.log("errors",err)
                    }



                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>



                        <div className="form-group mt-1">
                            <label for="email">Email</label>
                            <input
                                type="text"
                                className="form-control block p-1 rounded bg-[#D7E5F0] px-2 border-2  outline-none w-full mt-1 mb-2"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <span className="field_error">{formik.errors.email}</span>
                            )}
                        </div>

                        <div className="form-group mt-2">
                            <label for="password">Password</label>
                            <input
                                type="password"
                                className="form-control block p-1 px-2 border-2 rounded bg-[#D7E5F0] outline-none w-full mt-1 mb-2"

                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <span className="field_error">{formik.errors.password}</span>
                            )}
                        </div>


                        <div className="d-grid mt-2">
                            <button type="submit" className="btn btn-primary btn-block w-full">
                                Sign In
                            </button>
                        </div>

                        <div style={{display:'flex', marginTop:"5px", justifyContent:"center"}}>
                            Don't have account? 
                            <p style={{color:"blue"}}>SignUp</p>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default SignInForm;
