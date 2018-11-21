d2l-user-card
=============

[![Build Status](https://travis-ci.org/Brightspace/user-card.svg?branch=master)](https://travis-ci.org/Brightspace/user-card)

A [Polymer](https://www.polymer-project.org)-based web component for displaying a profile's information.

## Installation

Clone the repo and install npm and bower depedencies:

```sh
npm install
```

Run tests:

```sh
npm test
```

To see a demo of the `user-card` in action, you can use [Polymer CLI's](https://www.npmjs.com/package/polymer-cli) `serve` command. Run `polymer serve` and navigate to [http://localhost:8000/components/d2l-user-card/demo/index.html](http://localhost:8000/components/d2l-user-card/demo/index.html).

## Usage

There are two variants of the card - `d2l-user-card` and `d2l-user-card-auto`. Both variants of the card support the common attribute `placeholders`, a boolean attribute which will render placeholder elements in place of missing data when true.

### d2l-user-card

The basic card - it will display a user card for provided user information - `name`, user `icon`, and either a `background` URL or a `background-color`.

```html
<d2l-user-card
	background="/path/to/background/image.jpg"
	background-color="#00FF00"
	name="User's name"
	icon="/path/to/user/icon.jpg"
	placeholders>

	<!-- Content to appear in the user card goes here -->

</d2l-user-card>
```

### d2l-user-card-auto

Automatically fetches and fills in the user card info from `user-url` when given a `token`, using [`user-profile-behavior`](https://github.com/Brightspace/user-profile-behavior).

```html
<d2l-user-card-auto
	token="some-oauth2-token"
	user-url="http://example.com/users/12"
	placeholders>

	<!-- Content to appear in the user card goes here -->

</d2l-user-card-auto>
```

## Coding styles

Follow the [EditorConfig](http://editorconfig.org) rules used in this repo.
