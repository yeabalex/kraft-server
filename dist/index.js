"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./routes/account/user");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = require("redis");
const connect_redis_1 = __importDefault(require("connect-redis"));
const user_2 = require("./routes/forget-password/user");
const user_3 = require("./routes/personal-info/user");
const user_4 = require("./routes/education/user");
const user_5 = require("./routes/work-experience/user");
const user_6 = require("./routes/technical-skill/user");
const user_7 = require("./routes/soft-skills/user");
const user_8 = require("./routes/certification/user");
const user_9 = require("./routes/language-skill/user");
const user_10 = require("./routes/projects/user");
const user_11 = require("./routes/test-result/user");
const user_12 = require("./routes/volunteer/user");
const user_13 = require("./routes/cv/user");
const template_1 = require("./routes/template/template");
const cors_1 = __importDefault(require("cors"));
const path = require('path');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Redis client setup
const redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});
redisClient.connect().catch(console.error);
// Redis store
const RedisStore = new connect_redis_1.default({ client: redisClient });
app.use((0, cors_1.default)({
    origin: ['https://kraftwerk.vercel.app', 'http://localhost:3000'],
    credentials: true,
}));
app.set('view engine', 'ejs');
app.set('views', './src/routes/template/views');
app.use('/static', express_1.default.static(path.join(__dirname, 'public')));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    store: RedisStore,
    secret: 'iamyeabsira',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60, sameSite: 'none', secure: true }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(user_1.userRoute);
app.use(user_2.forgotPassword);
app.use(user_3.personalInfoRoute);
app.use(user_4.educationRoute);
app.use(user_5.workExperienceRoute);
app.use(user_6.technicalSkillRoute);
app.use(user_7.softSkillRoute);
app.use(user_8.certificationRoute);
app.use(user_9.languageRoute);
app.use(user_10.projectRoute);
app.use(user_11.testResultRoute);
app.use(user_12.volunteerRoute);
app.use(user_13.cvRoutes);
app.use(template_1.templateRoute);
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
