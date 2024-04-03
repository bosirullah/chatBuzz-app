// chatName
// isGroupChat
// users
// latestMessage
// groupAdmin

const mongoose = require('mongoose');

const chatModel = mongoose.Schema(
    {
        //trim is used so that there are not any trailing spaces after or before the name.
        chatName: {type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users :[
            {
                //this will contain the id of that unique user.
                type: mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        groupAdmin:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        // mongoose will create a time stamp everytime we add new data.
        timestaps: true,
    }
)

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;