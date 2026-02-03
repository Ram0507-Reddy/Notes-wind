
const fs = require('fs');
const path = require('path');

class JsonDB {
    constructor(filename) {
        // Debugging paths
        console.log("JsonDB: Initializing for", filename);
        console.log("__dirname:", __dirname);
        console.log("process.cwd():", process.cwd());

        // Try to find the file in multiple common locations for local/Vercel
        const candidates = [
            path.join(__dirname, '../data', filename), // Local / Standard relative
            path.join(process.cwd(), 'data', filename), // Vercel Root?
            path.join(process.cwd(), 'server', 'data', filename), // Vercel/Netlify Root
            path.resolve('server/data', filename), // Relative resolve
            '/var/task/server/data/' + filename, // AWS Lambda Absolute
            path.join(__dirname, '../../server/data', filename) // Relative from netlify/functions/api.js
        ];

        let foundPath = null;
        for (const p of candidates) {
            if (fs.existsSync(p)) {
                console.log("JsonDB: Found database at", p);
                foundPath = p;
                break;
            }
        }

        if (foundPath) {
            this.filePath = foundPath;
        } else {
            // Fallback: Try to use a temp directory if we can't find it
            // This allows the app to start even if empty (temporary session)
            // But primarily we just want to avoid crashing
            console.warn("JsonDB: CRITICAL - Database NOT found. Using in-memory fallback to prevent crash.");
            this.filePath = path.join('/tmp', filename); // Writable in Vercel Lambda
            try {
                if (!fs.existsSync(this.filePath)) {
                    fs.writeFileSync(this.filePath, '[]');
                }
            } catch (e) {
                console.error("JsonDB: Failed to create temp DB. Read-only mode active.", e);
                this.readOnly = true;
            }
        }
    }

    // Wrap write in try-catch
    write(data) {
        if (this.readOnly) {
            console.warn("JsonDB: Skipping write - Read Only Mode");
            return;
        }
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error("JsonDB: Write failed:", error.message);
        }
    }

    read() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading DB:', err);
            return [];
        }
    }



    // Determine the collection name based on structure
    // This expects the DB file to be an object with keys for collections -> db.json: { courseStructure: [], resources: [] }
    // Or we can use separate files. Let's use ONE file for simplicity as requested.
}

// Singleton-ish usage for simple collections
class Collection {
    constructor(dbPath, collectionName) {
        this.dbPath = dbPath;
        this.collectionName = collectionName;
    }

    _loadFullDB() {
        try {
            if (!fs.existsSync(this.dbPath)) return {};
            return JSON.parse(fs.readFileSync(this.dbPath, 'utf8')) || {};
        } catch (err) {
            return {};
        }
    }

    _saveFullDB(data) {
        fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
    }

    find(query = {}, projection = "") {
        const db = this._loadFullDB();
        const collection = db[this.collectionName] || [];

        let results = collection.filter(item => {
            for (let key in query) {
                // Determine equality type (loose or strict). JSON is strict usually.
                if (item[key] != query[key]) return false; // Simple equality check
            }
            return true;
        });

        // Simple projection (field selection) - space separated string support
        if (projection) {
            const fields = projection.split(' ').filter(f => f);
            results = results.map(item => {
                const projectedItem = {};
                fields.forEach(f => {
                    if (item[f] !== undefined) projectedItem[f] = item[f];
                });
                return projectedItem;
            });
        }

        return {
            sort: (sortObj) => {
                // Very basic sort implementation (only supports sorting by one field)
                const key = Object.keys(sortObj)[0];
                const order = sortObj[key]; // 1 or -1
                if (key) {
                    results.sort((a, b) => {
                        if (a[key] < b[key]) return order === 1 ? -1 : 1;
                        if (a[key] > b[key]) return order === 1 ? 1 : -1;
                        return 0;
                    });
                }
                return results;
            },
            // Note: In real usage, if not sorting, we return the array directly. 
            // But to mimic Mongoose chain, we might need to handle this.
            // For now, let's just make find() return the array if we aren't chaining, 
            // but the controller code calls .sort(), so we return an object with a sort method that returns the results.
            // However, the controller waits for it: await Resource.find().sort()
            // To make `await` work, we can make this then-able or just synchronous.
            // Since we are refactoring, we realize the controller assumes a Promise.
            // So we should make these methods async.
        };
    }

    async findSync(query, projection) {
        // Helper for async wrapper
        return this.find(query, projection);
    }

    async findOne(query) {
        const db = this._loadFullDB();
        const collection = db[this.collectionName] || [];
        return collection.find(item => {
            for (let key in query) {
                if (item[key] != query[key]) return false;
            }
            return true;
        });
    }

    // Helper for bulk insert
    async _insertMany(items) {
        const db = this._loadFullDB();
        if (!db[this.collectionName]) db[this.collectionName] = [];
        db[this.collectionName].push(...items);
        this._saveFullDB(db);
    }

    // Helper for delete
    async _deleteMany(query) {
        // If query is empty {}, delete all
        let db = this._loadFullDB();
        if (Object.keys(query).length === 0) {
            db[this.collectionName] = [];
        } else {
            // Not implemented for specific queries yet, mostly used for clearing
            console.warn('DeleteMany with query not fully supported, clearing collection if empty query.');
        }
        this._saveFullDB(db);
    }

    async _save(item) {
        const db = this._loadFullDB();
        if (!db[this.collectionName]) db[this.collectionName] = [];
        db[this.collectionName].push(item);
        this._saveFullDB(db);
    }
}


// Export specific "Models" that mimic Mongoose interface enough for our controller
const DB_PATH = path.join(__dirname, '../data/db.json');

const CourseStructure = new Collection(DB_PATH, 'courseStructure');
const Resource = new Collection(DB_PATH, 'resources');

// Add specific methods needed by controller
// Controller uses: 
// CourseStructure.find({}, 'department slug')
// CourseStructure.findOne({ slug: req.params.slug })
// Resource.find(query).sort({ createdAt: -1 })

// We need to wrap these to returns Promises since the controller uses 'await'

const CourseStructureModel = {
    find: async (query, projection) => {
        // Return full array (simulating promise resolution)
        const res = CourseStructure.find(query, projection);
        // The .find() above returns an object with .sort(), but we also need it to be awaitable to return the array?
        // Actually, let's simplify.
        // We will refactor the controller to NOT expect a Mongoose chain object for sorting if possible, 
        // OR we make our `find` return a Promise that resolves to an array with an attached sort method? Too complex.

        // Better implementation:
        // Just execute the logic immediately and return result.
        // The controller code: await CourseStructure.find() -> returns array.
        // The .sort() is only called on Resource.find().

        // For CourseStructure:
        if (projection) return res.sort({}); // returns array
        return res.sort({});
    },
    findOne: async (query) => CourseStructure.findOne(query),

    // For seeding
    deleteMany: async (q) => CourseStructure._deleteMany(q),
    save: async (data) => CourseStructure._save(data), // This signature is wrong for Mongoose (instance.save()), but we'll fix seed script.
    // Actually seed script does `new CourseStructure(data).save()`. We'll rewrite seed script entirely.
};

const ResourceModel = {
    find: (query) => {
        const resultObj = Resource.find(query);
        // This needs to be awaitable AND chainable with .sort()
        // Standard Promise doesn't have .sort().
        // We will rely on refactoring the CONTROLLER to handle this deviation, 
        // OR we return a Thenable object that has a .sort() method.

        return {
            sort: async (sortCriteria) => {
                return resultObj.sort(sortCriteria);
            },
            then: (resolve) => {
                resolve(resultObj.sort({})); // Default sort if none provided
            }
        };
    },

    // For seeding
    deleteMany: async (q) => Resource._deleteMany(q),
    insertMany: async (items) => Resource._insertMany(items)
};

module.exports = { CourseStructure: CourseStructureModel, Resource: ResourceModel };
