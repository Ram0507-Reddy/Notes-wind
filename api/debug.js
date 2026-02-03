const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const lookups = [
        path.join(__dirname, '../server/data/db.json'),
        path.join(process.cwd(), 'server/data/db.json'),
        path.join(process.cwd(), 'data/db.json'),
        path.join('/var/task/server/data/db.json')
    ];

    const results = lookups.map(p => ({
        path: p,
        exists: fs.existsSync(p)
    }));

    // List files in specific dirs to hunt for it
    let dirList = {};
    try { dirList['cwd'] = fs.readdirSync(process.cwd()); } catch (e) { dirList['cwd'] = e.message; }
    try { dirList['__dirname'] = fs.readdirSync(__dirname); } catch (e) { dirList['__dirname'] = e.message; }
    try { dirList['server'] = fs.readdirSync(path.join(process.cwd(), 'server')); } catch (e) { dirList['server'] = e.message; }
    try { dirList['server_data'] = fs.readdirSync(path.join(process.cwd(), 'server/data')); } catch (e) { dirList['server_data'] = e.message; }

    res.status(200).json({
        message: "Debug Probe v1",
        env: process.env.NODE_ENV,
        cwd: process.cwd(),
        __dirname: __dirname,
        db_checks: results,
        dir_listings: dirList
    });
};
