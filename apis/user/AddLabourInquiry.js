const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function AddLabourInquiry(req, res) {
  try {
    const user = req.session.user;
    if (!user || !user.isAuth) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const { labour_id, inquiry_message } = req.body;

    if (!labour_id || !inquiry_message) {
      return res.status(400).json({
        success: false,
        message: "Labour ID and inquiry message are required",
      });
    }

    if (!ObjectId.isValid(labour_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid labour ID",
      });
    }

    const db = await connectDB();
    const labourCollection = db.collection("labours");
    const inquiryCollection = db.collection("labour_inquiries");

    // Verify labour exists
    const labourExists = await labourCollection.findOne({
      _id: new ObjectId(labour_id),
    });

    if (!labourExists) {
      return res.status(404).json({
        success: false,
        message: "Labour not found",
      });
    }

    await inquiryCollection.insertOne({
      user_id: new ObjectId(user.session._id),
      labour_id: new ObjectId(labour_id),
      inquiry_message,
      inquiry_status: "Pending",
      inquiry_date: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Labour inquiry submitted successfully",
    });
  } catch (error) {
    console.error("AddLabourInquiry.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { AddLabourInquiry };
