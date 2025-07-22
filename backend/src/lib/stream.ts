import {StreamChat} from 'stream-chat';
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY as string;
const apiSecret = process.env.STREAM_API_SECRET as string;

if(!apiKey || !apiSecret) {
    console.error("STREAM_API_KEY and STREAM_API_SECRET are missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData: { id: string; name: string; image?: string }) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData
    } catch (error) {
        console.error("Error upserting Stream user:", error);
    }
}

export const generateStreamToken = (userId: string) => {
    try{

        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);

    }catch(error){
        console.error("Error generating Stream token:", error);
    }
}
