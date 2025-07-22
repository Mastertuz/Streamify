import { Response } from "express";
import User from "../models/User";
import { AuthenticatedRequest } from "../types/user";
import FriendRequest from "../models/FriendRequest";

export async function getRecommendedUsers(req: AuthenticatedRequest, res: Response) {

    try {
        const currentUserId = req.user?.id
        const currentUser = req.user

        const reccommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },
                { $id: { $nin: currentUser?.friends } },
                { isOnboarded: true }
            ]
        })

        res.status(200).json(reccommendedUsers)

    } catch (error) {
        console.error("Error fetching recommended users:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export async function getMyFriends(req: AuthenticatedRequest, res: Response) {
    try {

        const user = await User.findById(req.user?._id).select("friends").populate("friends", "fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json(user?.friends);
    } catch (error) {
        console.error("Error fetching friends:", error);
        res.status(500).json({ message: "Internal server error" });

    }

}

export async function sendFriendRequest(req: AuthenticatedRequest, res: Response) {
    try {
        const myId = req.user?.id;
        const { id: recipientId } = req.params;

        if (myId === recipientId) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself" });
        }

        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ message: "Recipient not found" });
        }

        if (recipient.friends?.includes(myId)) {
            return res.status(400).json({ message: "You are already friends with this user" });
        }


        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ]
        })

        if (existingRequest) {
            return res.status(400).json({ message: "Friend request already exists" });
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        })

        res.status(201).json(friendRequest)
    } catch (error) {
        console.error("Error sending friend request:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function acceptFriendRequest(req: AuthenticatedRequest, res: Response) {
    try {
        const { id: requestId } = req.params;
        const friendRequest = await FriendRequest.findById(requestId)

        if( !friendRequest) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        if( friendRequest.recipient.toString() !== req.user?.id) {
            return res.status(403).json({ message: "You are not authorized to accept this friend request" });
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient }
        })

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender }
        })

        res.status(200).json({message: "Friend request accepted successfully"});

    } catch (error) {
        console.error("Error accepting friend request:", error);
        res.status(500).json({ message: "Internal server error" });

    }

}


export async function getFriendRequests(req: AuthenticatedRequest, res: Response) {
    try {
       const incomingRequests = await FriendRequest.find({ recipient: req.user?._id, status: "pending" }).populate("sender", "fullName profilePic nativeLanguage learningLanguage email");

       const acceptedRequests = await FriendRequest.find({ sender: req.user?._id, status: "accepted" }).populate("recipient", "fullName profilePic");

       res.status(200).json({ incomingRequests, acceptedRequests });
    } catch (error) {
        console.error("Error fetching friend requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getOutgoingFriendRequests(req: AuthenticatedRequest, res: Response) {
    try {
        const outgoingRequests = await FriendRequest.find({ sender: req.user?._id, status: "pending" }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json(outgoingRequests);
        
    } catch (error) {
        console.error("Error fetching outgoing friend requests:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}