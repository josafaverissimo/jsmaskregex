const cpfMask = inputElement => {
    let startSelection = inputElement.selectionStart
    let endSelection = inputElement.selectionEnd    

    let inputValue = inputElement.value
    const currentCharIndex = endSelection
    const lastSequence = inputValue.slice(currentCharIndex - 4, currentCharIndex)

    if(inputValue.length > 14) {
        if(startSelection == 1) {
            inputValue = inputValue.slice(startSelection)
        } else if(startSelection == 15) {
            inputValue.slice(0, startSelection - 1)
        } else {
            inputValue = inputValue.slice(0, startSelection - 1) + inputValue.slice(startSelection)
        }

        startSelection--
        endSelection--
    }

    
    inputValue = inputValue.replace(/[^0-9]*/g, "")

    inputValue = inputValue.replace(/^(.{11}).*$/g, "$1")
    
    
    let inputNewValue = inputValue.replace(/([0-9]{3})([0-9]{3})?([0-9]{3})?([0-9]{2})?/g, "$1.$2.$3-$4")
    inputNewValue = inputNewValue.replace(/(?<=\.)\.-|(?<=[0-9]\.)-/g, "")

    if(currentCharIndex >= 3) {
        if(/^[0-9]{4}$/.test(lastSequence)) {
            startSelection++
            endSelection++
        }
    }

    inputElement.value = inputNewValue
    inputElement.setSelectionRange(startSelection, endSelection)
}

document.getElementById("cpf").addEventListener("input", ({ target }) => cpfMask(target))