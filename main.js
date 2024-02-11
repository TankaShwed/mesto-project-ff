(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),e.classList.remove("popup_is-animated"),document.addEventListener("keydown",o)}function t(e){e.classList.add("popup_is-animated"),e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function n(e){e.target.classList.contains("popup")&&t(e.currentTarget)}function o(e){"Escape"==e.code&&t(document.querySelector(".popup_is-opened"))}var r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-5",headers:{authorization:"dd2287e8-e249-46eb-befd-737a64b52f05","Content-Type":"application/json"}};function c(e,t,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),u=c.querySelector(".card__delete-button"),a=c.querySelector(".card__like-button"),i=c.querySelector(".card__image"),s=c.querySelector(".card__likeCount");return c.querySelector(".card__title").textContent=e.name,i.src=e.link,i.alt=e.name,c.setAttribute("data-cardid",e._id),s.textContent=e.likes.length,e.likes.some((function(e){return e._id==r}))&&a.classList.add("card__like-button_is-active"),e.owner._id!==r&&(u.style.display="none"),u.addEventListener("click",(function(){n(e._id)})),i.addEventListener("click",(function(){o(e.link,e.name)})),a.addEventListener("click",(function(){t(a,e._id,s)})),c}function u(e,t,n){e.classList.toggle("card__like-button_is-active"),e.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{headers:r.headers,method:"PUT"}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t).then((function(e){console.log(e),n.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(r.baseUrl,"/cards/likes/").concat(e),{headers:r.headers,method:"DELETE"}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t).then((function(e){console.log(e),n.textContent=e.likes.length})).catch((function(e){console.log(e)}))}function a(t){var n=document.querySelector(".popup_type_delete-card");n.setAttribute("data-cardid",t),e(n)}var i=function(e,t,n){var o=t.querySelector(".".concat(n.id,"-error"));n.classList.remove(e.inputErrorClass),o.classList.remove(e.errorClass),o.textContent=""};function s(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector));n.forEach((function(n){i(e,t,n)})),p(e,n,t.querySelector(e.submitButtonSelector))}function p(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.classList.remove(e.inactiveButtonClass),n.removeAttribute("disabled")):(n.classList.add(e.inactiveButtonClass),n.setAttribute("disabled",""))}var l=document.querySelector(".content"),d=l.querySelector(".places__list"),_=l.querySelector(".profile__edit-button"),f=document.querySelector(".popup_type_edit"),m=document.querySelector(".profile__image"),y=document.querySelector(".profile__title"),v=document.querySelector(".profile__description"),h=document.querySelector(".popup__form"),S=document.querySelector(".popup__input_type_name"),q=document.querySelector(".popup__input_type_description"),b=document.querySelector(".popup__close"),k=document.querySelector(".popup_type_new-card .popup__form"),L=document.querySelector(".popup__input_type_card-name"),E=document.querySelector(".popup__input_type_url"),C=document.querySelector(".popup_type_image"),g=l.querySelector(".profile__add-button"),x=document.querySelector(".popup_type_new-card"),j=document.querySelector(".popup_type_new-card .popup__close"),A=document.querySelector(".popup_type_image .popup__close"),P=document.querySelector(".popup_type_delete-card"),U=document.querySelector(".popup_type_delete-card .popup__form"),w=document.querySelector(".popup_type_delete-card .popup__close"),T=document.querySelector(".popup_type_update-avatar"),B=document.querySelector(".popup_type_update-avatar .popup__close"),D=document.querySelector(".popup_type_update-avatar .popup__form"),M=document.querySelector(".popup_type_update-avatar .popup__input_type_url"),N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"};function O(t,n){e(C),C.querySelector(".popup__image").src=t,C.querySelector(".popup__caption").textContent=n}_.addEventListener("click",(function(){S.value=y.textContent,q.value=v.textContent,s(N,h),e(f)})),b.addEventListener("click",(function(){t(f)})),f.addEventListener("click",n),h.addEventListener("submit",(function(e){var n,o;e.preventDefault(),y.textContent=S.value,v.textContent=q.value,t(f),f.querySelector(".popup__button").textContent="Сохранение...",(n=S.value,o=q.value,fetch("".concat(r.baseUrl,"/users/me"),{headers:r.headers,method:"PATCH",body:JSON.stringify({name:n,about:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){t(f),f.querySelector(".popup__button").textContent="Сохранить"})).catch((function(e){console.log(e)}))})),k.addEventListener("submit",(function(e){var n={name:L.value,link:E.value};e.preventDefault(),k.querySelector(".popup__button").textContent="Сохранение...",function(e){return fetch("".concat(r.baseUrl,"/cards"),{headers:r.headers,method:"POST",body:JSON.stringify(e)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n).then((function(e){t(x),k.reset(),k.querySelector(".popup__button").textContent="Сохранить",d.prepend(c(e,u,a,O,e.owner._id))})).catch((function(e){console.log(e)}))})),g.addEventListener("click",(function(){k.reset(),s(N,k),e(x)})),x.addEventListener("click",n),j.addEventListener("click",(function(){t(x)})),C.addEventListener("click",n),A.addEventListener("click",(function(){t(C)})),P.addEventListener("click",n),w.addEventListener("click",(function(){t(P)})),U.addEventListener("submit",(function(){var e=P.dataset.cardid;(function(e,t){return e.remove(),function(e){return fetch("".concat(r.baseUrl,"/cards/").concat(e),{headers:r.headers,method:"DELETE"})}(t)})(document.querySelector("[data-cardid='"+e+"']"),e).then((function(){t(P)}))})),m.addEventListener("click",(function(){e(T)})),B.addEventListener("click",(function(){t(T)})),T.addEventListener("click",n),D.addEventListener("submit",(function(){var e;D.querySelector(".popup__button").textContent="Сохранение...",(e=M.value,fetch("".concat(r.baseUrl,"/users/me/avatar"),{headers:r.headers,method:"PATCH",body:JSON.stringify({avatar:e})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){m.style.backgroundImage="url('"+e.avatar+"')",t(T),T.querySelector(".popup__button").textContent="Сохранить"})).catch((function(e){console.log(e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);p(e,n,o),n.forEach((function(r){r.addEventListener("input",(function(){(function(e,t,n){if(n.validity.valid)i(e,t,n);else{var o=n.validationMessage;n.validity.valueMissing?o="Вы пропустили это поле.":n.validity.patternMismatch?o="Поле может содержать только латинские и кириллические буквы, знаки дефиса и пробелы.":n.validity.typeMismatch&&(o="Введите адрес сайта."),function(e,t,n,o){var r=t.querySelector(".".concat(n.id,"-error"));n.classList.add(e.inputErrorClass),r.textContent=o,r.classList.add(e.errorClass)}(e,t,n,o)}})(e,t,r),p(e,n,o)}))}))}(e,t)}))}(N),Promise.all([fetch("".concat(r.baseUrl,"/users/me"),{headers:r.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(r.baseUrl,"/cards"),{headers:r.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t=e[0],n=e[1];y.textContent=t.name,v.textContent=t.about,m.style.backgroundImage="url('"+t.avatar+"')",n.forEach((function(e){d.append(c(e,u,a,O,t._id))}))})).catch((function(e){console.log(e)}))})();