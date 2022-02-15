"use strict";

var re =/^[0-9]{9,11}$/g
const id = document.querySelector("#userid");
const name = document.querySelector("#username");
const psword = document.querySelector("#psword")
const checkpsword = document.querySelector("#checkpsword");
const date = document.querySelector("#date");
const email = document.querySelector("#email");
const tel = document.querySelector("#tel");
const address = document.querySelector("#address");

const registerbutton = document.querySelector('#button');
const checkbutton = document.querySelector('#ckid');
registerbutton.addEventListener("click", register);
checkbutton.addEventListener("click", check);

function check(){
    const req = {
        id: id.value,
    };
    fetch("/registercheck", {
        method: "Post",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => (res.json()))
        .then((res) => {
            if(res.success){
                alert(res.msg);
                id.value = "";
            } else {
                alert(res.msg);
            }
        }).catch((err) => {
            console.error("회원가입 중 에러 발생");
        });
}

function register(){
    if(!name.value) return alert("이름을 입력해 주세요.");
    if(!id.value) return alert("아이디를 입력해 주세요.");
    if(!psword.value) return alert("비밀번호를 입력해 주세요.")
    if(!date.value) return alert("생일을 입력해 주세요.");
    if(!email.value) return alert("이메일을 입력해 주세요");
    if(!check(re,tel,"핸드폰번호만 입력해 주세요")) return;
    function check(re, what, message) {
        if(re.test(what.value)) {
            return true;
        }
        alert(message);
        what.value = "";
        what.focus();
        return false;
    }
    if(!address.value) return alert("주소를 입력해 주세요.");
    if(psword.value !== checkpsword.value) return alert("비밀번호가 다릅니다. 다시 확인해 주세요.");

    const checkid = {
        id: id.value,
    };
    fetch("/registercheck", {
        method: "Post",
        headers: {
            "content-type" : "application/json",
        },
        body: JSON.stringify(checkid),
    })
        .then((res) => (res.json()))
        .then((res) => {
            if(res.success){
                alert(res.msg);
                id.value = "";
            } else {
                const req = {
                    id: id.value,
                    name: name.value,
                    psword: psword.value,
                    email: email.value,
                    date: date.value,
                    tel: tel.value,
                    address: address.value,
                };
                fetch("/register", {
                    method: "post",
                    headers: {
                        "content-type" : "application/json",
                    },
                    body: JSON.stringify(req),
                })
                    .then((res) => (res.json()))
                    .then((res) => {
                        if(res.success){
                            location.href = "/login";
                        } else {
                            alert(res.msg);
                        }
                    }).catch((err) => {
                        console.error("로그인 중 에러 발생");
                    });
            }
        }).catch((err) => {
            console.error("회원가입 중 에러 발생");
        });
}