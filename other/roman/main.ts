
const roman: { [key: string]: number } = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000
};

export function fromRoman(input:string): number{
  const text = input.split('');
  const numbers = text.map((x) => roman[x]) ;
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
 
              numbers.splice(i+1,1);
              numbers.splice(i+1,1);
 
          }
          else{
          numbers[i] += numbers[i+1];
 
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

export function toRoman(input:number): string{
  const thousand = Math.floor(input / 1000);
  const hundred = Math.floor((input - thousand*1000) / 100);
  const ten = Math.floor((input - thousand*1000 - hundred*100) / 10);
  const one = Math.floor((input - thousand*1000 - hundred*100 - ten*10));
 
  const output=[];
  if(thousand > 3){
      return "Number too big. Not able to convert to Roman";
  }
  if(thousand >0){
      for (let i = 0; i < thousand ; i++){
          output.push('M');
      }
  }
  if (hundred > 0){
 
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
    case 7:
      case 8:

      output.push('D');
      for (let i = 0; i < (hundred-5); i++){
          output.push('C');
      }
      break;
 
  case 9:  
          output.push('C');
      output.push('M');
      break;
      case 10: 
      return "something went wrong";
}}
if (ten > 0){
 
switch (ten) {
  case 5:
      output.push('L');
      break;
  case 1: 
      output.push('X');
      break;
  case 2:
  case 3:
 
      for (let i = 0; i < ten ; i++){
          output.push('X');
      }
      break;
  case 4:
      output.push('X');
      output.push('L');
      break;
      case 6:
        case 7:
          case 8:
          output.push('L');
          for (let i = 0; i < (ten-5); i++){
              output.push('X');
          }
      
          break;

  case 9:
          output.push('X');
      output.push('C');
      break;
      case 10: 
      return "something went wrong";
}
}
if (one > 0){
 
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
      case 7:
      case 8:
          output.push('V');
          for (let i = 0; i < (one-5); i++){
              output.push('I');
          }
          break;
  case 9:

          output.push('I');
    
      output.push('X');
      break;
  case 10: 
      return "something went wrong";
}}
  
  return output.join("");
}



 
 
 