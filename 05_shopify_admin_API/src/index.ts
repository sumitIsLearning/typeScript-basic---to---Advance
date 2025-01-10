import express, { Request, Response } from 'express';
import { shopify, session } from './shopify';


const app = express();
const port = 3000;


app.use(express.json());

app.get("/products", async (req: Request, res: Response) => {

    try {
        const client = new shopify.clients.Graphql({ session });

        const QUERY = `
            query GetProducts($first: Int!) {
                products(first: $first) {
                    edges {
                        node {
                            id
                            title
                            handle
                            description
                        }
                    }
                }
            }
        `;

        const response = await client.request(QUERY,{
            variables:{first:10}
        })

        if (!response) {
            res.status(404).json({
                error: "No Product Found"
            })
            return;
        }
        const products = response.data?.products;
        res.status(200).json({
            message: "products fetched successfully",
            products,
        })
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error: Failed to fetch product"
        })
    }

})

app.get("/product" , async (req:Request , res:Response) => {
    try{
        const productId = req.query.id;
        console.log(productId);
        if(!productId) {
            res.status(400).json({
                error:"product id is required"
            })
        }

        const client = new shopify.clients.Graphql({session});

        const  QUERY = `
        query GetProduct($id:ID!){
            product(id:$id) {
                id
                title
                handle
                description
            }
        }`;

        const response = await client.request(QUERY, {
            variables: {
                id:productId?.toString()
            }
        })

        if(!response.data) {
            res.status(404).json({
                message:"product not found"
            })
        }

        const product = response.data

        res.status(200).json({
            message:"product found successfully",
            product
        })

    } catch(error:any) {
        console.log(error);
        res.status(500).json({
            error:`Internal Server Error: Failed to fetch product`
        })
    }
})


app.listen(port, () => {
    console.log(`server running on: http://localhost:${port}`);
})