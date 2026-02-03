const db = require('../data/staticDB');

class StaticCollection {
    constructor(collectionName) {
        this.collectionName = collectionName;
        this.data = db[collectionName] || [];
    }

    find(query = {}, projection = "") {
        let results = this.data.filter(item => {
            for (let key in query) {
                if (item[key] != query[key]) return false;
            }
            return true;
        });

        // Projection support (basic)
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

        // Return object with sort capability
        return {
            sort: (sortObj) => {
                const key = Object.keys(sortObj)[0];
                const order = sortObj[key];
                if (key) {
                    results.sort((a, b) => {
                        if (a[key] < b[key]) return order === 1 ? -1 : 1;
                        if (a[key] > b[key]) return order === 1 ? 1 : -1;
                        return 0;
                    });
                }
                return results;
            }
        };
    }

    findOne(query) {
        return this.data.find(item => {
            for (let key in query) {
                if (item[key] != query[key]) return false;
            }
            return true;
        });
    }
}

const CourseStructure = new StaticCollection('courseStructure');
const Resource = new StaticCollection('resources');

module.exports = { CourseStructure, Resource };
