const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../server/data/db.json');
const jsPath = path.join(__dirname, '../server/data/staticDB.js');

const data = fs.readFileSync(jsonPath, 'utf8');

const content = `// Auto-generated Static Database for Serverless Compliance
// Eliminates filesystem reads at runtime

const db = ${data};

module.exports = db;
`;

fs.writeFileSync(jsPath, content);
console.log("Converted db.json to staticDB.js");
