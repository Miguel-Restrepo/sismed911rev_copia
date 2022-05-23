const ServiceConfig = {
    codgoPais: "do",
    key: "d2eb62eb-5d9f-4c3f-95d2-47d5d9df934b",
};

ServiceConfig.number_validate = (num) => {
    let suma = 0;
    let c = num.replace(/-/g, "");
    let number = c.substr(0, c.length - 1);

    const verificador = c.substr(c.length - 1, 1);

    if (num.length < 11) {
        return false;
    }
    for (let i = 0; i < number.length; i++) {
        let mod = 2;
        if (i % 2 == 0) mod = 1;
        let res = number.substr(i, 1) * mod;
        if (res > 9) {
            res = res.toString();
            const uno = res.substr(0, 1);
            const dos = res.substr(1, 1);
            res = eval(uno) + eval(dos);
        }
        suma += eval(res);
    }
    const el_numero = (10 - (suma % 10)) % 10;
    if (el_numero == verificador && number.substr(0, 3) != "000") {
        return true;
    }

    return false;
};
export default ServiceConfig;
