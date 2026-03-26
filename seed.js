const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = "labour_platform";

async function seed() {
  const client = await MongoClient.connect(MONGO_URI);
  const db = client.db(DB_NAME);

  console.log("🌱 Starting seed...");

  // ── Clear existing data ───────────────────────────────────────────────────
  await db.collection("users").deleteMany({});
  await db.collection("labour_categories").deleteMany({});
  await db.collection("labours").deleteMany({});
  await db.collection("labour_inquiries").deleteMany({});
  await db.collection("general_inquiries").deleteMany({});
  await db.collection("feedbacks").deleteMany({});

  console.log("🗑️  Cleared existing collections");

  // ── Users ─────────────────────────────────────────────────────────────────
  const usersResult = await db.collection("users").insertMany([
    {
      full_name: "Admin User",
      email: "admin@labourapp.com",
      password: "Admin@123",
      mobile_no: "9900000001",
      address: "101, Business Park, Ahmedabad",
      city: "Ahmedabad",
      profile_image: "https://i.pravatar.cc/150?img=1",
      role: "Admin",
      status: "Active",
      created_at: new Date(),
    },
    {
      full_name: "Ravi Desai",
      email: "ravi@gmail.com",
      password: "Ravi@123",
      mobile_no: "9900000002",
      address: "22, Shyamal Cross Road, Ahmedabad",
      city: "Ahmedabad",
      profile_image: "https://i.pravatar.cc/150?img=2",
      role: "User",
      status: "Active",
      created_at: new Date(),
    },
    {
      full_name: "Pooja Nair",
      email: "pooja@gmail.com",
      password: "Pooja@123",
      mobile_no: "9900000003",
      address: "55, Vastrapur Lake Road, Ahmedabad",
      city: "Ahmedabad",
      profile_image: "https://i.pravatar.cc/150?img=3",
      role: "User",
      status: "Active",
      created_at: new Date(),
    },
  ]);

  const userIds = Object.values(usersResult.insertedIds);
  console.log("✅ Users seeded");

  // ── Labour Categories ─────────────────────────────────────────────────────
  const categoriesResult = await db
    .collection("labour_categories")
    .insertMany([
      {
        category_name: "Electrician",
        category_description:
          "Certified electricians for home wiring, panel installation, repair, and maintenance services.",
        category_image:
          "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600",
        status: "Active",
        created_at: new Date(),
      },
      {
        category_name: "Plumber",
        category_description:
          "Experienced plumbers for pipe fitting, leak repair, bathroom installation, and drainage work.",
        category_image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
        status: "Active",
        created_at: new Date(),
      },
      {
        category_name: "Carpenter",
        category_description:
          "Skilled carpenters for furniture making, woodwork, door/window fitting, and interior work.",
        category_image:
          "https://images.unsplash.com/photo-1601058272524-0611e132f3c9?w=600",
        status: "Active",
        created_at: new Date(),
      },
      {
        category_name: "Painter",
        category_description:
          "Professional painters for interior/exterior wall painting, texture work, and waterproofing.",
        category_image:
          "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600",
        status: "Active",
        created_at: new Date(),
      },
      {
        category_name: "Mason / Construction",
        category_description:
          "Expert masons and construction workers for brick laying, plastering, flooring, and civil work.",
        category_image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600",
        status: "Active",
        created_at: new Date(),
      },
      {
        category_name: "Welder",
        category_description:
          "Certified welders for metal fabrication, gate/grill making, structural welding, and repairs.",
        category_image:
          "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600",
        status: "Active",
        created_at: new Date(),
      },
      {
        category_name: "AC Technician",
        category_description:
          "Trained AC technicians for installation, servicing, gas refilling, and repair of air conditioners.",
        category_image:
          "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600",
        status: "Active",
        created_at: new Date(),
      },
      {
        category_name: "Cleaning & Housekeeping",
        category_description:
          "Reliable cleaning staff for deep cleaning, housekeeping, office cleaning, and sofa/carpet cleaning.",
        category_image:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600",
        status: "Active",
        created_at: new Date(),
      },
    ]);

  const categoryIds = Object.values(categoriesResult.insertedIds);
  console.log("✅ Labour Categories seeded");

  // ── Labours ───────────────────────────────────────────────────────────────
  const laboursResult = await db.collection("labours").insertMany([
    {
      category_id: categoryIds[0], // Electrician
      name: "Suresh Bhai Electrician",
      experience_years: 8,
      service_type: "Home Wiring, Panel Work, Repair & Maintenance",
      charges: 600.0,
      availability_status: "Available",
      contact_no: "9811111101",
      address: "Satellite Area, Ahmedabad",
      profile_image: "https://i.pravatar.cc/150?img=11",
      status: "Active",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      category_id: categoryIds[0], // Electrician
      name: "Dinesh Kumar Electricals",
      experience_years: 12,
      service_type: "Industrial Wiring, CCTV Installation, Solar Panel Setup",
      charges: 900.0,
      availability_status: "Available",
      contact_no: "9811111102",
      address: "Navrangpura, Ahmedabad",
      profile_image: "https://i.pravatar.cc/150?img=12",
      status: "Active",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      category_id: categoryIds[1], // Plumber
      name: "Ramesh Plumbing Services",
      experience_years: 6,
      service_type: "Pipe Fitting, Leak Repair, Bathroom Installation",
      charges: 500.0,
      availability_status: "Available",
      contact_no: "9811111103",
      address: "Bopal, Ahmedabad",
      profile_image: "https://i.pravatar.cc/150?img=13",
      status: "Active",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      category_id: categoryIds[1], // Plumber
      name: "Jagdish Plumber",
      experience_years: 10,
      service_type: "Drainage Work, Water Tank Cleaning, Motor Repair",
      charges: 650.0,
      availability_status: "Not Available",
      contact_no: "9811111104",
      address: "Maninagar, Ahmedabad",
      profile_image: "https://i.pravatar.cc/150?img=14",
      status: "Active",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      category_id: categoryIds[2], // Carpenter
      name: "Mahesh Carpentry Works",
      experience_years: 15,
      service_type: "Furniture Making, Door & Window Fitting, Modular Work",
      charges: 750.0,
      availability_status: "Available",
      contact_no: "9811111105",
      address: "Gota, Ahmedabad",
      profile_image: "https://i.pravatar.cc/150?img=15",
      status: "Active",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      category_id: categoryIds[3], // Painter
      name: "Rajesh Painting Services",
      experience_years: 9,
      service_type: "Interior Painting, Texture Work, Waterproofing",
      charges: 450.0,
      availability_status: "Available",
      contact_no: "9811111106",
      address: "Paldi, Ahmedabad",
      profile_image: "https://i.pravatar.cc/150?img=16",
      status: "Active",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      category_id: categoryIds[4], // Mason
      name: "Bharat Construction Works",
      experience_years: 20,
      service_type: "Brick Laying, Plastering, Flooring, Civil Work",
      charges: 700.0,
      availability_status: "Available",
      contact_no: "9811111107",
      address: "Chandkheda, Ahmedabad",
      profile_image: "https://i.pravatar.cc/150?img=17",
      status: "Active",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      category_id: categoryIds[5], // Welder
      name: "Prakash Welding Works",
      experience_years: 11,
      service_type: "Gate Making, Grill Fabrication, Structural Welding",
      charges: 800.0,
      availability_status: "Available",
      contact_no: "9811111108",
      address: "Naroda, Ahmedabad",
      profile_image: "https://i.pravatar.cc/150?img=18",
      status: "Active",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      category_id: categoryIds[6], // AC Technician
      name: "Cool Tech AC Services",
      experience_years: 7,
      service_type: "AC Installation, Servicing, Gas Refilling, Repair",
      charges: 550.0,
      availability_status: "Available",
      contact_no: "9811111109",
      address: "Bodakdev, Ahmedabad",
      profile_image: "https://i.pravatar.cc/150?img=19",
      status: "Active",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      category_id: categoryIds[7], // Cleaning
      name: "Clean Home Services",
      experience_years: 4,
      service_type: "Deep Cleaning, Sofa Cleaning, Office Housekeeping",
      charges: 350.0,
      availability_status: "Available",
      contact_no: "9811111110",
      address: "Vastrapur, Ahmedabad",
      profile_image: "https://i.pravatar.cc/150?img=20",
      status: "Active",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);

  const labourIds = Object.values(laboursResult.insertedIds);
  console.log("✅ Labours seeded");

  // ── Labour Inquiries ──────────────────────────────────────────────────────
  await db.collection("labour_inquiries").insertMany([
    {
      user_id: userIds[1], // Ravi
      labour_id: labourIds[0], // Suresh Electrician
      inquiry_message:
        "I need complete home wiring done for my new 3BHK flat. Can you visit for inspection this weekend?",
      inquiry_status: "Responded",
      inquiry_date: new Date("2025-11-10"),
    },
    {
      user_id: userIds[2], // Pooja
      labour_id: labourIds[2], // Ramesh Plumber
      inquiry_message:
        "There is a water leakage in my bathroom. Can you come and fix it on urgent basis?",
      inquiry_status: "Pending",
      inquiry_date: new Date(),
    },
    {
      user_id: userIds[1], // Ravi
      labour_id: labourIds[4], // Mahesh Carpenter
      inquiry_message:
        "I need a modular kitchen and wardrobe for my 2BHK. Can you give me an estimate?",
      inquiry_status: "Responded",
      inquiry_date: new Date("2025-10-18"),
    },
    {
      user_id: userIds[2], // Pooja
      labour_id: labourIds[8], // Cool Tech AC
      inquiry_message:
        "My AC is not cooling properly. Need a servicing and gas check. Are you available this week?",
      inquiry_status: "Pending",
      inquiry_date: new Date(),
    },
  ]);

  console.log("✅ Labour Inquiries seeded");

  // ── General Inquiries ─────────────────────────────────────────────────────
  await db.collection("general_inquiries").insertMany([
    {
      user_id: userIds[1], // Ravi
      inquiry_subject: "Complete Home Renovation Team",
      inquiry_message:
        "I am looking for a complete home renovation package including electrician, plumber, carpenter, and painter for my newly purchased flat.",
      inquiry_date: new Date("2025-11-15"),
      status: "Pending",
    },
    {
      user_id: userIds[2], // Pooja
      inquiry_subject: "Monthly Housekeeping Staff",
      inquiry_message:
        "Looking for reliable housekeeping staff on a monthly contract basis for my office in Ahmedabad. Please guide.",
      inquiry_date: new Date("2025-11-20"),
      status: "Pending",
    },
  ]);

  console.log("✅ General Inquiries seeded");

  // ── Feedbacks ─────────────────────────────────────────────────────────────
  await db.collection("feedbacks").insertMany([
    {
      user_id: userIds[1], // Ravi
      feedback_message:
        "Excellent platform! Found a skilled electrician within minutes. Very easy to use and the profiles are detailed.",
      rating: 5,
      feedback_date: new Date("2025-11-20"),
    },
    {
      user_id: userIds[2], // Pooja
      feedback_message:
        "Great experience overall. The filter by category and charges is very helpful. Would love to see more workers in my area.",
      rating: 4,
      feedback_date: new Date("2025-11-25"),
    },
    {
      user_id: userIds[1], // Ravi
      feedback_message:
        "Very useful app for finding local workers. Saved a lot of time. Will definitely recommend to friends and family.",
      rating: 5,
      feedback_date: new Date("2025-12-01"),
    },
  ]);

  console.log("✅ Feedbacks seeded");

  console.log("\n🎉 Seed completed successfully!");
  console.log("──────────────────────────────────────────");
  console.log("👤 Admin   → admin@labourapp.com  / Admin@123");
  console.log("👤 User 1  → ravi@gmail.com       / Ravi@123");
  console.log("👤 User 2  → pooja@gmail.com      / Pooja@123");
  console.log("──────────────────────────────────────────");

  await client.close();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
