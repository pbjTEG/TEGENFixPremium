/*
* TEG Engaging Networks Fix Premium Gifts
*
* Add label elements to EN's Premium Gifts.
*
* Author: PMG: The Engage Group, Paul B. Joiner <paulj@engageyourcause.com>
* Copyright (c) 2023 PMG: The Engage Group
* License MIT
*
* Release:
*   Branch: master
*   Tag:    v3
*   Date:   20230314
*/
class TEGENFixPG{#premiumGiftBlock;#observer;#options;#premiums=jQuery();#premiumOptions=jQuery();constructor(t){this.#options={afterSelect:()=>!0,afterFix:()=>!0,afterOptions:()=>!0,observerOptions:{childList:!0,subtree:!0,attributes:!1},autoSelect:!1,selectExclude:{0:"0"}},jQuery.extend(!0,this.#options,t),"undefined"!=typeof TEGENFPGCustom&&jQuery.extend(!0,this.#options,TEGENFPGCustom),this.#premiumGiftBlock=jQuery("div.en__component.en__component--premiumgiftblock"),0<this.#premiumGiftBlock.length&&(this.#observer=new MutationObserver(function(t,e){e.disconnect();let i=!1,s=!1;for(const o of t)"childList"===o.type&&(i=i||o.target.classList.contains("en__pg--selected")||o.target.classList.contains("en__pg__detail"),s=s||o.target.classList.contains("en__pg__optionType"));i&&this.fixIt(),s&&this.addOptions(),i||s||(this.#premiums=jQuery(),this.#premiumOptions=jQuery()),this.#observer.observe(this.#premiumGiftBlock.find(".en__pgList")[0],this.options.observerOptions)}.bind(this)),this.#observer.observe(this.#premiumGiftBlock.find(".en__pgList")[0],this.options.observerOptions),this.fixIt(),this.addOptions())}get options(){return this.#options}get premiumGiftBlock(){return this.#premiumGiftBlock}get premiums(){return this.#premiums}get premiumOptions(){return this.#premiumOptions}isVisible(){return 0<this.#premiumGiftBlock.find('input[type="radio"]').eq(0).val()}fixIt(){const e=this,t=e.#premiumGiftBlock.find(".en__pgList");e.#premiums=t.find('input[name="en__pg"]'),0<e.#premiums.length&&(e.#premiums.each(function(t){const e=jQuery(this);e.attr("id","pgListOpt"+t)}).off("click.ENPGFix keydonwn.ENPGFix").on("click.ENPGFix keydonwn.ENPGFix",t=>e.#options.afterSelect.call(this,t)),t.find(".en__pg").each(function(t){const e=jQuery(this),i=e.find(".en__pg__display, .en__pg__detail");i.unwrap("label"),i.wrapAll(`<label for="pgListOpt${t}"></label>`),e.find("#pgListOpt"+t).after(jQuery(`label[for="pgListOpt${t}"]`))}),e.#options.afterFix.call(e),e.#options.afterSelect.call(e))}addOptions(){const n=this;n.#premiumOptions=jQuery(),n.#premiums.each?.(function(t){const e=jQuery(this),i=e.val(),s="pgOptType"+i,o=e.parents(".en__pg").find("select").attr("id",s);o.siblings("label").attr("for",s),n.options.autoSelect&&o.off("change.ENPGFix").on("change.ENPGFix",()=>{void 0===n.options.selectExclude[i]||o.val()!==n.options.selectExclude[i]?setTimeout(()=>{n.premiums.filter(`[value="${i}"]`).prop("checked",!0).trigger("click")},200):void 0!==n.options.selectExclude[i]&&o.val()===n.options.selectExclude[i]&&setTimeout(()=>{n.premiums.prop("checked",!1).trigger("click")},200)}),0<n.#premiumOptions.length?n.#premiumOptions=n.#premiumOptions.add(o):n.#premiumOptions=o}),n.#options.afterOptions.call(n)}}
//# sourceMappingURL=TEGENFixPG.min.js.map