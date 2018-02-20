/* global describe, beforeEach, afterEach, it, expect, fixture, sinon, Promise */

'use strict';

describe('<d2l-user-tile-auto>', function() {
	var component,
		sandbox,
		userUrl = 'https://example.com',
		token = 'some-oauth-token',
		getToken = function() {
			return Promise.resolve(token);
		},
		dontGetToken = function() {
			return Promise.reject(new Error('No token for that child'));
		},
		getNotToken = function() {
			return Promise.resolve(null);
		};

	beforeEach(function() {
		component = fixture('basic');
		sandbox = sinon.sandbox.create();
	});

	afterEach(function() {
		sandbox.restore();
	});

	it('is instantiated', function() {
		expect(component).to.exist;
	});

	describe('fetching user data', function() {
		it('should not generate the user request if the URL is empty', function(done) {
			var spy = sandbox.spy(component, '_onUserChange');
			var stub = sandbox.stub(component, 'generateUserRequest');
			component.getToken = getToken;
			setTimeout(function() {
				expect(spy.called).to.be.true;
				expect(stub.called).to.be.false;
				done();
			});
		});

		it('should not generate the user request if getToken is not set', function(done) {
			var spy = sandbox.spy(component, '_onUserChange');
			var stub = sandbox.stub(component, 'generateUserRequest');
			component.userUrl = userUrl;
			setTimeout(function() {
				expect(spy.called).to.be.true;
				expect(stub.called).to.be.false;
				done();
			});
		});

		describe('generating user request', function() {
			it('should generate the user request when both getToken and URL are set, and getToken returns a token', function(done) {
				var spy = sandbox.spy(component, '_onUserChange');
				var stub = sandbox.stub(component, 'generateUserRequest');
				component.getToken = getToken;
				component.userUrl = userUrl;
				setTimeout(function() {
					expect(spy.called).to.be.true;
					expect(stub.calledWith(userUrl, token, sinon.match({ background: true }))).to.be.true;
					done();
				});
			});

			it('should not generate the user request when getToken rejects', function(done) {
				var spy = sandbox.spy(component, '_onUserChange');
				var stub = sandbox.stub(component, 'generateUserRequest');
				component.getToken = dontGetToken;
				component.userUrl = userUrl;
				setTimeout(function() {
					expect(spy.called).to.be.true;
					expect(stub.called).to.be.false;
					done();
				});
			});

			it('should not generate the user request when getToken returns something that is not a token', function(done) {
				var spy = sandbox.spy(component, '_onUserChange');
				var stub = sandbox.stub(component, 'generateUserRequest');
				component.getToken = getNotToken;
				component.userUrl = userUrl;
				setTimeout(function() {
					expect(spy.called).to.be.true;
					expect(stub.called).to.be.false;
					done();
				});
			});

			it('sets the properties on the internal <d2l-user-tile> appropriately', function(done) {
				var innerTile = component.$$('d2l-user-tile');
				sandbox.stub(innerTile, '_onImageLoadFailure', function() {});
				sandbox.stub(component, 'generateUserRequest', function() {
					component._name = 'name';
					component._iconUrl = 'iconUrl';
					component._backgroundUrl = 'backgroundUrl';
					component._backgroundColor = 'backgroundColor';
				});

				component.getToken = getToken;
				component.userUrl = userUrl;
				setTimeout(function() {
					expect(innerTile.name).to.equal('name');
					expect(innerTile.icon).to.equal('iconUrl');
					expect(innerTile.background).to.equal('backgroundUrl');
					expect(innerTile.backgroundColor).to.equal('backgroundColor');
					done();
				});
			});
		});
	});

	describe('content placeholders', function() {
		it('should set the placeholder property on the internal <d2l-user-tile>', function() {
			var internalTile = component.$$('d2l-user-tile');

			component._doneRequests = false;
			expect(internalTile.placeholders).to.be.true;

			component._doneRequests = true;
			expect(internalTile.placeholders).to.be.false;
		});
	});
});
