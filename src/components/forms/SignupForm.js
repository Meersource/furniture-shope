import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from 'react-redux';


const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("This field is required"),
  email: Yup.string().email("Invalid email").required("This field is required"),
  phone: Yup.number().required("This field is required"),
  password: Yup.string()
    .required("This field is required")
    .min(6, "must be of 6 characters long."),
  confirmPassword: Yup.string()
    .required("This field is required")
    .min(6, "must be of 6 characters long")
    .oneOf([Yup.ref("password")], "Password must match"),
  termsAndCondtions: Yup.boolean().oneOf(
    [true],
    "Please accept terms and conditons"
  ),
});

const SignupForm = () => {

  const [signup, setSignup] = useState();

  // console.log("signup", signup)

  // const Submit = async (values) => {
  //   const { confirmPassword, ...data } = values;

  //   const response = await axios
  //     .post("http://localhost:3004/api/auth/register", data)
  //     .catch((err) => {
  //       if (err && err.response) console.log(err.response.data.message);
  //       // setSuccess(null);
  //     });

  //   if (response && response.data) {
  //     // setError(null);
  //     // setSuccess(response.data.message);
  //     Formik.resetForm();
  //   }
  // };


  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          gender: "male",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          subscription: "",
          termsAndCondtions: false,
          additionalInfoFlag: false,
          additionalInfo: "",
        }}
        validationSchema={SignUpSchema}
        // onSubmit= {Submit}
        onSubmit={async (values) => {


          const { confirmPassword, ...data } = values;



          //   let result =await fetch("http://localhost:3004/api/auth/register", {
          //     method: "POST",
          //     headers: { "Content-Type": "application/json","Accept":'pplication/json' },
          //     body: JSON.stringify(data),
          //   })

          // result = await result.json()
          // console.log("result",result)

          const res = await axios.post('http://localhost:3004/api/auth/register', data)
          console.log("res", res)




          // console.log(values);
          // fetch('http://localhost:3004/api/auth/register',values ).then((response)=>console.log(response)).catch(err=>console.log(err))
          // // setSignup(values)
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label for="firstName">First Name</label>
              <input
                type="text"
                className="form-control block p-1 rounded  px-2 border-2  outline-none w-full mt-1 mb-2"

                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <span className="field_error">{formik.errors.firstName}</span>
              )}
            </div>
            <div className="form-group mt-2">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                className="form-control block p-1 rounded  px-2 border-2  outline-none w-full mt-1 mb-2"

                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <span className="field_error">{formik.errors.lastName}</span>
              )}
            </div>
            <div className="form-group mt-2">
              <label>Gender</label>
              <div className="flex">
                <div className="form-check form-check-inline">
                  <input

                    // className="form-check-input  block p-1 rounded bg-[#D7E5F0] px-2 border-2  outline-none w-full mt-1 mb-2"

                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.gender === "male"}
                  />
                  <label className="form-check-label pl-1" for="male">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline pl-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.gender === "female"}
                  />
                  <label className="form-check-label pl-1" for="female">
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline pl-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="other"
                    value="other"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.gender === "other"}
                  />
                  <label className="form-check-label pl-1" for="other">
                    Other
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group mt-2">
              <label for="email">Email</label>
              <input
                type="text"
                className="form-control block p-1 rounded  px-2 border-2  outline-none w-full mt-1 mb-2"
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
              <label for="phone">Phone Number</label>
              <input
                type="number"
                className="form-control block p-1 rounded  px-2 border-2  outline-none w-full mt-1 mb-2"

                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone && (
                <span className="field_error">{formik.errors.phone}</span>
              )}
            </div>
            <div className="form-group mt-2">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control block p-1 rounded px-2 border-2  outline-none w-full mt-1 mb-2"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <span className="field_error">{formik.errors.password}</span>
              )}
            </div>
            <div className="form-group mt-2">
              <label for="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control block p-1 rounded  px-2 border-2  outline-none w-full mt-1 mb-2"

                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <span className="field_error">
                    {formik.errors.confirmPassword}
                  </span>
                )}
            </div>

            <div className="form-group mt-2">
              <label for="confirmPassword">Subscription</label>
              <select
                className="form-control block p-1 rounded  px-2 border-2  outline-none w-full mt-1 mb-2"

                name="subscription"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subscription}
              >
                <option value="">Select</option>
                <option value="subscription-1">Free</option>
                <option value="subscription-2">Pro</option>
                <option value="subscription-3">Enterprise</option>
              </select>
            </div>

            <div className="form-group mt-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="additionalInfoFlag"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.additionalInfoFlag}
                />
                <label
                  className="form-check-label pl-1"
                  htmlFor="additionalInfoFlag"
                >
                  Additional Information
                </label>
              </div>
            </div>

            {formik.values.additionalInfoFlag && (
              <div className="form-group mt-2">
                <label htmlFor="additionalInfo">
                  Enter Additional Information
                </label>
                <textarea
                  className="form-control block p-1 rounded  px-2 border-2  outline-none w-full mt-1 mb-2"

                  name="additionalInfo"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.additionalInfo}
                ></textarea>
                {formik.touched.additionalInfo &&
                  formik.errors.additionalInfo && (
                    <span className="field_error">
                      {formik.errors.additionalInfo}
                    </span>
                  )}
              </div>
            )}

            <div className="form-group mt-2">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="termsAndCondtions"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.termsAndCondtions}
                />
                <label className="form-check-label pl-1" htmlFor="termsAndCondtions">
                  Accept terms and conditions.
                </label>
              </div>
              {formik.touched.termsAndCondtions &&
                formik.errors.termsAndCondtions && (
                  <span className="field_error">
                    {formik.errors.termsAndCondtions}
                  </span>
                )}
            </div>

            <div className="d-grid mt-2">
              <button type="submit" className="btn btn-primary btn-block w-full">
                Sign Up
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
