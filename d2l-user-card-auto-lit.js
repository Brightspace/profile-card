/*
`d2l-user-card-auto` is a Polymer-based web component for creating a user card which automatically fills itself out when given a token and url.
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'd2l-organization-hm-behavior/d2l-organization-hm-behavior.js';
import 'd2l-user-profile-behavior/d2l-user-profile-behavior.js';
import './d2l-user-card.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-user-card-auto">
	<template strip-whitespace="">
		<style>
			:host {
				display: inline-block;
				height: auto;
			}

			:host([hidden]) {
				display: none;
			}

			d2l-user-card {
				width: 100%;
				min-height: 100%;
				height: inherit;
				margin: 0;
			}
		</style>

		<d2l-user-card name="[[_name]]" icon="[[_iconUrl]]" background="[[_backgroundUrl]]" background-color="[[_backgroundColor]]" token="[[token]]" placeholders="[[!_doneRequests]]">
			<slot></slot>
		</d2l-user-card>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-user-card-auto',
	properties: {
		userUrl: {
			type: String,
			value: null
		},
		getToken: {
			type: Object,
			value: null
		},
		_doneRequests: Boolean,
		_name: String,
		_iconUrl: String,
		_backgroundUrl: String,
		_backgroundColor: String,
		token: String
	},

	observers: [
		'_onUserChange( userUrl, getToken )'
	],

	behaviors: [
		D2L.PolymerBehaviors.Hypermedia.OrganizationHMBehavior,
		window.D2L.UserProfileBehavior
	],

	ready: function() {
		this._onUserChange(this.userUrl, this.getToken);
	},

	_onUserChange: function(userUrl, getToken) {
		var self = this;
		if (userUrl && getToken) {
			if (typeof getToken === 'function') {
				getToken(userUrl)
					.then(function(token) {
						if (typeof token === 'string') {
							self.generateUserRequest(userUrl, token, { background: true });
						} else {
							throw new Error('token expected to be a string');
						}
					});
			} else {
				throw new Error('getToken expected to be a function');
			}
		}
	}
});
