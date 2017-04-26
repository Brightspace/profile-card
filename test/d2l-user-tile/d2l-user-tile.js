/* global describe, beforeEach, it, expect, fixture */

'use strict';

describe('<d2l-user-tile>', function() {
	var component;

	beforeEach(function() {
		component = fixture('basic');
	});

	describe('smoke tests', function() {
		it('is instantiated', function() {
			expect(component).to.exist;
		});
	});
});
