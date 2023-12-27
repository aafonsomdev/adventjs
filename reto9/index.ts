/* Fácil
Están encendiendo las luces de Navidad 🎄 en la ciudad y, como cada año, ¡hay que arreglarlas!

Las luces son de dos colores: 🔴 y 🟢 . Para que el efecto sea el adecuado, siempre deben estar alternadas. 
Es decir, si la primera luz es roja, la segunda debe ser verde, la tercera roja, la cuarta verde, etc.

Nos han pedido que escribamos una función adjustLights que, dado un array de strings con el color de 
cada luz (representados con los emojis 🔴 para el rojo y 🟢 para el verde), devuelva el número mínimo
de luces que hay que cambiar para que estén los colores alternos. */
enum lights {
    "🟢" = "🟢",
    "🔴" = "🔴",
}

interface lightObj {
    even: number;
    odd: number;
}
interface countPos {
    "🟢": lightObj;
    "🔴": lightObj;
}

function adjustLights(lights: string[]): number {
    let minLightsToAdjust = 0;
    let countPos: countPos = {
        "🟢": { even: 0, odd: 0 },
        "🔴": { even: 0, odd: 0 },
    };

    for (let index = 0; index < lights.length; index++) {
        const element: lights = lights[index] as lights;
        if (index % 2 === 0) {
            countPos[element].even += 1;
        } else {
            countPos[element].odd += 1;
        }
    }

    if (countPos["🟢"].even > countPos["🔴"].even) {
        minLightsToAdjust = countPos["🟢"].odd + countPos["🔴"].even;
    } else {
        minLightsToAdjust = countPos["🟢"].even + countPos["🔴"].odd;
    }

    return minLightsToAdjust;
}

console.log(adjustLights(["🟢", "🔴", "🟢", "🟢", "🟢"]));
// -> 1 (cambias la cuarta luz a 🔴)

console.log(adjustLights(["🔴", "🔴", "🟢", "🔴", "🟢"]));
// -> 1 (cambia la primera luz a verde)

console.log(adjustLights(["🔴", "🔴", "🟢", "🟢", "🔴"]));
// -> 2 (cambias la segunda luz a 🟢 y la tercera a 🔴)

console.log(adjustLights(["🟢", "🔴", "🟢", "🔴", "🟢"]));
// -> 0 (ya están alternadas)

console.log(adjustLights(["🔴", "🔴", "🔴"]));
// -> 1 (cambias la segunda luz a 🟢)
