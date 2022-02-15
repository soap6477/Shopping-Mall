"use strict";

const { connect } = require("../config/db");
const db = require("../config/db");

class ContentStorage{
    static async save(contentInfo) {
        return new Promise((resolve, reject) => {
            const query = "insert into contentlist(title,user_id,content,hit) values(?,?,?,0);";
            db.query(query, [contentInfo.title, contentInfo.user_id, contentInfo.content], (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }
    static getContentLimit() {
        return new Promise((resolve, reject) => {
            const query = "select content_id, title,user_id,convert(date_format(date, '%Y-%m-%d'),char) as date,hit from contentlist order by content_id;"
            db.query(query, (err, data, fields) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static getContentInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "select content_id, title,user_id,convert(date_format(date, '%Y-%m-%d %h:%m'),char) as date,hit, content from contentlist where content_id=?;";
            db.query(query, [id], (err, data, fields) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }
    static upHit(id) {
        return new Promise((resolve, reject) => {
            const query = "update contentlist set hit= hit + 1 where content_id=?;";
            db.query(query, [id], (err, data, fields) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }
    static upContent(content_info) {
        return new Promise((resolve, reject) => {
            const query = "update contentlist set title= ?, content= ? where content_id = ?;";
            db.query(query, [content_info.title, content_info.content, content_info.content_id], (err, data) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });

    }
    static delContent(id) {
        return new Promise((resolve, reject) => {
            const query = "delete from contentlist where content_id = ?;" + "set @cnt = 0;" + "update contentlist set contentlist.content_id = @cnt:=@cnt+1; " + "alter table contentlist auto_increment = 1; ";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }
}

module.exports = ContentStorage;