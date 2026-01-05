const bcrypt = require("bcryptjs");
const User = require('../models/user.model');

const createDefaultAdmin = async () => {
    const adminEmail = "admin@gmail.com";
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
        console.log("Admin user already exists");
        return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminUser = new User({
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
    });
    await adminUser.save();
    console.log("Default admin user created");
}

module.exports = createDefaultAdmin;