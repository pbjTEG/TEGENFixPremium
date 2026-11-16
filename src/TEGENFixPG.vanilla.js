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
	#premiums;
	#premiumOptions;

	constructor(Options) {
		const _instance = this;

		_instance.#options = {
			afterSelect    : () => true, // function to run when a premium selection is made
			afterFix       : () => true, // function to run after the premiums have been updated
			afterOptions   : () => true, // function to run after the premium options have been updated
			observerOptions: {
				childList : true,
				subtree   : true,
				attributes: false,
			},
			autoSelect     : false, // select the associated premium when a premium option is changed
		};

		// install optional callbacks
		Object.assign(_instance.#options, Options);

		// check for per-form custom options
		if (typeof TEGENFPGCustom !== 'undefined') Object.assign(_instance.#options, TEGENFPGCustom);

		_instance.#premiumGiftBlock = document.querySelector('div.en__component.en__component--premiumgiftblock');

		// if there's premiums
		if (_instance.#premiumGiftBlock) {

			this.#observer = new MutationObserver(function (mutationList, observer) {
				const fixer = this;

				// prevent infinite looping
				observer.disconnect();
				let newRadio  = false,
				    newSelect = false;

				// determine what changed
				for (const mutation of mutationList) {

					/*
					 * These might not get loaded in the order you expect so
					 * mutate them independently.
					 */
					if (mutation.type === 'childList') {
						// if we just got new premiums
						newRadio = newRadio || mutation.target.querySelectorAll('.en__pg__select').length > 0;
						newSelect = newSelect || mutation.target.querySelectorAll('.en__pg__optionTypes').length > 0;
					}
				}

				// update premium options
				if (newSelect) fixer.addOptions();
				// update premiums
				if (newRadio) fixer.fixIt();
				// otherwise clear both
				if (!(newRadio || newSelect)) {
					fixer.#premiums = null;
					fixer.#premiumOptions = null;
				}
				// re-engage the observer
				fixer.#observer
				    .observe(
					    fixer.#premiumGiftBlock.querySelector('.en__pgList'),
					    fixer.options.observerOptions
				    );
			}.bind(this));

			// start the observation loop
			_instance.#observer
			    .observe(
				    _instance.#premiumGiftBlock.querySelector('.en__pgList'),
				    _instance.options.observerOptions
			    );
			_instance.fixIt();
		} // end if there are premiums on the form
	} // end constructor

	get options() { return this.#options; }

	get premiumGiftBlock() { return this.#premiumGiftBlock; };

	get premiums() { return this.#premiums; }

	get premiumOptions() { return this.#premiumOptions; }

	isVisible() {
		// the premium is only "visible" if EN has populated a premium selection
		return this.#premiumGiftBlock.querySelectorAll('input[type="radio"]')[0].value > '0';
	}

	fixIt() {
		const fixer  = this,
		      pgList = fixer.#premiumGiftBlock.querySelector('.en__pgList');

		fixer.#premiums = pgList.querySelectorAll('input[name="en__pg"]');

		if (fixer.#premiums.length > 0) {

			fixer.#premiums
			     .forEach(function (item, index) {
				     item.setAttribute('id', 'pgItem' + index);

				     ['click.ENPGFix', 'keydonwn.ENPGFix'].forEach((eventType) => {
					     item.addEventListener(eventType, (event) => fixer.#options.afterSelect.call(this, event));
				     });
			     });

			pgList.querySelectorAll('.en__pg__body')
			      .forEach((thisPremium, index) => {
				      const labelContent = thisPremium.querySelectorAll('.en__pg__display, .en__pg__detail'),
				            newLabel     = document.createElement('label');

						thisPremium.querySelector('[name="en__pg"]').setAttribute('id', `pgItem${index}`);
				      newLabel.setAttribute('for', `pgItem${index}`);
				      thisPremium.appendChild(newLabel);

				      labelContent.forEach(labeledItem => { newLabel.appendChild(labeledItem); });
			      });

			// run any custom formatting
			fixer.#options.afterFix.call(fixer);
			// catch the default selection with afterSelect()
			fixer.#options.afterSelect.call(fixer);
		} // end if there are premiums visible
	} // end fixIt()

	addOptions() {
		const fixer = this;

		fixer.#premiumOptions = fixer.#premiumGiftBlock.querySelectorAll('select');

		fixer.#premiumOptions
		     .forEach(thisSelect => {
			     const thisBody  = thisSelect.closest('.en__pg__body'),
			           thisRadio = thisBody.querySelector('[name="en__pg"]'),
			           thisID    = `pgOptions${thisRadio.value}`;

			     thisSelect.setAttribute('id', thisID);
			     thisSelect.previousElementSibling.setAttribute('for', thisID);
			     thisBody.appendChild(thisSelect.closest('.en__pg__optionTypes'));

			     // auto-select premium when option changes
			     if (fixer.#options.autoSelect) {
				     thisSelect
					     .addEventListener('change.ENPGFix', () => {
						     setTimeout(() => {
							     thisRadio.removeAttribute('checked');
							     thisRadio.click();
						     }, 200);
					     });
			     } // end if autoSelect
		     });
		// catch the default selection
		fixer.#options.afterOptions.call(fixer);
	}
} // end class TEGENFixPG
