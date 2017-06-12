d2l-user-tile
=============

[![Build Status](https://travis-ci.org/Brightspace/user-tile.svg?branch=master)](https://travis-ci.org/Brightspace/user-tile)

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

To see a demo of the `user-tile` in action, you can use [Polymer CLI's](https://www.npmjs.com/package/polymer-cli) `serve` command. Run `polymer serve` and navigate to [http://localhost:8000/components/d2l-user-tile/demo/index.html](http://localhost:8000/components/d2l-user-tile/demo/index.html).

## Usage

There are two variants of the tile - `d2l-user-tile` and `d2l-user-tile-auto`. Both variants of the tile support the common attribute `placeholders`, a boolean attribute which will render placeholder elements in place of missing data when true.

### d2l-user-tile

The basic tile - it will display a user tile for provided user information - `name`, user `icon`, and either a `background` URL or a `background-color`.

```html
<d2l-user-tile
	background="/path/to/background/image.jpg"
	background-color="#00FF00"
	name="User's name"
	icon="/path/to/user/icon.jpg"
	placeholders>

	<!-- Content to appear in the user tile goes here -->

</d2l-user-tile>
```

### d2l-user-tile-auto

Automatically fetches and fills in the user tile info from `user-url` when given a `token`, using [`user-profile-behavior`](https://github.com/Brightspace/user-profile-behavior).

```html
<d2l-user-tile-auto
	token="some-oauth2-token"
	user-url="http://example.com/users/12"
	placeholders>

	<!-- Content to appear in the user tile goes here -->

</d2l-user-tile>
```

## Coding styles

Follow the [EditorConfig](http://editorconfig.org) rules used in this repo.
