import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order_id: { type: String, required: true },
  charging_amount: { type: Number, required: true },
  status: { type: String, required: true, default: "Not payment yet" },
  plan_status: { type: String, required: true, default: "on going" },
  start_at: { type: Date, required: true },
  end_at: { type: Date, required: true },
  next_at: { type: Date, required: true },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
