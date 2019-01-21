/* global describe, beforeEach, it, expect, fixture */

import '@polymer/polymer/polymer-legacy.js';
import {flush} from '@polymer/polymer/lib/utils/flush.js';

describe('<d2l-user-card>', function() {
	var component;

	beforeEach(function() {
		component = fixture('basic');
		flush();
	});

	describe('smoke tests', function() {
		it('is instantiated', function() {
			expect(component).to.exist;
		});
	});

	describe('given that the tile should render the appropriate data provided', function() {
		describe('when the `icon` attribute is not provided', function() {
			it('should render the default icon only', function() {
				expect(component.$$('.user-tile-avatar d2l-icon')).to.exist;
				expect(component.$$('.user-tile-avatar d2l-image')).to.not.exist;
			});
		});

		describe('when the `icon` attribute is provided for a valid image', function() {
			beforeEach(function() {
				component = fixture('with-icon');
				flush();
			});

			it('should render the custom icon only', function() {
				expect(component.$$('.user-tile-avatar d2l-icon')).to.not.exist;
				expect(component.$$('.user-tile-avatar d2l-image')).to.exist;
			});
		});
	});

	describe('content placeholders', function() {
		beforeEach(function() {
			component = fixture('with-placeholders');
		});

		describe('for name field', function() {
			it('should show a placeholder for the name when name is not set', function() {
				var name = component.$$('.user-tile-name:not(.text-placeholder)');
				var placeholder = component.$$('.user-tile-name.text-placeholder');
				expect(name.hasAttribute('hidden')).to.be.true;
				expect(placeholder.hasAttribute('hidden')).to.be.false;
			});

			it('should hide the placeholder for the name when name is set', function() {
				component.name = '';
				var name = component.$$('.user-tile-name:not(.text-placeholder)');
				var placeholder = component.$$('.user-tile-name.text-placeholder');
				expect(name.hasAttribute('hidden')).to.be.false;
				expect(placeholder.hasAttribute('hidden')).to.be.true;
			});
		});
	});
});
