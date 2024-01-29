import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';


function Login() {
     const {
       register,
       handleSubmit,
       setValue,
       formState: { errors },
     } = useForm();

     const onSubmit = (data) => {
       axios
         .post("http://localhost:8080/user/login", {
           email: data.email,
           password: data.password,
         })
         .then((response) => {
           const user = {
             token: response.data.token,
           };
           console.log(response);
           localStorage.setItem("user", JSON.stringify(user));

           window.location.replace("/home");
         })

         .catch((error) => {
           console.error("Error submitting form:", error);
         });
     };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto my-8 bg-white p-20"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Sign in
        </h2>

        <label className="block mb-4">
          <span className="text-gray-700">Email:</span>
          <input
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Password:</span>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </label>

        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded-md  hover:bg-orange-600  focus:outline-none focus:shadow-outline-blue mb-2"
        >
          Sign in
        </button>
        <div className="flex">
          <h4 className="mr-2">Don’t have an account? </h4>
          <a href={`/register`}>
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
              SignUp
            </h2>
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login
