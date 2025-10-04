import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    accessTokenValidUntil: {
        type: Date,
        required: true,
    },
    refreshTokenValidUntil: {
        type: Date,
        required: true,
    },
},
    { timestamps: true, versionKey: false },
);

export const SessionModel = mongoose.model("session", sessionSchema);