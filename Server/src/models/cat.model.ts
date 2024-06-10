import { Schema, model } from "mongoose";

export const displayString = {
  "zh-TW": { type: String, default: "" },
  en: { type: String, default: "" },
};

const catSchema = new Schema({
  display: {
    type: displayString,
    default: { "zh-TW": "", en: "" },
  },
});

const Cat = model("Cat", catSchema);

export default Cat;
