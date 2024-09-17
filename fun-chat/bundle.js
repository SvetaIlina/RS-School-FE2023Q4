(()=>{"use strict";var e={692:(e,t,s)=>{s.r(t)},421:(e,t,s)=>{s.r(t)},189:(e,t,s)=>{s.r(t)},446:(e,t,s)=>{s.r(t)},80:(e,t,s)=>{s.r(t)},455:(e,t,s)=>{s.r(t)},747:(e,t,s)=>{s.r(t)},306:(e,t,s)=>{s.r(t)},483:(e,t,s)=>{s.r(t)},823:(e,t,s)=>{s.r(t)},738:(e,t,s)=>{s.r(t)},827:(e,t,s)=>{s.r(t)},315:(e,t,s)=>{s.r(t)},343:(e,t,s)=>{s.r(t)},581:(e,t,s)=>{s.r(t)},284:(e,t,s)=>{s.r(t)},675:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(904)),i=n(s(890)),o=n(s(875));t.default=class{constructor(e){this.model=new a.default,this.view=new o.default,this.controller=new i.default(e,this.model,this.view)}init(){this.controller.init()}}},904:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=s(187);t.default=class{constructor(){this.storageKey="myUser",this.dialog=null,this.contacts=null,this.currentContact=null,this.myUser=null,this.ActiveUser=[],this.inActiveUser=[],this.isLogined=!1}setMyUser(){sessionStorage.setItem(this.storageKey,JSON.stringify(this.myUser)),this.isLogined=!0}checkSavedUser(){return!!sessionStorage.getItem(this.storageKey)&&(this.isLogined=!0,this.myUser=this.getUser(),!0)}checkLogginedUser(){(0,n.isNotNull)(this.myUser);const e=this.ActiveUser;return-1!==(0,n.findUserIndex)(e,this.myUser)}getUser(){const e=sessionStorage.getItem(this.storageKey);return(0,n.isNotNull)(e),JSON.parse(e)}deleteUser(){this.myUser=null,this.isLogined=!1,sessionStorage.removeItem(this.storageKey)}getAllContact(){const e=[...this.ActiveUser,...this.inActiveUser];(0,n.isNotNull)(this.myUser);const t=(0,n.findUserIndex)(e,this.myUser);return-1!==t&&e.splice(t,1),e}changeContactStatus(e){if(e.isLogined){this.ActiveUser.push(e);const t=(0,n.findUserIndex)(this.inActiveUser,e);-1!==t&&this.inActiveUser.splice(t,1)}else{this.inActiveUser.push(e);const t=(0,n.findUserIndex)(this.ActiveUser,e);this.ActiveUser.splice(t,1)}}setCurrentContact(e){const t=this.getAllContact().find((t=>t.login===e));t&&(this.currentContact=t)}checkMessage(e){(0,n.isNotNull)(this.myUser);let t,s=e.from,a=!1;const i=new Date(e.datetime).toLocaleString("en-US");return s===this.myUser.login&&(s="you",a=!0),t=e.status.isDelivered?"delivered":"undelivered",{text:e.text,sender:s,date:i,isYour:a,deliveredStatus:t}}}},890:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(59)),i=s(187),o=s(505),l=n(s(111));t.default=class{constructor(e,t,s){this.model=t,this.view=s,this.view.subscribe(this),this.ws=new l.default(e,this.handleWebSocketOnopen.bind(this),this.handleWebSocketMessage.bind(this),this.handleWebSocketOnClose.bind(this)),this.router=new a.default(this,this.model)}init(){this.view.showModal(o.ConnectMessage.InProcess),this.ws.initWebSocket(),document.body.append(this.view.getElement())}handleWebSocketOnopen(e,t){this.goToPage(),this.view.showModal(t,e)}handleWebSocketOnClose(e,t){this.view.showModal(t,e)}handleWebSocketMessage(e){const t=JSON.parse(e.data),{type:s}=t;switch(s){case o.messageType.Login:this.model.setMyUser(),this.router.route(o.PageIds.MainPage);break;case o.messageType.Logout:this.model.deleteUser(),this.router.route(o.PageIds.LoginPage);break;case o.messageType.ActiveUser:{this.getUsers.call(this,o.messageType.InactiveUser);const e=(0,i.checkServerData)(t,"users");if(Array.isArray(e)){const t=e;this.model.ActiveUser=t}break}case o.messageType.InactiveUser:{const e=(0,i.checkServerData)(t,"users");if(Array.isArray(e)){const t=e;this.model.inActiveUser=t,(0,i.isNotNull)(this.model.myUser),this.authorizeUser(this.model.myUser)}break}case o.messageType.AnotherUserLogin:case o.messageType.AnotherUserLogout:{const e=(0,i.checkServerData)(t,"user");this.model.changeContactStatus(e);let s=!1;this.model.currentContact&&(s=this.model.currentContact.login===e.login),this.view.updateUserStatus(e,s);break}case o.messageType.SendMSG:{const e=(0,i.checkServerData)(t,"message"),s=this.model.checkMessage(e);if(this.model.currentContact){const t=this.model.currentContact.login;(0,i.isNotNull)(this.model.myUser),t===e.from||e.from===this.model.myUser.login?this.view.showMessage(s):this.view.setUnreadMessage(e.from)}else this.view.setUnreadMessage(e.from);break}case o.messageType.MsgHistory:{const e=(0,i.checkServerData)(t,"messages");Array.isArray(e)&&e.forEach((e=>{const t=this.model.checkMessage(e);this.view.showMessage(t)}));break}case o.messageType.Error:{const e=(0,i.checkServerData)(t,"error");"string"==typeof e&&this.view.showModal(e,this.ws.isOpen);break}default:console.log("nothing")}}update(e,t){switch(e){case o.customEvent.LogIn:{(0,i.isNotNull)(t);const e=JSON.parse(t);this.model.myUser=e,this.getUsers.call(this,o.messageType.ActiveUser);break}case o.customEvent.ShowInfoPage:this.router.route(o.PageIds.InfoPage);break;case o.customEvent.LogOut:this.userLogout();break;case o.customEvent.SelectContact:if(t){this.model.setCurrentContact(t),(0,i.isNotNull)(this.model.currentContact);const e={id:crypto.randomUUID(),type:o.messageType.MsgHistory,payload:{user:{login:t}}};this.ws.sendRequest(e),this.view.setUserContact(this.model.currentContact)}break;case o.customEvent.SendMes:if((0,i.isNotNull)(t),this.model.currentContact){const e={id:crypto.randomUUID(),type:o.messageType.SendMSG,payload:{message:{to:this.model.currentContact.login,text:t}}};this.ws.sendRequest(e)}break;default:console.log("nothing")}}displayContent(e){if(this.model.myUser){const t=this.model.myUser.login,s=this.model.getAllContact();this.view.createPage(e,t,s)}else this.view.createPage(e)}authorizeUser(e){if(this.model.checkLogginedUser()){const e="User is already authorize";this.model.myUser=null,this.view.showModal(e,this.ws.isOpen)}else{const t={id:crypto.randomUUID(),type:o.messageType.Login,payload:{user:{login:e.login,password:e.password}}};this.ws.sendRequest(t)}}getUsers(e){const t={id:crypto.randomUUID(),type:e,payload:null};this.ws.sendRequest(t)}userLogout(){const e=this.model.myUser;(0,i.isNotNull)(e);const t={id:crypto.randomUUID(),type:o.messageType.Logout,payload:{user:{login:e.login,password:e.password}}};this.ws.sendRequest(t)}goToPage(){this.model.checkSavedUser()?this.getUsers.call(this,o.messageType.ActiveUser):this.router.route(o.PageIds.LoginPage)}}},59:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=s(505);t.default=class{constructor(e,t){this.manager=e,this.chatData=t,window.addEventListener("hashchange",(()=>{this.locationHandler()})),this.currentPage=""}route(e){window.location.hash=e,this.locationHandler()}locationHandler(){const e=window.location.hash.slice(1),t=this.chatData.isLogined;if(!t&&e===n.PageIds.MainPage)return window.location.hash=n.PageIds.LoginPage,void alert("need log in");this.currentPage===n.PageIds.MainPage&&e===n.PageIds.LoginPage&&t&&(window.location.hash=n.PageIds.MainPage),this.manager.displayContent(e),this.currentPage=e}}},875:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(424)),i=n(s(300)),o=s(505),l=n(s(916)),r=n(s(587)),u=n(s(990)),c=s(187),d=n(s(555)),h=n(s(769));class g extends h.default{constructor(){super(),this.mainPage=null,this.modalIsOpen=!1,this.handleEvent([o.customEvent.SendMes,o.customEvent.LogOut,o.customEvent.ShowInfoPage,o.customEvent.SelectContact,o.customEvent.LogIn])}handleEvent(e){e.forEach((e=>{this.element.addEventListener(e,(t=>{this.notifyObservers(e,t.detail)}))}))}createPage(e,t,s){let n=null,u=null;e===o.PageIds.LoginPage?u=new a.default:e===o.PageIds.MainPage?((0,c.isNotNull)(t),(0,c.isNotNull)(s),this.mainPage=new r.default(t,s),u=this.mainPage):u=e===o.PageIds.InfoPage?new i.default:new l.default,n=u.getElement(),this.setContent(n)}setContent(e){this.removeChild(),e&&this.addChild([e])}showModal(e,t){if(this.modalIsOpen)this.replaceModal(e,t);else{const s=new u.default(`${e}`);s.openModal(),this.modalIsOpen=!0,this.closeThisModal(t,s)}}replaceModal(e,t){const s=document.querySelector(".overlay");(0,c.isNotNull)(s);const n=new u.default(`${e}`);s.replaceWith(n.getElement()),this.closeThisModal(t,n)}closeThisModal(e,t){e&&(this.modalIsOpen=!1,setTimeout((()=>t.closeModal()),1e3))}updateUserStatus(e,t){(0,c.isNotNull)(this.mainPage),this.mainPage.chat.contact.updateContact(e),t&&this.mainPage.chat.dialog.updateHeader(e.isLogined)}setUserContact(e){(0,c.isNotNull)(this.mainPage),this.mainPage.chat.dialog.updateDialog(e)}showMessage(e){(0,c.isNotNull)(this.mainPage);const t=new d.default(e);this.mainPage.chat.dialog.addMessage(t)}setUnreadMessage(e){(0,c.isNotNull)(this.mainPage),this.mainPage.chat.contact.displayUnreadMessage(e,"add")}}t.default=g},111:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=s(187),a=s(505);t.default=class{constructor(e,t,s,n){this.url=e,this.ws=null,this.isOpen=!1,this.onOpenCb=t,this.onCloseCb=n,this.onMessageCb=s,this.initWebSocket()}sendRequest(e){(0,n.isNotNull)(this.ws),this.ws.send(JSON.stringify(e))}initWebSocket(){this.ws=new WebSocket(this.url),this.ws.addEventListener("open",(()=>this.onOpen(this.onOpenCb))),this.ws.addEventListener("message",(e=>{this.onMessageCb(e)})),this.ws.addEventListener("close",(()=>{this.onClose(this.onCloseCb)}))}onClose(e){this.isOpen=!1,(0,n.isNotNull)(this.ws),this.ws.removeEventListener("open",(()=>this.onOpen(this.onOpenCb))),this.ws.removeEventListener("close",(()=>this.onClose(this.onCloseCb))),this.ws.removeEventListener("message",(e=>this.onMessageCb(e))),e(this.isOpen,a.ConnectMessage.InProcess),this.initWebSocket()}onOpen(e){this.isOpen=!0,1===this.ws?.readyState&&e(this.isOpen,a.ConnectMessage.Ready)}}},181:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});class s{constructor(e,t){this.element=document.createElement(e.tag),this.setElement(e),t&&this.addChild(t)}getElement(){return this.element}setElement(e){this.setStyles(e.classes),e.textContent&&this.setTextContent(e.textContent),e.attributes&&this.setAttributes(e.attributes)}addChild(e){e.forEach((e=>{e instanceof s?this.element.append(e.getElement()):this.element.append(e)}))}removeChild(){for(;this.element.firstChild;)this.element.firstChild.remove()}setStyles(e){e.forEach((e=>{e&&this.element.classList.add(e)}))}setAttributes(e){e.forEach((e=>{this.element.setAttribute(e.key,e.value)}))}setTextContent(e){this.element.textContent=e}setCallback(e,t){"function"==typeof e&&this.element.addEventListener(t,e)}}t.default=s},203:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(181));s(692);class i extends a.default{constructor(e,t,s,n){super({tag:"button",classes:e,textContent:t}),this.setCallback(s,"click"),this.setStyles(["btn"]),n&&this.setAttributes([{key:"type",value:`${n}`}])}}t.default=i},880:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(181)),i=n(s(276)),o=n(s(173));s(421);class l extends a.default{constructor(e){super({tag:"div",classes:["chat"]}),this.dialog=new o.default,this.contact=new i.default(e),this.addChild([this.contact,this.dialog])}}t.default=l},276:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(187),i=s(505),o=n(s(181));s(189);class l extends o.default{constructor(e){super({tag:"div",classes:["contacts"]}),this.searchInput=new o.default({tag:"input",classes:["contacts_search"],attributes:[{key:"placeholder",value:"Search..."}]}),this.contactList=new o.default({tag:"ul",classes:["contacts_list"]}),this.init(e),this.searchInput.setCallback((e=>(0,a.searchUser)(e,this.contactList.getElement())),"keyup"),this.contactList.setCallback((e=>this.contactListCallback(e)),"click")}init(e){this.drawContacts(e),this.addChild([this.searchInput,this.contactList])}contactListCallback(e){const t=(0,a.getSelectedContact)(e);this.displayUnreadMessage(t,"remove");const s=new CustomEvent(i.customEvent.SelectContact,{bubbles:!0,detail:t});this.contactList.getElement().dispatchEvent(s);const n=document.querySelector(".message_input");(0,a.isNotNull)(n),n.removeAttribute("disabled")}drawContacts(e){e.forEach((e=>{this.addNewContact(e)}))}addNewContact(e){const t=new o.default({tag:"li",classes:["list_item"],attributes:[{key:"id",value:`${e.login}`}]});e.isLogined&&t.setStyles(["active"]);const s=new o.default({tag:"span",classes:["list_item-name"],textContent:e.login}),n=new o.default({tag:"span",classes:["list_item-mes"],textContent:""});t.addChild([s,n]),this.contactList.addChild([t])}updateContact(e){const t=e.isLogined,s=document.getElementById(`${e.login}`);s?t?s.classList.add("active"):s.classList.remove("active"):this.addNewContact(e)}displayUnreadMessage(e,t){(0,a.isNotNull)(this.contactList);const s=document.getElementById(`${e}`);(0,a.isNotNull)(s);const n=s.querySelector(".list_item-mes");(0,a.isNotNull)(n);let i=Number(n.textContent);"add"===t&&(n.textContent=`${i+=1}`),"remove"===t&&(n.textContent=null)}}t.default=l},75:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(505),i=n(s(181));s(446);class o extends i.default{constructor(){super({tag:"div",classes:["dialog_header"]}),this.userName=new i.default({tag:"span",classes:["dialog_header-name"]}),this.userStatus=new i.default({tag:"span",classes:["dialog_header-status"]}),this.addChild([this.userName,this.userStatus])}setUserValue(e){this.userName.setTextContent(e.login),this.updateUserStatus(e.isLogined)}updateUserStatus(e){let t;e?(t=a.userStatus.OnLine,this.setStyles(["active"])):(t=a.userStatus.OffLine,this.getElement().classList.remove("active")),this.userStatus.setTextContent(t)}}t.default=o},173:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(181)),i=n(s(75));s(80);const o=n(s(926)),l=n(s(962));class r extends a.default{constructor(){super({tag:"div",classes:["dialog"]}),this.header=new i.default,this.messages=new l.default,this.messageInput=new o.default,this.addChild([this.header,this.messages,this.messageInput])}updateDialog(e){this.header.setUserValue(e),this.messages.init()}updateHeader(e){this.header.updateUserStatus(e)}addMessage(e){this.messages.element.querySelector(".description")&&this.messages.removeChild(),this.messages.addChild([e])}}t.default=r},926:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(187),i=s(505),o=n(s(181)),l=n(s(203));s(455);class r extends o.default{constructor(){super({tag:"div",classes:["dialog_input"]}),this.messageInput=new o.default({tag:"input",classes:["message_input"],attributes:[{key:"placeholder",value:"message..."},{key:"disabled",value:"true"}]}),this.sendBtn=new l.default(["send_btn","inactive"],"send",(e=>this.sendedMessage(e))),this.messageInput.setCallback((e=>this.handleInputCallback(e)),"keyup"),this.addChild([this.messageInput,this.sendBtn])}handleInputCallback(e){e instanceof KeyboardEvent&&(13===e.keyCode?this.sendedMessage(e):this.enableBtn())}sendedMessage(e){const{target:t}=e;let s="";if((0,a.isNotNullElement)(t),t.classList.contains("send_btn")?s=this.messageInput.getElement().value:t.classList.contains("message_input")&&t instanceof HTMLInputElement&&(s=t.value),s){const e=new CustomEvent(i.customEvent.SendMes,{bubbles:!0,detail:s});t.dispatchEvent(e)}this.resetInput()}resetInput(){this.messageInput.getElement().value="",this.sendBtn.getElement().classList.add("inactive")}enableBtn(){const e=this.messageInput.getElement(),t=this.sendBtn.getElement();e.value?t.classList.remove("inactive"):t.classList.add("inactive")}}t.default=r},962:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(181));s(747);class i extends a.default{constructor(){super({tag:"div",classes:["message-container"]}),this.init()}init(){this.removeChild();const e=new a.default({tag:"p",classes:["description"],textContent:"Select the user to send the message to..."});this.addChild([e])}}t.default=i},555:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(181));s(306);class i extends a.default{constructor(e){super({tag:"div",classes:["message-wrapper"]}),this.messageContent=e.text,this.messageDataTime=e.date,this.sender=e.sender,this.status=e.deliveredStatus,this.isMyMessage=e.isYour,this.drawMessage(this.sender,this.messageDataTime,this.messageContent,this.status)}drawMessage(e,t,s,n){const i=new a.default({tag:"div",classes:["message"]}),o=new a.default({tag:"div",classes:["message_header"]}),l=new a.default({tag:"span",classes:["message_header-item"],textContent:`${e}`}),r=new a.default({tag:"span",classes:["message_header-item"],textContent:`${t}`});o.addChild([l,r]);const u=new a.default({tag:"div",classes:["message_content"],textContent:`${s}`}),c=new a.default({tag:"div",classes:["message_footer"]});this.isMyMessage&&(this.setStyles(["myMessage"]),c.setTextContent(`${n}`)),i.addChild([o,u,c]),this.addChild([i])}}t.default=i},42:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(181));s(483);const i=n(s(72)),o=n(s(679));class l extends a.default{constructor(){super({tag:"footer",classes:["footer"]}),this.configView()}configView(){const e=new a.default({tag:"img",classes:["footer_img"],attributes:[{key:"src",value:`${i.default}`}]}),t=new a.default({tag:"span",classes:["footer_item"],textContent:"2024"}),s=new o.default;this.addChild([e,s,t])}}t.default=l},514:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(187),i=s(505),o=n(s(181)),l=n(s(203));s(823);class r extends o.default{constructor(e,t){super({tag:"header",classes:["header"]}),this.userName=e,this.appName=t,this.logOutBtn=new l.default(["header_btn"],"Log Out",this.logOutCallback.bind(this)),this.infoBtn=new l.default(["header_btn"],"About",(()=>(0,a.infoCallback)(this.getElement()))),this.configView()}configView(){const e=new o.default({tag:"div",classes:["btnWrapper"]});e.addChild([this.infoBtn,this.logOutBtn]);const t=new o.default({tag:"span",classes:["header_item"],textContent:`User : ${this.userName}`}),s=new o.default({tag:"span",classes:["header_item"],textContent:`${this.appName}`});this.addChild([t,s,e])}logOutCallback(){const e=new CustomEvent(i.customEvent.LogOut,{bubbles:!0});this.logOutBtn.getElement().dispatchEvent(e)}}t.default=r},292:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=s(187),i=n(s(181));s(827);class o extends i.default{constructor(e,t,s,n,a,o){super({tag:"div",classes:["inputContainer"]}),this.input=new i.default({tag:"input",classes:["inputField"],attributes:[{key:"required",value:""},{key:"type",value:`${n}`},{key:"minlength",value:`${t}`},{key:"name",value:`${s}`}]}),this.input.setCallback((()=>this.setValidMessage(a,o)),"input"),this.label=new i.default({tag:"label",classes:["labelField"],textContent:e}),this.addChild([this.label,this.input])}setValidMessage(e,t){const s=this.input.getElement(),n=s.getAttribute("minlength");s.validity.tooShort?s.setCustomValidity(`Minimum length for the field must be ${n} symbols `):s.setCustomValidity(""),e&&t&&(e.test(s.value)||s.setCustomValidity(`${t}`)),s.reportValidity()}clear(){this.input.getElement().value=""}getInputValue(){const e=this.input.element.getAttribute("name"),{value:t}=this.input.element;return(0,a.isNotNull)(e),{[e]:t}}}t.default=o},162:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(181));s(738);class i extends a.default{constructor(e,t){super({tag:"form",classes:["formContainer","invalid"],attributes:[{key:"autocomplete",value:"off"}]}),this.inputs=e,this.buttons=t,this.setIputsCallback(),this.addChild([...this.inputs,...this.buttons]),this.setCallback((e=>this.formPreventDefault(e)),"keypress")}formPreventDefault(e){e instanceof KeyboardEvent&&13===e.keyCode&&this.element.classList.contains("invalid")&&e.preventDefault()}setIputsCallback(){this.inputs.forEach((e=>e.element.addEventListener("input",(()=>this.checkValid()))))}checkValid(){const e=this.element;e.checkValidity()?e.classList.remove("invalid"):e.classList.add("invalid")}removeInputValues(){this.inputs.forEach((e=>e.clear()))}getInputValues(){return this.inputs.map((e=>e.getInputValue()))}}t.default=i},990:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(181));s(315);class i extends a.default{constructor(e){super({tag:"div",classes:["overlay"]}),this.content=e,this.buildModal(this.content)}buildModal(e){const t=new a.default({tag:"div",classes:["modal"]}),s=new a.default({tag:"span",classes:["modalText"],textContent:`${e}`});t.addChild([s]),this.addChild([t])}openModal(){document.body.append(this.getElement())}closeModal(){this.getElement().remove()}}t.default=i},679:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(181));class i extends a.default{constructor(){super({tag:"a",classes:["infoLink"],textContent:"Author Svetlana Ilina",attributes:[{key:"href",value:"https://github.com/SvetaIlina"}]})}}t.default=i},156:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(675));s(284),new a.default("wss://fun-chat-server-production-83cf.up.railway.app").init()},769:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(181));s(581);class i extends a.default{constructor(){super({tag:"main",classes:["main"]}),this.observers=[]}subscribe(e){this.observers.push(e)}notifyObservers(e,t){this.observers.forEach((s=>{s.update(e,t)}))}getPageElement(){return this.getElement()}}t.default=i},300:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(181)),i=n(s(203));s(343);const o=n(s(679));class l extends a.default{constructor(){super({tag:"div",classes:["page"]}),this.configView()}configView(){const e=new a.default({tag:"div",classes:["infoWrapper"]}),t=new a.default({tag:"h1",classes:["infoTitle"],textContent:"Fun Chat"}),s=new a.default({tag:"p",classes:["infoText"],textContent:"Welcome to the chat room! This chat room has been created as part of the RSSchool JS/FE 2023Q3 course. Here you can chat with other users, send messages, and share your thoughts. Please remember that this is a learning project and we value your participation and feedback. Enjoy your conversations!"}),n=new i.default(["backBtn"],"Back",(()=>{window.history.back()}));e.addChild([t,s,new o.default,n]),this.addChild([e])}}t.default=l},424:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(162)),i=n(s(203)),o=n(s(292)),l=s(505),r=s(187),u=n(s(181));class c extends u.default{constructor(){super({tag:"div",classes:["page"]}),this.form=this.createForm(),this.addChild([this.form])}createForm(){const e=new i.default(["form_btn","login-btn"],"Login",(e=>{e.preventDefault(),this.loginCallback(e)}),"submit"),t=new i.default(["form_btn"],"About",(e=>{e.preventDefault(),(0,r.infoCallback)(this.getElement())})),s=new o.default("User name",3,"login","text"),n=new o.default("Password",6,"password","password",/^(?=.*[0-9])(?=.*[A-Z]).+$/,"Password must contain at least one capital letter and a digit");return new a.default([s,n],[e,t])}loginCallback(e){const t=e.target,s=this.getUser(),n=new CustomEvent(l.customEvent.LogIn,{bubbles:!0,detail:s});(0,r.isNotNull)(t),t.dispatchEvent(n)}clear(){this.form.removeInputValues()}getUser(){const e=this.form.getInputValues().reduce(((e,t)=>({...e,...t})),{});return JSON.stringify(e)}}t.default=c},587:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(181)),i=n(s(880)),o=n(s(42)),l=n(s(514));class r extends a.default{constructor(e,t){super({tag:"div",classes:["page"]}),this.header=new l.default(`${e}`,"fun Chat"),this.footer=new o.default,this.chat=new i.default(t),this.addChild([this.header,this.chat,this.footer])}}t.default=r},916:function(e,t,s){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(s(181)),i=n(s(769));class o extends i.default{constructor(){super(),this.configView()}configView(){const e=new a.default({tag:"div",classes:["infoWrapper"]}),t=new a.default({tag:"h1",classes:["infoTitle"],textContent:"Page not Found"});e.addChild([t]),this.addChild([e])}}t.default=o},187:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.infoCallback=t.findUserIndex=t.getSelectedContact=t.checkServerData=t.searchUser=t.isNotNullElement=t.isNotNull=void 0;const n=s(505);function a(e){if(null==e)throw new Error(`Not expected value: ${e}`)}function i(e){if(null==e||!(e instanceof HTMLElement))throw new Error(`Not expected value: ${e}`)}t.isNotNull=a,t.isNotNullElement=i,t.searchUser=function(e,t){const s=e.target;i(s);const{value:n}=s;Array.from(t.children).forEach((e=>{if(e instanceof HTMLElement){const t=e.textContent,s=e;a(t),t.match(n)?s.style.display="block":s.style.display="none"}}))},t.checkServerData=function(e,t){a(e.payload);const{payload:s}=e;return"users"in s&&"users"===t?s.users:"user"in s&&"user"===t?s.user:"messages"in s&&"messages"===t?s.messages:"message"in s&&"message"===t?s.message:"error"in s&&"error"===t?s.error:null},t.getSelectedContact=function(e){let t;const{target:s}=e;if(i(s),s.classList.contains("list_item-name"))a(s.textContent),t=s.textContent;else if(s.classList.contains("list_item")){const e=s.firstChild;a(e),a(e.textContent),t=e.textContent}else t="";return t},t.findUserIndex=function(e,t){const s=t.login;return e.findIndex((e=>e.login===s))},t.infoCallback=function(e){const t=new CustomEvent(n.customEvent.ShowInfoPage,{bubbles:!0});e.dispatchEvent(t)}},505:(e,t)=>{var s,n,a,i,o;Object.defineProperty(t,"__esModule",{value:!0}),t.customEvent=t.messageType=t.userStatus=t.ConnectMessage=t.PageIds=void 0,function(e){e.LoginPage="login-page",e.MainPage="main-page",e.InfoPage="info-page"}(s||(t.PageIds=s={})),function(e){e.InProcess="Connecting...",e.Ready="Connect"}(n||(t.ConnectMessage=n={})),function(e){e.OnLine="On Line",e.OffLine="Off Line"}(a||(t.userStatus=a={})),function(e){e.Login="USER_LOGIN",e.Error="ERROR",e.Logout="USER_LOGOUT",e.AnotherUserLogin="USER_EXTERNAL_LOGIN",e.AnotherUserLogout="USER_EXTERNAL_LOGOUT",e.ActiveUser="USER_ACTIVE",e.InactiveUser="USER_INACTIVE",e.SendMSG="MSG_SEND",e.MsgHistory="MSG_FROM_USER",e.MsgDelivered="MSG_DELIVER",e.MsgRead="MSG_READ",e.MsgDelete="MSG_DELETE",e.MsgEdit="MSG_EDIT"}(i||(t.messageType=i={})),function(e){e.LogIn="login",e.LogOut="logout",e.SelectContact="contactSelected",e.SendMes="sendMessage",e.ShowInfoPage="showInfo"}(o||(t.customEvent=o={}))},72:(e,t,s)=>{e.exports=s.p+"ad178c0df28bc133be34.svg"}},t={};function s(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,s),i.exports}s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;s.g.importScripts&&(e=s.g.location+"");var t=s.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");if(n.length)for(var a=n.length-1;a>-1&&(!e||!/^http(s?):/.test(e));)e=n[a--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=e})(),s(156)})();
//# sourceMappingURL=bundle.js.map