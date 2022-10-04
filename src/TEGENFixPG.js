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

	// public members
	premiums;

	constructor(Options) {
		this.#options = {
			afterSelect : () => true, // function to run when a premium selection is made
			afterFix : () => true, // function to run after the premiums have been updated
		}

		// install optional callbacks
		jQuery.extend(true, this.#options, Options);

		// check for per-form custom options
		if (typeof TEGENFPGCustom !== 'undefined') jQuery.extend(true, this.#options, TEGENFPGCustom);

		this.#premiumGiftBlock = jQuery('div.en__component.en__component--premiumgiftblock');

		// if there's premiums
		if (this.#premiumGiftBlock.length > 0) {

			this.#observer = new MutationObserver(function() {
				// prevent infinite looping
				this.#observer.disconnect();
				// update premium gift options
				this.fixIt();
				// re-engage the observer
				this.#observer
				    .observe(
						    this.#premiumGiftBlock.find('.en__pgList')[0],
						    {
							    childList : true,
							    subtree   : false,
							    attributes: false,
						    }
				    );
			}.bind(this));

			// start the observation
			this.#observer
			    .observe(
					    this.#premiumGiftBlock.find('.en__pgList')[0],
					    {
						    childList : true,
						    subtree   : true
					    }
			    );
		} // end if there are premiums on the form
	} // end constructor

	get options() { return this.#options; }

	isVisible() {
		// the premium is "visible" if EN has populated a premium selection
		return this.#premiumGiftBlock.find('input[type="radio"]').eq(0).val() > 0
	}

	fixIt() {
		const pgList = this.#premiumGiftBlock.find('.en__pgList');
		this.premiums = pgList.find('input[name="en__pg"]');

		if (this.premiums.length > 0) {

			this.premiums
					.each(function(index) {
						jQuery(this)
								.attr('id', 'pgListOpt' + index);
					})
					.on('click keydown', (event) => this.#options.afterSelect.call(this, event));
			pgList
					.find('.en__pg')
					.each(function(index) {
						const thisPG = jQuery(this);
						thisPG.find('.en__pg__display, .en__pg__detail')
								.wrapAll('<label></label>')
								.parent()
								.attr('for', 'pgListOpt' + index);
						thisPG.find(`#pgListOpt${index}`).after(jQuery(`label[for="pgListOpt${index}"]`));
					});

			// run any custom formatting
			this.#options.afterFix.call(this);
			// catch the default selection with afterSelect()
			this.#options.afterSelect.call(this);
		} // end if there are premiums visible
	} // end fixIt()
} // end class TEGENFixPG
