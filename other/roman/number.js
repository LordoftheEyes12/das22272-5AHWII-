
let roman = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
};

function fromRoman(input){
    let text = input.split('');
    numbers = text.map((x) => roman[x]);
    for (let i = 0; i < numbers.length; i++){
        if (numbers[i] < numbers[i+1]){
            numbers[i] = numbers[i+1] - numbers[i];
            numbers.splice(i+1,1);
        }
        else if(numbers[i] === numbers[i+1] || numbers[i] === numbers[i+1] && numbers[i]=== numbers[i+2]){
            if(numbers[i] === numbers[i+2]){
                numbers[i] += numbers[i+1];
                numbers[i] += numbers[i+2];
                //delete numbers[i+1];
                //delete numbers[i+2];
                console.log(numbers);
                numbers.splice(i+1,1);
                numbers.splice(i+1,1);
                console.log(numbers);                 
            }
            else{
            numbers[i] += numbers[i+1];
            console.log(numbers);
            numbers.splice(i+1,1);
            }
        }
        if (numbers[i] < numbers[i+1]){
            numbers[i] = numbers[i+1] - numbers[i];
            numbers.splice(i+1,1);
        }
        continue;
    }
    let value = 0;
    for (let i = 0; i < numbers.length; i++){
        value+=numbers[i];
    }
    
    return value;
}

function toRoman(input){
    let thousand = Math.floor(input / 1000);
    let hundred = Math.floor((input - thousand*1000) / 100);
    let ten = Math.floor((input - thousand*1000 - hundred*100) / 10);
    let one = Math.floor((input - thousand*1000 - hundred*100 - ten*10));
    console.log(input == thousand*1000+100*hundred+10*ten+one);
    let output=[];
    if(thousand > 3){
        console.log("Number too big. Not able to convert to Roman");
        return;
    }
    if(thousand >0){
        for (let i = 0; i < thousand ; i++){
            output.push('M');
        }
    }
    if (hundred > 0){
        console.log(hundred);
switch (hundred) {
    case 5:
        output.push('D');
        break;
        case 1:
            output.push('C');
            break;
    case 2:
    case 3:
        for (let i = 0; i < hundred ; i++){
            output.push('C');
        }
        break;
    case 4:
        output.push('C');
        output.push('D');
        break;
    case 6: 
        output.push('D');
        output.push('C');
        break;
    case 7:
    case 8:
    case 9:    
        for (let i = 0; i < (10- hundred) ; i++){
            output.push('C');
        }
        output.push('M');
        break;
    case 10: 
        console.log("something went wrong");
        return;
}}
if (ten > 0){
    console.log(10);
switch (ten) {
    case 5:
        output.push('L');
        break;
    case 1: 
        output.push('X');
        break;
    case 2:
    case 3:
        console.log("?");
        for (let i = 0; i < ten ; i++){
            output.push('X');
        }
        break;
    case 4:
        output.push('X');
        output.push('L');
        break;
        case 6:
            output.push('L');
            output.push('X');
            break;
    case 7:
    case 8:
    case 9:
        for (let i = 0; i < (10- ten); i++){
            output.push('X');
        }
        output.push('C');
        break;
    case 10: 
        console.log("something went wrong");
        return;
}
}
if (one > 0){
    console.log(one);
switch (one) {

    case 5:
        output.push('V');
        break;
    case 1:
        output.push('I');
        break;
    case 2:
    case 3:
        for (let i = 0; i < one ; i++){
            output.push('I');
        }
        break;
    case 4:
        output.push('I');
        output.push('V');
        break;
        case 6:
            output.push('V');
            output.push('I');
            break;
    case 7:
    case 8:
    case 9:
        for (let i = 0; i < (10- one) ; i++){
            output.push('I');
        }
        output.push('V');
        break;
    case 10: 
        console.log("something went wrong");
        return;
}}
    
    return output.join("");
}


console.log(fromRoman('MMCCCMXXXCIII'));
var a = toRoman(2773); 
console.log(a);