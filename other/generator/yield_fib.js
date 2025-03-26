function* fib(upper_limit) {
    let a = 0, b = 1;
    while (a < upper_limit){
        yield a;
        [a,b] = [b, a + b];
    }
}

for (let n of fib(1000)){
    console.log(n);
}