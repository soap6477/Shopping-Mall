"use strict";

const itemStorage = require("./itemStorage");

class item {
    constructor(body) {
        this.body = body;
    }
    async register() {
        const client = this.body;
        const response = itemStorage.save(client);
        return response;
    }
    async delete() {
        const client = this.body
        const response = itemStorage.delItem(client.PRODUCT_ID);
        return response;
    }
    async update(){
        const client = this.body;
        const response = itemStorage.upItem(client);
        return response;
    }
}

module.exports = item;