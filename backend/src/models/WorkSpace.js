import { Schema, model } from "mongoose";

const WorkSpaceSchema = new Schema(
  {
    startDay: {
      type: "String",
      required: true,
    },
    endDay: {
      type: "String",
      required: true,
    },
    time:{
      type: "String",
      required: true,
    },
    technical:{
      type: "String",
      required: true,
    },
    description: {
      type: "String",
      required: true,
    },
    comments: {
      type: "String",
    },
    user: {
      ref: "User",
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("WorkSpace", WorkSpaceSchema);
