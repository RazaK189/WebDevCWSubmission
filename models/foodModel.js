const nedb = require('nedb');
class Food {
    constructor(dbFilePath) {
        if (dbFilePath) {
        this.db = new nedb({ filename: dbFilePath, autoload: true });
        console.log('DB connected to ' + dbFilePath);
        } else {
        this.db = new nedb();
        }
        }

        food_insert() {
           
            this.db.insert({
                ID: "01",
                Name: "Name1",
                Description: "Description.",
                Ingredients: "Ingredients",
                Price: "...",   
            });
            console.log('01 entered');

            this.db.insert({
                ID: "02",
                Name: "Name2",
                Description: "Description.",
                Ingredients: "Ingredients",
                Price: "...",
            });
            console.log('02 entered');

            this.db.insert({
                ID: "03",
                Name: "Name3",
                Description: "Description.",
                Ingredients: "Ingredients",
                Price: "...",   
            });
            console.log('03 entered');

            this.db.insert({
                ID: "04",
                Name: "Name4",
                Description: "Description.",
                Ingredients: "Ingredients",
                Price: "...",
            });
            console.log('04 entered'); 
        }
    
    
       
    getAllFood() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function (err, dishes) {
                if (err) {
                    reject(err);
                        } else {
                        resolve(dishes);
        console.log('function all() returns: ', dishes);
                    }
                })
            })
        }     
    

    getAllEntries() {
        return new Promise((resolve, reject) => {
        this.db.find({}, function(err, entries) {
            if (err) {
            reject(err);
                } else {
            resolve(entries);
    console.log('function all() returns: ', Name);
                }
             })
        })
    }

    addEntry(ID, Name, Description, Ingredients, Price ) {
        var entry = {
            ID: ID,
            Name: Name,
            Description: Description,
            Ingredients: Ingredients,
            Price: Price,
           
        }
        console.log('entry created', entry);
        this.db.insert(entry, function (err, doc) {
            if (err) {
                console.log('Error inserting document', Name);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }

    getEntriesByUser(authorName) {
        return new Promise((resolve, reject) => {
            this.db.find({ 'author': authorName }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log('getEntriesByUser returns: ', entries);
                }
            })
        })
    }
}

module.exports = Food;