import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { prisma } from './prismaClient.js'
import { customError } from './customErrorHandler.js'
dotenv.config()

const isPasswordCorrect = async (password, dbPassword) => {


    return await bcrypt.compare(password, dbPassword);
}

const generateAccessToken = (user) => {
    const accessToken = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email
    },
        process.env.ACCESSTOKEN_KEY,
        {
            expiresIn: '15m'
        }
    )
    return accessToken;
}

const generateRefreshToken = (userId) => {
    const refreshToken = jwt.sign({
        id: userId
    }, process.env.REFRESHTOKEN_KEY, {
        expiresIn: '1d'
    })
    return refreshToken;
}

const generateAccessAndRefereshToken = async (userId) => {

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user) {

        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user.id);
        user.refreshToken = refreshToken;

        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken }
        });

        return { accessToken, refreshToken }
    } catch (error) {
        throw new customError(500, error.message);
    }

}

 const accessTokenOptions = {
    httpOnly: false,
    sameSite: 'none',
    secure: false,
    maxAge: 86400000,
};

const refreshTokenOptions = {
    httpOnly: false,
    sameSite: 'none',
    secure: false,
    maxAge: 864000000,
};
export { isPasswordCorrect, generateAccessAndRefereshToken,accessTokenOptions,refreshTokenOptions }