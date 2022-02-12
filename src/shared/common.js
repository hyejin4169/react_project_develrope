export const emailCheck = (email) => {
    let _reg = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+){2,3}$/;

    return _reg.test(email);
}

//비번: 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
export const pwdCheck = (pwd) => {
    let _reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    return _reg.test(pwd);
}