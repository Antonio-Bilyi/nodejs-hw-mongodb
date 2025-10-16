import mongoose, { Schema } from "mongoose";

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        enum: ["work", "home", "personal"],
        required: true,
        default: "personal",
    },
    photo: {
        type: String,
        required: false,
        default: null,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
},
    { timestamps: true, versionKey: false });

export const ContactModel = mongoose.model("Contact", contactSchema);