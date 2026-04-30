// noinspection JSJQueryEfficiency
jQuery(document).ready(() => {

	describe('TEG EN Premium Fix', () => {
		it('should initialize', () => {
			expect(typeof TEGENPGFixed).toBe('object');
		}); // end it('should do something')

		it("should not block EN's base functions", async () => {
			jQuery('#en__field_transaction_recurrfreq1').click();
			jQuery('#en__field_transaction_recurrfreq0').click();
			jQuery('input[name="transaction.donationAmt"]').eq(1).click();
			jQuery('input[value="Other"][name="transaction.donationAmt"]').click();
			await TEGENPGFixed.fixIt.call(TEGENPGFixed);
			expect(jQuery('input[name="en__pg"]').length).toEqual(0);
			/*jQuery('input[value="20"][name="transaction.donationAmt"]').click();
			await TEGENPGFixed.fixIt.call(TEGENPGFixed);
			expect(jQuery('input[name="en__pg"]').length).toEqual(4);*/
		}, 10000); // end it('should not block EN's base functions')

		it('should create labels', () => {
			jQuery('#en__field_transaction_recurrfreq1').click();
			jQuery('#en__field_transaction_recurrfreq2').click();
			jQuery('input[value="75"][name="transaction.donationAmt"]').click();
			jQuery('input[name="en__pg"]').prop('checked', false);
			jQuery('label[for="pgListOpt1"]').click();
			expect(jQuery('input[name="en__pg"]:checked').val()).toEqual(jQuery('#pgListOpt1').val());
			jQuery('input[name="en__pg"]').prop('checked', false);
			jQuery('label[for="pgListOpt0"]').click();
			expect(jQuery('input[name="en__pg"]:checked').val()).toEqual(jQuery('#pgListOpt0').val());
		}, 10000); // end it('should create labels')

		it('should tell whether the premiums are available', () => {
			jQuery('#en__field_transaction_recurrfreq1').click();
			jQuery('#en__field_transaction_recurrfreq0').click();
			jQuery('input[value="30"][name="transaction.donationAmt"]').click();
			expect(TEGENPGFixed.isVisible()).toBeTrue();
			jQuery('input[value="Other"][name="transaction.donationAmt"]').click();
			jQuery('[name="transaction.donationAmt.other"]').val('').change();
			expect(TEGENPGFixed.isVisible()).toBeFalse();
		}, 10000); // end it('should tell whether the premiums are available')

		it('should expose a jQuery object containing the premium options', async () => {
			jQuery('#en__field_transaction_recurrfreq0').click();
			jQuery('#en__field_transaction_recurrfreq1').click();
			jQuery('input[value="140"][name="transaction.donationAmt"]').click();
			await TEGENPGFixed.fixIt.call(TEGENPGFixed);
			expect(TEGENPGFixed.premiums.length).toBe(4);
		}, 10000); // end it('should expose a jQuery object containing the premium options')

		describe('should accept and run callbacks', () => {
			beforeAll(() => {
				spyOn(window.TEGENPGFixed.options, 'afterFix').and.callThrough();
				spyOn(window.TEGENPGFixed.options, 'afterSelect').and.callThrough();
				spyOn(window.TEGENPGFixed.options, 'afterOptions').and.callThrough();
			});

			describe('afterFix()', () => {
				it('should be function defined by the options', () => {
					expect(window.TEGENPGFixed.options.afterFix()).toBe('TEGENFixPG.options.afterFix() run.');
				});

				it('should run ', () => {
					jQuery('#en__field_transaction_recurrfreq0').click();
					jQuery('#en__field_transaction_recurrfreq2').click();
					jQuery('input[value="Other"][name="transaction.donationAmt"]').click();
					jQuery('[name="transaction.donationAmt.other"]').val('').change();
					expect(window.TEGENPGFixed.options.afterFix).toHaveBeenCalled();
				});
			})

			describe('afterSelect()', () => {
				it('should be function defined by the TEGENFPGCustom object', () => {
					expect(window.TEGENPGFixed.options.afterSelect()).toBe('TEGENFPGCustom overrides TEGENFixPG.options.afterSelect().');
				});

				it('should trigger whan a premium is selected', () => {
					jQuery('#en__field_transaction_recurrfreq0').click();
					jQuery('#en__field_transaction_recurrfreq1').click();
					jQuery('input[name="transaction.donationAmt"]').eq(0).click();
					jQuery('input[name="en__pg"]').prop('checked', false);
					jQuery('label[for="pgListOpt1"]').click();
					expect(jQuery('input[name="en__pg"]:checked').val()).toEqual(jQuery('#pgListOpt1').val());
					expect(window.TEGENPGFixed.options.afterSelect).toHaveBeenCalled();
				});

				it('should trigger whan a premium option is selected', () => {
					jQuery('#en__field_transaction_recurrfreq0').click();
					jQuery('#en__field_transaction_recurrfreq2').click();
					jQuery('input[name="transaction.donationAmt"]').eq(0).click();
					TEGENPGFixed.premiumOptions.eq(0).change();
					expect(window.TEGENPGFixed.options.afterSelect).toHaveBeenCalled();
				});
			})

			describe('afterOptions()', () => {})

			it('should be a function defined by the options', () => {
				expect(window.TEGENPGFixed.options.afterOptions()).toBe('TEGENFixPG.options.afterOptions() run.');
			});

			it('should trigger when the premiums change', () => {
				jQuery('#en__field_transaction_recurrfreq0').click();
				jQuery('#en__field_transaction_recurrfreq1').click();
				jQuery('input[name="transaction.donationAmt"]').eq(0).click();
				jQuery('input[name="en__pg"]').prop('checked', false);
				jQuery('label[for="pgListOpt1"]').click();
				expect(jQuery('input[name="en__pg"]:checked').val()).toEqual(jQuery('#pgListOpt1').val());
				expect(window.TEGENPGFixed.options.afterOptions).toHaveBeenCalled();
			}); // end it('should exist and be defined by the TEGENFPGCustom object')
			})

	}); // end describe('TEG EN Premium Fix')
}); // end jQuery(document).ready
