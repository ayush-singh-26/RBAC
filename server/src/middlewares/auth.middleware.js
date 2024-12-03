import jsonwebtoken from  "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";


export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")

        if (!token) {
            throw new ApiError(401, 'No Token Provided')
        }

        const decodedToken = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }
        req.user = {
            ...decodedToken, // Attach role and other token data
            role: decodedToken.role || user.role // Ensure role is available
        };

        next();
    }
    catch (error) {
        throw new ApiError(401, "Invalid Access Token");
    }

})