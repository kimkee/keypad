## 간편비밀번호 6자리 입력 랜덤 포지션

![](screenshot.png)
``` js
let count = 0;   
const dset = n => {
	const dbox = document.querySelector(".dots");
	let dot = '';
	for (let d = 0; d < 6; d++) {
		n > d ? ac = 'on' : ac = '';
		dot += '<em class="dt '+ac+'"></em>';
	}
	dbox.innerHTML = dot;
};
const kset = cc => {
	const kbox = document.querySelector(".keys .box");
	const norg = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const nums = [...norg];
	const choc = e => nums.splice( Math.floor(Math.random() * nums.length) , 1);
	let bts= '';
	let bn = '';
	let bx = '<button type="button" onclick="pinput(this);" value="del" class="bt">X</button>';
	let bc = '<button type="button" onclick="pinput(this);" value="clr" class="bt">Cancel</button>';
	for(let i of norg){
		let pp = choc(); /* 뽑기 */
		let bt = '<button type="button" onclick="pinput(this);" value="' + pp + '" class="bt">' + pp + '</button>';
		console.log(i, pp, nums);
		i == 8 ? bn = bc : null;
		i == 9 ? bn = bx : null;
		bts += bt + bn;
	}
	kbox.innerHTML = bts;
	dset(0);
	count = 0;
};
kset();

const pinput = el => {
	['del'].includes( el.value ) ? count-- : count++ ;
	['clr'].includes( el.value ) ? count = 0 : null ;
	dset(count);
	count < 0 ? count = 0 : null;
	count > 6 ? count = 6 : null;
	console.log(count);
}
```