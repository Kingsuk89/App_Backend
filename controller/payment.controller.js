import "dotenv/config";
import Razorpay from "razorpay";
import crypto from "crypto";
import { nanoid } from "nanoid";
import mongoose from "mongoose";

import User from "../model/user.model.js";
import Subscription from "../model/payment.modal.js";

export const payment = async (req, res) => {
  try {
    const id = req.user;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    // validate user and find
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "wrong credentials" });
    }

    // crate payment instance
    const instance = new Razorpay({
      key_id: process.env.RAZERPAY_KEY,
      key_secret: process.env.RAZERPAY_KEY_SECRET,
    });

    // create options for order
    const options = {
      amount: 300 * 100,
      currency: "INR",
      receipt: nanoid(),
      payment_capture: 1,
    };

    await instance.orders.create(options, async (err, order) => {
      if (order) {
        await Subscription.create({
          user: id,
          order_id: order.id,
          charging_amount: order.amount,
          status: order.status,
        });
        return res.status(200).json({
          order_id: order.id,
          currency: order.currency,
          amount: order.amount,
        });
      }
      console.log(err);
      res.status(400).json(err);
    });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const paymentCapture = async (req, res) => {
  try {
    // crate hash crypto graph for validation
    const data = crypto.createHmac("sha256", process.env.WEBHOOK_SECRETC);
    data.update(JSON.stringify(req.body));
    const digest = data.digest("hex");

    if (digest === req.headers["x-razorpay-signature"]) {
      // update payment details
      const order_id = req.body.payload.payment.entity.order_id;
      const status = req.body.payload.payment.entity.status;
      const subStartDate = new Date(Date.now());
      const subEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      const nextSubDate = new Date(Date.now() + 31 * 24 * 60 * 60 * 1000);
      await Subscription.findOneAndUpdate(
        { order_id },
        { status, subStartDate, subEndDate, nextSubDate },
        { new: true }
      );
      return res
        .status(200)
        .json({ order_id: order_id, message: "user successfully parched" });
    }
    res.status(400).json({ message: "Some thing wrong" });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const SubscriptionUpdate = async (req, res) => {
  try {
    const { order_id, status } = req.body;

    const paymentHistory = await Subscription.findOne(order_id);
    if (!paymentHistory) {
      return res.status(400).json({ message: "Invalid request" });
    }
    await Subscription.findOneAndUpdate(order_id, status, { new: true });
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPayment = async (req, res) => {
  try {
    const id = req.user;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No post with id: ${id}`);

    const paymentHistory = await Subscription.find({ user: id }).populate('user');
    if (!payment) {
      return res.status(400).json({ message: "Invalid request" });
    }
    res.status(200).json(paymentHistory)
  } catch (error) {
    console.log("Error: " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};
