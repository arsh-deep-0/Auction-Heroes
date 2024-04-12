import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Fullname({ userID }) {
  const [fullname, setFullname] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/getFullName/${userID}`);
        setFullname(response.data.data.userName);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

  }, [userID]); 

  return <span>{fullname}</span>;
}
