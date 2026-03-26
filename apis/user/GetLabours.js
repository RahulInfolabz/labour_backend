const { ObjectId } = require("mongodb");
const connectDB = require("../../db/dbConnect");

async function GetLabours(req, res) {
  try {
    const { category_id, min_charges, max_charges, availability_status } =
      req.query;

    const db = await connectDB();
    const collection = db.collection("labours");

    // Build match stage
    const matchStage = { status: "Active" };

    if (category_id && ObjectId.isValid(category_id)) {
      matchStage.category_id = new ObjectId(category_id);
    }

    if (min_charges || max_charges) {
      matchStage.charges = {};
      if (min_charges) matchStage.charges.$gte = parseFloat(min_charges);
      if (max_charges) matchStage.charges.$lte = parseFloat(max_charges);
    }

    if (availability_status) {
      matchStage.availability_status = availability_status;
    }

    const labours = await collection
      .aggregate([
        { $match: matchStage },
        {
          $lookup: {
            from: "labour_categories",
            localField: "category_id",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        { $sort: { created_at: -1 } },
      ])
      .toArray();

    return res.status(200).json({
      success: true,
      message: "Labours fetched successfully",
      data: labours,
    });
  } catch (error) {
    console.error("GetLabours.js: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { GetLabours };
