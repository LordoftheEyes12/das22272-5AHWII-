import * as math from "npm:mathjs";

export class Value{
  constructor(public value:string){}

  static add(a:Value,b:Value):Value{
    const frac1 = math.fraction(a.value.toString());
    const frac2 = math.fraction(b.value.toString());
    const result = math.add(frac1 , frac2).toFraction().toString();
    if (result === "1") return new Value("1");
    const [z, n] = result.split("/").map(Number);

    if (z< n) return new Value(result);
    if (z% n === 0) return new Value(`${z/n}`);
    const full = Math.floor(z/ n).toString();
   
    const rest = (z % n).toString();
    const answer:string =`${full} ${rest}/${n}`;
    return new Value(answer);
  }
  
}


