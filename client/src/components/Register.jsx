import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { IpAddress } from "../IpAddress";

function Register() {
    const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
    let userInfo = {
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        password: data.password,
    };

    axios
      .post(`${IpAddress}/user/register`, userInfo)

      .then((response) => {
        console.log(response);
        window.location.replace("/");
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
          Create Account
        </h2>

        <label className="block mb-4">
          <span className="text-gray-700">First Name:</span>
          <input
            type="text"
            {...register("firstname", { required: "First name is required" })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.firstname && (
            <p className="text-red-500">{errors.firstname.message}</p>
          )}
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Last Name:</span>
          <input
            type="text"
            {...register("lastname", { required: "Last name is required" })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.lastname && (
            <p className="text-red-500">{errors.lastname.message}</p>
          )}
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Username:</span>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </label>

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
          className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:shadow-outline-blue"
        >
          Sign Up
        </button>

        <div className="flex">
          <h4 className="mr-2">Already have an account?</h4>
          <a href={`/sign-in`}>
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
              Sign in
            </h2>
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
