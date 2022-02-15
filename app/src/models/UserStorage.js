"use strict";

const db = require("../config/db");

class UserStorage{
    static getUserInfo(id){
        return new Promise((resolve, reject) =>{
            const query = "select * from malluser where id = ?;";
            db.query(query, [id], (err, data) => {
                if(err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }

    static async save(userInfo){
        return new Promise((resolve, reject) =>{
            const query = "insert into malluser(id, psword, name, birthdate, email, phone, address ) values(?,?,?,?,?,?,?);";
            db.query(query, [userInfo.id, userInfo.psword, userInfo.name, userInfo.date, userInfo.email, userInfo.tel, userInfo.address], (err) => {
                if(err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }

    static async update(userInfo){
        return new Promise((resolve, reject) =>{
            const query = "update malluser set psword = ?, email = ?, phone =?, address =? where id = ?;";
            db.query(query, [userInfo.psword, userInfo.email, userInfo.tel, userInfo.address, userInfo.id], (err) => {
                if(err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }

    static async delete(userInfo){
        return new Promise((resolve, reject) =>{
            const query = "delete from malluser where id =?;" + "set @cnt = 0;" + "update malluser set malluser.user_id = @cnt:=@cnt+1;" + "alter table malluser auto_increment = 1;";
            db.query(query, [userInfo.id], (err) => {
                if(err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }
}

module.exports = UserStorage;