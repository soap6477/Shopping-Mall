"use strict";

const { connect } = require("../config/db");
const db = require("../config/db");


class CartStorage{
    static async save(CartInfo) {
        return new Promise((resolve, reject) => {
            const query = "insert into mallcart(fk_user_id,fk_PRODUCT_ID,order_price,order_cnt,order_sellprice,order_product_name,order_image) values(?,?,?,?,?,?,?);";
            db.query(query, [CartInfo.fk_user_id, CartInfo.fk_PRODUCT_ID, CartInfo.order_price,CartInfo.order_cnt,CartInfo.order_sellprice,CartInfo.order_product_name,CartInfo.order_image], (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }
    
    static delCart(P_id,U_id) {
        return new Promise((resolve, reject) => {
            const query = "delete from mallcart where fk_product_id = ? and fk_user_id = ?;" + "update mallcart set mallcart.order_num = @cnt:=@cnt+1;" + "alter table mallcart auto_increment = 1;";
            db.query(query, [P_id, U_id], (err, data) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }

    static delAllCart(id) {
        return new Promise((resolve, reject) => {
            const query = "delete from mallcart where fk_user_id = ?;" + "set @cnt = 0;" + "update mallcart set mallcart.order_num = @cnt:=@cnt+1;" + "alter table mallcart auto_increment = 1;";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }

    static getCartInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "select * from mallproduct where PRODUCT_ID = ?;";
            db.query(query, [id], (err, data, fields) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }
    static getCartLimit(id) {
        return new Promise((resolve, reject) => {
            const query = "select order_product_name,fk_PRODUCT_ID,order_price,order_sellprice,order_image,order_cnt from mallcart where fk_user_id = ? order by order_num";
            db.query(query, [id], (err, data, fields) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
}
    module.exports = CartStorage;