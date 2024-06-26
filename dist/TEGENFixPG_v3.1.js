/**
 * "Fix" Engaging Networks' premium gifts list so it
 * can be more easily customized and, you know, add
 * label elements for the radio buttons.
 */
class TEGENFixPG {
	// private members
	#premiumGiftBlock;
	#observer;
	#options;
	#premiums = jQuery();
	#premiumOptions = jQuery();

	constructor(Options) {
		this.#options = {
			afterSelect    : () => true, // function to run when a premium selection is made
			afterFix       : () => true, // function to run after the premiums have been updated
			afterOptions   : () => true, // function to run after the premium options have been updated
			observerOptions: {
				childList : true,
				subtree   : true,
				attributes: false,
			},
			autoSelect     : false, // select the associated premium when a premium option is changed

			/* If a select field of premium options includes an opt-out, de-select
			 * the associated premium.
			 *
			 * key = value of premium radio
			 * value = value of de-selection option
			 */
			selectExclude: {
				'0': '0'
			},
		}

		// install optional callbacks
		jQuery.extend(true, this.#options, Options);

		// check for per-form custom options
		if (typeof TEGENFPGCustom !== 'undefined') jQuery.extend(true, this.#options, TEGENFPGCustom);

		this.#premiumGiftBlock = jQuery('div.en__component.en__component--premiumgiftblock');

		// if there's premiums
		if (this.#premiumGiftBlock.length > 0) {

			this.#observer = new MutationObserver(function (mutationList, observer) {
				console.log('%c TEGENFixPG.#observer', 'font-weight: bold; color: yellow;');//log
				console.log('%c mutationList', 'font-weight: bold; color: white;');
				console.log(mutationList);//log
				// prevent infinite looping
				observer.disconnect();
				let newRadio  = false,
					 newSelect = false;

				// determine what changed
				for (const mutation of mutationList) {

					// if new child change
					if (mutation.type === 'childList') {
						// if we just got new premiums
						newRadio = newRadio || mutation.target.classList.contains('en__pg--selected') || mutation.target.classList.contains('en__pg__detail');
						// if we just got new options
						newSelect = newSelect || mutation.target.classList.contains('en__pg__optionType');
					}
				}
				// update premiums list
				if (newRadio) this.fixIt();
				// update options list
				if (newSelect) this.addOptions();
				// if we have neither then clear it
				if (!(newRadio || newSelect)) {
					this.#premiums = jQuery();
					this.#premiumOptions = jQuery();
				}
				// re-engage the observer
				this.#observer
					 .observe(
						 this.#premiumGiftBlock.find('.en__pgList')[0],
						 this.options.observerOptions
					 );
			}.bind(this));

			// start the observation
			this.#observer
				 .observe(
					 this.#premiumGiftBlock.find('.en__pgList')[0],
					 this.options.observerOptions
				 );
			this.fixIt();
			this.addOptions();
		} // end if there are premiums on the form
	} // end constructor

	get options() { return this.#options; }

	get premiumGiftBlock() { return this.#premiumGiftBlock };

	get premiums() { return this.#premiums }

	get premiumOptions() { return this.#premiumOptions }

	isVisible() {
		// the premium is only "visible" if EN has populated a premium selection
		return this.#premiumGiftBlock.find('input[type="radio"]').eq(0).val() > 0
	}

	fixIt() {
		const fixer  = this,
				pgList = fixer.#premiumGiftBlock.find('.en__pgList');
		fixer.#premiums = pgList.find('input[name="en__pg"]');

		if (fixer.#premiums.length > 0) {

			fixer.#premiums
				  .each(function (index) {
					  const thisRadio = jQuery(this);
					  thisRadio.attr('id', 'pgListOpt' + index);
				  })
				// make sure there's only one set
				  .off('click.ENPGFix keydonwn.ENPGFix')
				  .on('click.ENPGFix keydonwn.ENPGFix', (event) => fixer.#options.afterSelect.call(this, event));

			pgList
				.find('.en__pg')
				.each(function (index) {
					const thisPG       = jQuery(this),
							labelContent = thisPG.find('.en__pg__display, .en__pg__detail');
					// remove label from previous run
					labelContent.unwrap('label')
					// wrap the item in a label
					labelContent.wrapAll(`<label for="pgListOpt${index}"></label>`);
					// ensure label immediately follows the radio button
					thisPG.find(`#pgListOpt${index}`).after(jQuery(`label[for="pgListOpt${index}"]`));
				});

			// run any custom formatting
			fixer.#options.afterFix.call(fixer);
			// catch the default selection with afterSelect()
			fixer.#options.afterSelect.call(fixer);
		} // end if there are premiums visible
	} // end fixIt()

	addOptions() {
		const fixer = this;
		fixer.#premiumOptions = jQuery();
		fixer.#premiums
			  .each?.(function () {
			const thisRadio  = jQuery(this),
					radioVal   = thisRadio.val(),
					thisID     = `pgOptType${radioVal}`,
					thisSelect = thisRadio.parents('.en__pg')
												 .find('select')
												 .attr('id', thisID);
			thisSelect.siblings('label').attr('for', thisID);

			// auto-select premium when option changes
			if (fixer.options.autoSelect) {
				thisSelect
					// make sure there's only one
					.off('change.ENPGFix')
					.on('change.ENPGFix', () => {
						// TODO: Please, for the love of God, make this more efficient
						if (typeof fixer.options.selectExclude[radioVal] === 'undefined' ||
							 thisSelect.val() !== fixer.options.selectExclude[radioVal]) {
							setTimeout(() => {
								fixer.premiums
									  .filter(`[value="${radioVal}"]`)
									  .prop('checked', true)
									  .trigger('click');
							}, 200);
						} else {
							if (typeof fixer.options.selectExclude[radioVal] !== 'undefined' &&
								 thisSelect.val() === fixer.options.selectExclude[radioVal]) {
								setTimeout(() => {
									fixer.premiums
										  .prop('checked', false)
										  .trigger('click');
								}, 200);
							}
						}
					})
			} // end if autoSelect

			if (fixer.#premiumOptions.length > 0) {
				fixer.#premiumOptions = fixer.#premiumOptions.add(thisSelect);

			} else {
				fixer.#premiumOptions = thisSelect;
			}
		});
		// catch the default selection
		fixer.#options.afterOptions.call(fixer);
	}
} // end class TEGENFixPG
