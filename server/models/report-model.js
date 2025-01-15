const { Schema, model } = require("mongoose");

const reportSchema = new Schema({
    disaster: { type: String, required: true },
    location: { type: String, required: true },
    reportTime: { type: String, required: true }, 
    description: { type: String, required: true },
    img:{type : String , required : false}
});

const Report = model("Report", reportSchema);
module.exports = Report;