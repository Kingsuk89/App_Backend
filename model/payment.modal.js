import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  order_id: { type: String, required: true },
  charging_amount: { type: Number, required: true },
  status: { type: String, required: true, default: "Not payment yet" },
  subStartDate: { type: Date },
  subEndDate: { type: Date },
  nextSubDate: { type: Date },
});
const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
