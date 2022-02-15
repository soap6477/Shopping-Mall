"use strict";

const UserStorage = require("./UserStorage");

class User{
    constructor(body){
        this.body = body;
    }

    async login(){
        const client = this.body
        try {
            const user = await UserStorage.getUserInfo(client.id);
            if(user){
                if(user.id === client.id && user.psword === client.psword){
                    return user;
                    // return {success: true};
                }
                return {success: false, msg: "비밀번호가 다릅니다."};
            }
            return {success: false, msg: "존재하지 않는 아이디입니다."};
        } catch (err) {
            return { success: false, msg: err };
        }
    }

    async register(){
        const client = this.body
        const response = UserStorage.save(client);
        return response;
    }

    async registercheck(){
        const client = this.body
        try {
            const user = await UserStorage.getUserInfo(client.id);
            if(user){
                if(user.id === client.id) return {success: true, msg: "아이디가 존재합니다."}; 
            }
            return {success: false, msg: "사용가능한 아이디 입니다."};
        } catch (err) {
            return { success: false, msg: err };
        }
    }

    async idcheck(){
        const client = this.body
        try {
            const user = await UserStorage.getUserInfo(client.id);
            return user;
        } catch (err) {
            return { success: false, msg: err };
        }
    }

    async modify(){
        const client = this.body
        const response = UserStorage.update(client);
        return response;
    }

    async delete(){
        const client = this.body
        const response = UserStorage.delete(client);
        return response;
    }
}

module.exports = User;