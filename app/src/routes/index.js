"use strict";

const express = require('express');
express(express.urlencoded({ extended: true }))
const router = express.Router();
const multer = require("multer");
const path = require("path");

const ctrl = require('./controller');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('../APP/src/public/images/'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + "_" + Date.now() + ext);
    },
});

const upload = multer({ storage: storage });

router.get("/", ctrl.view.index);
router.get("/login", ctrl.view.login);
router.get("/join", ctrl.view.join);
router.get("/userModify", ctrl.view.modify);
router.get("/cart", ctrl.view.cart);
router.get("/paypage", ctrl.view.paypage);
router.get("/place", ctrl.view.place);
router.get("/detail", ctrl.view.detail);
router.get("/itemMagement", ctrl.view.itemMagement);
router.get("/clothesList", ctrl.view.clothesList);
router.get("/machineList", ctrl.view.machineList);
router.get("/deviceList", ctrl.view.deviceList);
router.get("/board", ctrl.view.board);
router.get("/boardWrite", ctrl.view.boardWrite);
router.get("/boardUpdate/:content_id", ctrl.view.boardUpdate);
router.get("/boarddetail/:content_id", ctrl.view.boarddetail);
router.get("/boarddel/:content_id", ctrl.process.boarddel);
router.get("/pasing/:cur", ctrl.view.pasing);
router.get("/pasing_TYPE/:PRODUCT_TYPE/:cur", ctrl.view.pasing_TYPE);
router.get("/insert", ctrl.view.insert);
router.get("/Update/:PRODUCT_ID", ctrl.view.update);
router.get("/item/:PRODUCT_ID", ctrl.view.item);
router.get("/detail/:PRODUCT_ID", ctrl.view.detail);
router.get("/delete/:PRODUCT_ID", ctrl.process.itemdel);
router.get("/del/:fk_PRODUCT_ID", ctrl.process.cartdel);




router.get("/logout", ctrl.extra.logout);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/registercheck", ctrl.process.registercheck);
router.post("/idcheck", ctrl.process.idcheck);
router.post("/modify", ctrl.process.modify);
router.post("/withdrawl", ctrl.process.withdrawl);
router.post("/insert", upload.single("image"), ctrl.process.itemInsert);
router.post('/upload-image', upload.single('img'), (req, res) => {
    let response = {}
    response.url = `/images/${path.basename(req.file.path)}`

    // json응답 예 => { "url": "/images/img-filename-12345.png" }
    res.json(response)
});

router.post("/Write", ctrl.process.Write);
router.post("/SaveS", ctrl.process.SaveS);
router.post("/update/:PRODUCT_ID", upload.single("image"), ctrl.process.itemUpdate);
router.post("/boardUpdate/:content_id", ctrl.process.boardUpdate);

router.post("/searchList", ctrl.view.searchList);
router.post("/delallCart", ctrl.view.delallCart);

module.exports = router;