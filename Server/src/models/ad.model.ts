import { Schema, model } from "mongoose";
import { divisions } from "../../assets/regions";

const adSchema = new Schema({
  imgs: {
    type: [Buffer],
    default: [],
  },
  links: {
    type: [String],
    default: [],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  createDate: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: String,
    enum: ["unpaid", "paid", "approved", "rejected", "canceled"],
    default: "unpaid",
  },
  locations: {
    type: [String],
    enum: divisions,
    default: [],
  },
  tags: {
    type: [String],
    default: [],
  },
  catIds: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  statusDescription: {
    type: String,
    Default: "",
  },
  is18: {
    type: Boolean,
    default: false,
  },
  stripe_payment_id: {
    type: String,
    default: "",
  },
  explosure: {
    type: Number,
    default: 0,
  },
});

adSchema.index({ links: "text" });
adSchema.index({
  startDate: 1,
  endDate: 1,
  tags: 1,
  catIds: 1,
  locations: 1,
  status: 1,
});
const Ad = model("Ad", adSchema);

export default Ad;
