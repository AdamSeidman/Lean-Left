let getLetterType = function(input) {
    input = input.charCodeAt(0)
    if (input > 64 && input < 91) return 32
    if (input > 96 && input < 123) return -32
    return 0
}

let flipCaps = function(input) {
    let builder = ''
    while (input.length > 0) {
        let letter = input.charAt(0)
        input = input.slice(1)
        builder = builder.concat(String.fromCharCode(letter.charCodeAt(0) + getLetterType(letter)))
    }
    return builder
}

let capitalism = function (input) {
    let arr = input.split('a').join('A').split('A')
    if (arr.length === 1) return arr[0]
    for (let i = 1; i < arr.length; i += 2) {
        arr[i] = flipCaps(arr[i])
    }
    return arr.join('')
}

let keysets = ['\tqwertyuiop', 'asdfghjkl', 'zxcvbnm', '\tQWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM']

let scriptify = function(input) {
    input = capitalism(input)
    let builder = ''
    while (input.length > 0) {
        let letter = input.charAt(0)
        input = input.slice(1)
        for (let i = 0; i <= keysets.length; i++) {
            if (i === keysets.length || letter === '\t' || letter.toLowerCase() === 'z') {
                builder = builder.concat(letter)
                break
            }
            if (keysets[i].includes(letter)) {
                let index = keysets[i].indexOf(letter)
                builder = builder.concat(keysets[i].slice(index - 1, index))
                break
            }
        }
    }
    return builder.split('z').join('').split('Z').join('')
}
