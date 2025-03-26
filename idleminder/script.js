function totalMineCashFromIdleCash(idleCash, multiplier) {
    return (idleCash / multiplier) * 10
}

function parseNumberWithUnit(num, unit) {
    if(unit === "") {
        return num
    } else if(unit === "K") {
        return num * (10 ** 3)
    } else if(unit === "M") {
        return num * (10 ** 6)
    } else if(unit === "T") {
        return num * (10 ** 9)
    } else if(unit.match(/^a[a-z]$/)) {
        const charIndex = unit.charCodeAt(1) - 0x60
        const exponent = 9 + charIndex * 3
        return num * (10 ** exponent)
    }
}

function numberToMaxDigitString(num, maxDigits) {
    const exponent = Math.floor(Math.log10(num))
    const decimalPlaces = maxDigits - exponent - 1

    return num.toFixed(decimalPlaces)
}

function numberToNumberWithUnit(num) {
    const log = Math.log10(num)
    
    if(log < 3) {
        return [numberToMaxDigitString(num, 3), ""]
    } else if(log >= 3 && log < 6) {
        const remainingNumber = num / (10 ** 3)

        return [numberToMaxDigitString(remainingNumber, 3), "K"]
    } else if(log >= 6 && log < 9) {
        const remainingNumber = num / (10 ** 6)

        return [numberToMaxDigitString(remainingNumber, 3), "M"]
    } else if(log >= 9 && log < 12) {
        const remainingNumber = num / (10 ** 9)

        return [numberToMaxDigitString(remainingNumber, 3), "T"]
    } else if(log >= 12 && log < 90) {
        const exponent = Math.floor(log / 3) * 3
        const remainingNumber = num / (10 ** exponent)

        const charIndex = (exponent / 3) - 3
        const unit = "a" + String.fromCharCode(charIndex + 0x60)

        return [numberToMaxDigitString(remainingNumber, 3), unit]
    }
}
