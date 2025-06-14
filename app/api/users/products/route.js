import { connectToDB } from "@/libs/database"
import Product from "@/models/productModel"
import { verifyJWT } from "@/libs/JWT"

export const GET = async (req) => {
    try {
        await connectToDB()

        const authHeader = req.headers.get('authorization')
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { 
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            })
        }

        const token = authHeader.split(" ")[1]
        const decoded = verifyJWT(token)

        if (!decoded || !decoded.id) {
            return new Response(JSON.stringify({ error: "Invalid token" }), { 
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            })
        }

        const products = await Product.find({ creator: decoded.id })

        return new Response(JSON.stringify({ 
            products,
            count: products.length
        }), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        })

    } catch (error) {
        return new Response(JSON.stringify({ 
            error: "Failed to fetch user's products",
            details: error.message 
        }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
