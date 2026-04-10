const express = require("express");
const cors = require("cors");
const session = require("express-session");
const connectDB = require("./db/dbConnect");
require("dotenv").config();

// ── Common APIs ───────────────────────────────────────────────────────────────
const Logout = require("./apis/common/logout");
const Session = require("./apis/common/session");
const { Login } = require("./apis/common/login");
const { Signup } = require("./apis/common/signup");
const { ChangePassword } = require("./apis/common/changePassword");

// ── Public APIs ───────────────────────────────────────────────────────────────
const { GetCategories } = require("./apis/user/GetCategories");
const { GetLabours } = require("./apis/user/GetLabours");
const { GetLabourDetails } = require("./apis/user/GetLabourDetails");
const { GetFeedbacks } = require("./apis/user/GetFeedbacks");

// ── User APIs ─────────────────────────────────────────────────────────────────
const { UpdateProfile } = require("./apis/user/UpdateProfile");
const { AddLabourInquiry } = require("./apis/user/AddLabourInquiry");
const { MyLabourInquiries } = require("./apis/user/MyLabourInquiries");
const { AddGeneralInquiry } = require("./apis/user/AddGeneralInquiry");
const { MyGeneralInquiries } = require("./apis/user/MyGeneralInquiries");
const { AddFeedback } = require("./apis/user/AddFeedback");
const MongoStore = require("connect-mongo").default;

// ─────────────────────────────────────────────────────────────────────────────

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("trust proxy", 1);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI
    }),
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "none"
    }
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "labour_platform_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ── DB Connect ────────────────────────────────────────────────────────────────
connectDB();

// ─────────────────────────────────────────────────────────────────────────────
//  COMMON APIs
// ─────────────────────────────────────────────────────────────────────────────
app.post("/signup", Signup);
app.post("/login", Login);
app.get("/logout", Logout);
app.get("/session", Session);
app.post("/changePassword", ChangePassword);

// ─────────────────────────────────────────────────────────────────────────────
//  PUBLIC APIs (no auth required)
// ─────────────────────────────────────────────────────────────────────────────

// Categories
app.get("/categories", GetCategories);

// Labours (filters: ?category_id= ?min_charges= ?max_charges= ?availability_status=)
app.get("/labours", GetLabours);
app.get("/labours/:id", GetLabourDetails);

// Feedbacks (public display)
app.get("/feedbacks", GetFeedbacks);

// ─────────────────────────────────────────────────────────────────────────────
//  USER APIs (session required)
// ─────────────────────────────────────────────────────────────────────────────

// Profile
app.post("/user/updateProfile", UpdateProfile);

// Labour Inquiries
app.post("/user/addLabourInquiry", AddLabourInquiry);
app.get("/user/myLabourInquiries", MyLabourInquiries);

// General Inquiries
app.post("/user/addGeneralInquiry", AddGeneralInquiry);
app.get("/user/myGeneralInquiries", MyGeneralInquiries);

// Feedback
app.post("/user/addFeedback", AddFeedback);


app.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "Labour Backend Started."
  })
})

// ─────────────────────────────────────────────────────────────────────────────
app.listen(PORT, () =>
  console.log(`✅ Labour Search Platform server started on PORT ${PORT}!`)
);
