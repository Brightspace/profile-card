/* global describe, beforeEach, it, expect, fixture */

import '@polymer/polymer/polymer-legacy.js';
import {flush} from '@polymer/polymer/lib/utils/flush.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status';

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
			it('should render the default icon only', function(done) {
				afterNextRender(component, () => {
					expect(component.shadowRoot.querySelector('.user-tile-avatar d2l-icon-custom')).to.exist;
					expect(component.shadowRoot.querySelector('.user-tile-avatar d2l-image')).to.not.exist;
					done();
				});
			});
		});

		describe('when the `icon` attribute is provided for a valid image', function() {
			beforeEach(function() {
				component = fixture('with-icon');
				flush();
			});

			it('should render the custom icon only', function(done) {
				afterNextRender(component, () => {
					expect(component.shadowRoot.querySelector('.user-tile-avatar d2l-icon-custom')).to.not.exist;
					expect(component.shadowRoot.querySelector('.user-tile-avatar d2l-image')).to.exist;
					done();
				});
			});
		});
	});

	describe('content placeholders', function() {
		beforeEach(function() {
			component = fixture('with-placeholders');
		});

		describe('for name field', function() {
			it('should show a placeholder for the name when name is not set', function(done) {
				afterNextRender(component, () => {
					var name = component.shadowRoot.querySelector('.user-tile-name:not(.text-placeholder)');
					var placeholder = component.shadowRoot.querySelector('.user-tile-name.text-placeholder');
					expect(name.hasAttribute('hidden')).to.be.true;
					expect(placeholder.hasAttribute('hidden')).to.be.false;
					done();
				});
			});

			it('should hide the placeholder for the name when name is set', function(done) {
				component.name = '';
				afterNextRender(component, () => {
					var name = component.shadowRoot.querySelector('.user-tile-name:not(.text-placeholder)');
					var placeholder = component.shadowRoot.querySelector('.user-tile-name.text-placeholder');
					expect(name.hasAttribute('hidden')).to.be.false;
					expect(placeholder.hasAttribute('hidden')).to.be.true;
					done();
				});
			});
		});
	});
});
