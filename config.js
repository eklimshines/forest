exports.SERVER_PORT = 8080;

exports.DB_HOST = "203.250.148.44";
exports.DB_PORT = 27017;
exports.DB_DB = "wiki";
exports.DB_USER = "";
exports.DB_PASS = '';

exports.DB_ADDR = "mongodb://" + this.DB_HOST + ":" + this.DB_PORT + "/" + this.DB_DB;

exports.SESSION_SECRET = "e8af16d9f032d2ac7ec6ad3a601b6bcc";
exports.SESSION_COLLECTION = "sessions";
