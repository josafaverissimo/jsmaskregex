const cpfMask = inputElement => {
    let startSelection = inputElement.selectionStart
    let endSelection = inputElement.selectionEnd
    
    let inputValue = inputElement.value
    inputValue = inputValue.replace(/[^0-9]*/g, "")
    inputValue = inputValue.replace(/^(.{11}).*$/g, "$1")
    
    
    let inputNewValue = inputValue.replace(/([0-9]{3})([0-9]{3})?([0-9]{3})?([0-9]{2})?/g, "$1.$2.$3-$4")
    inputNewValue = inputNewValue.replace(/(?<=\.)\.-|(?<=[0-9]\.)-/g, "")

    inputElement.value = inputNewValue
    inputElement.setSelectionRange(startSelection, endSelection)

}

document.getElementById("cpf").addEventListener("input", ({ target }) => cpfMask(target))