"use strict";

const id = document.querySelector("#userid");
const name = document.querySelector("#p_name");
const p_price = document.querySelector("#p_price");
const p_sell = document.querySelector("#p_sell");

const p_cnt = document.querySelector("#p_cnt");
const p_image = document.querySelector("#p_image");
const r_price = document.querySelector("#r_price");
const p_id = document.querySelector("#p_id");

const cartBtn = document.querySelector("#cartbtn");

cartBtn.addEventListener("click", SaveS);

function SaveS(){

    if(!id.value){
        location.href = "/";
        alert("로그인을 해주십시오");
    }

    const req = {
        fk_user_id: id.value,
        fk_PRODUCT_ID: p_id.value,
        order_price:p_price.value,
        order_cnt:p_cnt.value,
        order_sellprice:p_sell.value,
        order_product_name:p_name.value,
        order_image:p_image.value,
    };
    fetch("/SaveS", {
        method: "post",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => (res.json()))
    .then((res) => {
        location.href = "/cart";
    }).catch((err) => {
        console.error("로드 중 에러 발생");
    });
}