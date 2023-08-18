const cpfMask = inputElement => {
    let cursorPosition = inputElement.selectionStart

    let inputValue = inputElement.value

    if(inputValue.length > 14) {
        const initPosition = 1
        const maxPosition = 15

        if(cursorPosition === initPosition) {
            inputValue = inputValue.slice(cursorPosition)

        } else if(cursorPosition === maxPosition) {
            inputValue.slice(0, cursorPosition - 1)

        } else {
            inputValue = inputValue.slice(0, cursorPosition - 1) + inputValue.slice(cursorPosition)

        }

        cursorPosition--
    }
    
    let inputNewValue = inputValue.replace(/[^0-9]*/g, "").replace(/^(.{11}).*$/g, "$1")
    inputNewValue = inputNewValue.replace(/([0-9]{3})([0-9]{3})?([0-9]{3})?([0-9]{2})?/g, "$1.$2.$3-$4")
    inputNewValue = inputNewValue.replace(/(?<=\.)\.-|(?<=[0-9]\.)-/g, "")
    const lastTwoChar = inputNewValue.slice(-2)

    if(/[.-]/.test(lastTwoChar)) {
        const userIsDeleting = cpfMask.lastValue !== undefined ? cpfMask.lastValue.length >= inputValue.length : false

        cursorPosition = userIsDeleting ? cursorPosition : cursorPosition + 1
    }

    cpfMask.lastValue = inputValue

    inputElement.value = inputNewValue
    inputElement.setSelectionRange(cursorPosition, cursorPosition)
}

const phoneMask = inputElement => {
    const mask = "(xx) {x} xxxx-xxxx"
    let cursorPosition = inputElement.selectionStart

    let inputValue = inputElement.value

    if(inputValue.length > 16) {
        if(cursorPosition == 1) {
            inputValue = inputValue.slice(cursorPosition)
        } else if(cursorPosition == 17) {
            inputValue.slice(0, cursorPosition - 1)
        } else {
            inputValue = inputValue.slice(0, cursorPosition - 1) + inputValue.slice(cursorPosition)
        }

        cursorPosition--
    }

    let inputNewValue = inputValue.replace(/[^0-9]/g, "").replace(/^([0-9]{11}).*$/g, "$1")
    inputNewValue = inputNewValue
        .replace(/^(.)(.)?(.{1,4})?(.{1,4})?/, "($1$2) 9 $3-$4")
        .replace(/(?<=\(.)\) 9 -|(?<=\(..\)) 9 -/, "")
    
    const userIsDeleting = phoneMask.lastValue !== undefined ? phoneMask.lastValue.length >= inputValue.length : false
    if(!userIsDeleting) {
        while([1, 3, 4, 5, 6, 11].indexOf(cursorPosition) !== -1) {
            cursorPosition++
        }
    }

    phoneMask.lastValue = inputValue

    inputElement.value = inputNewValue
    inputElement.setSelectionRange(cursorPosition, cursorPosition)
}


document.getElementById("phone")
    .addEventListener("input", ({ target }) => phoneMask(target))

document.getElementById("cpf")
    .addEventListener("input", ({ target }) => cpfMask(target))

document.getElementById("generic-mask")
    .addEventListener("input", ({ target }) => genericMask(target))
