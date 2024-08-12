import { Schema, model } from "mongoose";

const tagSchema = new Schema({
  name: { type: String, required: true },
  catId: { type: Schema.Types.ObjectId, required: true },
});

const Tag = model("Tag", tagSchema);

export default Tag;
