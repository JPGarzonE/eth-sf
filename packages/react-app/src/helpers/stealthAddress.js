import * as secp from '@noble/secp256k1';
import * as keccak from 'keccak256'

//enerate a publick key from a private key
export async function  generatePublicKey(privKey){
    return secp.getPublicKey(privKey);
}
export async function  generateRandomPrivateKey(){
   return secp.utils.randomPrivateKey();
}
export async function mutltiplication (privateKey,publickKey){
    // let point = 
    // return publickKey.secp.Point.multiply(privateKey);
}
export function fromHexToBytes (number){
    const formatNumber=secp.utils.hexToBytes(number.slice(2));
    return formatNumber
}
export  function  fromHexToPoint(hex){
    return secp.Point.fromHex(hex)
}
export function hash (string){
    return keccak(string)
}
