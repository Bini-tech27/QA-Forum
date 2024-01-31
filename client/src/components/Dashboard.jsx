import React, { useEffect, useState } from "react";
import { IpAddress } from "../IpAddress";
import axios from "axios";

function Dashboard() {
  const [allUser, setAllUser] = useState({});
  const [question, setQuestion] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${IpAddress}/user/numberQuestion`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setQuestion(response.data);
      })
      .catch((error) => {
        console.log("object", error);
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <div>
      <h1>This is Dashboard</h1>
      <table className="min-w-full border border-collapse border-gray-300 mt-5">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">UserId</th>
            <th className="border p-2">User Name</th>
            <th className="border p-2">Number of Questions</th>
          </tr>
        </thead>
        <tbody>
          {question?.users?.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="border p-2">{item.userId}</td>
              <td className="border p-2">{item.username}</td>
              <td className="border p-2">{item.numberOfQuestions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
