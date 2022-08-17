const keypad = {
    init: function(){
        this.kset();
    },
    cnum: 0,
    pnum: 6, /* 비번갯수 */
    pwds: document.querySelector("input.pwds"), /* 비번필드 */
    dset: function(n,v){ /* 점들 그리기 */
        const dbox = document.querySelector(".dots .dbx");
        let dot = '';
        let ac  = '';
        if(v != null){
            this.pwds.value = this.pwds.value + v;
        }
        for(let d = 0; d < this.pnum; d++){
            n > d ? ac = ' on' : ac = '';
            dot += '<em class="dt'+ac+'">'+ this.pwds.value.charAt(d)+'</em>';
        }
        dbox.innerHTML = dot;
        if( n > 0 ){
            const ldt = dbox.querySelectorAll(".dt.on").length;
            dbox.querySelector(".dt:nth-child("+ldt+")").classList.add("act");
        }
        
        if( this.cnum >= this.pnum ){
            this.cnum = this.pnum;
            this.pcom();
        }
        console.log(n, v, this.pwds.value);
    },
    kset: function(c){ /* 번호 그리기 */
        const kbox = document.querySelector(".keys .kbx");
        const norg = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const nums = [...norg];
        /* 랜덤 뽑기  arrs.sort( e => Math.random() - 0.5 )  */
        const choc = e => nums.splice( Math.floor( Math.random()*nums.length ) , 1)[0];
        let bts= '';
        let bn = '';
        let bx = '<button type="button" class="bt del"><i>Del</i></button>';
        let bc = '<button type="button" class="bt rst"><i>Reset</i></button>';
        for(let i in norg){
            let pp = choc();
            let bt = '<button type="button" value="' + pp + '" class="bt num"><i>' + pp + '</i></button>';
            console.log(i, pp, nums);
            i == 8 ? bn = bc : null;
            i == 9 ? bn = bx : null;
            bts += bt + bn;
        }
        kbox.innerHTML = bts;
        this.dset(0,null);
        this.cnum = 0;
        kbox.querySelectorAll(".bt").forEach( bt => bt.addEventListener("click", e => {
            bt.classList.contains("num") && this.pset(bt);
            bt.classList.contains("rst") && this.rset(bt);
            bt.classList.contains("del") && this.pdel(bt);
        }));
    },
    rset: function(){ /* Reset */
        this.pwds.value = '';
        setTimeout( e => this.kset(), 100);
    },
    pdel: function(){ /* Del */
        this.cnum--;
        this.cnum < 0 ? this.cnum = 0 : null;
        this.pwds.value = this.pwds.value.slice(0, -1);
        this.dset(this.cnum ,null);
    },
    pset: function(bt){ /* Number */
        this.cnum++ ;
        this.dset(this.cnum, bt.value);
    },
    pcom: e => setTimeout( e => location.reload(), 200 )  /* 모두 입력 후 */
};

document.addEventListener('DOMContentLoaded', e => keypad.init() );