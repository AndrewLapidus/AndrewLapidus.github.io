import{_ as E,o as C,c as f,a as s,n as d,w as p,v as u}from"./index-CNKRNJcX.js";const _={data(){return{nameInput:"",importName:"",namesArr:[1,2,3,4,5,6],spinning:!1,rotationAngle:0,speedRotate:.2,selectedSection:0,canvasContext:null,CENTER_X:0,CENTER_Y:0,RADIUS:0,POINTER_LEN:0}},methods:{initCanvas(){const e=this.$refs.wheelCanvas;e?(this.canvasContext=e.getContext("2d"),this.CENTER_X=e.width/2,this.CENTER_Y=e.height/2,this.RADIUS=Math.min(this.CENTER_X,this.CENTER_Y)-1,this.POINTER_LEN=this.RADIUS*.8,this.drawWheel()):console.error("Canvas element not found")},addName(){const e=this.nameInput;typeof e=="string"&&e.trim()!==""?(this.namesArr.push(e),console.log(`Name: ${e} added successfully.`),this.drawWheel()):console.log("Invalid name. Please do better."),this.nameInput=""},loadNames(){let e=this.importName.split(",");this.namesArr=e.map(t=>atob(t)),this.drawWheel()},exportNames(){const e=this.$refs.namesContainer;e.innerHTML="";let t=document.createElement("input");t.type="text";let l=this.namesArr.map(o=>btoa(o));t.value=l;let a=document.createElement("button");a.textContent="Close",a.addEventListener("click",()=>e.innerHTML=""),e.appendChild(t),e.appendChild(a)},displayNames(){const e=this.$refs.namesContainer;e.innerHTML="";for(let t=0;t<this.namesArr.length;t++){const l=document.createElement("input"),a=document.createElement("button");l.type="text",l.value=this.namesArr[t],l.addEventListener("input",o=>this.updateName(t,o.target.value)),a.textContent="X",a.addEventListener("click",()=>this.removeNameX(t)),e.appendChild(l),e.appendChild(a)}},removeDisplayNames(){const e=this.$refs.namesContainer;e.innerHTML="",this.drawWheel()},updateName(e,t){this.namesArr[e]=t,console.log(`Name: ${t} has been updated`)},removeNameX(e){const t=this.namesArr.splice(e,1)[0];console.log(`Name removed: ${t}`),this.displayNames()},drawWheel(){const e=this.canvasContext;e.clearRect(0,0,this.$refs.wheelCanvas.width,this.$refs.wheelCanvas.height);const t=this.namesArr.length,l=2*Math.PI/t;e.beginPath(),e.arc(this.CENTER_X,this.CENTER_Y,this.RADIUS,0,2*Math.PI),e.fillStyle="lightblue",e.fill(),e.lineWidth=2,e.strokeStyle="blue",e.stroke();for(let n=0;n<t;n++){const h=n*l+this.rotationAngle,m=(n+1)*l+this.rotationAngle;e.beginPath(),e.moveTo(this.CENTER_X,this.CENTER_Y),e.arc(this.CENTER_X,this.CENTER_Y,this.RADIUS,h,m),e.fillStyle=n%2===0?"lightgreen":"lightyellow",e.fill(),e.lineWidth=2,e.strokeStyle="black",e.stroke();const r=(h+m)/2,N=this.CENTER_X+this.RADIUS*.5*Math.cos(r),c=this.CENTER_Y+this.RADIUS*.5*Math.sin(r);e.save(),e.translate(N,c),e.rotate(r),e.fillStyle="black",e.font="20px Arial",e.fillText(this.namesArr[n],0,0),e.restore()}const a=this.CENTER_X+this.RADIUS+60,o=this.CENTER_Y;e.beginPath(),e.moveTo(a,o-10),e.lineTo(a,o+10),e.lineTo(a-90,o),e.fillStyle="red",e.fill();const i=this.selectedSection;this.namesArr[i]},spinWheel(){this.spinning||(this.spinning=!0,this.rotateWheel())},rotateWheel(){this.rotationAngle+=this.speedRotate,this.drawWheel(),this.spinning&&requestAnimationFrame(this.rotateWheel)},async stopWheel(){for(;this.speedRotate>.01;)this.speedRotate-=.03,await this.sleep(250);this.spinning=!1,this.speedRotate=.2;const e=2*Math.PI;let t=this.rotationAngle%e;t<0&&(t+=e),this.selectedSection=Math.floor(t/e*this.namesArr.length),this.drawWheel()},sleep(e){return new Promise(t=>setTimeout(t,e))}},mounted(){this.initCanvas()}},R={class:"WheelSpinner"},v=s("label",{for:"nameInput"},"Enter Name:",-1),T=s("button",{type:"submit"},"Add Name",-1),A=s("label",{for:"exportNames"}," Export Names",-1),g=s("label",{for:"importName"},"Import names",-1),S=s("button",{type:"submit"},"Import",-1),b={id:"namesContainerbox"},I={ref:"namesContainer"},x={id:"wheelBoy"},y={ref:"wheelCanvas",width:"500",height:"400"};function w(e,t,l,a,o,i){return C(),f("div",R,[s("section",null,[s("form",{onSubmit:t[1]||(t[1]=d((...n)=>i.addName&&i.addName(...n),["prevent"]))},[v,p(s("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=n=>o.nameInput=n),required:""},null,512),[[u,o.nameInput]]),T],32)]),s("section",null,[A,s("button",{onClick:t[2]||(t[2]=(...n)=>i.exportNames&&i.exportNames(...n))},"Export")]),s("section",null,[s("form",{onSubmit:t[4]||(t[4]=d((...n)=>i.loadNames&&i.loadNames(...n),["prevent"]))},[g,p(s("input",{type:"text","onUpdate:modelValue":t[3]||(t[3]=n=>o.importName=n),placeholder:"Paste Code Here"},null,512),[[u,o.importName]]),S],32)]),s("div",b,[s("button",{onClick:t[5]||(t[5]=(...n)=>i.displayNames&&i.displayNames(...n))},"Edit Names"),s("button",{onClick:t[6]||(t[6]=(...n)=>i.removeDisplayNames&&i.removeDisplayNames(...n))},"Save"),s("p",I,null,512)]),s("div",x,[s("canvas",y,null,512),s("button",{onClick:t[7]||(t[7]=(...n)=>i.spinWheel&&i.spinWheel(...n))},"Spin"),s("button",{onClick:t[8]||(t[8]=(...n)=>i.stopWheel&&i.stopWheel(...n))},"Stop")])])}const k=E(_,[["render",w]]);export{k as default};
