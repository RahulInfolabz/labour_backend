const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function MyLabourInquiries(req, res) {
  try {
    const user = req.session.user;
    if (!user || !user.isAuth) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const db = await connectDB();
    const collection = db.collection("labour_inquiries");

    const inquiries = await collection
      .aggregate([
        { $match: { user_id: new ObjectId(user.session._id) } },
        {
          $lookup: {
            from: "labours",
            localField: "labour_id",
            foreignField: "_id",
            as: "labour",
          },
        },
        { $unwind: { path: "$labour", preserveNullAndEmptyArrays: true } },
        { $sort: { inquiry_date: -1 } },
      ])
      .toArray();

    return res.status(200).json({
      success: true,
      message: "Labour inquiries fetched successfully",
      data: inquiries,
    });
  } catch (error) {
    console.error("MyLabourInquiries.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { MyLabourInquiries };
