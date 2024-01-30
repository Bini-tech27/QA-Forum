import axios from "axios";
import profile from "../assets/profile.png";
import React, { useEffect, useState } from "react";
import { IpAddress } from "../IpAddress";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function Answer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [answer, setAnswer] = useState({});
  const [token, setToken] = useState(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`${IpAddress}/single-question/${id}`, {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).token,
        },
      })
      .then((response) => {
        setQuestion(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${IpAddress}/answers/${id}`, {
        headers: {
          Authorization: "Bearer " + JSON.parse(token).token,
        },
      })
      .then((response) => {
        setAnswer(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const onSubmit = (data) => {
    axios
      .post(
        `${IpAddress}/post-answers/${id}`,
        {
          answer: data.answer,
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
      <div>
        <div className="mb-6 mx-28">
          <h1 className="font-bold text-3xl ">Question</h1>
          <h2 className=" text-2xl">{question?.single?.title}</h2>
          <p>{question?.single?.description}</p>
        </div>
      </div>
      {answer?.answers?.map((item) => (
        <div key={item.id}>
          <hr className="mx-32" />
          <div className="flex">
            <div className="w-24 mx-32">
              <img className="w-16" src={profile} alt="" />
              <p>{item?.userId}</p>
            </div>
            <p className="mx-32 p-6">{item.answer}</p>
          </div>
          <hr className="mx-32" />
        </div>
      ))}
      <div></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto my-8 bg-white p-20"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Answer The Question Here
        </h1>

        <label className="block mb-4">
          <span className="text-gray-700">Answer:</span>
          <textarea
            {...register("answer", {
              required: "Answer is required",
            })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.answer && (
            <p className="text-red-500">{errors.answer.message}</p>
          )}
        </label>
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:shadow-outline-blue mb-2"
        >
          Post Your Answer
        </button>
      </form>
    </div>
  );
}

export default Answer;
