"use strict";

const cartStroage = require("./CartStorage");

class CartS {
    constructor(body) {
        this.body = body;
    }
    async register() {
        const client = this.body;
        const response = cartStroage.save(client);
        return response;
    }
    async delete(USER_ID) {
        const client = this.body;
        const response = cartStroage.delCart(client.fk_PRODUCT_ID, USER_ID);
        return response;
    }
    async update() {
        const client = this.body;
        const response = cartStroage.upCart(client);
        return response;
    }

}

module.exports = CartS;