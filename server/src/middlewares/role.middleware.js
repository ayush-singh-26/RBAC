import ApiError from "../utils/ApiError.js";

const roleAuthorization = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, "Access Denied: Insufficient permissions"));
        }
        next();
    };
};

export default roleAuthorization;
