import { THIRTY_DAY } from "../constants/index.js";
import {
    registerUser, loginUser,
    logoutUser, refreshUserSession,
    sendResetPassword, resetPassword
} from "../services/auth.js";

export async function registerUserController(req, res) {
    const user = await registerUser(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully registered a user!",
        data: user,
    });
};

export async function loginUserController(req, res) {
    const session = await loginUser(req.body);

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAY),
    });
    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAY),
    });

    res.json({
        status: 200,
        message: "Successfully logged in an user!",
        data: {
            accessToken: session.accessToken,
        },
    });
};

const setupSession = (res, session) => {
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAY),
    });
    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + THIRTY_DAY),
    });
};

export async function refreshUserSessionController(req, res) {
    const session = await refreshUserSession({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully refreshed a session!",
        data: {
            accessToken: session.accessToken,
        },
    });
};

export async function logoutUserController(req, res) {
    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    }

    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");

    res.status(204).send();
};

export async function sendResetPasswordController(req, res) {
    await sendResetPassword(req.body.email);
    res.json({
        status: 200,
        message: "Reset password email has been successfully sent.",
        data: {},
    });
};

export async function resetPasswordController(req, res) {
    await resetPassword(req.body.token, req.body.password);
    res.json({
        status: 200,
        message: "Password has been successfully reset.",
        data: {},
    })
};