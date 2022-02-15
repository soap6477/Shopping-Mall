"use strict";

const { json } = require("body-parser");
const Item = require("../models/Item");
const ItemStorage = require("../models/ItemStorage");
const User = require("../models/User");
const UserStorage = require("../models/UserStorage");
const Content = require("../models/Content");
const ContentStorage = require("../models/ContentStorage");
const CartS = require("../models/CartS");
const CartStorage = require("../models/CartStorage");
const fs = require('fs');
const ejs = require('ejs');
const { URLSearchParams } = require("url");
const { title } = require("process");

const view = {
    index: (req, res) => {
        var sessionid = req.session.userid;
        var sessionuid = req.session.usernum;

        fs.readFile('src/views/index.ejs', 'utf-8', (error, data) => {
            if (error) {
                console.log("ejs오류" + error);
                return
            }
            ItemStorage.getItemRand().then((result) => {
                res.send(ejs.render(data, {
                    data: result,
                    sessionid, sessionuid
                }));
            });
        });
    },
    login: (req, res) => {
        res.render("login");
    },
    join: (req, res) => {
        res.render("join");
    },
    modify: (req, res) => {
        var sessionid = req.session.userid;
        res.render("userModify", { sessionid });
    },
    delallCart: async (req,res)=>{
        var sessionid = req.session.userid;
        var sessionuid = req.session.usernum;
        const response = await CartStorage.delAllCart(sessionid);
        res.redirect("/cart");
    },
    cart: (req, res) => {
        var sessionid = req.session.userid;
        var sessionuid = req.session.usernum;
       
            fs.readFile('src/views/cart.ejs', 'utf-8', (error, data) => {
            if (error) {
                console.log("ejs오류" + error);
                return
            }
            CartStorage.getCartLimit(sessionid).then((result) => {
                res.send(ejs.render(data, {
                    data: result,
                    sessionid, sessionuid
                }));
            });
        });
    },
    
    itemMagement: (req, res) => {
        res.redirect("/pasing/" + 1);
    },
    clothesList: (req, res) => {
        res.redirect("/pasing_TYPE/의류/" + 1);
    },
    machineList: (req, res) => {
        res.redirect("/pasing_TYPE/가전제품/" + 1);
    },
    deviceList: (req, res) => {
        res.redirect("/pasing_TYPE/전자기기/" + 1);
    },
    board: (req, res) => {
        var sessionid = req.session.userid;
        var sessionuid = req.session.usernum;

        fs.readFile('src/views/board.ejs', 'utf-8', (error, data) => {
            if (error) {
                console.log("ejs오류" + error);
                return
            }
            ContentStorage.getContentLimit().then((result) => {
                res.send(ejs.render(data, {
                    data: result,
                    sessionid, sessionuid
                }));
            });
        });
    },
    boardWrite: (req, res) => {
        res.render("boardWrite");
    },
    pasing: (req, res) => {
        //페이지당 게시물 수 : 한 페이지 당 10개 게시물
        var page_size = 10;
        //페이지의 개수
        var page_list_size = 10;
        //limit 변수
        var no = "";
        //전체 게시물의 숫자
        var totalPageCount = 0;


        ItemStorage.getItemCount().then((data) => {
            //전체 게시물의 숫자
            totalPageCount = data.cnt;
            //현재 페이지
            var curPage = req.params.cur;


            //전체 페이지 개수
            if (totalPageCount < 0) {
                totalPageCount = 0;
            }

            var totalPage = Math.ceil(totalPageCount / page_size); //전체 페이지 수
            var totalSet = Math.ceil(totalPage / page_list_size); // 전체 세트 수
            var curSet = Math.ceil(curPage / page_list_size); // 현제 세트 번호
            var startPage = Math.ceil((curSet - 1) * 10) + 1; //현재 세트 내에서 출력될 시작페이지
            var endPage = (startPage + page_list_size) - 1; //현재 세트내 출력될 마지막 페이지

            //현재 페이지가 0 보다 작으면
            if (curPage < 0) {
                no = 0;
            } else {
                //0 보다 크면 limit 함수에 들어갈 첫번째 인자 값 구하기
                no = (curPage - 1) * 10;
            }
            var result2 = {
                "curPage": curPage,
                "page_list_size": page_list_size,
                "page_size": page_size,
                "totalPage": totalPage,
                "totalSet": totalSet,
                "curSet": curSet,
                "startPage": startPage,
                "endPage": endPage
            };
            fs.readFile('src/views/itemMagement.ejs', 'utf-8', (error, data) => {
                if (error) {
                    console.log("ejs오류" + error);
                    return
                }

                const result = ItemStorage.getItemLimit(no, page_size).then((result) => {
                    res.send(ejs.render(data, {
                        data: result,
                        pasing: result2
                    }));
                });
            });
        });
    },
    pasing_search: (req, res) => {

        var sessionid = req.session.userid;
        var sessionuid = req.session.usernum;
        //페이지당 게시물 수 : 한 페이지 당 8개 게시물
        var page_size = 8;
        //페이지의 개수
        var page_list_size = 10;
        //limit 변수
        var no = "";
        //전체 게시물의 숫자
        var totalPageCount = 0;

        ItemStorage.getItemCount_name(req.params.PRODUCT_NAME).then((data) => {
            //전체 게시물의 숫자
            totalPageCount = data.cnt;
            //현재 페이지
            var curPage = req.params.cur;


            //전체 페이지 개수
            if (totalPageCount < 0) {
                totalPageCount = 0;
            }

            var totalPage = Math.ceil(totalPageCount / page_size); //전체 페이지 수
            var totalSet = Math.ceil(totalPage / page_list_size); // 전체 세트 수
            var curSet = Math.ceil(curPage / page_list_size); // 현제 세트 번호
            var startPage = Math.ceil((curSet - 1) * 10) + 1; //현재 세트 내에서 출력될 시작페이지
            var endPage = (startPage + page_list_size) - 1; //현재 세트내 출력될 마지막 페이지

            //현재 페이지가 0 보다 작으면
            if (curPage < 0) {
                no = 0;
            } else {
                //0 보다 크면 limit 함수에 들어갈 첫번째 인자 값 구하기
                no = (curPage - 1) * 8;
            }
            var result2 = {
                "curPage": curPage,
                "page_list_size": page_list_size,
                "page_size": page_size,
                "totalPage": totalPage,
                "totalSet": totalSet,
                "curSet": curSet,
                "startPage": startPage,
                "endPage": endPage
            };
            fs.readFile('src/views/productList.ejs', 'utf-8', (error, data) => {
                if (error) {
                    console.log("ejs오류" + error);
                    return
                }

                const result = ItemStorage.searchList(req.params.PRODUCT_NAME, no, page_size).then((result) => {
                    res.send(ejs.render(data, {
                        data: result,
                        pasing: result2,
                        sessionid, sessionuid
                    }));
                });
            });
        });
    },
    searchList: (req, res) => {
        var sessionid = req.session.userid;
        var sessionuid = req.session.usernum;

        fs.readFile('src/views/searchList.ejs', 'utf-8', (error, data) => {
            if (error) {
                console.log("ejs오류" + error);
                return
            }
            ItemStorage.Search(req.body.searchtext).then((result) => {
                res.send(ejs.render(data, {
                    data: result,
                    sessionid, sessionuid
                }));
            });
        });
    },
    pasing_TYPE: (req, res) => {
        var sessionid = req.session.userid;
        var sessionuid = req.session.usernum;
        //페이지당 게시물 수 : 한 페이지 당 8개 게시물
        var page_size = 8;
        //페이지의 개수
        var page_list_size = 10;
        //limit 변수
        var no = "";
        //전체 게시물의 숫자
        var totalPageCount = 0;


        ItemStorage.getItemCount(req.params.PRODUCT_TYPE).then((data) => {
            //전체 게시물의 숫자
            totalPageCount = data.cnt;
            //현재 페이지
            var curPage = req.params.cur;


            //전체 페이지 개수
            if (totalPageCount < 0) {
                totalPageCount = 0;
            }

            var totalPage = Math.ceil(totalPageCount / page_size); //전체 페이지 수
            var totalSet = Math.ceil(totalPage / page_list_size); // 전체 세트 수
            var curSet = Math.ceil(curPage / page_list_size); // 현제 세트 번호
            var startPage = Math.ceil((curSet - 1) * 10) + 1; //현재 세트 내에서 출력될 시작페이지
            var endPage = (startPage + page_list_size) - 1; //현재 세트내 출력될 마지막 페이지

            //현재 페이지가 0 보다 작으면
            if (curPage < 0) {
                no = 0;
            } else {
                //0 보다 크면 limit 함수에 들어갈 첫번째 인자 값 구하기
                no = (curPage - 1) * 8;
            }
            var result2 = {
                "curPage": curPage,
                "page_list_size": page_list_size,
                "page_size": page_size,
                "totalPage": totalPage,
                "totalSet": totalSet,
                "curSet": curSet,
                "startPage": startPage,
                "endPage": endPage
            };
            fs.readFile('src/views/productList.ejs', 'utf-8', (error, data) => {
                if (error) {
                    console.log("ejs오류" + error);
                    return
                }


                const result = ItemStorage.getList(req.params.PRODUCT_TYPE, no, page_size).then((result) => {
                    res.send(ejs.render(data, {
                        data: result,
                        pasing: result2,
                        sessionid, sessionuid
                    }));
                });
            });
        });
    },
    insert: (req, res) => {
        res.render("insert");
    },
    update: (req, res) => {
        res.render("update");
    },
    boardUpdate: (req, res) => {
        var sessionid = req.session.userid;
        var sessionuid = req.session.usernum;
        ContentStorage.getContentInfo(req.params.content_id).then((result) => {
            res.render("boardUpdate", { sessionid, sessionuid, data: result });
        })
    },
    item: (req, res) => {
        ItemStorage.getItemInfo(req.params.PRODUCT_ID).then((result) => {
            res.render("item", { data: result });
        })
    },
    paypage: (req, res) => {
        var sessionid = req.session.userid;
        res.render("paypage", { sessionid });
    },
    place: (req, res) => {
        res.render("place");
    },
    detail: (req, res) => {
        var sessionid = req.session.userid;
        var sessionuid = req.session.usernum;
        ItemStorage.getItemInfo(req.params.PRODUCT_ID).then((result) => {
            res.render("detail", { sessionid, sessionuid, data: result });
        })
    },
    boarddetail: (req, res) => {
        var sessionid = req.session.userid;
        var sessionuid = req.session.usernum;
        ContentStorage.upHit(req.params.content_id);
        ContentStorage.getContentInfo(req.params.content_id).then((result) => {
            res.render("boarddetail", { sessionid, sessionuid, data: result });
        })
    },
    backup: (req, res) => {
        var sessionid = req.session.userid;
        var sessionuid = req.session.usernum;
        res.render("backup", { sessionid, sessionuid });
    },
}

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        req.session.userid = req.body.id;
        req.session.usernum = response.user_id;
        return res.json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },
    registercheck: async (req, res) => {
        const user = new User(req.body);
        const response = await user.registercheck();
        return res.json(response);
    },
    idcheck: async (req, res) => {
        const user = new User(req.body);
        const response = await user.idcheck();
        return res.json(response);
    },
    modify: async (req, res) => {
        const user = new User(req.body);
        const response = await user.modify();
        return res.json(response);
    },
    withdrawl: async (req, res) => {
        const user = new User(req.body);
        const response = await user.delete();
        return res.json(response);
    },
    itemInsert: async (req, res) => {
        const image = `/images/${req.file.filename}`; // image 경로 만들기
        const name = req.body.name;
        const type = req.body.type;
        const price = req.body.price;
        req.body = {
            image: image,
            PRODUCT_NAME: name,
            PRODUCT_TYPE: type,
            PRICE: price,
        };
        const item = new Item(req.body);
        const response = await item.register();
        res.redirect("/itemMagement");
        return res.json(response);
    },
    Write: async (req, res) => {
        const title = req.body.title;
        const user_id = req.body.user_id;
        const content = req.body.content;
        req.body = {
            title: title,
            user_id: user_id,
            content: content,
        };
        const text = new Content(req.body);
        const response = await text.register();
        res.redirect("/board");
        return res.json(response);
    },
    itemUpdate: async (req, res) => {
        const id = req.params.PRODUCT_ID;
        const image = `/images/${req.file.filename}`; // image 경로 만들기
        const name = req.body.name;
        const type = req.body.type;
        const price = req.body.price;
        req.body = {
            PRODUCT_ID: id,
            image: image,
            PRODUCT_TYPE: type,
            PRODUCT_NAME: name,
            PRICE: price,
        };
        const item = new Item(req.body);
        const response = await item.update();
        res.redirect("/itemMagement");
        return res.json(response);
    },
    itemdel: async (req, res) => {
        const item = new Item(req.params);
        const response = await item.delete();
        return res.redirect("/itemMagement");
    },
    boardUpdate: async (req, res) => {
        const id = req.params.content_id;
        const title = req.body.title;
        const content = req.body.content;
        req.body = {
            content_id: id,
            title: title,
            content: content,
        };
        const Content_item = new Content(req.body);
        const response = await Content_item.update();
        res.redirect("/board");
        return res.json(response);
    },
    boarddel: async (req, res) => {
        const Content_item = new Content(req.params);
        const response = await Content_item.delete();
        return res.redirect("/board");
    },
    SaveS: async (req, res) => {
        const cartS = new CartS(req.body);
        const response = await cartS.register();
        return res.json(response);
    },
    cartdel: async (req, res) => {
        var sessionid = req.session.userid;
        const carts= new CartS(req.params);
        const response = await carts.delete(sessionid);
        return res.redirect("/cart");
    },
}

const extra = {
    logout: (req, res) => {
        req.session.destroy(function () {
            req.session;
        });
        res.redirect("/");
    },
}
module.exports = {
    view,
    process,
    extra,
};