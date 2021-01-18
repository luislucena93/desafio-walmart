const FormatMoney = (money) => {
    return money.toString().replace(/\d(?=(?:\d{3})+$)/g, '$&.');
}

export default FormatMoney;