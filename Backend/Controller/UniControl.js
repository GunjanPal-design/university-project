const uniModel = require("../Model/UniModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup
const Signup = async (req, res) => {
    try {
        const { Name, Semester, Roll_No, Phn_No, Email, Password } = req.body;

        // Check if user already exists
        const existingUser = await uniModel.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
        const user = await uniModel.create({ Name, Semester, Roll_No, Phn_No, Email, Password: hashedPassword });
        console.log(user);
        
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// Login
const Login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const user = await uniModel.findOne({ Email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Generate token (Use environment variable for the secret key)
        const token = jwt.sign({ id: user._id }, "your_secret_key"); 
        return res.json({ message: "Login successful", token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// Dashboard - get all users
const Dashboard = async (req, res) => {
    try {
        const users = await uniModel.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users", details: err.message });
    }
};

// UserById - get user by ID (uses JWT token authentication)
const UserById = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from token payload

        const user = await uniModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error fetching user data", details: err.message });
    }
};

//Update

const UpdateUser = async (req, res) => {
    console.log(req.body)
    
    const userId = req.user.id; // Token provides this
    try {
        const { Name, Phn_No, Email, Semester, Roll_No } = req.body; // Include all fields being updated

        const updatedUser = await uniModel.findByIdAndUpdate(
            userId,
            { Name, Phn_No, Email, Semester, Roll_No },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
        console.error("Error updating user", err);
        return res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// const Register = async (req, res) => {
//     try {
//         const { Name, Semester, Roll_No, Phn_No, Email, Password } = req.body;

//         // Check if user already exists
//         const existingUser = await uniModel.findOne({ Email });
//         if (existingUser) {
//             return res.status(400).json({ error: "User with this email already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(Password, 10);
//         const user = await uniModel.create({ Name, Semester, Roll_No, Phn_No, Email, Password: hashedPassword });
//         res.status(201).json(user);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Internal server error", details: err.message });
//     }
// };


module.exports = { Signup, Login, UserById, Dashboard,UpdateUser };
