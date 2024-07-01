

export function handleConvertNumberToIndianSystem ({digit}:{digit:number}):string{

    const formatter = Intl.NumberFormat("en-IN",{
        style:"currency",
        currency:"INR"
    });

    let result = formatter.format(digit);

    return result?.toString();



    // if(digit<0){
    //     digit = Math.abs(digit);
    // }

    // if(digit==0){
    //     return ""
    // }

    // const denominations = [
    //     { value: 10000000, abbreviation: 'Cr' },
    //     { value: 100000, abbreviation: 'L' },
    //     { value: 1000, abbreviation: 'Th' },
    //     { value: 100, abbreviation: 'H' },
    //     { value: 1, abbreviation: '' }, // Unit rupees
    // ];

    // let remainingAmount:number = digit;
    // let formattedAmount:string  = "";

    // for(const denomination of denominations){
    //     let quotient = Math.floor(remainingAmount/denomination.value);
    //     remainingAmount = remainingAmount % denomination.value;

    //     if(quotient>0 || (quotient===0 && formattedAmount.length > 0)){
    //         formattedAmount += `${quotient},`
    //     }
        
    //     console.log(formattedAmount,quotient)
    // }

    // formattedAmount = formattedAmount.slice(0,-1);

    // if(remainingAmount>0){
    //     formattedAmount += `.${remainingAmount?.toFixed(2)}`;
    // }

    // return digit<0?'-':'+' + formattedAmount;

}