const { Schema, model } = require("mongoose");

const reportSchema = new Schema(
  {
    disaster: { type: String, required: true },
    location: { type: String, required: true },
    reportTime: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, default: "" }, // default empty if no image
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // Add createdAt, updatedAt timestamps
);

const Report = model("Report", reportSchema);

module.exports = Report;
