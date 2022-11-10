const cpfMask = inputElement => {
    let cursorPosition = inputElement.selectionStart

    let inputValue = inputElement.value
    const currentCharIndex = cursorPosition - 1
    const sequence = inputValue.slice(0, currentCharIndex + 1)

    if(inputValue.length > 14) {
        if(cursorPosition == 1) {
            inputValue = inputValue.slice(cursorPosition)
        } else if(cursorPosition == 15) {
            inputValue.slice(0, cursorPosition - 1)
        } else {
            inputValue = inputValue.slice(0, cursorPosition - 1) + inputValue.slice(cursorPosition)
        }

        cursorPosition--
    }
    
    inputValue = inputValue.replace(/[^0-9]*/g, "")
    inputValue = inputValue.replace(/^(.{11}).*$/g, "$1")
    
    
    let inputNewValue = inputValue.replace(/([0-9]{3})([0-9]{3})?([0-9]{3})?([0-9]{2})?/g, "$1.$2.$3-$4")
    inputNewValue = inputNewValue.replace(/(?<=\.)\.-|(?<=[0-9]\.)-/g, "")

    if(/[0-9]{4}$/.test(sequence)) {
        cursorPosition++
    }

    inputElement.value = inputNewValue
    inputElement.setSelectionRange(cursorPosition, cursorPosition)
}

const phoneMask = inputElement => {
    let cursorPosition = inputElement.selectionStart

    const inputValue = inputElement.value
    const currentCharIndex = cursorPosition - 1
    const sequence = inputValue.slice(0, currentCharIndex + 1)
    let inputNewValue = inputValue.replace(/[^0-9]/g, "").replace(/^([0-9]{11}).*$/g, "$1")

    inputNewValue = inputNewValue.replace(/^(.)(.)?(.)?(....)?(....)?/, "($1$2) $3 $4-$5")
    inputNewValue = inputNewValue.replace(/(?<=\(.)\)  -|(?<=\(..\) ) -|(?<=\(..\) . )-/, "")

    if(/^[0-9]$|^\([0-9]{2}$|^\([0-9]{2}\)[0-9] $|^\([0-9]{2}\) [0-9]{2} $|^\([0-9]{2}\) [0-9] [0-9]{5}-$/.test(inputValue)) {
        cursorPosition++
    }

    inputElement.value = inputNewValue
    inputElement.setSelectionRange(cursorPosition, cursorPosition)
}


document.getElementById("phone").addEventListener("input", ({ target }) => phoneMask(target))
document.getElementById("cpf").addEventListener("input", ({ target }) => cpfMask(target))