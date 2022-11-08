const cpfMask = inputElement => {
    console.log(inputElement.value)
    inputElement.value = inputElement.value.replace(/[.-]/g, "")
    inputElement.value = inputElement.value.replace(/^(.{11}).*$/g, "$1")
    
    const inputValue = inputElement.value
    const lastElementRegex = /.$/
    let lastCharTyped = inputValue.match(lastElementRegex)
    
    if(lastCharTyped != null) {
        lastCharTyped = lastCharTyped[0]

        
        if(isNaN(Number(lastCharTyped))) {
            const ignoreLastCharRegex = new RegExp('^(.{' + (inputValue.length - 1) + '}).*$', 'g')
            const noLastChar = "$1"
            let inputNewValue = inputValue.replace(ignoreLastCharRegex, noLastChar)

            inputElement.value = inputNewValue

            return
        }
    }

    let inputNewValue = inputValue.replace(/([0-9]{3})([0-9]{3})?([0-9]{3})?([0-9]{2})?/g, "$1.$2.$3-$4")
    inputNewValue = inputNewValue.replace(/(?<=\.)\.-|(?<=[0-9]\.)-/g, "")
    inputElement.value = inputNewValue

}

document.getElementById("cpf").addEventListener("input", event => cpfMask(event.target))