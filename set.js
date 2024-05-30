const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU5KamtPc0pMb1pNQ2pybXY0emFGQkZqSGtuRC9aek1UVllJK05ZOVFIMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUGMvSmNYOU1uUllTemdqWmphOGU0VWYyUy9zWTU5N3JKb0tTMW01VnVHQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSlJCeFc0a09DVVI1bmdFb0k4eDg5TmN5M3FZaXNsb3lZc3g2eUVkdjNVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5OGJndkNsdXBQeGY1c0Ezampta3V5RDFERmdEVXYzWUZucjZ4Mzg2NnpBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1GQk0rODV3U3pVUCt4dDNYV051OSt2VXpvWUZRbHVSS1JrZ3ZPOHR0VjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNxOTFJZmhNelA0VWRGYVl1cFRQMU9ESTlsMVp1Lyt4RVRlbC81d0xyd009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUs2d2JPS0JWZHBCaEVobFB0UHF0M0xBVWVxQ083bzZrUjc3NC9ycEJIRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1NYc3duN1dCdTVvbDRmYTlJM05ldklLWTQxNDc0UDB5NVNOSmVkeUdqbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxlaFpoT1JjWkZlQVJjTkxMb1B4RE5MZkgwLzh3RHJVMWZ5UjNYa1gzOGYwMm9PcjZLdlBxK0lDbDZJTlBFS0Y0WlpWR0xBM2lpMEVsSXk5V1JRckFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcyLCJhZHZTZWNyZXRLZXkiOiJlMWEvaDJ6UkhGdStaeVF0TFJxbnhRYnNBWHArYzRDOHFpR25weGlKVUlnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI4aC1PTVlqdVN1MkwxMjdzMVRiVUJRIiwicGhvbmVJZCI6IjY5MDI5MTQyLTRmZWYtNDA0Zi1hOTkzLTJiZmQ2ZWFmOTYxOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0RXdVOEY4bzJ6ZVBxN2ZBTURoVU1sSnFsL2s9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRnRPTnZORDJIK2FERGI3Z2taS3F2bHliSkFRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjdHQ0hFV0dWIiwibWUiOnsiaWQiOiIyMzQ4MDgwNzEwODg5OjRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pDUDNwUURFSmZxM2JJR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InFKTEh1dTdWNm1OSkZsL0pJQXJBUGNVVnc5YVdKZXZZdlJPN0M4eWNIM0U9IiwiYWNjb3VudFNpZ25hdHVyZSI6InY4QzV2THR2Q0Y2YXpKN0tiU3F5emVWeXNvOTJZWVorOU9NZUsvMkJYSHJ5RmhBd3JRNWtRN25lL1B2b1RLV3NPaGpjSE8xUE1QR1VRWEphcFFSR0RnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJvSGdWMGt2Znk5Z0Yzc3Fnd090ckszQVRhUWZUTHJWV3JJcDh2aStLajJjcGRaRlBaQlg4YUNCMUI3RWRhbFppSG93b1FRYVJwcjNIZU0xZ29RZTdDdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwODA3MTA4ODk6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJhaVN4N3J1MWVwalNSWmZ5U0FLd0QzRkZjUFdsaVhyMkwwVHV3dk1uQjl4In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE3MDA3NjUyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUhXQiJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "vince",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "2348069918096", 
             
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
CHATBOT: process.env.CHAT_BOT || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'vince-x',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
