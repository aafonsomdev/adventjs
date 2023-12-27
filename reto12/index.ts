/* Los caracteres de la A a la Z se degradan de mayúsculas a minúsculas (A-Z ⇒ a-z)
Las letras se degradan en una serie de caracteres en este orden: a-z ⇒ # ⇒ + ⇒ : ⇒ . ⇒
Una vez degradadas las letras en los símbolos, se pueden continuar degradando.
Ten en cuenta que el último es un espacio en blanco, no un caracter vacío.
Los caracteres que no son letras (como los dígitos) no se degradan. */

function checkIsValidCopy(original: string, copy: string): boolean {
    const indexToStart = {
        isUpper: 0,
        isLower: 1,
        "#": 2,
        "+": 3,
        ":": 4,
        ".": 5,
        " ": 6,
    };
    const checkSequency = [
        (cop: string, orig: string): boolean => orig === cop,
        (cop: string, orig: string): boolean =>
            orig.toLowerCase() === cop.toLowerCase() && cop.toUpperCase() !== cop,
        (cop: string): boolean => "#+:. ".includes(cop),
        (cop: string): boolean => "+:. ".includes(cop),
        (cop: string): boolean => ":. ".includes(cop),
        (cop: string): boolean => ". ".includes(cop),
        (cop: string): boolean => " ".includes(cop),
    ];
    const executeCheckSequency = (index: number, orig: string, cop: string) => {
        let isValid = false;
        for (let i = index; i < checkSequency.length; i++) {
            const checkIsValidCopy = checkSequency[i];
            if (checkIsValidCopy(cop, orig)) {
                isValid = true;
                break;
            }
        }

        return isValid;
    };

    for (let index = 0; index < original.length; index++) {
        const originalChar = original[index];
        const copyChar = copy[index];
        const isNumber = parseInt(originalChar);

        if (!isNaN(isNumber) && originalChar !== copyChar) {
            return false;
        } else if (!isNaN(isNumber)) {
            continue;
        }

        const isUpper = originalChar.match(/[a-z]/i) && originalChar === originalChar.toUpperCase();
        const isLower = originalChar.match(/[a-z]/i) && !isUpper;
        let indexTo = isUpper
            ? indexToStart.isUpper
            : isLower
            ? indexToStart.isLower
            : indexToStart[originalChar as keyof typeof indexToStart];
        let isValid = executeCheckSequency(indexTo, originalChar, copyChar);
        if (!isValid) {
            return false;
        }
    }

    return true;
}

/* console.log(checkIsValidCopy("Santa Claus is coming", "sa#ta Cl#us i+ comin#")); // true
console.log(checkIsValidCopy("s#nta Cla#s is coming", "p#nt: cla#s #s c+min#")); // false (por la p inicial)
console.log(checkIsValidCopy("Santa Claus", "s#+:. c:. s")); // true
console.log(checkIsValidCopy("Santa Claus", "s#+:.#c:. s")); // false (hay un # donde no debería)

console.log(checkIsValidCopy("s+#:.#c:. s", "s#+:.#c:. s"));
console.log(checkIsValidCopy("S#nta Claus", "S#ntA ClauS")); */

console.log(checkIsValidCopy("3 regalos 3", "3 .+:# #: 3"));
