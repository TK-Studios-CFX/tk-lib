const Maths = {};

Maths.Add = (a, b) => {
    console.log(a, b)
    return a + b;
}

function GetLib_Maths() {
    return Maths
}

exports("GetLib_Maths", GetLib_Maths);

console.log("Loaded GetLib_Maths")