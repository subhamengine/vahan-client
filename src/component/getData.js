import React from 'react'

const getData = async (setData) => {
    try {
      const savedUserResponse = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/get`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await savedUserResponse.json();

      console.log(responseData);

      if (responseData.status === 200) {
        setData(responseData.users.reverse());
      } else {
        console.log(responseData.message);
      }
    } catch (error) {
      console.log("Internal Server Error");
    }
  };

export default getData;