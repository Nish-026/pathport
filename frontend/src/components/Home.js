// client/src/pages/Home.jsx

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Itinerary from "./Itinerary";
import Currencies from "./Currencies";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/home.scss";
import axios from "axios";
import Swal from 'sweetalert2';

const Home = () => {
  const [origin, setOrigin] = useState();
  const [value, setValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("");
  const [interests, setInterests] = useState("art,history,cuisine");
  const [data, setData] = useState(null);
  const [showComponent, setShowComponent] = useState(false);
  const [error, setError] = useState(""); 


  const handleSearch = async () => {
    if (!value || !origin) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Origin and Destination is required",
      });
    }

    const token = localStorage.getItem("authToken"); // Get token from localStorage
    if (!token) {
      alert("Authentication token is missing. Please log in again.");
      return;
    }

    let payload = JSON.stringify({
      origin:origin,
      destination: value,
      dates: {
        start: startDate,
        end: endDate,
      },
      budget: budget,
      currency: currency,
      interests: interests,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://pathport.onrender.com/pathport/generate-itinerary",
      headers: {
        authorization: `${token}`, // Add 'Bearer'
        "Content-Type": "application/json",
      },
      data: payload,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.data.itinerary);
          setShowComponent(true);
        } else {
          setError("Invalid credentials! Please try again.");
        }
      })
      .catch((error) => {
        const errorMsg =
          error.response?.data?.message ||
          "Login failed! Please check your credentials.";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMsg,
        });
        setError(errorMsg);
      });
  };

  const mockData = [
    {
      name: "New York",
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240321072009/landmark-statue-liberty-new-york-city-famous-landscape-buildings-statue-liberty-uas-tourist-attraction-design-postcard-travel-poster-vector-illustration_1150-56573-compressed.jpg",
    },
    {
      name: "Venice",
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240321072310/travel-around-world-colorful-poster_52683-28357.jpg",
    },
    {
      name: "Gangtok",
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240321072631/flat-ski-station_23-2148010938.jpg",
    },
    {
      name: "Cairo",
      image:
        "https://media.geeksforgeeks.org/wp-content/uploads/20240321072500/egyptian-night-desert-pyramids-sphinx-anubis_107791-1591.jpg",
    },
  ];

  return (
    <div className="home">
      <Navbar />
      <div className="home-wrapper">
        <div className="map">
          <div className="search">
            <div className="search-bar">
              <input
                placeholder="Origin"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              />
              <input
                placeholder="Destination"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="search-bar">
              <input
                type="number"
                placeholder="Budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
              <select
                className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={currency}
                placeholder="Currency"
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="">Select Currency</option>
                {Currencies.map((cur) => (
                  <option key={cur.code} value={cur.code}>
                    {cur.name} ({cur.symbol})
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Interests (comma separated)"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
            <div className="search-bar">
              <button
                className="form__field search_button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <div>
              {/* {places?.map((items, index) => {
                return (
                  <div key={index} onClick={() => handleClick(items)}>
                    <p>{items.place_name}</p>
                  </div>
                );
              })} */}
            </div>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}{" "}
        {showComponent && (
          <div className="min-h-screen bg-gray-100 p-6 margin_top">
            <Itinerary data={data} />
          </div>
        )}
        {/* <div className="recommendations">
          {mockData.map((d, index) => (
            <RecCard key={index} image={d.image} name={d.name} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Home;
