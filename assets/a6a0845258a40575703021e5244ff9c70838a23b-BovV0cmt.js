import{_ as _e,o as X,c as ee,a as i,w as H,p as ue,v as pe,F as Oe,r as Se,b as de,i as Ue,j as ze,n as Pe,y as ke,g as be,x as Ce,V as Me,D as Ve,s as qe,u as je}from"./index-W0VLYd66.js";import{_ as Qe}from"./lowesLogo-ig5b3FNY.js";const Be="/lowesPlain.png",Ae="/lowes_survey_new_qr.png",We={data(){return{nameInput:"",isVissLTR:!0,isVissPaint:!1}},methods:{printReport(){window.print()},nameFormat(g){let n=g.length,S="";if(n<15){let v="&nbsp;".repeat(15-n);return S=g+v,S}else return g},toggleLTR(){if(!this.isVissLTR)this.isVissLTR=!this.isVissLTR,this.isVissPaint=!this.isVissPaint;else return},togglePaint(){if(!this.isVissPaint)this.isVissPaint=!this.isVissPaint,this.isVissLTR=!this.isVissLTR;else return}}},He=i("label",{for:"nameInput"},"Enter Name:",-1),Ke={class:"Paint_LTR_Container"},Je={id:"name"},$e=["innerHTML"],Ge=i("br",null,null,-1),Ye=i("img",{src:Be},null,-1),Ze=i("img",{class:"qr",src:Ae},null,-1),Xe=i("p",{id:"note"},[de(" We would love to hear about your"),i("br"),de(' "10" plus experience!! ')],-1),et={class:"LTR_container"},tt=i("p",{id:"note"},[de(" We hope you are happy with our service today,"),i("br"),de(" Please take the survey at the bottom of your"),i("br"),de(" recipt and give us a 10! ")],-1),rt={id:"name"},nt=["innerHTML"],it=i("br",null,null,-1),st=i("img",{class:"qr",src:Ae},null,-1);function at(g,n,S,v,u,f){return X(),ee("div",null,[i("button",{onClick:n[0]||(n[0]=(..._)=>f.printReport&&f.printReport(..._))},"Print Report"),i("form",{onSubmit:n[2]||(n[2]=(..._)=>g.addName&&g.addName(..._))},[He,H(i("input",{type:"text","onUpdate:modelValue":n[1]||(n[1]=_=>u.nameInput=_)},null,512),[[ue,u.nameInput]])],32),i("button",{onClick:n[3]||(n[3]=(..._)=>f.toggleLTR&&f.toggleLTR(..._))},"LTR"),i("button",{onClick:n[4]||(n[4]=(..._)=>f.togglePaint&&f.togglePaint(..._))},"Paint"),H(i("div",Ke,[(X(),ee(Oe,null,Se(18,_=>i("div",{class:"paint_ltr_grid",key:_},[i("p",Je,[de(" Mixed by: "),i("span",{class:"nameUnderline",innerHTML:f.nameFormat(u.nameInput)},null,8,$e),Ge,Ye,Ze]),Xe])),64))],512),[[pe,u.isVissPaint]]),H(i("div",et,[(X(),ee(Oe,null,Se(8,_=>i("div",{class:"ltr_grid",key:_},[tt,i("p",rt,[de(" Mention my name "),i("span",{class:"nameUnderline",innerHTML:f.nameFormat(u.nameInput)},null,8,nt),it]),st])),64))],512),[[pe,u.isVissLTR]])])}const ot=_e(We,[["render",at]]);var Ne={exports:{}};/* @license
Papa Parse
v5.4.1
https://github.com/mholt/PapaParse
License: MIT
*/(function(g,n){(function(S,v){g.exports=v()})(Ue,function S(){var v=typeof self<"u"?self:typeof window<"u"?window:v!==void 0?v:{},u=!v.document&&!!v.postMessage,f=v.IS_PAPA_WORKER||!1,_={},z=0,p={parse:function(t,e){var r=(e=e||{}).dynamicTyping||!1;if(b(r)&&(e.dynamicTypingFunction=r,r={}),e.dynamicTyping=r,e.transform=!!b(e.transform)&&e.transform,e.worker&&p.WORKERS_SUPPORTED){var s=function(){if(!p.WORKERS_SUPPORTED)return!1;var c=(F=v.URL||v.webkitURL||null,T=S.toString(),p.BLOB_URL||(p.BLOB_URL=F.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",T,")();"],{type:"text/javascript"})))),m=new v.Worker(c),F,T;return m.onmessage=Fe,m.id=z++,_[m.id]=m}();return s.userStep=e.step,s.userChunk=e.chunk,s.userComplete=e.complete,s.userError=e.error,e.step=b(e.step),e.chunk=b(e.chunk),e.complete=b(e.complete),e.error=b(e.error),delete e.worker,void s.postMessage({input:t,config:e,workerId:s.id})}var o=null;return p.NODE_STREAM_INPUT,typeof t=="string"?(t=function(c){return c.charCodeAt(0)===65279?c.slice(1):c}(t),o=e.download?new ge(e):new ce(e)):t.readable===!0&&b(t.read)&&b(t.on)?o=new ve(e):(v.File&&t instanceof File||t instanceof Object)&&(o=new me(e)),o.stream(t)},unparse:function(t,e){var r=!1,s=!0,o=",",c=`\r
`,m='"',F=m+m,T=!1,l=null,D=!1;(function(){if(typeof e=="object"){if(typeof e.delimiter!="string"||p.BAD_DELIMITERS.filter(function(a){return e.delimiter.indexOf(a)!==-1}).length||(o=e.delimiter),(typeof e.quotes=="boolean"||typeof e.quotes=="function"||Array.isArray(e.quotes))&&(r=e.quotes),typeof e.skipEmptyLines!="boolean"&&typeof e.skipEmptyLines!="string"||(T=e.skipEmptyLines),typeof e.newline=="string"&&(c=e.newline),typeof e.quoteChar=="string"&&(m=e.quoteChar),typeof e.header=="boolean"&&(s=e.header),Array.isArray(e.columns)){if(e.columns.length===0)throw new Error("Option columns is empty");l=e.columns}e.escapeChar!==void 0&&(F=e.escapeChar+m),(typeof e.escapeFormulae=="boolean"||e.escapeFormulae instanceof RegExp)&&(D=e.escapeFormulae instanceof RegExp?e.escapeFormulae:/^[=+\-@\t\r].*$/)}})();var h=new RegExp(fe(m),"g");if(typeof t=="string"&&(t=JSON.parse(t)),Array.isArray(t)){if(!t.length||Array.isArray(t[0]))return K(null,t,T);if(typeof t[0]=="object")return K(l||Object.keys(t[0]),t,T)}else if(typeof t=="object")return typeof t.data=="string"&&(t.data=JSON.parse(t.data)),Array.isArray(t.data)&&(t.fields||(t.fields=t.meta&&t.meta.fields||l),t.fields||(t.fields=Array.isArray(t.data[0])?t.fields:typeof t.data[0]=="object"?Object.keys(t.data[0]):[]),Array.isArray(t.data[0])||typeof t.data[0]=="object"||(t.data=[t.data])),K(t.fields||[],t.data||[],T);throw new Error("Unable to serialize unrecognized input");function K(a,w,V){var L="";typeof a=="string"&&(a=JSON.parse(a)),typeof w=="string"&&(w=JSON.parse(w));var U=Array.isArray(a)&&0<a.length,A=!Array.isArray(w[0]);if(U&&s){for(var N=0;N<a.length;N++)0<N&&(L+=o),L+=M(a[N],N);0<w.length&&(L+=c)}for(var d=0;d<w.length;d++){var y=U?a.length:w[d].length,E=!1,P=U?Object.keys(w[d]).length===0:w[d].length===0;if(V&&!U&&(E=V==="greedy"?w[d].join("").trim()==="":w[d].length===1&&w[d][0].length===0),V==="greedy"&&U){for(var C=[],q=0;q<y;q++){var O=A?a[q]:q;C.push(w[d][O])}E=C.join("").trim()===""}if(!E){for(var R=0;R<y;R++){0<R&&!P&&(L+=o);var J=U&&A?a[R]:R;L+=M(w[d][J],R)}d<w.length-1&&(!V||0<y&&!P)&&(L+=c)}}return L}function M(a,w){if(a==null)return"";if(a.constructor===Date)return JSON.stringify(a).slice(1,25);var V=!1;D&&typeof a=="string"&&D.test(a)&&(a="'"+a,V=!0);var L=a.toString().replace(h,F);return(V=V||r===!0||typeof r=="function"&&r(a,w)||Array.isArray(r)&&r[w]||function(U,A){for(var N=0;N<A.length;N++)if(-1<U.indexOf(A[N]))return!0;return!1}(L,p.BAD_DELIMITERS)||-1<L.indexOf(o)||L.charAt(0)===" "||L.charAt(L.length-1)===" ")?m+L+m:L}}};if(p.RECORD_SEP="",p.UNIT_SEP="",p.BYTE_ORDER_MARK="\uFEFF",p.BAD_DELIMITERS=["\r",`
`,'"',p.BYTE_ORDER_MARK],p.WORKERS_SUPPORTED=!u&&!!v.Worker,p.NODE_STREAM_INPUT=1,p.LocalChunkSize=10485760,p.RemoteChunkSize=5242880,p.DefaultDelimiter=",",p.Parser=Re,p.ParserHandle=xe,p.NetworkStreamer=ge,p.FileStreamer=me,p.StringStreamer=ce,p.ReadableStreamStreamer=ve,v.jQuery){var re=v.jQuery;re.fn.parse=function(t){var e=t.config||{},r=[];return this.each(function(c){if(!(re(this).prop("tagName").toUpperCase()==="INPUT"&&re(this).attr("type").toLowerCase()==="file"&&v.FileReader)||!this.files||this.files.length===0)return!0;for(var m=0;m<this.files.length;m++)r.push({file:this.files[m],inputElem:this,instanceConfig:re.extend({},e)})}),s(),this;function s(){if(r.length!==0){var c,m,F,T,l=r[0];if(b(t.before)){var D=t.before(l.file,l.inputElem);if(typeof D=="object"){if(D.action==="abort")return c="AbortError",m=l.file,F=l.inputElem,T=D.reason,void(b(t.error)&&t.error({name:c},m,F,T));if(D.action==="skip")return void o();typeof D.config=="object"&&(l.instanceConfig=re.extend(l.instanceConfig,D.config))}else if(D==="skip")return void o()}var h=l.instanceConfig.complete;l.instanceConfig.complete=function(K){b(h)&&h(K,l.file,l.inputElem),o()},p.parse(l.file,l.instanceConfig)}else b(t.complete)&&t.complete()}function o(){r.splice(0,1),s()}}}function G(t){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(e){var r=we(e);r.chunkSize=parseInt(r.chunkSize),e.step||e.chunk||(r.chunkSize=null),this._handle=new xe(r),(this._handle.streamer=this)._config=r}).call(this,t),this.parseChunk=function(e,r){if(this.isFirstChunk&&b(this._config.beforeFirstChunk)){var s=this._config.beforeFirstChunk(e);s!==void 0&&(e=s)}this.isFirstChunk=!1,this._halted=!1;var o=this._partialLine+e;this._partialLine="";var c=this._handle.parse(o,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var m=c.meta.cursor;this._finished||(this._partialLine=o.substring(m-this._baseIndex),this._baseIndex=m),c&&c.data&&(this._rowCount+=c.data.length);var F=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(f)v.postMessage({results:c,workerId:p.WORKER_ID,finished:F});else if(b(this._config.chunk)&&!r){if(this._config.chunk(c,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);c=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(c.data),this._completeResults.errors=this._completeResults.errors.concat(c.errors),this._completeResults.meta=c.meta),this._completed||!F||!b(this._config.complete)||c&&c.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),F||c&&c.meta.paused||this._nextChunk(),c}this._halted=!0},this._sendError=function(e){b(this._config.error)?this._config.error(e):f&&this._config.error&&v.postMessage({workerId:p.WORKER_ID,error:e,finished:!1})}}function ge(t){var e;(t=t||{}).chunkSize||(t.chunkSize=p.RemoteChunkSize),G.call(this,t),this._nextChunk=u?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(r){this._input=r,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(e=new XMLHttpRequest,this._config.withCredentials&&(e.withCredentials=this._config.withCredentials),u||(e.onload=ne(this._chunkLoaded,this),e.onerror=ne(this._chunkError,this)),e.open(this._config.downloadRequestBody?"POST":"GET",this._input,!u),this._config.downloadRequestHeaders){var r=this._config.downloadRequestHeaders;for(var s in r)e.setRequestHeader(s,r[s])}if(this._config.chunkSize){var o=this._start+this._config.chunkSize-1;e.setRequestHeader("Range","bytes="+this._start+"-"+o)}try{e.send(this._config.downloadRequestBody)}catch(c){this._chunkError(c.message)}u&&e.status===0&&this._chunkError()}},this._chunkLoaded=function(){e.readyState===4&&(e.status<200||400<=e.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:e.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(r){var s=r.getResponseHeader("Content-Range");return s===null?-1:parseInt(s.substring(s.lastIndexOf("/")+1))}(e),this.parseChunk(e.responseText)))},this._chunkError=function(r){var s=e.statusText||r;this._sendError(new Error(s))}}function me(t){var e,r;(t=t||{}).chunkSize||(t.chunkSize=p.LocalChunkSize),G.call(this,t);var s=typeof FileReader<"u";this.stream=function(o){this._input=o,r=o.slice||o.webkitSlice||o.mozSlice,s?((e=new FileReader).onload=ne(this._chunkLoaded,this),e.onerror=ne(this._chunkError,this)):e=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var o=this._input;if(this._config.chunkSize){var c=Math.min(this._start+this._config.chunkSize,this._input.size);o=r.call(o,this._start,c)}var m=e.readAsText(o,this._config.encoding);s||this._chunkLoaded({target:{result:m}})},this._chunkLoaded=function(o){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(o.target.result)},this._chunkError=function(){this._sendError(e.error)}}function ce(t){var e;G.call(this,t=t||{}),this.stream=function(r){return e=r,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var r,s=this._config.chunkSize;return s?(r=e.substring(0,s),e=e.substring(s)):(r=e,e=""),this._finished=!e,this.parseChunk(r)}}}function ve(t){G.call(this,t=t||{});var e=[],r=!0,s=!1;this.pause=function(){G.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){G.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(o){this._input=o,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){s&&e.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),e.length?this.parseChunk(e.shift()):r=!0},this._streamData=ne(function(o){try{e.push(typeof o=="string"?o:o.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(e.shift()))}catch(c){this._streamError(c)}},this),this._streamError=ne(function(o){this._streamCleanUp(),this._sendError(o)},this),this._streamEnd=ne(function(){this._streamCleanUp(),s=!0,this._streamData("")},this),this._streamCleanUp=ne(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function xe(t){var e,r,s,o=Math.pow(2,53),c=-o,m=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,F=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,T=this,l=0,D=0,h=!1,K=!1,M=[],a={data:[],errors:[],meta:{}};if(b(t.step)){var w=t.step;t.step=function(d){if(a=d,U())L();else{if(L(),a.data.length===0)return;l+=d.data.length,t.preview&&l>t.preview?r.abort():(a.data=a.data[0],w(a,T))}}}function V(d){return t.skipEmptyLines==="greedy"?d.join("").trim()==="":d.length===1&&d[0].length===0}function L(){return a&&s&&(N("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+p.DefaultDelimiter+"'"),s=!1),t.skipEmptyLines&&(a.data=a.data.filter(function(d){return!V(d)})),U()&&function(){if(!a)return;function d(E,P){b(t.transformHeader)&&(E=t.transformHeader(E,P)),M.push(E)}if(Array.isArray(a.data[0])){for(var y=0;U()&&y<a.data.length;y++)a.data[y].forEach(d);a.data.splice(0,1)}else a.data.forEach(d)}(),function(){if(!a||!t.header&&!t.dynamicTyping&&!t.transform)return a;function d(E,P){var C,q=t.header?{}:[];for(C=0;C<E.length;C++){var O=C,R=E[C];t.header&&(O=C>=M.length?"__parsed_extra":M[C]),t.transform&&(R=t.transform(R,O)),R=A(O,R),O==="__parsed_extra"?(q[O]=q[O]||[],q[O].push(R)):q[O]=R}return t.header&&(C>M.length?N("FieldMismatch","TooManyFields","Too many fields: expected "+M.length+" fields but parsed "+C,D+P):C<M.length&&N("FieldMismatch","TooFewFields","Too few fields: expected "+M.length+" fields but parsed "+C,D+P)),q}var y=1;return!a.data.length||Array.isArray(a.data[0])?(a.data=a.data.map(d),y=a.data.length):a.data=d(a.data,0),t.header&&a.meta&&(a.meta.fields=M),D+=y,a}()}function U(){return t.header&&M.length===0}function A(d,y){return E=d,t.dynamicTypingFunction&&t.dynamicTyping[E]===void 0&&(t.dynamicTyping[E]=t.dynamicTypingFunction(E)),(t.dynamicTyping[E]||t.dynamicTyping)===!0?y==="true"||y==="TRUE"||y!=="false"&&y!=="FALSE"&&(function(P){if(m.test(P)){var C=parseFloat(P);if(c<C&&C<o)return!0}return!1}(y)?parseFloat(y):F.test(y)?new Date(y):y===""?null:y):y;var E}function N(d,y,E,P){var C={type:d,code:y,message:E};P!==void 0&&(C.row=P),a.errors.push(C)}this.parse=function(d,y,E){var P=t.quoteChar||'"';if(t.newline||(t.newline=function(O,R){O=O.substring(0,1048576);var J=new RegExp(fe(R)+"([^]*?)"+fe(R),"gm"),j=(O=O.replace(J,"")).split("\r"),$=O.split(`
`),Y=1<$.length&&$[0].length<j[0].length;if(j.length===1||Y)return`
`;for(var Q=0,x=0;x<j.length;x++)j[x][0]===`
`&&Q++;return Q>=j.length/2?`\r
`:"\r"}(d,P)),s=!1,t.delimiter)b(t.delimiter)&&(t.delimiter=t.delimiter(d),a.meta.delimiter=t.delimiter);else{var C=function(O,R,J,j,$){var Y,Q,x,I;$=$||[",","	","|",";",p.RECORD_SEP,p.UNIT_SEP];for(var oe=0;oe<$.length;oe++){var k=$[oe],he=0,Z=0,le=0;x=void 0;for(var ie=new Re({comments:j,delimiter:k,newline:R,preview:10}).parse(O),se=0;se<ie.data.length;se++)if(J&&V(ie.data[se]))le++;else{var ae=ie.data[se].length;Z+=ae,x!==void 0?0<ae&&(he+=Math.abs(ae-x),x=ae):x=ae}0<ie.data.length&&(Z/=ie.data.length-le),(Q===void 0||he<=Q)&&(I===void 0||I<Z)&&1.99<Z&&(Q=he,Y=k,I=Z)}return{successful:!!(t.delimiter=Y),bestDelimiter:Y}}(d,t.newline,t.skipEmptyLines,t.comments,t.delimitersToGuess);C.successful?t.delimiter=C.bestDelimiter:(s=!0,t.delimiter=p.DefaultDelimiter),a.meta.delimiter=t.delimiter}var q=we(t);return t.preview&&t.header&&q.preview++,e=d,r=new Re(q),a=r.parse(e,y,E),L(),h?{meta:{paused:!0}}:a||{meta:{paused:!1}}},this.paused=function(){return h},this.pause=function(){h=!0,r.abort(),e=b(t.chunk)?"":e.substring(r.getCharIndex())},this.resume=function(){T.streamer._halted?(h=!1,T.streamer.parseChunk(e,!0)):setTimeout(T.resume,3)},this.aborted=function(){return K},this.abort=function(){K=!0,r.abort(),a.meta.aborted=!0,b(t.complete)&&t.complete(a),e=""}}function fe(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Re(t){var e,r=(t=t||{}).delimiter,s=t.newline,o=t.comments,c=t.step,m=t.preview,F=t.fastMode,T=e=t.quoteChar===void 0||t.quoteChar===null?'"':t.quoteChar;if(t.escapeChar!==void 0&&(T=t.escapeChar),(typeof r!="string"||-1<p.BAD_DELIMITERS.indexOf(r))&&(r=","),o===r)throw new Error("Comment character same as delimiter");o===!0?o="#":(typeof o!="string"||-1<p.BAD_DELIMITERS.indexOf(o))&&(o=!1),s!==`
`&&s!=="\r"&&s!==`\r
`&&(s=`
`);var l=0,D=!1;this.parse=function(h,K,M){if(typeof h!="string")throw new Error("Input must be a string");var a=h.length,w=r.length,V=s.length,L=o.length,U=b(c),A=[],N=[],d=[],y=l=0;if(!h)return B();if(t.header&&!K){var E=h.split(s)[0].split(r),P=[],C={},q=!1;for(var O in E){var R=E[O];b(t.transformHeader)&&(R=t.transformHeader(R,O));var J=R,j=C[R]||0;for(0<j&&(q=!0,J=R+"_"+j),C[R]=j+1;P.includes(J);)J=J+"_"+j;P.push(J)}if(q){var $=h.split(s);$[0]=P.join(r),h=$.join(s)}}if(F||F!==!1&&h.indexOf(e)===-1){for(var Y=h.split(s),Q=0;Q<Y.length;Q++){if(d=Y[Q],l+=d.length,Q!==Y.length-1)l+=s.length;else if(M)return B();if(!o||d.substring(0,L)!==o){if(U){if(A=[],le(d.split(r)),ye(),D)return B()}else le(d.split(r));if(m&&m<=Q)return A=A.slice(0,m),B(!0)}}return B()}for(var x=h.indexOf(r,l),I=h.indexOf(s,l),oe=new RegExp(fe(T)+fe(e),"g"),k=h.indexOf(e,l);;)if(h[l]!==e)if(o&&d.length===0&&h.substring(l,l+L)===o){if(I===-1)return B();l=I+V,I=h.indexOf(s,l),x=h.indexOf(r,l)}else if(x!==-1&&(x<I||I===-1))d.push(h.substring(l,x)),l=x+w,x=h.indexOf(r,l);else{if(I===-1)break;if(d.push(h.substring(l,I)),ae(I+V),U&&(ye(),D))return B();if(m&&A.length>=m)return B(!0)}else for(k=l,l++;;){if((k=h.indexOf(e,k+1))===-1)return M||N.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:A.length,index:l}),se();if(k===a-1)return se(h.substring(l,k).replace(oe,e));if(e!==T||h[k+1]!==T){if(e===T||k===0||h[k-1]!==T){x!==-1&&x<k+1&&(x=h.indexOf(r,k+1)),I!==-1&&I<k+1&&(I=h.indexOf(s,k+1));var he=ie(I===-1?x:Math.min(x,I));if(h.substr(k+1+he,w)===r){d.push(h.substring(l,k).replace(oe,e)),h[l=k+1+he+w]!==e&&(k=h.indexOf(e,l)),x=h.indexOf(r,l),I=h.indexOf(s,l);break}var Z=ie(I);if(h.substring(k+1+Z,k+1+Z+V)===s){if(d.push(h.substring(l,k).replace(oe,e)),ae(k+1+Z+V),x=h.indexOf(r,l),k=h.indexOf(e,l),U&&(ye(),D))return B();if(m&&A.length>=m)return B(!0);break}N.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:A.length,index:l}),k++}}else k++}return se();function le(W){A.push(W),y=l}function ie(W){var De=0;if(W!==-1){var Ee=h.substring(k+1,W);Ee&&Ee.trim()===""&&(De=Ee.length)}return De}function se(W){return M||(W===void 0&&(W=h.substring(l)),d.push(W),l=a,le(d),U&&ye()),B()}function ae(W){l=W,le(d),d=[],I=h.indexOf(s,l)}function B(W){return{data:A,errors:N,meta:{delimiter:r,linebreak:s,aborted:D,truncated:!!W,cursor:y+(K||0)}}}function ye(){c(B()),A=[],N=[]}},this.abort=function(){D=!0},this.getCharIndex=function(){return l}}function Fe(t){var e=t.data,r=_[e.workerId],s=!1;if(e.error)r.userError(e.error,e.file);else if(e.results&&e.results.data){var o={abort:function(){s=!0,Te(e.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:Le,resume:Le};if(b(r.userStep)){for(var c=0;c<e.results.data.length&&(r.userStep({data:e.results.data[c],errors:e.results.errors,meta:e.results.meta},o),!s);c++);delete e.results}else b(r.userChunk)&&(r.userChunk(e.results,o,e.file),delete e.results)}e.finished&&!s&&Te(e.workerId,e.results)}function Te(t,e){var r=_[t];b(r.userComplete)&&r.userComplete(e),r.terminate(),delete _[t]}function Le(){throw new Error("Not implemented.")}function we(t){if(typeof t!="object"||t===null)return t;var e=Array.isArray(t)?[]:{};for(var r in t)e[r]=we(t[r]);return e}function ne(t,e){return function(){t.apply(e,arguments)}}function b(t){return typeof t=="function"}return f&&(v.onmessage=function(t){var e=t.data;if(p.WORKER_ID===void 0&&e&&(p.WORKER_ID=e.workerId),typeof e.input=="string")v.postMessage({workerId:p.WORKER_ID,results:p.parse(e.input,e.config),finished:!0});else if(v.File&&e.input instanceof File||e.input instanceof Object){var r=p.parse(e.input,e.config);r&&v.postMessage({workerId:p.WORKER_ID,results:r,finished:!0})}}),(ge.prototype=Object.create(G.prototype)).constructor=ge,(me.prototype=Object.create(G.prototype)).constructor=me,(ce.prototype=Object.create(ce.prototype)).constructor=ce,(ve.prototype=Object.create(G.prototype)).constructor=ve,p})})(Ne);var lt=Ne.exports;const Ie=ze(lt),ut={name:"SnapComp",props:{csv:{type:Array}}},dt={key:0};function ht(g,n,S,v,u,f){return X(),ee("div",null,[S.csv?(X(),ee("div",dt)):Pe("",!0)])}const ct=_e(ut,[["render",ht]]),ft={components:{SnapComp:ct},data(){return{csvData:[],departmentData:[],personData:[]}},methods:{clickToUpload(){this.$refs.fileInput.click()},handleFileUpload(g){const n=g.target.files[0];this.processFile(n)},dragover(){this.$refs.uploadBox.classList.add("dragging")},dragleave(){this.$refs.uploadBox.classList.remove("dragging")},drop(g){this.$refs.uploadBox.classList.remove("dragging");const n=g.dataTransfer.files[0];this.processFile(n)},processFile(g){Ie.parse(g,{header:!0,complete:n=>{this.csvData=n.data,this.analyzeData(n.data)}}),console.log("File uploaded:",g)},analyzeData(g){const n={},S={},v=g.length;g.forEach(u=>{const f=u.Department,_=u["Assign to / Corrected by"];n[f]||(n[f]=0),S[_]||(S[_]=0),n[f]+=1,S[_]+=1}),this.departmentData=Object.keys(n).map(u=>({name:u,count:n[u],participation:n[u]/v*100})).sort((u,f)=>f.count-u.count),this.personData=Object.keys(S).map(u=>({name:u,count:S[u],participation:S[u]/v*100})).sort((u,f)=>f.count-u.count)},loadAndProcessCSV(){fetch("").then(n=>{if(!n.ok)throw new Error("Network response was not ok and all is lost");return n.text()}).then(n=>{Ie.parse(n,{header:!0,complete:S=>{this.analyzeData(S.data)}})}).catch(n=>{console.error("There was a problem with YOU, go reflect a bit:",n)})},printReport(){window.print()}}},pt=i("div",{class:"container"},[i("img",{src:Qe,class:"banner"}),i("span",{class:"version"},"Built in a Day so no judging! V 0.2.1")],-1),_t=i("p",null,"drag and drop csv",-1);function gt(g,n,S,v,u,f){const _=ke("snap-comp");return X(),ee("div",null,[pt,i("div",null,[i("button",{onClick:n[0]||(n[0]=z=>f.loadAndProcessCSV())},"Run test"),i("button",{onClick:n[1]||(n[1]=(...z)=>f.printReport&&f.printReport(...z))},"Print Report")]),i("div",{class:"file-upload",onDragover:n[3]||(n[3]=be((...z)=>f.dragover&&f.dragover(...z),["prevent"])),onDragleave:n[4]||(n[4]=be((...z)=>f.dragleave&&f.dragleave(...z),["prevent"])),onDrop:n[5]||(n[5]=be((...z)=>f.drop&&f.drop(...z),["prevent"])),onClick:n[6]||(n[6]=(...z)=>f.clickToUpload&&f.clickToUpload(...z))},[i("input",{type:"file",ref:"fileInput",onChange:n[2]||(n[2]=(...z)=>f.handleFileUpload&&f.handleFileUpload(...z)),style:{display:"none"}},null,544),_t],32),Ce(_,{csv:u.csvData},null,8,["csv"])])}const mt=_e(ft,[["render",gt]]),vt={name:"VCardQR",data(){return{firstName:"",lastName:"",organization:"",title:"",phone:"",email:"",qrCodeData:null}},computed:{qrFileName(){const g=this.firstName.trim().replace(/\s+/g,"_"),n=this.lastName.trim().replace(/\s+/g,"_");return`${g}_${n}_Vcard_Qr.png`}},methods:{async generateQRCode(){const g=new Me;(this.firstName||this.lastName)&&g.addName(this.lastName,this.firstName),this.organization&&g.addCompany(this.organization),this.title&&g.addJobtitle(this.title),this.phone&&g.addPhoneNumber(this.phone,"WORK"),this.email&&g.addEmail(this.email);try{const n=g.toString();this.qrCodeData=await Ve.toDataURL(n)}catch(n){console.error("Error generating QR code:",n)}}}},te=g=>(qe("data-v-fc3fe10c"),g=g(),je(),g),yt={class:"vcard-qr"},kt=te(()=>i("h2",null,"Create a vCard QR Code",-1)),bt=te(()=>i("label",{for:"firstName"},"First Name:",-1)),Ct=te(()=>i("label",{for:"lastName"},"Last Name:",-1)),Rt=te(()=>i("label",{for:"organization"},"Organization:",-1)),wt=te(()=>i("label",{for:"title"},"Job Title:",-1)),Et=te(()=>i("label",{for:"phone"},"Phone Number:",-1)),xt=te(()=>i("label",{for:"email"},"Email:",-1)),Tt=te(()=>i("button",{type:"submit"},"Generate QR Code",-1)),Lt={key:0},Dt=te(()=>i("h3",null,"Your vCard QR Code:",-1)),Ot=["src"],St=["href","download"];function It(g,n,S,v,u,f){return X(),ee("div",yt,[kt,i("form",{onSubmit:n[6]||(n[6]=be((..._)=>f.generateQRCode&&f.generateQRCode(..._),["prevent"]))},[i("div",null,[bt,H(i("input",{"onUpdate:modelValue":n[0]||(n[0]=_=>u.firstName=_),type:"text",id:"firstName"},null,512),[[ue,u.firstName]])]),i("div",null,[Ct,H(i("input",{"onUpdate:modelValue":n[1]||(n[1]=_=>u.lastName=_),type:"text",id:"lastName"},null,512),[[ue,u.lastName]])]),i("div",null,[Rt,H(i("input",{"onUpdate:modelValue":n[2]||(n[2]=_=>u.organization=_),type:"text",id:"organization"},null,512),[[ue,u.organization]])]),i("div",null,[wt,H(i("input",{"onUpdate:modelValue":n[3]||(n[3]=_=>u.title=_),type:"text",id:"title"},null,512),[[ue,u.title]])]),i("div",null,[Et,H(i("input",{"onUpdate:modelValue":n[4]||(n[4]=_=>u.phone=_),type:"tel",id:"phone"},null,512),[[ue,u.phone]])]),i("div",null,[xt,H(i("input",{"onUpdate:modelValue":n[5]||(n[5]=_=>u.email=_),type:"email"},null,512),[[ue,u.email]])]),Tt],32),u.qrCodeData?(X(),ee("div",Lt,[Dt,i("img",{src:u.qrCodeData,alt:"vCard QR Code"},null,8,Ot),i("a",{href:u.qrCodeData,download:f.qrFileName,class:"download-link"},"Download QR Code",8,St)])):Pe("",!0)])}const Pt=_e(vt,[["render",It],["__scopeId","data-v-fc3fe10c"]]),At={components:{LTR:ot,Qr:Pt,Snappy:mt},data(){return{selectedProject:null}},methods:{selectProject(g){this.selectedProject=g}}},Nt=i("p",null,"Showing content for QR project.",-1);function Ft(g,n,S,v,u,f){const _=ke("LTR"),z=ke("Qr"),p=ke("Snappy");return X(),ee("div",null,[i("button",{onClick:n[0]||(n[0]=re=>f.selectProject("LTR"))},"LTR"),i("button",{onClick:n[1]||(n[1]=re=>f.selectProject("Qr"))},"QR"),i("button",{onClick:n[2]||(n[2]=re=>f.selectProject("Snappy"))},"Snappy"),H(i("div",null,[Ce(_)],512),[[pe,u.selectedProject==="LTR"]]),H(i("div",null,[Nt,Ce(z)],512),[[pe,u.selectedProject==="Qr"]]),H(i("div",null,[Ce(p)],512),[[pe,u.selectedProject==="Snappy"]])])}const Mt=_e(At,[["render",Ft]]);export{Mt as default};
