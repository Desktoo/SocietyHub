import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET

export const signJWT = (payload, expiresIn = "1h") => {
    return jwt.sign(payload, SECRET, { expiresIn })
}

export const verifyJWT = (token) => {
    try {
        return jwt.verify(token, SECRET)
    } catch (error) {
        console.log(error)
    }
}