import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js";
import { data } from "../cache/data.js";
import axios from "axios";

const javaURL = process.env.JAVA_URL || "http://localhost:8080/api/v2";
const sendMessage = asyncHandler(async (req, res) => {
    const apiKey = req.headers["x-api-key"];
    const { query } = req.body;

    if (!apiKey) {
        throw new ApiError(400, "API key is required")
    }
    if (!query) {
        throw new ApiError(400, "Query is required")
    }

    const userId = data.get("userId");
    // const userId = "12345";
    if (!userId) {
        throw new ApiError(400, "User is not connected")
    }

    console.log({javaURL})

    const response = await axios.post(`${javaURL}/messages/query`,
        {query: query},
        {
            headers: {
                "x-api-key": apiKey
            }
        }
    )
    console.log("API Response: Server", response.data);

    const io = req.app.get("io");
    io.to(userId).emit("receive-message", { response:response.data });

    return res.status(200).json(new ApiResponse(200, { query, apiKey, userId }, "Message sent successfully"))
})

export {
    sendMessage
}