"use strict";

const contentStroage = require("./ContentStorage");

class content {
    constructor(body) {
        this.body = body;
    }
    async register() {
        const client = this.body;
        const response = contentStroage.save(client);
        return response;
    }
    async delete() {
        const client = this.body
        const response = contentStroage.delContent(client.content_id);
        return response;
    }

    async update() {
        const client = this.body;
        const response = contentStroage.upContent(client);
        return response;
    }

}

module.exports = content;