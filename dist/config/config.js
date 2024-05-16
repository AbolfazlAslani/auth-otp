"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = exports.ConfigKeys = void 0;
const config_1 = require("@nestjs/config");
var ConfigKeys;
(function (ConfigKeys) {
    ConfigKeys["App"] = "App";
    ConfigKeys["Db"] = "Db";
})(ConfigKeys || (exports.ConfigKeys = ConfigKeys = {}));
const AppConfig = (0, config_1.registerAs)(ConfigKeys.App, () => ({
    port: 3000,
}));
const DbConfig = (0, config_1.registerAs)(ConfigKeys.Db, () => ({
    port: 5432,
    host: 'localhost',
    username: 'postgres',
    password: '151515',
    database: 'auth-otp'
}));
exports.Configuration = [AppConfig, DbConfig];
//# sourceMappingURL=config.js.map