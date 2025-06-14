import jwt from "jsonwebtoken"

export const authentication = (handler) => {
    return async (req, ...args) => {
        const authHeader = req.headers.get("authorization");

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return new Response(JSON.stringify({error : "Unauthorized user"}), { status: 401 })
        }

        const token = authHeader.split(" ")[1]

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            return handler(req, decoded, ...args)
        } catch (error) {
            console.log("JWT Verification failed:" , error.message)
            return new Response(JSON.stringify({ error: "Invalid Token" }), { status: 403 })
        }
    }
}