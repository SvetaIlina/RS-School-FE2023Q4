(()=>{"use strict";var t={978:(t,e,n)=>{n.r(e)},546:(t,e,n)=>{n.r(e)},823:(t,e,n)=>{n.r(e)},931:(t,e,n)=>{n.r(e)},872:(t,e,n)=>{n.r(e)},39:(t,e,n)=>{n.r(e)},850:(t,e,n)=>{n.r(e)},325:(t,e,n)=>{n.r(e)},723:(t,e,n)=>{n.r(e)},315:(t,e,n)=>{n.r(e)},557:(t,e,n)=>{n.r(e)},284:(t,e,n)=>{n.r(e)},331:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.carModels=e.carBrands=void 0,e.carBrands=["Toyota","Honda","Ford","Chevrolet","Volkswagen","Nissan","BMW","Mercedes-Benz","Audi","Lexus","Hyundai","Kia","Subaru","Mazda","Tesla"],e.carModels=["Corolla","Civic","F-150","Camaro","Golf","Altima","3 Series","E-Class","A4","RX","Elantra","Sorento","Outback","CX-5","Model S"]},181:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});class n{constructor(t,...e){this.element=document.createElement(t.tag),this.setElement(t),e&&this.addChild(e)}getElement(){return this.element}setElement(t){this.setStyles(t.classes),t.textContent&&this.setTextContent(t.textContent),t.attributes&&this.setAttributes(t.attributes),t.onClick&&t.eventType&&this.setCallback(t.onClick,t.eventType)}addChild(t){t.forEach((t=>{t instanceof n?this.element.append(t.getElement()):this.element.append(t)}))}removeChild(){for(;this.element.firstChild;)this.element.firstChild.remove()}setStyles(t){t.forEach((t=>{t&&this.element.classList.add(t)}))}setAttributes(t){t.forEach((t=>{this.element.setAttribute(t.key,t.value)}))}setTextContent(t){this.element.textContent=t}setCallback(t,e){"function"==typeof t&&this.element.addEventListener(e,t)}}e.default=n},203:function(t,e,n){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=s(n(181));class i extends a.default{constructor(t,e,n){super({tag:"button",classes:t,textContent:e,onClick:n,eventType:"click"})}}e.default=i},304:function(t,e,n){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=s(n(804)),i=s(n(181)),r=s(n(203));n(978);class o extends a.default{constructor(t,e,n,s,a){super({tag:"div",classes:["carOptions"]}),this.configView(t,e,n,s,a)}configView(t,e,n,s,a){const o=new i.default({tag:"div",classes:["raceBtnContainer"]}),l=new r.default(["btn","startBtn","raceBtn"],"",s),c=new r.default(["btn","stopBtn","raceBtn","disable"],"",a);o.addChild([l,c]);const d=new i.default({tag:"span",classes:["carName"],textContent:t}),h=new i.default({tag:"div",classes:["carManage"]}),u=new r.default(["btn","carManageBtn"],"Edit",n),f=new r.default(["btn","carManageBtn"],"Delete",e);h.addChild([u,f]),this.view.addChild([o,d,h])}}e.default=o},455:function(t,e,n){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=n(187),i=s(n(181));n(546);class r extends i.default{constructor(t){super({tag:"div",classes:["car"]}),this.animationID=null,this.distance=null,this.setImage(t)}setImage(t){const e=`\n    \t<svg height="80px" width="80px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"\n    \t\t viewBox="0 0 464 464" xml:space="preserve">\n    \t<g>\n    \t\t<path class='baloon' style="fill:#977878;" d="M136,224.293c0-0.694,0.098-1.364,0.264-2.005c-5.744-26.123-5.658-65.573-5.607-87.799l0.001-0.468\n    \t\t\tc-1.396,0.864-2.801,1.63-4.186,2.272c-1.262-0.585-2.541-1.274-3.814-2.045l0,0.225c-0.08,37.585,0.704,77.969,9.159,101.394\n    \t\t\tc-24.078-16.184-35.875-31.452-39.806-51.095c-1.32,0.766-2.641,1.458-3.949,2.065c-1.398-0.648-2.811-1.398-4.222-2.227\n    \t\t\tc1.845,10.37,5.554,19.322,10.842,27.323c-23.727-17.121-45.583-39.928-45.674-78.066c-1.414,0.769-2.826,1.484-4.227,2.134\n    \t\t\tc-1.251-0.58-2.511-1.214-3.773-1.89c0.244,54.17,41.326,80.145,71.346,99.12c9.271,5.861,17.835,11.278,23.648,16.6V224.293z"/>\n    \t\t<path style="fill:#55323C;" d="M158.63,280.293H176l-5.795-23.182c-1.296-5.182-5.952-8.818-11.294-8.818h0\n    \t\t\tc-2.624,0-4.994,0.868-6.91,2.29v28.252C154.064,279.776,156.318,280.293,158.63,280.293z"/>\n    \t\t<path style="fill:#7597b3;" d="M147.318,275.608c1.365,1.365,2.959,2.442,4.682,3.228v-28.252v-26.29c0-4.418-3.582-8-8-8\n    \t\t\tc-3.724,0-6.845,2.549-7.736,5.995c-0.166,0.642-0.264,1.312-0.264,2.005v25.538v14.462l0.001,0L147.318,275.608z"/>\n    \t\t<path class='colorPart' style="fill:${t};" d="M456,303.324c0-8.449-6.569-15.442-15.002-15.969L328,280.293h-18.725\n    \t\t\tc-3.2,0-6.093-1.907-7.353-4.849L272,216.293h19.841c0.066,0.041,0.122,0.075,0.183,0.113c-2.829-4.993-8.131-8.113-13.912-8.113\n    \t\t\th-14.104c-5.586,0-9.452,5.579-7.491,10.809l27.947,61.191H176h-17.37c-2.312,0-4.566-0.517-6.63-1.458\n    \t\t\tc-1.723-0.786-3.317-1.863-4.682-3.228l-11.317-11.315l-0.001,0L22.015,278.541C14.009,279.542,8,286.348,8,294.417v9.875h448\n    \t\t\tV303.324z"/>\n    \t\t<path class='colorPart' style="fill:${t};" d="M32,344.293h10.742c6.591-18.641,24.36-32,45.258-32s38.667,13.359,45.258,32H152c0,0,0,0,0,0\n    \t\t\tc0-4.418,3.582-8,8-8h152c4.418,0,8,3.582,8,8c0,0,0,0,0,0.001h18.742c6.591-18.641,24.36-32,45.258-32s38.667,13.359,45.258,32\n    \t\t\tH440v0c0-4.418,3.582-8,8-8h8v-32H8v32h16C28.418,336.293,32,339.875,32,344.293z"/>\n    \t\t<path style="fill:#564748;" d="M440,344.293h-10.742c1.77,5.006,2.742,10.388,2.742,16c0,2.727-0.239,5.397-0.676,8H448\n    \t\t\tc4.418,0,8-3.582,8-8v-8v0h-8C443.582,352.293,440,348.711,440,344.293z"/>\n    \t\t<path style="fill:#564748;" d="M338.742,344.293H320c0,4.418-3.582,7.999-8,7.999H160c-4.418,0-8-3.581-8-7.999h-18.742\n    \t\t\tc1.77,5.006,2.742,10.388,2.742,16c0,2.727-0.239,5.397-0.676,8h201.353c-0.437-2.603-0.676-5.273-0.676-8\n    \t\t\tC336,354.681,336.972,349.298,338.742,344.293z"/>\n    \t\t<path style="fill:#564748;" d="M42.742,344.293H32c0,4.418-3.582,8-8,8H8c0,8.836,7.164,16,16,16h16.676\n    \t\t\tc-0.437-2.603-0.676-5.273-0.676-8C40,354.681,40.972,349.298,42.742,344.293z"/>\n    \t\t<path style="fill:#55323C;" d="M429.258,344.293c-6.591-18.641-24.36-32-45.258-32s-38.667,13.359-45.258,32\n    \t\t\tc-1.77,5.006-2.742,10.388-2.742,16c0,2.727,0.239,5.397,0.676,8c3.81,22.7,23.541,40,47.324,40s43.513-17.3,47.324-40\n    \t\t\tc0.437-2.603,0.676-5.273,0.676-8C432,354.681,431.028,349.298,429.258,344.293z M384,392.293c-17.673,0-32-14.327-32-32\n    \t\t\ts14.327-32,32-32s32,14.327,32,32S401.673,392.293,384,392.293z"/>\n    \t\t<path style="fill:#DEE1E9;" d="M384,328.293c-17.673,0-32,14.327-32,32s14.327,32,32,32s32-14.327,32-32\n    \t\t\tS401.673,328.293,384,328.293z M384,376.293c-8.837,0-16-7.163-16-16s7.163-16,16-16s16,7.163,16,16S392.837,376.293,384,376.293z"\n    \t\t\t/>\n    \t\t<circle style="fill:#FFFFFF;" cx="384" cy="360.293" r="16"/>\n    \t\t<path style="fill:#55323C;" d="M133.258,344.293c-6.591-18.641-24.36-32-45.258-32s-38.667,13.359-45.258,32\n    \t\t\tc-1.77,5.006-2.742,10.388-2.742,16c0,2.727,0.239,5.397,0.676,8c3.81,22.7,23.541,40,47.324,40s43.513-17.3,47.324-40\n    \t\t\tc0.437-2.603,0.676-5.273,0.676-8C136,354.681,135.028,349.298,133.258,344.293z M88,392.293c-17.673,0-32-14.327-32-32\n    \t\t\ts14.327-32,32-32s32,14.327,32,32S105.673,392.293,88,392.293z"/>\n    \t\t<path style="fill:#DEE1E9;" d="M88,328.293c-17.673,0-32,14.327-32,32s14.327,32,32,32s32-14.327,32-32S105.673,328.293,88,328.293\n    \t\t\tz M88,376.293c-8.837,0-16-7.163-16-16s7.163-16,16-16s16,7.163,16,16S96.837,376.293,88,376.293z"/>\n    \t\t<circle style="fill:#FFFFFF;" cx="88" cy="360.293" r="16"/>\n    \t\t<path style="fill:#7597b3;" d="M272,216.293l29.922,59.151c1.261,2.941,4.153,4.849,7.353,4.849H328l-35.928-63.857\n    \t\t\tc-0.017-0.011-0.032-0.02-0.048-0.03c-0.061-0.038-0.117-0.072-0.183-0.113H272z"/>\n    \t\t<path style="fill:#DEE1E9;" d="M312,336.292H160c-4.418,0-8,3.582-8,8c0,0,0,0,0,0.001c0,4.418,3.582,7.999,8,7.999h152\n    \t\t\tc4.418,0,8-3.581,8-7.999c0,0,0,0,0,0C320,339.874,316.418,336.292,312,336.292z"/>\n    \t\t<path style="fill:#DEE1E9;" d="M456,336.293L456,336.293h-8c-4.418,0-8,3.582-8,8v0c0,4.418,3.582,8,8,8h8h0c4.418,0,8-3.582,8-8\n    \t\t\tC464,339.874,460.418,336.293,456,336.293z"/>\n    \t\t<path style="fill:#DEE1E9;" d="M24,352.293c4.418,0,8-3.582,8-8s-3.582-8-8-8H8c-4.418,0-8,3.582-8,8s3.582,8,8,8H24z"/>\n    \t\t<path class = 'baloon' style="fill:#EC4399;" d="M88.061,186.836c1.307-0.606,2.629-1.299,3.949-2.065c12.353-7.163,24.612-20.838,24.612-32.405\n    \t\t\tc0-9.247-7.496-16.743-16.743-16.743c-4.613,0-8.79,1.867-11.818,4.885c-2.259-2.251-5.158-3.86-8.4-4.533\n    \t\t\tC65.203,145.497,75.258,173.54,88.061,186.836z"/>\n    \t\t<path style="fill:#E86464;" d="M78.007,135.718c0.56,0.059,1.111,0.145,1.653,0.257C79.119,135.863,78.567,135.777,78.007,135.718z\n    \t\t\t"/>\n    \t\t<path style="fill:#E86464;" d="M76.242,135.623c0.586,0,1.164,0.031,1.734,0.09C77.406,135.655,76.828,135.623,76.242,135.623z"/>\n    \t\t<path class = 'baloon' style="fill:#EC4399;" d="M79.661,135.975L79.661,135.975L79.661,135.975c-0.542-0.113-1.094-0.198-1.654-0.257\n    \t\t\tc-0.01-0.001-0.02-0.004-0.031-0.005c-0.57-0.059-1.148-0.09-1.734-0.09c-9.247,0-16.742,7.496-16.742,16.743\n    \t\t\tc0,11.481,12.079,25.037,24.338,32.242c1.411,0.829,2.825,1.579,4.222,2.227C75.258,173.54,65.203,145.497,79.661,135.975z"/>\n    \t\t<path style="fill:#E86464;" d="M118.561,96.075c0.44,0.047,0.874,0.114,1.301,0.202C119.436,96.188,119.002,96.121,118.561,96.075z\n    \t\t\t"/>\n    \t\t<path style="fill:#E86464;" d="M117.173,96c0.461,0,0.916,0.024,1.364,0.071C118.088,96.025,117.633,96,117.173,96z"/>\n    \t\t<path class = 'baloon' style="fill:#EC4399;" d="M126.471,136.293c1.385-0.642,2.79-1.408,4.186-2.272c9.341-5.784,18.285-16.084,18.285-24.848\n    \t\t\tc0-7.275-5.898-13.173-13.173-13.173c-3.63,0-6.916,1.469-9.298,3.844c-1.777-1.771-4.058-3.037-6.609-3.567\n    \t\t\tC108.487,103.768,116.398,125.832,126.471,136.293z"/>\n    \t\t<path class = 'baloon' style="fill:#EC4399;" d="M119.862,96.277L119.862,96.277L119.862,96.277c-0.427-0.089-0.861-0.156-1.301-0.202\n    \t\t\tc-0.008-0.001-0.016-0.003-0.025-0.004c-0.448-0.047-0.903-0.071-1.364-0.071C109.898,96,104,101.898,104,109.173\n    \t\t\tc0,8.88,9.183,19.337,18.657,25.075c1.273,0.771,2.552,1.46,3.814,2.045C116.398,125.832,108.487,103.768,119.862,96.277z"/>\n    \t\t<path class = 'baloon' style="fill:#EC4399;" d="M44.779,136c1.401-0.65,2.813-1.365,4.227-2.134c20.01-10.88,40.552-33.161,40.552-51.909\n    \t\t\tc0-14.497-11.752-26.25-26.25-26.25c-7.233,0-13.781,2.927-18.529,7.659c-4.748-4.732-11.296-7.659-18.529-7.659\n    \t\t\tc1.837,0,3.629,0.193,5.36,0.552C8.942,71.187,24.706,115.155,44.779,136z"/>\n    \t\t<path class = 'baloon' style="fill:#EC4399;" d="M31.609,56.259c-1.731-0.359-3.522-0.552-5.36-0.552C11.752,55.707,0,67.46,0,81.957\n    \t\t\tc0,18.89,20.854,41.366,41.006,52.154c1.262,0.676,2.522,1.309,3.773,1.89C24.706,115.155,8.942,71.187,31.609,56.259z"/>\n    \t</g>\n    \t</svg>`;this.element.innerHTML=e}setAnimation(t,e){const n=this.element;this.distance=e;let s=null;const a=i=>{s||(s=i);const r=(i-s)/t,o=r*e;n.style.transform=`translateX(${o}px)`,r<1&&(this.animationID=requestAnimationFrame(a))};this.animationID=requestAnimationFrame(a)}resetAnimation(){(0,a.isNotNull)(this.animationID),(0,a.isNotNull)(this.distance),cancelAnimationFrame(this.animationID)}setCarsBaloonAnimation(){this.resetAnimation(),this.element.querySelectorAll(".baloon").forEach((t=>{t.classList.add("hide")}))}backToStart(){this.element.style.transform="translateX(0px)",this.element.querySelectorAll(".baloon").forEach((t=>{t.classList.remove("hide")}))}}e.default=r},514:function(t,e,n){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=s(n(804)),i=s(n(181)),r=s(n(203)),o=n(187);n(823);const l=s(n(676));class c extends a.default{constructor(t){super({tag:"header",classes:["header"]}),this.configHeaderView(),this.mainComponent=t}configHeaderView(){const t=new i.default({tag:"div",classes:["wrapper","headerWrapper"]}),e=new i.default({tag:"span",classes:["headerTitle"],textContent:"Async Race"}),n=new i.default({tag:"div",classes:["headerBtnContainer"]}),s=new r.default(["btn","headerBtn"],"garage",(t=>this.showContent(t))),a=new r.default(["btn","headerBtn"],"winners",(t=>this.showContent(t)));n.addChild([s,a]),t.addChild([n,e]),this.view.addChild([t])}showContent(t){(0,o.isNotNullElement)(t.target);const e=this.mainComponent.getChild(),n=t.target.textContent;e.forEach((t=>{t.getViewElement().classList.remove("hidden"),t.getViewElement().classList.contains(`${n}`)||t.getViewElement().classList.add("hidden"),t instanceof l.default&&t.configView()}))}}e.default=c},486:function(t,e,n){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=s(n(181));n(931);class i extends a.default{constructor(){super({tag:"div",classes:["inputOptionsContainer"]}),this.textInput=new a.default({tag:"input",classes:["inputField","textInput"],attributes:[{key:"type",value:"text"}]}),this.colorInput=new a.default({tag:"input",classes:["inputField","colorInput"],attributes:[{key:"type",value:"color"}]}),this.createView()}createView(){this.addChild([this.textInput,this.colorInput])}setText(t){this.textInput.element.value=t}setColor(t){this.colorInput.element.value=t}getText(){return this.textInput.element.value}getColor(){return this.colorInput.element.value}reset(){this.setText(""),this.setColor("#000")}}e.default=i},597:function(t,e,n){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=s(n(804)),i=s(n(304)),r=s(n(455));n(872);const o=n(298),l=n(187),c=s(n(181)),d=s(n(845));class h extends a.default{constructor(t,e,n){super({tag:"div",classes:["carContainer"]}),this.car=null,this.id=n,this.carName=e,this.carColor=t,this.observer=null,this.configView(this.carColor,this.carName,this.id)}addObserver(t){this.observer=t}configView(t,e,n){const s=new c.default({tag:"img",classes:["imgFinish"],attributes:[{key:"src",value:d.default}]});this.car=new r.default(t);const a=new i.default(e,(()=>{(0,l.isNotNull)(this.observer),this.observer.removeCar(n)}),(()=>{(0,l.isNotNull)(this.observer),this.observer.setCarInfo({name:e,color:t},n)}),(t=>{(0,l.isNotNull)(t.target),(0,l.toggleBtn)(t.target),this.moveCar().catch((t=>console.error(t.message)))}),(t=>{(0,l.isNotNull)(t.target),(0,l.toggleBtn)(t.target),this.stopCar()}));this.view.addChild([a.getViewElement(),this.car,s])}async moveCar(){(0,l.isNotNull)(this.car);const t=this.view.getElement(),e=window.getComputedStyle(t),n=parseInt(e.getPropertyValue("width"),10)-80-20;try{const{velocity:t,distance:e}=await(0,o.startStopEngine)(this.id,"started"),s=e/t;return this.car.setAnimation(s,n),await(0,o.switchToDriveMode)(this.id,"drive"),{name:this.carName,color:this.carColor,id:this.id,time:`${(s/1e3).toFixed(2)}`}}catch(t){throw t instanceof Error&&console.error(t.message),this.car.setCarsBaloonAnimation(),t}}async stopCar(){try{(0,l.isNotNull)(this.car),this.car.resetAnimation(),await(0,o.startStopEngine)(this.id,"stopped"),this.car.backToStart()}catch(t){t instanceof Error&&console.error(`${t.message}`)}}}e.default=h},416:function(t,e,n){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=s(n(181)),i=s(n(804)),r=n(298),o=s(n(597)),l=n(187);n(39);const c=s(n(675)),d=s(n(444)),h=s(n(622)),u=s(n(286));class f extends i.default{constructor(){super({tag:"div",classes:["garage"]}),this.garageOption=new c.default,this.pagination=new d.default,this.pageLimit=7,this.cars=[],this.carsInfo=null,this.carsCount=0,this.currentId=0,this.pageNumber=1,this.child=[],this.configView(),this.view.addChild([this.garageOption,this.pagination]),this.garageOption.addObserver(this),this.pagination.addObserver(this)}async configView(t=1){try{await this.getCarsInfo(t);const{title:e,carsWrapper:n}=this.setContent(),s=new h.default;s.addObserver(this),this.child.push(e),this.child.push(n),this.child.push(s),this.view.addChild([s,e,n]),this.carsCount>this.pageLimit&&this.pagination.getElement().classList.remove("hidden"),this.carsCount<=this.pageLimit&&this.pagination.getElement().classList.add("hidden"),this.pagination.setTotalPageCount(Math.ceil(this.carsCount/this.pageLimit)),this.pagination.configView()}catch(t){t instanceof Error&&console.error(t.message)}}async getCarsInfo(t){try{const e=await(0,r.getCars)({page:t,limit:this.pageLimit});this.carsInfo=e.info,(0,l.isNotNull)(e.membersCount),this.carsCount=e.membersCount}catch(t){if(t instanceof Error)throw new Error(`fetching cars information: ${t.message}`)}}async addNewCar(t){try{await(0,r.addCar)(t),this.garageOption.resetInputSettings("new"),this.updateContent(this.pageNumber)}catch(t){t instanceof Error&&console.error(`Something went wrong: ${t.message}`)}}async removeCar(t){const e=document.querySelector(".carsWrapper");(0,l.isNotNullElement)(e),1===e.childNodes.length&&(this.pageNumber-=1,this.pagination.currentPageNumber-=1);try{await(0,r.deleteCar)(t),this.updateContent(this.pageNumber)}catch(t){t instanceof Error&&console.error(`Deleting car:${t.message}`)}}async editCar(t){try{await(0,r.updateCar)(t,this.currentId),this.garageOption.resetInputSettings("edit"),this.garageOption.toggleInputsAccessibility(),this.updateContent(this.pageNumber)}catch(t){t instanceof Error&&console.error(`Editing car:${t.message}`)}}async startRace(){const t=(0,l.getActiveBtns)();t.forEach((t=>t.classList.add("disable")));const e=[];this.cars.forEach((t=>{e.push(t.moveCar())})),Promise.any(e).then((async t=>{(new u.default).buildModal(t.name,t.time),await(0,r.addWinner)({id:t.id,wins:1,time:+t.time})})).catch((t=>console.log(t))),await Promise.allSettled(e),t.forEach((t=>t.classList.remove("disable")))}async resetRace(){this.cars.forEach((t=>{(0,l.dispatchBtnEvent)(t,"stopBtn ")}))}async generateRandomCars(){const t=[];for(let e=0;e<100;e+=1){const e=(0,l.getRandomCarInfo)(),n=(0,r.addCar)(e);t.push(n)}await Promise.all(t),this.updateContent(this.pageNumber)}setCarInfo(t,e){this.garageOption.toggleInputsAccessibility(),this.garageOption.setEditableValue(t.name,t.color),this.currentId=e}setContent(){const t=this.carsInfo;(0,l.isNotNull)(t);const e=new a.default({tag:"div",classes:["title"]});e.getElement().innerHTML=`Garage (<span class = 'carsCount'>${this.carsCount}</span>)`;const n=new a.default({tag:"div",classes:["carsWrapper"]});return t.forEach((t=>{const{color:e,name:s,id:a}=t,i=new o.default(e,s,a);i.addObserver(this),n.addChild([i.getViewElement()]),this.cars.push(i)})),{title:e,carsWrapper:n}}updateContent(t){this.cars=[],this.pageNumber=t,this.child.forEach((t=>t.getElement().remove())),this.configView(t)}}e.default=f},675:function(t,e,n){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=s(n(486)),i=s(n(203)),r=s(n(181));n(850);const o=n(187);class l extends r.default{constructor(){super({tag:"div",classes:["garageOption"]}),this.newCarInput=new a.default,this.editCarInput=new a.default,this.newCarOption=new r.default({tag:"div",classes:["option","newCarOption"]}),this.editCarOption=new r.default({tag:"div",classes:["option","editCarOption","disable"]}),this.observer=null,this.configView()}addObserver(t){this.observer=t}configView(){const t=new i.default(["btn"],"Create",(()=>this.handleNewCarCreation())),e=new i.default(["btn"],"Update",(()=>this.handleCarEditing())),n=new i.default(["btn"],"Generate Cars",(()=>{(0,o.isNotNull)(this.observer),this.observer.generateRandomCars()}));this.newCarOption.addChild([this.newCarInput,t]),this.editCarOption.addChild([this.editCarInput,e]),this.addChild([this.newCarOption,this.editCarOption,n])}handleNewCarCreation(){(0,o.isNotNull)(this.observer);const t=this.newCarInput.getText(),e=this.newCarInput.getColor();this.observer.addNewCar({name:t,color:e})}handleCarEditing(){(0,o.isNotNull)(this.observer);const t=this.editCarInput.getText(),e=this.editCarInput.getColor();this.observer.editCar({name:t,color:e})}setEditableValue(t,e){this.editCarInput.setText(t),this.editCarInput.setColor(e)}toggleInputsAccessibility(){this.editCarOption.getElement().classList.toggle("disable")}resetInputSettings(t){"new"===t&&this.newCarInput.reset(),"edit"===t&&this.editCarInput.reset()}}e.default=l},622:function(t,e,n){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=s(n(181)),i=s(n(203)),r=n(187);n(325);class o extends a.default{constructor(){super({tag:"div",classes:["raceOption"]}),this.observer=null,this.configView()}addObserver(t){this.observer=t}configView(){const t=new i.default(["btn","raceOptionBtn","startRace"],"start race",(t=>this.handleStartRace(t))),e=new i.default(["btn","raceOptionBtn","resetRace","disable"],"reset",(t=>this.handleResetRace(t)));this.addChild([t,e])}handleStartRace(t){(0,r.isNotNull)(t.target),(0,r.toggleBtn)(t.target),(0,r.isNotNull)(this.observer),this.observer.startRace()}handleResetRace(t){(0,r.isNotNull)(t.target),(0,r.toggleBtn)(t.target),(0,r.isNotNull)(this.observer),this.observer.resetRace()}}e.default=o},378:function(t,e,n){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=s(n(804)),i=s(n(676)),r=s(n(416)),o=s(n(181));class l extends a.default{constructor(){super({tag:"main",classes:["main"]}),this.garage=new r.default,this.winners=new i.default,this.child=[this.garage,this.winners],this.configView()}configView(){const t=new o.default({tag:"div",classes:["wrapper"]});t.addChild([this.garage.getViewElement(),this.winners.getViewElement()]),this.view.addChild([t])}getChild(){return this.child}}e.default=l},676:function(t,e,n){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=s(n(181)),i=s(n(804)),r=n(298),o=s(n(581)),l=n(187),c=s(n(626));n(723);class d extends i.default{constructor(){super({tag:"div",classes:["winners","hidden"]}),this.winInfo=[],this.pageNumber=1,this.pageLimit=7,this.winsCount=0,this.configView()}async configView(t=1){try{await this.getWinsInfo(t);const e=new a.default({tag:"p",classes:["title"],textContent:`Winners (${this.winsCount})`});this.view.removeChild(),this.view.addChild([e,this.addCarInTable()])}catch(t){t instanceof Error&&console.error(`Error fetching winners information:${t.message}`)}}async getWinsInfo(t){try{const e=await(0,r.getAllWinners)({page:t,limit:this.pageLimit});this.winInfo=e.info,(0,l.isNotNull)(this.winsCount),this.winsCount=e.membersCount}catch(t){if(t instanceof Error)throw new Error(`fetching cars information: ${t.message}`)}}addCarInTable(){const t=new o.default;return this.winInfo.forEach((async(e,n)=>{let s=n;const i=await(0,r.getCar)(e.id),o=new a.default({tag:"img",classes:["winCarImg"]});o.getElement().style.background=`url(${c.default})`,t.addRow([`${s+=1}`,o.getElement(),`${i.name}`,`${this.winInfo[n].wins}`,`${this.winInfo[n].time}`])})),t.getTable().classList.add("wintable"),t.getTable()}}e.default=d},581:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(){this.table=document.createElement("table"),this.thead=document.createElement("thead"),this.tbody=document.createElement("tbody"),this.table.appendChild(this.thead),this.table.appendChild(this.tbody),this.buildHeader()}buildHeader(){const t=document.createElement("tr");["#","Car","Name","Wins","Best time (sec)"].forEach((e=>{const n=document.createElement("th");n.textContent=e,t.appendChild(n)})),this.thead.appendChild(t)}addRow(t){const e=document.createElement("tr");t.forEach((t=>{const n=document.createElement("td");"string"==typeof t?n.textContent=t:n.appendChild(t),e.appendChild(n)})),this.tbody.appendChild(e)}getTable(){return this.table}}},286:function(t,e,n){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=s(n(181));n(315);class i extends a.default{constructor(){super({tag:"div",classes:["overlay"]})}buildModal(t,e){const n=new a.default({tag:"div",classes:["modal"]}),s=new a.default({tag:"span",classes:["modalText"],textContent:`The winner is ${t}`}),i=new a.default({tag:"span",classes:["modalText"],textContent:`The time is ${e}sec`});n.addChild([s,i]),this.addChild([n]),this.openModal(),setTimeout((()=>this.closeModal()),3e3)}openModal(){document.body.append(this.getElement())}closeModal(){this.getElement().remove()}}e.default=i},444:function(t,e,n){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=n(187),i=s(n(181)),r=s(n(203));n(557);class o extends i.default{constructor(){super({tag:"div",classes:["hidden","pagination"]}),this.prevBtn=new r.default(["paginationBtn","btn","disable"],"Prev",(()=>this.prevBtnCb())),this.nextBtn=new r.default(["paginationBtn","btn"],"next",(()=>this.nextBtnCb())),this.page=new i.default({tag:"span",classes:["paginationPage"],textContent:"1"}),this.totalPage=0,this.observer=null,this.currentPageNumber=1,this.addChild([this.prevBtn,this.page,this.nextBtn])}addObserver(t){this.observer=t}configView(){this.currentPageNumber>1?this.prevBtn.element.classList.remove("disable"):this.prevBtn.element.classList.add("disable"),this.currentPageNumber===this.totalPage?this.nextBtn.element.classList.add("disable"):this.nextBtn.element.classList.remove("disable"),this.page.setTextContent(`${this.currentPageNumber}`)}nextBtnCb(){(0,a.isNotNull)(this.observer),this.observer.updateContent(this.currentPageNumber+1),this.currentPageNumber+=1,this.page.setTextContent(`${this.currentPageNumber}`),this.configView()}prevBtnCb(){(0,a.isNotNull)(this.observer),this.observer.updateContent(this.currentPageNumber-1),this.currentPageNumber-=1,this.page.setTextContent(`${this.currentPageNumber}`),this.configView()}setTotalPageCount(t){this.totalPage=t}}e.default=o},804:function(t,e,n){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const a=s(n(181));e.default=class{constructor(t){this.view=new a.default({tag:t.tag,classes:t.classes,textContent:""})}getViewElement(){return this.view.getElement()}}},156:function(t,e,n){var s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),n(284);const a=s(n(514)),i=new(s(n(378)).default),r=new a.default(i);document.body.append(r.getViewElement(),i.getViewElement())},298:(t,e)=>{async function n(t){const e=await fetch("http://127.0.0.1:3000/winners/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(500===e.status){const t=await e.text();throw new Error(`${t}`)}return await e.json()}async function s(t){const e=await fetch(`http://127.0.0.1:3000/winners/${t.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({wins:t.wins,time:t.time})});return await e.json()}async function a(t){const e=await fetch(`http://127.0.0.1:3000/winners/${t}`),n=await e.json();if(404===e.status)throw new Error(`${e.statusText}`);return n}Object.defineProperty(e,"__esModule",{value:!0}),e.addWinner=e.getWinner=e.updateWinner=e.createWinner=e.switchToDriveMode=e.startStopEngine=e.updateCar=e.addCar=e.deleteCar=e.getCar=e.getAllWinners=e.getCars=void 0,e.getCars=async function(t){const e=`&_limit=${t.limit}`,n=`?_page=${t.page}`;try{const t=await fetch(`http://127.0.0.1:3000/garage${n}${e}`);return{info:await t.json(),membersCount:Number(t.headers.get("X-Total-Count"))}}catch(t){throw new Error(`${t}`)}},e.getAllWinners=async function(t){const e=`&_limit=${t.limit}`,n=`?_page=${t.page}`;try{const t=await fetch(`http://127.0.0.1:3000/winners${n}${e}`);return{info:await t.json(),membersCount:Number(t.headers.get("X-Total-Count"))}}catch(t){throw new Error(`${t}`)}},e.getCar=async function(t){const e=await fetch(`http://127.0.0.1:3000/garage/${t}`),n=await e.json();if(!e.ok)throw new Error(`${e.status}`);return n},e.deleteCar=async function(t){try{const e=await fetch(`http://127.0.0.1:3000/garage/${t}`,{method:"DELETE"});if(!e.ok)throw new Error(`${e.status}`)}catch(t){if(t instanceof Error)throw new Error(`${t.message}`)}},e.addCar=async function(t){const e=await fetch("http://127.0.0.1:3000/garage/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return await e.json()},e.updateCar=async function(t,e){const n=await fetch(`http://127.0.0.1:3000/garage/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!n.ok)throw new Error(`${n.status}`);return await n.json()},e.startStopEngine=async function(t,e){const n=await fetch(`http://127.0.0.1:3000/engine?id=${t}&status=${e}`,{method:"PATCH"});if(!n.ok){const t=await n.text();throw new Error(`${n.status}: ${t}`)}return await n.json()},e.switchToDriveMode=function(t,e){return fetch(`http://127.0.0.1:3000/engine?id=${t}&status=${e}`,{method:"PATCH"}).then((async t=>{if(!t.ok||200!==t.status){const e=await t.text();throw new Error(`HTTP error! status ${t.status}: ${e}`)}})).catch((t=>{throw new Error(`${t}`)}))},e.createWinner=n,e.updateWinner=s,e.getWinner=a,e.addWinner=async function(t){try{const e=await a(t.id),{id:n,wins:i}=e,{time:r}=t;s({id:n,wins:i+1,time:r})}catch(e){console.error(e),n(t)}}},187:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.getActiveBtns=e.getRandomCarInfo=e.dispatchBtnEvent=e.toggleBtn=e.isNotNullElement=e.isHTMLElement=e.isNotNull=void 0;const s=n(331);function a(t){if(null==t)throw new Error(`Not expected value: ${t}`)}function i(t){if(null==t||!(t instanceof HTMLElement))throw new Error(`Not expected value: ${t}`)}function r(){const t=Math.floor(Math.random()*s.carModels.length);return`${s.carBrands[t]} ${s.carModels[t]}`}function o(){let t="";for(let e=0;e<6;e+=1)t+="0123456789ABCDEF"[Math.floor(16*Math.random())];return`#${t}`}e.isNotNull=a,e.isHTMLElement=function(t){if(!(t instanceof HTMLElement))throw new Error("Expected value to be of type HTMLElement")},e.isNotNullElement=i,e.toggleBtn=function(t){let e;i(t),(t.classList.contains("startBtn")||t.classList.contains("startRace"))&&(e=t.nextElementSibling),(t.classList.contains("stopBtn")||t.classList.contains("resetRace"))&&(e=t.previousElementSibling),a(e),t.classList.add("disable"),e.classList.remove("disable")},e.dispatchBtnEvent=function(t,e){const n=t.getViewElement().querySelector(`.${e}`);a(n);const s=new Event("click");n.dispatchEvent(s)},e.getRandomCarInfo=function(){return{name:r(),color:o()}},e.getActiveBtns=function(){return Array.from(document.querySelectorAll(".btn")).filter((t=>!t.classList.contains("disable")))}},626:(t,e,n)=>{t.exports=n.p+"f52ac94bec1b2a4162d8.svg"},845:(t,e,n)=>{t.exports=n.p+"69e964dbc5e39b3664bb.png"}},e={};function n(s){var a=e[s];if(void 0!==a)return a.exports;var i=e[s]={exports:{}};return t[s].call(i.exports,i,i.exports,n),i.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;n.g.importScripts&&(t=n.g.location+"");var e=n.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var s=e.getElementsByTagName("script");if(s.length)for(var a=s.length-1;a>-1&&(!t||!/^http(s?):/.test(t));)t=s[a--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=t})(),n(156)})();
//# sourceMappingURL=bundle.js.map