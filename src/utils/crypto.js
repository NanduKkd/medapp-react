

export async function generateKey() {
	window.keys = await window.crypto.subtle.generateKey({name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1,0,1]), hash: "SHA-256"}, true, ['encrypt', 'decrypt'])
	return window.keys
}
function convertKey (keyArr) {
	const a1 = new Uint8Array(270);
	keyArr = new Uint8Array(keyArr)
	for(let i=0; i<266; i++) a1[i+4] = keyArr[i+28];
	a1[0] = 48
	a1[1] = 130
	a1[2] = 1
	a1[3] = 10
	let key = btoa(String.fromCharCode(...a1)), str = "-----BEGIN RSA PUBLIC KEY-----\n";
	for(let i=0; i<Math.ceil(key.length/64); i++) {
		str += key.substring(i*64, (i+1)*64) + "\n"
	}
	str += "-----END RSA PUBLIC KEY-----\n"
	return str;
}
function convertKey2(keyArr) {
	keyArr = new Uint8Array(keyArr)
	let key = btoa(String.fromCharCode(...keyArr)), str = "-----BEGIN PUBLIC KEY-----\n";
	for(let i=0; i<Math.ceil(key.length/64); i++) {
		str += key.substring(i*64, (i+1)*64) + "\n"
	}
	str += "-----END PUBLIC KEY-----\n"
	return str;
}
function convertKey3(keyArr) {
	keyArr = new Uint8Array(keyArr)
	return btoa(String.fromCharCode(...keyArr));
}

export async function exportPublicKey(keys) {
	return convertKey3(await crypto.subtle.exportKey('spki', keys.publicKey))
}
