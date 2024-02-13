import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },

    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Pizza',
        },
      },
    ],

    chesses: [],
    veggies: [],
    sauces: [],
    totalPrice: {
      type: Number,
      required: true,
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    status: {
      type: String,
      enum: [
        'Not Processed',
        'In the Kitchen',
        'Dispatched',
        'Cancelled',
        'Delivered',
      ],
      default: 'Not Processed',
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;
