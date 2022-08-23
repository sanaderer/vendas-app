import { match } from "assert";
import { group } from "console";

export const bigDecimalConverter = (value) : number => {
    if (!value){
        return 0;
    }
    // 2.000,00 => 2000,00
    return value.replace(".", "").replace(",", ".")
    // => 2000.00
}

export const formatReal = ( value ) => {
    const v = ((value.replace(/\D/g, '') / 100).toFixed(2) + '').split('.');

    const m = v[0].split('').reverse().join('').match(/.{1,3}/g);

    for (let i = 0; i< m.length; i++)
        m[i] = m[i].split('').reverse().join('') + '.';

    const r = m?.reverse().join('');

    return r?.substring(0, r.lastIndexOf('.')) + ',' + v[1];
}