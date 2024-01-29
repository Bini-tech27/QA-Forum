import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IpAddress } from "../IpAddress";
import profile from "../assets/profile.png";
import axios from "axios";

function Home() {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [token, setToken] = useState(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`${IpAddress}/all-questions`, {
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

  return (
    <div>
      <Link
        to="/question"
        className="mx-24  py-2 px-6 rounded bg-blue-700 text-white"
      >
        Ask Question
      </Link>
      <div className="mt-4">
        {question?.questions?.map((item) => (
          <Link to={`/answer/${item.id}`}>
            <hr className="mx-32" />
            <div className="mx-32 hover:bg-gray-200  ">
              <div className="flex">
                <div className="w-24">
                  <img className="w-16" src={profile} alt="" />
                  <p>{item?.userId}</p>
                </div>
                <h1 className="mx-32 p-8 ">{item.title}</h1>
              </div>
            </div>
            <hr className="mx-32" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
