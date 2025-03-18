import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { customError } from "../utils/customErrorHandler.js";
import { prisma } from "../utils/prismaClient.js";
import { sendEmail } from "../helper/sendEmail.js";
import * as crypto from 'crypto';

import { isPasswordCorrect, generateAccessAndRefereshToken, accessTokenOptions, refreshTokenOptions } from "../utils/utils.js";
import bcrypt from 'bcrypt'

const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    
    const existUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (existUser) {
        return next(new customError(400, "user Already exist"))
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword

        }
    });
    return res.status(201).json(new ApiResponse(201, { userid: user.id }, 'User created successfully'));

})

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    
    const existUser =await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    
    if (!existUser) {
        return next(new customError(400, "User not exist"));
    }
    const validPassword = isPasswordCorrect(password, existUser.password)
    
    if (!validPassword) {
        return next(new customError(400, 'Invalid Password'))
    }
    const { accessToken, refreshToken } = await generateAccessAndRefereshToken(existUser.id);
    const verifyAll = await prisma.user.findFirst({
        where: {
            id: existUser.id
        },
        select: {
            password: true,
            refreshToken: true
        }
    })
    

    // now set all these thing in the cookies and send the response to the frontend

    res.cookie('accessToken', accessToken, accessTokenOptions)
        .cookie('refreshToken', refreshToken, refreshTokenOptions)
        .status(200)
        .json(new ApiResponse(200, { verifyAll, accessToken, refreshToken }, 'user login successfully'))
})

//// now we have to make a controller for the forgot password route

const forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    //  console.log(email)
    const validEMail = await prisma.user.findUnique({
        where: { email: email },
    });


    if (!validEMail) {
        return next(new customError(400, "User not registered"));
    }
    

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);


    await prisma.passwordResetToken.upsert({
        where: { user_id: validEMail.id },
        update: { token: hashedToken, expiresAt },
        create: { user_id: validEMail.id, token: hashedToken, expiresAt },
    });


    const resetLink = `http://localhost:5174/reset-password?token=${resetToken}`;
    
    await sendEmail(email, resetLink);


    res.json(new ApiResponse(200,resetToken,'Password Reset link send'))
});



const resetPassword = asyncHandler(async (req, res, next) => {
    const { password, token } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const resetTokenRecord = await prisma.passwordResetToken.findFirst({
        where: { token: hashedToken },
        include: { user: true },
    });

    if (!resetTokenRecord || resetTokenRecord.expiresAt < Date.now()) {
        return next(new customError(400, "Reset password session expire"));
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
        where: {
            id: resetTokenRecord.user_id
        },
        data: {
            password: hashPassword
        }
    })

    await prisma.passwordResetToken.delete({
        where: {
            id: resetTokenRecord.id
        }
    })

    res.send(new ApiResponse(200, 'Password resest Successfull'))


})

export { registerUser, loginUser, forgotPassword, resetPassword }