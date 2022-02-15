"use strict";

const { connect } = require("../config/db");
const db = require("../config/db");

class ItemStorage{
    static getItem() {
        return new Promise((resolve, reject) => {
            const query = "select * from mallproduct;";
            db.query(query, (err, data, fields) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static getItemRand() {
        return new Promise((resolve, reject) => {
            const query = "select * from mallproduct order by Rand() limit 5;"
            db.query(query, (err, data, fields) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static Search(Text) {
        return new Promise((resolve, reject) => {
            var text = "%" + Text + "%";
            const query = "select * from mallproduct where PRODUCT_NAME LIKE ?;"
            db.query(query, [text], (err, data, fields) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static getItemLimit(no, page_size) {
        return new Promise((resolve, reject) => {
            const query = "select * from mallproduct order by PRODUCT_ID  limit ?,?;"
            db.query(query, [no, page_size], (err, data, fields) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static getList(type, no, page_size) {
        return new Promise((resolve, reject) => {
            const query = "select * from mallproduct where PRODUCT_TYPE=? order by PRODUCT_ID  limit ?,?;"
            db.query(query, [type, no, page_size], (err, data, fields) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static searchList(search, no, page_size) {
        return new Promise((resolve, reject) => {
            let replacement = `'%${search}%'`;
            const query = `select * from mallproduct where PRODUCT_NAME LIKE ${replacement}` + "order by PRODUCT_ID  limit ?,?;"
            db.query(query, [no, page_size], (err, data, fields) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static getItemInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "select * from mallproduct where PRODUCT_ID = ?;";
            db.query(query, [id], (err, data, fields) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }
    static getItemCount() {
        return new Promise((resolve, reject) => {
            const query = "select count(*) as cnt  from mallproduct;";
            db.query(query, (err, data, fields) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
                return data[0].cnt
            });
        });
    }
    static getItemCount(type) {
        return new Promise((resolve, reject) => {
            const query = "select count(*) as cnt  from mallproduct where PRODUCT_TYPE = ?;";
            db.query(query, [type], (err, data, fields) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
                return data[0].cnt
            });
        });
    }
    static getItemCount_name(name) {
        return new Promise((resolve, reject) => {
            let replacement = `'%${name}%'`;
            const query = `select count(*) as cnt  from mallproduct where PRODUCT_NAME LIKE ${replacement}`;
            db.query(query, (err, data, fields) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
                return data[0].cnt
            });
        });
    }

    static upItem(itemInfo){
        return new Promise((resolve, reject) => {
            const query = "update mallproduct set image= ?, PRODUCT_NAME= ?, PRODUCT_TYPE= ?, PRICE= ? where PRODUCT_ID = ?;"; 
            db.query(query, [itemInfo.image, itemInfo.PRODUCT_TYPE, itemInfo.PRODUCT_NAME, itemInfo.PRICE, itemInfo.PRODUCT_ID], (err, data) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });

    }
    static delItem(id){
        return new Promise((resolve, reject)=>{
            const query = "delete from mallproduct where PRODUCT_ID = ?;" + "set @cnt = 0;" + "update mallproduct set mallproduct.PRODUCT_ID = @cnt:=@cnt+1; " + "alter table mallproduct auto_increment = 1; ";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }
    static async save(itemInfo) {
        return new Promise((resolve, reject) => {
            const query = "insert into mallproduct(image, PRODUCT_TYPE, PRODUCT_NAME, PRICE) values(?,?,?,?);";
            db.query(query, [itemInfo.image, itemInfo.PRODUCT_TYPE, itemInfo.PRODUCT_NAME, itemInfo.PRICE], (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }
}

module.exports = ItemStorage;