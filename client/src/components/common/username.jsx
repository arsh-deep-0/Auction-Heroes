import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Username({ userID }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/getUserName/${userID}`);
        setUsername(response.data.data.userName);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, [userID]); 

  return <span>@{username}</span>;
}
