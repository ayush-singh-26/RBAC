import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// SignUp Controller
const signUp = asyncHandler(async (req, res) => {
    const { fullname, email, username, password,role} = req.body;
    console.log({ email, username, password});
    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] }).exec();
    if (existingUser) {
        throw new ApiError(400, "Email or username already exists");
    }

    const user = await User.create({
        fullname,
        email,
        username,
        password,
        role
    });

    const createdUser = await User.findById(user._id).select("-password");

    return res.status(201).json(new ApiResponse(200, createdUser, "User created successfully"));
});

// Login Controller
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    const accessToken = await user.generateAccessToken();

    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  // Set secure flag based on environment
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .json(new ApiResponse(200, { user, accessToken }, "User logged in successfully"));
});

// Logout Controller
const logoutUser = asyncHandler(async (req, res) => {
    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  // Secure flag based on environment
    };

    return res
        .status(200)
        .clearCookie("accessToken", option)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { signUp, loginUser, logoutUser };
