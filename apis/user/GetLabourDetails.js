const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function GetLabourDetails(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid labour ID",
      });
    }

    const db = await connectDB();
    const collection = db.collection("labours");

    const labourDetails = await collection
      .aggregate([
        { $match: { _id: new ObjectId(id), status: "Active" } },
        {
          $lookup: {
            from: "labour_categories",
            localField: "category_id",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
      ])
      .toArray();

    if (!labourDetails.length) {
      return res.status(404).json({
        success: false,
        message: "Labour not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Labour details fetched successfully",
      data: labourDetails[0],
    });
  } catch (error) {
    console.error("GetLabourDetails.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { GetLabourDetails };
