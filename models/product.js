const db = require('../utility/database');
const Cart = require('./cart');



module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {

        // () define the fields in SQL database
        // VALUES define what value we what to insert
        // the "?" is a save injection of value
        // second argument is certain values
        return db.execute(
            'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.imageUrl, this.description]
        );

    }

    static deleteById(id) {

    }

    static fetchAll() {

       return db.execute('SELECT * FROM products');
    }

    static findById(id) {

       return db.execute(
            'SELECT * FROM products WHERE products.id = ?', [id]
        );
    }


}















