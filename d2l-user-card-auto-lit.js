/*
`d2l-user-card-auto` is a Litelement-based web component for creating a user card which automatically fills itself out when given a token and url.
*/
import '@polymer/polymer/polymer-legacy.js';

import './d2l-user-card-lit.js';
import { LitElement, css, html } from 'lit-element';
import { D2LUserProfileMixin } from 'd2l-user-profile-behavior';

export class UserTileAuto extends D2LUserProfileMixin(LitElement) {
	static get styles() {
		return css`
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
		`;
	}

	static get properties() {
		return {
			userUrl: {
				type: String,
				value: null
			},
			getToken: {
				type: Object,
				value: null
			},
			_doneRequests: {
				type: Boolean
			},
			_name: {
				type: String
			},
			_iconUrl: {
				type: String
			},
			_backgroundUrl: {
				type: String
			},
			_backgroundColor: {
				type: String
			},
			token: {
				type: String
			}
		};
	}

	render() {
		return html`
			<d2l-user-card-lit name="${this._name}" icon="${this._iconUrl}" background="${this._backgroundUrl}" background-color="${this._backgroundColor}" token="${this.token}" ?placeholders="${!this._doneRequests}">
				<slot></slot>
			</d2l-user-card-lit>
		`;
	}

	updated(changedProperties) {
		if (changedProperties.has('userUrl') || changedProperties.has('getToken')) {
			this._onUserChange(this.userUrl, this.getToken);
		}
	}

	ready() {
		this._onUserChange(this.userUrl, this.getToken);
	}

	async _onUserChange(userUrl, getToken) {
		if (userUrl && getToken) {
			if (typeof getToken === 'function') {
				const token = await getToken(userUrl);
				if (typeof token === 'string') {
					this.generateUserRequest(userUrl, token, { background: true });
				} else {
					throw new Error('token expected to be a string');
				}
			} else {
				throw new Error('getToken expected to be a function');
			}
		}
	}
}

customElements.define('d2l-user-card-auto-lit', UserTileAuto);
