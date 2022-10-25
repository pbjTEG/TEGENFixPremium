/*
* TEG Engaging Networks Fix Premium Gifts
*
* Add label elements to EN's Premium Gifts.
*
* Author: PMG: The Engage Group, Paul B. Joiner <paulj@engageyourcause.com>
* Copyright (c) 2022 PMG: The Engage Group
* License 
*
* Release:
*   Branch: master
*   Tag:    v2.3
*   Date:   20221025
*/
class TEGENFixPG{#premiumGiftBlock;#observer;#options;#premiums=[];#premiumOptions=[];constructor(t){this.#options={afterSelect:()=>!0,afterFix:()=>!0,afterOptions:()=>!0,observerOptions:{childList:!0,subtree:!0,attributes:!1}},jQuery.extend(!0,this.#options,t),"undefined"!=typeof TEGENFPGCustom&&jQuery.extend(!0,this.#options,TEGENFPGCustom),this.#premiumGiftBlock=jQuery("div.en__component.en__component--premiumgiftblock"),0<this.#premiumGiftBlock.length&&(this.#observer=new MutationObserver(function(t,i){i.disconnect();let e=!1,s=!1;for(const n of t)"childList"===n.type&&(e=e||n.target.classList.contains("en__pg--selected"),s=s||n.target.classList.contains("en__pg__optionType"));e&&this.fixIt(),s&&this.addOptions(),e||s||(this.#premiums=[],this.#premiumOptions=[]),this.#observer.observe(this.#premiumGiftBlock.find(".en__pgList")[0],this.options.observerOptions)}.bind(this)),this.#observer.observe(this.#premiumGiftBlock.find(".en__pgList")[0],this.options.observerOptions),this.fixIt(),this.addOptions())}get options(){return this.#options}get premiumGiftBlock(){return this.#premiumGiftBlock}get premiums(){return this.#premiums}get premiumOptions(){return this.#premiumOptions}isVisible(){return 0<this.#premiumGiftBlock.find('input[type="radio"]').eq(0).val()}fixIt(){const i=this,t=i.#premiumGiftBlock.find(".en__pgList");i.#premiums=t.find('input[name="en__pg"]'),0<i.#premiums.length&&(i.#premiums.each(function(t){const i=jQuery(this);i.attr("id","pgListOpt"+t)}).on("click keydown",t=>i.#options.afterSelect.call(this,t)),t.find(".en__pg").each(function(t){const i=jQuery(this),e=i.find(".en__pg__display, .en__pg__detail");e.unwrap("label"),e.wrapAll(`<label for="pgListOpt${t}"></label>`),i.find("#pgListOpt"+t).after(jQuery(`label[for="pgListOpt${t}"]`))}),i.#options.afterFix.call(i),i.#options.afterSelect.call(i))}addOptions(){const n=this;n.#premiumOptions=[],n.#premiums.each?.(function(t){const i=jQuery(this),e="pgOptType"+i.val(),s=i.parents(".en__pg").find("select").attr("id",e);s.siblings("label").attr("for",e),0<n.#premiumOptions.length?n.#premiumOptions.add(s):n.#premiumOptions=s}),n.#options.afterOptions.call(n)}}
//# sourceMappingURL=TEGENFixPG.min.js.map