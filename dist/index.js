"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./routes/account/user");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
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
const connect_pg_simple_1 = __importDefault(require("connect-pg-simple"));
const pg_1 = require("pg");
const path = require('path');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://kraftwerk.vercel.app'
        : ['https://kraftwerk.vercel.app', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.set('view engine', 'ejs');
app.set('views', './src/routes/template/views');
app.use('/static', express_1.default.static(path.join(__dirname, 'public')));
app.use(express_1.default.json());
const PgSession = (0, connect_pg_simple_1.default)(express_session_1.default);
// Add this code to create the session table if it doesn't exist
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
pool.query(`
  CREATE TABLE IF NOT EXISTS "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
  )
  WITH (OIDS=FALSE);
  
  ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
  CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
`)
    .then(() => console.log('Session table created or already exists'))
    .catch(err => console.error('Error creating session table:', err));
app.use((0, express_session_1.default)({
    store: new PgSession({
        conString: process.env.DATABASE_URL,
        tableName: 'session'
    }),
    secret: 'iamyeabsira',
    resave: false,
    proxy: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        //domain: process.env.NODE_ENV === 'production' ? 'kraftwerk.vercel.app' : undefined
    }
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
