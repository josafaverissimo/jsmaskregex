const cpfMask = inputElement => {
    let startSelection = inputElement.selectionStart
    let endSelection = inputElement.selectionEnd    

    let inputValue = inputElement.value
    const currentCharIndex = endSelection
    const lastSequence = inputValue.slice(currentCharIndex - 4, currentCharIndex)

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