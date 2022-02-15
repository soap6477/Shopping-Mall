"use strict";

const id = document.querySelector("#id");
const email = document.querySelector("#email");
const tel = document.querySelector("#phone");
const name = document.querySelector("#name");
const address = document.querySelector("#address");
const tel2 = document.querySelector("#phone2");
const p_price = document.querySelector("#p_price");
const d_price = document.querySelector("#d_price");
const t_price = document.querySelector("#t_price");

// 세션을 통해 상품 정보 불러오기
const p_name = sessionStorage.getItem("name"); // 상품 이름 세션
p_price.value = sessionStorage.getItem("sellprice"); // cart와 detail에서 세션 이름을 같게 해서 덮어 씌우는 형태로 세션 저장

// 가격 값 계산
d_price.value = 200;
t_price.value = parseInt(p_price.value) + parseInt(d_price.value);

// 결제 이벤트
const paybutton = document.querySelector('#check_module');
paybutton.addEventListener("click", pay);

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
        email.value = res.email;
        tel.value = res.phone;
        name.value = res.name;
        address.value = res.address;
        tel2.value = res.phone;
    }).catch((err) => {
        console.error("로드 중 에러 발생");
        location.href = "/";
        alert("로그인을 해주십시오.");
    });

function pay(){
    var IMP = window.IMP; // 생략가능
    IMP.init('imp04923992');
    // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용
    // i'mport 관리자 페이지 -> 내정보 -> 가맹점식별코드
    IMP.request_pay({
    pg: 'html5_inicis', // version 1.1.0부터 지원.
    /*
    'kakao':카카오페이,
    html5_inicis':이니시스(웹표준결제)
    'nice':나이스페이
    'jtnet':제이티넷
    'uplus':LG유플러스
    'danal':다날
    'payco':페이코
    'syrup':시럽페이
    'paypal':페이팔
    */
    pay_method: 'card',
    /*
    'samsung':삼성페이,
    'card':신용카드,
    'trans':실시간계좌이체,
    'vbank':가상계좌,
    'phone':휴대폰소액결제
    */
    merchant_uid: 'merchant_' + new Date().getTime(),
    
    name: '주문명: ' +(p_name),
    //결제창에서 보여질 이름
    amount: t_price.value,
    //가격
    buyer_email: 'iamport@siot.do',
    buyer_name: '구매자이름',
    buyer_tel: '010-1234-5678',
    buyer_addr: '서울특별시 강남구 삼성동',
    buyer_postcode: '123-456',
    m_redirect_url: 'https://www.yourdomain.com/payments/complete'
    /*
    모바일 결제시,
    결제가 끝나고 랜딩되는 URL을 지정
    
    */
    }, function (rsp) {
    console.log(rsp);
    if (rsp.success) {
    var msg = '결제가 완료되었습니다.';
    msg += '고유ID : ' + rsp.imp_uid;
    msg += '상점 거래ID : ' + rsp.merchant_uid;
    msg += '결제 금액 : ' + rsp.paid_amount;
    msg += '카드 승인번호 : ' + rsp.apply_num;
    } else {
    var msg = '결제에 실패하였습니다.';
    msg += '에러내용 : ' + rsp.error_msg;
    }
    alert(msg);
    });
}

Number.prototype.formatNumber = function(){
    if(this==0) return 0;
    let regex = /(^[+-]?\d+)(\d{3})/;
    let nstr = (this + '');
    while (regex.test(nstr)) nstr = nstr.replace(regex, '$1' + ',' + '$2');
    return nstr;
};