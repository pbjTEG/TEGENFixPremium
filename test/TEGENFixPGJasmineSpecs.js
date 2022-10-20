// noinspection JSJQueryEfficiency

jQuery(document).ready(() => {

	describe('TEG EN Premium Fix', () => {
		beforeAll((done) => {
			setTimeout(() => {
				jQuery('form').hide();
				done();
			}, 1000);
		});

		it('should initialize', () => {
			expect(typeof TEGENPGFixed).toBe('object');
		}); // end it('should do something')

		it("should not block EN's base functions", () => {
			jQuery('#en__field_transaction_recurrpay0').click();
			jQuery('input[value="Other"][name="transaction.donationAmt"]').click();
			jQuery('input[name="transaction.donationAmt.other"]').val('1');
			expect(jQuery('input[name="en__pg"]').length).toEqual(0);
			// recurring $10 must qualify for premium
			jQuery('#en__field_transaction_recurrpay1').click();
			jQuery('input[value="10"][name="transaction.donationAmt"]').click();
			expect(jQuery('input[name="en__pg"]').length).toEqual(2);
		}); // end it('should not block EN's base functions')

		it('should create labels', () => {
			// recurring $10 must qualify for premium
			jQuery('#en__field_transaction_recurrpay1').click();
			jQuery('input[value="10"][name="transaction.donationAmt"]').click();
			jQuery('input[name="en__pg"]').prop('checked', false);
			jQuery('label[for="pgListOpt1"]').click();
			expect(jQuery('input[name="en__pg"]:checked').val()).toEqual(jQuery('#pgListOpt1').val());
			jQuery('input[name="en__pg"]').prop('checked', false);
			jQuery('label[for="pgListOpt0"]').click();
			expect(jQuery('input[name="en__pg"]:checked').val()).toEqual(jQuery('#pgListOpt0').val());
		}); // end it('should create labels')

		it('should tell whether the premiums are available', () => {
			jQuery('#en__field_transaction_recurrpay1').click();
			jQuery('input[value="10"][name="transaction.donationAmt"]').click();
			expect(TEGENPGFixed.isVisible()).toBeTrue();
			jQuery('input[value="Other"][name="transaction.donationAmt"]').click();
			expect(TEGENPGFixed.isVisible()).toBeFalse();
		}); // end it('should tell whether the premiums are available')

		it('should expose a jQuery object containing the premium options', () => {
			expect(TEGENPGFixed.premiums.length).toBe(2);
		}); // end it('should expose a jQuery object containing the premium options')

		describe('should accept and run callbacks', () => {
			beforeAll(() => {
				spyOn(window.TEGENPGFixed.options, 'afterFix').and.callThrough();
				spyOn(window.TEGENPGFixed.options, 'afterSelect').and.callThrough();
				spyOn(window.TEGENPGFixed.options, 'afterOptions').and.callThrough();
			});

			it('should include afterFix() defined by the options', () => {
				expect(window.TEGENPGFixed.options.afterFix()).toBe('TEGENFixPG.options.afterFix() run.');
				jQuery('#en__field_transaction_recurrpay0').click();
				jQuery('input[value="Other"][name="transaction.donationAmt"]').click();
				expect(jQuery('input[name="en__pg"]').length).toEqual(0);
				// recurring $10 must qualify for premium
				jQuery('#en__field_transaction_recurrpay1').click();
				jQuery('input[value="10"][name="transaction.donationAmt"]').click();
				expect(jQuery('input[name="en__pg"]').length).toEqual(2);
				expect(window.TEGENPGFixed.options.afterFix).toHaveBeenCalled();
			}); // end it('should exist and defined by the options')

			it('should include afterSelect() defined by the TEGENFPGCustom object', () => {
				expect(window.TEGENPGFixed.options.afterSelect()).toBe('TEGENFPGCustom overrides TEGENFixPG.options.afterSelect().');
				jQuery('#en__field_transaction_recurrpay1').click();
				jQuery('input[value="10"][name="transaction.donationAmt"]').click();
				jQuery('input[name="en__pg"]').prop('checked', false);
				jQuery('label[for="pgListOpt1"]').click();
				expect(jQuery('input[name="en__pg"]:checked').val()).toEqual(jQuery('#pgListOpt1').val());
				expect(window.TEGENPGFixed.options.afterSelect).toHaveBeenCalled();
			}); // end it('should exist and be defined by the TEGENFPGCustom object')

			it('should include afterOptions() defined by the options', () => {
				expect(window.TEGENPGFixed.options.afterOptions()).toBe('TEGENFixPG.options.afterOptions() run.');
				jQuery('#en__field_transaction_recurrpay1').click();
				jQuery('input[value="10"][name="transaction.donationAmt"]').click();
				jQuery('input[name="en__pg"]').prop('checked', false);
				jQuery('label[for="pgListOpt1"]').click();
				expect(jQuery('input[name="en__pg"]:checked').val()).toEqual(jQuery('#pgListOpt1').val());
				expect(window.TEGENPGFixed.options.afterOptions).toHaveBeenCalled();
			}); // end it('should exist and be defined by the TEGENFPGCustom object')
		}); // end it('should accept and run callbacks')
	}); // end describe('TEG EN Premium Fix')
}); // end jQuery(document).ready
