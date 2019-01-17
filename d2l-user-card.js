/**
`d2l-user-card` is a Polymer-based web component for creating a user card.
@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icons.js';
import 'd2l-image/d2l-image.js';
import 'd2l-card/d2l-card.js';
import 'd2l-card/d2l-card-loading-shimmer.js';
import './icons.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-user-card">
	<template strip-whitespace="">
		<style>
			:host {
				width: 350px;
				height: 350px;
				text-align: center;
				cursor: pointer;
				display: block;
				position: relative;
				animation: fade-in 0.33s forwards;
			}

			:host([hidden]) {
				display: none;
			}

			.user-tile-avatar {
				width: 80px;
				height: 80px;
				margin: auto;
				border: 2px white solid;
				border-radius: 14px;
				background-color: white;
				overflow: hidden;
				display: inline-block;
			}

			.user-tile-background,
			.loading {
				width: 100%;
				height: 100px;
				z-index: -1;
			}

			.user-tile-items {
				padding-left: 20px;
				padding-right: 20px;
				text-align: left;
			}

			.user-tile-default-icon {
				--d2l-icon-height: 100%;
				--d2l-icon-width: 100%;
				--d2l-icon-fill-color: var(--d2l-color-sylvite);
			}

			.user-tile-information-wrapper {
				@apply --d2l-body-compact-text;
				display: flex;
				flex-direction: column;
			}

			.user-tile-name {
				font-size: 1.25rem;
				font-weight: bold;
				margin: 0 auto;
				padding-bottom: 10px;
			}

			.user-tile-background {
				background-color: var(--d2l-color-sylvite);
			}

			.text-placeholder {
				background-color: var(--d2l-color-sylvite);
				width: 150px;
				border-radius: 6px;
			}

			d2l-card {
				--d2l-image-tile-image-height: 100px;
				min-height: 100%;
				width: 100%;
				margin: 0;
			}

			d2l-card[loading] {
				border: 1px var(--d2l-color-gypsum) solid;
			}

			@keyframes fade-out-then-in {
				0% { opacity: 1; }
				50% { opacity: 0; }
				100% { opacity: 1; }
			}

			@keyframes fade-in {
				0% { opacity: 0; }
				100% { opacity: 1; }
			}

			:host([prev-placeholders]:not([placeholders])) {
				animation: fade-out-then-in 0.33s forwards;
			}

			[hidden] {
				display: none;
			}
		</style>

		<d2l-card aria-label$="[[name]]" loading$="[[_placeholders]]" href="javascript:void(0);">
			<d2l-card-loading-shimmer loading="[[ _placeholders ]]" slot="header">
				<div class="user-tile-background" style$="[[_getBackgroundStyle(background, backgroundColor)]]"></div>
			</d2l-card-loading-shimmer>
			<div slot="header">
				<div class="loading d2l-user-card-loading-shimmer" hidden$="[[!_placeholders]]"></div>
			</div>
			<div slot="badge" class="user-tile-avatar" aria-hidden="true">
				<template is="dom-if" if="[[!_hideIconPlaceholder(icon, _placeholders)]]">
					<d2l-icon icon="navigation-48:profile" class="user-tile-default-icon"></d2l-icon>
				</template>
				<template is="dom-if" if="[[_hideIconPlaceholder(icon, _placeholders)]]">
					<d2l-image image-url="[[icon]]" token="[[token]]"></d2l-image>
				</template>
			</div>
			<div class="user-tile-information-wrapper" slot="content">
				<h3 class="user-tile-name" hidden$="[[!_hideNamePlaceholder(_placeholders, name)]]">[[name]]</h3>
				<p class="user-tile-name text-placeholder" hidden$="[[_hideNamePlaceholder(_placeholders, name)]]">&nbsp;</p>
				<div class="user-tile-items">
					<slot></slot>
				</div>
			</div>
		</d2l-card>
	</template>
	
</dom-module>`;

document.head.appendChild($_documentContainer.content);

Polymer({
	is: 'd2l-user-card',
	properties: {
		background: {
			type: String,
			value: null
		},
		backgroundColor: {
			type: String,
			value: null
		},
		icon: {
			type: String,
			value: null
		},
		name: {
			type: String,
			value: null
		},
		token: {
			type: String,
			value: null
		},
		placeholders: {
			type: Boolean,
			value: false,
			reflectToAttribute: 'true',
			observer: '_updatePlaceholders'
		},
		_placeholders: {
			type: Boolean,
			value: false
		}
	},

	listeners: {
		'd2l-image-failed-to-load': '_onImageLoadFailure'
	},

	_updatePlaceholders: function(placeholders, oldVal) {
		if (oldVal || placeholders) {
			this.setAttribute('prev-placeholders', true);
		}

		setTimeout(function() {
			this._placeholders = placeholders;
		}.bind(this), 160);
	},

	_hideIconPlaceholder: function(icon, placeholders) {
		return !placeholders && !!icon;
	},

	_hideNamePlaceholder: function(placeholders, name) {
		return !placeholders && 'string' === typeof name;
	},

	_onImageLoadFailure: function() {
		this.icon = null;
	},

	_getBackgroundStyle: function(background, backgroundColor) {
		if (background) {
			return 'background: url(' + background + '); background-size: cover; background-position: center;';
		}
		if (backgroundColor) {
			return 'background-color: ' + backgroundColor + ';';
		}
	}
});
