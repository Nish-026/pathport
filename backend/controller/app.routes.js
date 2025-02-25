const express = require("express");
const appRouter = express.Router();
require("dotenv").config();
const OpenAI = require("openai");
const { AzureOpenAI } = require("openai");

appRouter.post("/generate-itinerary", async (req, res) => {
  const { destination, origin, dates, budget, interests, currency } = req.body;


  const prompt = `Plan a travel itinerary for ${destination} from ${origin} between ${dates.start} and ${dates.end}. The budget is ${currency}${budget}, and the user's interests are: ${interests}. Adjust the number of days and activities based on the duration between ${dates.start} and ${dates.end}. Include activities, landmarks, and restaurants. Ensure the response strictly adheres to the following JSON format:

  {
    "itinerary": {
      "general_information": {
        "Dates": "${dates.start} - ${dates.end} (${Math.ceil((new Date(dates.end) - new Date(dates.start)) / (1000 * 60 * 60 * 24))} days)",
        "Budget": "${currency}${budget} (approximately)",
        "Interests": "${interests}",
        "Currency": "${currency}",
        "Language": "Based on the destination (provide primary spoken language and common secondary languages for tourists)."
      },
      "accommodations": {
        "Option 1 (Budget-Friendly)": "Provide a recommended budget-friendly accommodation with estimated costs per night.",
        "Option 2 (Mid-Range)": "Provide a mid-range accommodation with estimated costs per night.",
        "Note": "Add suggestions for booking platforms, tips for savings, and options with good reviews and breakfast."
      },
      "individual_days": [
        {
          "day_X": {
            "title": "Provide a summary of the day (e.g., 'Arrival & Exploration').",
            "Morning": "Suggested morning activities (e.g., landmarks, attractions, or relaxing options).",
            "Afternoon": "Suggested afternoon activities or landmarks.",
            "Evening": "Suggested evening plans, including dining and optional entertainment.",
            "Restaurant": "Include recommended dining options based on the activities planned."
          }
        }
        // Repeat the day structure for the number of days between ${dates.start} and ${dates.end}.
      ],
      "transportation": {
        "Primary": "Provide information on public transport options (e.g., travel passes, metro, buses).",
        "Alternatives": "Include walking, biking, or other convenient modes of transport.",
        "Airport Transfers": "Recommend affordable and efficient airport transfer options."
      },
      "food": {
        "vegetarian": {
          "Dishes": "List vegetarian dishes available in the destination.",
          "Restaurants": "Include recommended vegetarian and vegan-friendly restaurants."
        },
        "non_vegetarian": {
          "Dishes": "List popular non-vegetarian dishes available in the destination.",
          "Restaurants": "Include recommended restaurants for non-vegetarian meals."
        },
        "Budget Meals": "Include budget-friendly meal options (e.g., bakeries, street food, or meal deals).",
        "Tasting": "Highlight unique local foods or drinks to try."
      },
      "budget_estimation": {
        "Accommodation": "Estimate total accommodation costs based on the duration and options provided.",
        "Transportation": "Provide transportation cost estimates (e.g., travel passes, airport transfers).",
        "Food": "Provide a rough food cost estimate per day multiplied by the trip duration.",
        "Activities & Entrance Fees": "Provide an estimate for entrance fees and planned activities.",
        "Miscellaneous": "Include a buffer for unexpected expenses.",
        "Total Estimated Budget": "Sum up the above expenses for a total budget estimate."
      },
      "suggestions": {
        "Flexibility": "Note that the itinerary can be adjusted based on preferences and pace.",
        "Pre-Booking": "Recommend pre-booking accommodations and popular attractions for convenience.",
        "Safety": "Provide basic safety tips, especially for crowded areas.",
        "Enjoy!": "Encourage a relaxing and enjoyable experience for the traveler."
      }
    }
  }`;  
  // const endpoint = "https://shipthis-openai.openai.azure.com/";  
  // const apiKey ="ab6a5d9e46674054a11814e365536d7e"  
  // const apiVersion = "2024-05-01-preview";  
  // const deployment = "shipthis-openai"
 
  // const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });  
 
  // const result = await client.chat.completions.create({  
  //   messages: [  
  //                 { role: "system", content: `Plan a travel itinerary for ${destination} from ${origin} between ${dates.start} and ${dates.end}. The budget is ${currency}${budget}, and the user's interests are: ${interests}. Include activities, landmarks, and restaurants.` }  
  //   ],
  //   max_tokens: 800,  
  //   temperature: 0.7,  
  //   top_p: 0.95,  
  //   frequency_penalty: 0,  
  //   presence_penalty: 0,  
  //   stop: null
  // });  
 
  // console.log(JSON.stringify(result, null, 2));  




const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCGt912No3OMEcqhBObqlIRGBM2OUjpSS8");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const result = await model.generateContent(prompt);
// console.log(result.response.text());
  try {


    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt,
    //   max_tokens: 300,
    // });
    let cleanJSON = result.response.text().replace(/```json|```/g, '').trim();


    let parsedJSON;
    parsedJSON = JSON.parse(cleanJSON);
    res.json({ data: parsedJSON });
  } catch (err) {
    console.error("Error generating itinerary:", err);
    res.status(500).json({ error: "Error generating itinerary" });
  }
});

module.exports={
  appRouter
}
