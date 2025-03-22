import React from "react";

const Info = () => {

  const url = "http://127.0.0.1:8000/pathport/generate-itinerary";
  const header = {
    "authorization":"",
    "Content-Type": "application/json"
  }
  return (
    <div>
      <h2>Info Page</h2>
      <p>Welcome to the Info page! You can navigate to Login or Signup from the links above.</p>
    </div>
  );
};

export default Info;

