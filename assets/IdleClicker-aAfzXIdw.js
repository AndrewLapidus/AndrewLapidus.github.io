import{_ as k,m as C,b as f,d as b,e as g,o,c as a,a as s,t as n,f as u,w as c,v as d,F as p,r as m,g as h}from"./index-BbGeb6fz.js";const M="/tempWhale.png",V={data(){return{isMenuOpen:!1,isUpViss:!1,isAchViss:!1,isPristViss:!1,isSettViss:!1}},computed:{...C("clickerGame",["money","clickCount","linesOcode","units","moneyRate","products","upgrades","achievements","prestige","settings","version"]),...f("clickerGame",["calcUnitCost","linesRate","buyUnitText","calcModUpgrade","calcProdCost","calcUpCost"]),unitsAvail(){return this.units.filter(t=>t.available)}},methods:{...b("clickerGame",["WhaleClick","buyUnit"]),...g("clickerGame",["sellProdAct","buyUpgradeAct","loadGame","saveGame","resetGame","calc"]),updateGame(){this.$store.commit("clickerGame/produceResources")},openMenu(t){this.closeAllMenus(),this.isMenuOpen=!0,this[t]=!0},closeAllMenus(){this.isMenuOpen=!1,this.isUpViss=!1,this.isAchViss=!1,this.isPristViss=!1,this.isSettViss=!1},closeUpgradeMenu(){this.isUpViss=!1,this.isMenuOpen=!1},closeAchievementsMenu(){this.isAchViss=!1,this.isMenuOpen=!1},closePrestigeMenu(){this.isPristViss=!1,this.isMenuOpen=!1},closeSettingsMenu(){this.isSettViss=!1,this.isMenuOpen=!1}},mounted(){this.gameInterval=setInterval(this.updateGame,1e3),this.saveInterval-setInterval(()=>{this.$store.dispatch("clickerGame/saveGame")},6e4)},beforeDestroy(){clearInterval(this.gameInterval),clearInterval(this.saveInterval)},created(){this.$store.dispatch("clickerGame/loadGame")}},y={class:"idleContainer"},A={class:"version"},U={class:"topInfo"},G={class:"stats"},_={class:"moneyRate"},P=s("br",null,null,-1),S={class:"linesRate"},I=s("br",null,null,-1),O={class:"menuBar"},T={class:"menuTab"},R={class:"upgradeTab"},B=["onClick"],w=s("h3",null,"This is Achiev tab",-1),F=[w],W=s("h3",null,"This is the prestige tab",-1),D=[W],L=s("h3",null,"This is the setting tab",-1),N={class:"whale"},$=s("img",{src:M},null,-1),q=[$],E={class:"unitBar"},Q=["onClick"],X={class:"productBar"},Y=["onClick"];function j(t,i,z,H,r,l){return o(),a("div",y,[s("div",A,n(t.version),1),s("div",U,[s("div",G,[u(" Money: "+n(t.money.toFixed(2))+" ",1),s("span",_,"+"+n(t.moneyRate.toFixed(2))+"/sec",1),P,u(" Lines of Code: "+n(t.linesOcode.toFixed(2))+" ",1),s("span",S,"+"+n(t.linesRate.toFixed(2))+"/sec",1),I,u(" Clicks: "+n(t.clickCount),1)]),s("div",O,[s("button",{onClick:i[0]||(i[0]=e=>l.openMenu("isUpViss"))},"Upgrades"),s("button",{onClick:i[1]||(i[1]=e=>l.openMenu("isAchViss"))},"Achievements"),s("button",{onClick:i[2]||(i[2]=e=>l.openMenu("isPristViss"))},"Presitge"),s("button",{onClick:i[3]||(i[3]=e=>l.openMenu("isSettViss"))},"Settings")])]),c(s("div",T,[s("button",{class:"close-btn",onClick:i[4]||(i[4]=(...e)=>l.closeAllMenus&&l.closeAllMenus(...e))},"X"),s("div",R,[(o(!0),a(p,null,m(t.upgrades,e=>c((o(),a("div",{class:"upgrades",key:e.id,onClick:i[5]||(i[5]=h(()=>{},["stop"]))},[s("h3",null,n(e.name),1),s("p",null,n(t.calcUpCost(e.id)),1),s("button",{class:"buyUpBTN",onClick:v=>t.buyUpgradeAct(e)},"Buy",8,B)])),[[d,r.isUpViss]])),128))]),c(s("div",{class:"achievements",onClick:i[6]||(i[6]=h(()=>{},["stop"]))},F,512),[[d,r.isAchViss]]),c(s("div",{class:"prestige",onClick:i[7]||(i[7]=h(()=>{},["stop"]))},D,512),[[d,r.isPristViss]]),c(s("div",{class:"settings",onClick:i[9]||(i[9]=h(()=>{},["stop"]))},[L,u(" reset does not work yet "),s("button",{onClick:i[8]||(i[8]=(...e)=>t.resetGame&&t.resetGame(...e))},"Reset Game")],512),[[d,r.isSettViss]])],512),[[d,r.isMenuOpen]]),s("div",N,[s("button",{onClick:i[10]||(i[10]=(...e)=>t.WhaleClick&&t.WhaleClick(...e))},q)]),s("div",E,[(o(!0),a(p,null,m(l.unitsAvail,e=>(o(),a("div",{class:"unit",key:e.id},[s("h3",null,n(e.name),1),s("p",null,"QTY: "+n(e.owned),1),s("p",null,"Cost: "+n(t.calcUnitCost(e.id)),1),s("button",{onClick:v=>t.buyUnit(e.id)},n(t.buyUnitText(e.id)),9,Q)]))),128))]),s("div",X,[(o(!0),a(p,null,m(t.products,e=>(o(),a("div",{class:"product",key:e.id},[s("h3",null,n(e.name),1),s("p",null,"Lines Required "+n(t.calcProdCost(e.id).toFixed(2)),1),s("button",{onClick:v=>t.sellProdAct(e.id)},"Sell for $"+n(e.baseValue),9,Y)]))),128))])])}const K=k(V,[["render",j]]);export{K as default};
