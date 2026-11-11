const REQUIRED_ENV_VARS = [
    // Server
    "PORT",
    "NODE_ENV",

    // Database
    "MONGO_URI",

    // Auth — Client Portal
    "JWT_SECRET",
    "CLIENT_COOKIE_NAME",

    // Auth — Dev Portal
    "DEV_JWT_SECRET",
    "ADMIN_USERNAME",
    "ADMIN_PASSWORD",
    "DEV_COOKIE_NAME",

    // Cloudinary
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
];

// In production, also require the cookie domain vars
const PRODUCTION_ONLY_VARS = [
    "CLIENT_COOKIE_DOMAIN",
    "DEV_COOKIE_DOMAIN",
];

const validateEnv = () => {
    const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

    if (process.env.NODE_ENV === "production") {
        const missingProd = PRODUCTION_ONLY_VARS.filter((key) => !process.env[key]);
        missing.push(...missingProd);
    }

    if (missing.length > 0) {
        console.error("\n❌  SERVER STARTUP FAILED — Missing required environment variables:\n");
        missing.forEach((key) => console.error(`   • ${key}`));
        console.error("\n   Add the missing variables to your .env file and restart.\n");
        process.exit(1);
    }

    console.log("✅  Environment variables validated successfully.");
};

module.exports = validateEnv;
