"use strict";

const id = document.querySelector("#id");
const name = document.querySelector("#name");
const psword = document.querySelector("#psword");
const email = document.querySelector("#email");
const tel = document.querySelector("#tel");
const address = document.querySelector("#address");

const modifybutton = document.querySelector('#modifybutton');
const deletebutton = document.querySelector('#withdrawlbutton');
modifybutton.addEventListener("click", modify);
withdrawlbutton.addEventListener("click", withdrawal);

const req = {
    id: id.value,
};
fetch("/idcheck", {
    method: "post",
    headers: {
        "content-type" : "application/json",
    },
    body: JSON.stringify(req),
})
    .then((res) => (res.json()))
    .then((res) => {
        name.value = res.name;
        email.value = res.email;
        tel.value = res.phone;
        address.value = res.address;
    }).catch((err) => {
        console.error("로드 중 에러 발생");
        location.href = "/";
    });

function modify(){
    const req = {
        id: id.value,
        name: name.value,
        psword: psword.value,
        email: email.value,
        tel: tel.value,
        address: address.value,
    };
    fetch("/modify", {
        method: "post",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => (res.json()))
        .then((res) => {
            if(res.success){
                location.href = "/";
                alert("회원수정이 완료되었습니다.");
            } else {
                alert(res.msg);
            }
        }).catch((err) => {
            console.error("회원수정 중 에러 발생");
        });
}

function withdrawal(){
    const req = {
        id: id.value,
    };
    fetch("/withdrawl", {
        method: "post",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => (res.json()))
        .then((res) => {
            if(res.success){
                location.href = "logout";
                alert("탈퇴되었습니다.")
            } else {
                alert(res.msg);
            }
        }).catch((err) => {
            console.error("회원탈퇴 중 에러 발생");
        });
}