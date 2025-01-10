import '@shopify/shopify-api/adapters/node';
import { LATEST_API_VERSION, shopifyApi, Session } from '@shopify/shopify-api';

import dotenv from 'dotenv';

dotenv.config();

const shopify = shopifyApi({
    apiKey:process.env.API_KEY!,
    apiSecretKey: process.env.API_SECRET!,
    adminApiAccessToken:process.env.SHOPIFY_ACCESS_TOKEN,
    scopes:["read_products"],
    hostName:process.env.HOSTNAME!,
    isEmbeddedApp:false,
    isCustomStoreApp:true,
    apiVersion:LATEST_API_VERSION
})

const session = new Session({
    id: `offline_${process.env.SHOP_URL!}`, // Offline session ID format
    shop: process.env.SHOP_URL!,
    state: 'dummy-state', // Dummy state, as it's not relevant in offline mode
    isOnline: false, // Set to false for offline sessions
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN!,
});

export {
    shopify,
    session
};