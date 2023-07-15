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

let butcherize = function(input, butcher) {
    if (input.length < 3) return input
    input = input.split('. ')
    for (let i = 1; i < input.length; i++) {
        if (input[i].length < 2) continue
        input[i] = `${flipCaps(input[i].charAt(0))}${input[i].slice(1)}`
    }
    if (butcher) {
        return input.join('. ').split('I\'m').join('i\'m').split('i\'M').join('I\'M').split(' I ').join(' i ') 
    } else {
        return input.join('. ').split('i\'m').join('I\'m').split('I\'M').join('I\'m').split(' i ').join(' I ')
    }
}

// communism?
let anticapitalism = function(input) {
    if (input === undefined || input.length < 2) return 'Nah'
    let builder = input.slice(0, 1)
    input = input.slice(1)
    input = butcherize(input, true)
    let lastLetterType = -32;
    let flipMode = false
    while (input.length > 0) {
        let letter = input.charAt(0)
        input = input.slice(1)
        let letterType = getLetterType(letter)
        if (letterType === 0) {
            builder = builder.concat(letter)
        } else if (letterType === lastLetterType) {
            if (flipMode) {
                letter = flipCaps(letter)
            }
            builder = builder.concat(letter)
        } else {
            flipMode = !flipMode
            if (flipMode) {
                letter = flipCaps(letter)
            }
            builder = `${builder}a${letter}`
            lastLetterType = letterType
        }
    }
    input = builder.slice(1)
    input = butcherize(input, false)
    return `${builder.charAt(0)}${input}`
}

let reverseScriptify = function(input) {
    let builder = ''
    while (input.length > 0) {
        let letter = input.charAt(0)
        input = input.slice(1)
        for (let i = 0; i <= keysets.length; i++) {
            if (i === keysets.length || letter === '\t') {
                builder = builder.concat(letter)
                break
            }
            if (keysets[i].includes(letter)) {
                letter = keysets[i].slice(keysets[i].indexOf(letter) + 1)
                builder = builder.concat(letter.slice(0, 1))
                break
            }
        }
    }
    builder = builder.split('  ')
    for (let i = 1; i < builder.length; i++) {
        let letter = builder[i - 1].charAt(builder[i - 1].length - 1)
        if (letter === '.') letter = builder[i - 1].charAt(builder[i - 1].length - 2)
        builder[0] = `${builder[0]} ${(getLetterType(letter) > 0)? 'A' : 'a'} ${(i % 2 === 1)? flipCaps(builder[i]) : builder[i]}`
    }

    return anticapitalism(builder[0])
}

let str = 'I cannot attest to how well I made this script. I\'m a mere man.'

console.log('Original text:\n', str)
console.log('Fixed text:\n', scriptify(str))
console.log('Best guess at reverse engineering:\n', reverseScriptify(scriptify(str)))