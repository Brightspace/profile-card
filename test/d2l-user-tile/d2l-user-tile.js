/* global describe, beforeEach, it, expect, fixture */

'use strict';

describe('<d2l-user-tile>', function() {
	var component;

	beforeEach(function() {
		component = fixture('basic');
		Polymer.dom.flush();
	});

	describe('smoke tests', function() {
		it('is instantiated', function() {
			expect(component).to.exist;
		});
	});

	describe('given that the tile should render the appropriate data provided', function() {

		describe('when the `icon` attribute is not provided', function() {
			it('should render the default icon only', function() {
				expect(component.querySelector('d2l-icon')).to.exist;
				expect(component.querySelector('d2l-image')).to.not.exist;
			});
		});

		describe('when the `icon` attribute is provided for a valid image', function() {
			beforeEach(function() {
				component = fixture('with-icon');
				Polymer.dom.flush();
			});

			it('should render the custom icon only', function() {
				expect(component.querySelector('d2l-icon')).to.not.exist;
				expect(component.querySelector('d2l-image')).to.exist;
			});
		});
	});
});
