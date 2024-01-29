import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

function Question() {
      const [token, setToken] = useState(localStorage.getItem("user"));
     const {
       register,
       handleSubmit,
       setValue,
       formState: { errors },
     } = useForm();

      const onSubmit = (data) => {
        axios
          .post(
            "http://localhost:8080/post-questions",
            {
              title: data.title,
              description: data.description,
            },
            {
              headers: {
                Authorization: "Bearer " + JSON.parse(token).token,
              },
            }
          )
          .then((response) => {
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
          Ask Question Here
        </h2>

        <label className="block mb-4">
          <span className="text-gray-700">Title:</span>
          <input
            type="text"
            {...register("title", { required: "title is required" })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Description:</span>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </label>
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded-md  hover:bg-orange-600  focus:outline-none focus:shadow-outline-blue mb-2"
        >
          Post Your Question
        </button>
      </form>
    </div>
  );
}

export default Question
