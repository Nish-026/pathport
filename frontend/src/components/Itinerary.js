import React from "react";

const Itinerary = ({ data }) => {
  if (!data) return <p>Loading...</p>;

  const {
    general_information,
    accommodations,
    individual_days,
    transportation,
    food,
    budget_estimation,
    suggestions,
  } = data;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">Trip Itinerary</h1>
        </div>

        {/* General Information */}
        <div className="section-container">
          <h2 className="section-header">General Information</h2>
          <div className="flex-container">
            <div className="info-box bg-blue">
              <div className="box-title">Dates</div>
              <div>{general_information.Dates}</div>
            </div>
            <div className="info-box bg-blue">
              <div className="box-title">Budget</div>
              <div>{general_information.Budget}</div>
            </div>
            <div className="info-box bg-blue">
              <div className="box-title">Interests</div>
              <div>{general_information.Interests}</div>
            </div>
          </div>
        </div>

        {/* Accommodations */}
        <div className="section-container">
          <h2 className="section-header">Accommodations</h2>
          <div className="flex-container">
            <div className="info-box bg-green">
              <div className="box-title">Budget-Friendly Option</div>
              <div>{accommodations["Option 1 (Budget-Friendly)"]}</div>
            </div>
            <div className="info-box bg-yellow">
              <div className="box-title">Mid-Range Option</div>
              <div>{accommodations["Option 2 (Mid-Range)"]}</div>
            </div>
            <div className="info-box bg-red">
              <div className="box-title">Note</div>
              <div>{accommodations?.Note}</div>
            </div>
          </div>
        </div>

        {/* Daily Itinerary */}
        <div className="section-container">
          <h2 className="section-header">Daily Itinerary</h2>
          <div className="flex-container">
            {individual_days.map((day, index) => {
              const key = Object.keys(day)[0];
              const details = day[key];
              return (
                <div key={index} className="info-box bg-purple ">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-3 pb-2 border-b border-indigo-200">
                    {details?.title}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="mb-3">
                        <div className="box-title">Morning</div>
                        <div>{details?.Morning}</div>
                      </div>
                      <div className="mb-3">
                        <div className="box-title">Afternoon</div>
                        <div>{details?.Afternoon}</div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-3">
                        <div className="box-title">Evening</div>
                        <div>{details?.Evening}</div>
                      </div>
                      <div>
                        <div className="box-title">Restaurant</div>
                        <div>{details?.Restaurant}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transportation */}
        <div className="section-container">
          <h2 className="section-header">Transportation</h2>
          <div className="flex-container">
            <div className="info-box bg-blue">
              <div className="box-title">Primary</div>
              <div>{transportation?.Primary}</div>
            </div>
            <div className="info-box bg-blue">
              <div className="box-title">Alternatives</div>
              <div>{transportation?.Alternatives}</div>
            </div>
            <div className="info-box bg-blue">
              <div className="box-title">Airport Transfers</div>
              <div>{transportation["Airport Transfers"]}</div>
            </div>
          </div>
        </div>

        {/* Food Options */}
        <div className="section-container">
          <h2 className="section-header">Food</h2>
          <div className="flex-container margin_food">
            <div className="info-box bg-green">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="box-title">Vegetarian Dishes</div>
                <div>{food.vegetarian.Dishes}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="box-title">Vegetarian Restaurants</div>
                <div>{food.vegetarian.Restaurants}</div>
              </div>
            </div>
            <div className="info-box bg-red">
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="box-title">Non-Vegetarian Dishes</div>
                <div>{food.non_vegetarian.Dishes}</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="box-title">Non-Vegetarian Restaurants</div>
                <div>{food.non_vegetarian.Restaurants}</div>
              </div>
            </div>
          </div>
          <div className="flex-container">
            <div className="info-box bg-yellow">
              <div className="box-title">Budget Meals</div>
              <div>{food["Budget Meals"]}</div>
            </div>
            <div className="info-box bg-purple">
              <div className="box-title">Tasting</div>
              <div>{food["Tasting"]}</div>
            </div>
          </div>
        </div>

        {/* Budget Estimation */}
        <div className="section-container">
          <h2 className="section-header">Budget Estimation</h2>
          <div className="flex-container">
            <div className="info-box bg-blue">
              {Object.entries(budget_estimation).map(([key, value], index) => (
                <div
                  key={index}
                  className={key === "Estimated Total" ? "box-title" : ""}
                >
                  <div className="flex justify-between">
                    <span className="text-gray-700">{key}</span>
                    <span
                      className={
                        key === "Estimated Total" ? "text-blue-700" : ""
                      }
                    >
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="section-container">
          <h2 className="section-header">Suggestions</h2>
          <div className="flex-container">
            {Object.entries(suggestions).map(([key, value], index) => (
              <div key={index} className="info-box bg-orange">
                <div className="font-semibold text-orange-700 mb-1">{key}</div>
                <div>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-container">
        Trip itinerary created on {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default Itinerary;
