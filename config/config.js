require("dotenv").config();

const dev = {
    secret_key:"mysecretkey",
    app: {
        port: process.env.PORT,
        host: process.env.HOST,
    },

    db: {
        url: process.env.DB_URL,
    },

};

module.exports = dev;