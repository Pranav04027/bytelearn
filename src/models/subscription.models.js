import mongoose, {Schema} from "mongoose";

const SubscriptionSchema = new Schema(
    {
        subscriber:{
            type: Schema.Types.ObjectId, // the one who is subscribing
            ref: "User"
        },
        channel: {
            type: Schema.Types.ObjectId, //The person who got subscribed to (i.e., YOU, the channel owner)
            ref: "User"
        }
    }, {timestamps: true}
)

export const Subscription = mongoose.model("Subscription" , SubscriptionSchema)