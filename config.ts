import type { Config } from "./src/types/config";

export const config: Config = {
	// General
	name: "Deniz",
	openInNewTab: true,
	title: "New Tab",

	// Clock
	twelveHourFormat: false,
	flashSeparator: false,

	// Font Family
	font: {
		// 'google' or 'local'
		source: "google",
		// Font name, e.g. 'Roboto' (case sensitive)
		name: "Overpass",
	},

	// Theme
	theme: "catppuccin-mocha",

	// Place a background image in ./src/assets/images/ and provide the file name.
	// Alternatively, provide a URL to an image. If the page is served over https, you may have issues loading images from insecure origins.
	// Set to "" to disable.
	backgroundImage: "",
	themes: [
		// List of installed themes, add your own themes in ./src/assets/css/themes and include it in the array below.
		"arc",
		"bento",
		"catppuccin-frappe",
		"catppuccin-macchiato",
		"catppuccin-mocha",
		"conceptdark", // dark mode only
		"monokai",
		"nord",
		"sakura",
		"solarized",
	],

	// Search Bar
	searchBar: true,
	searchEngine: "ddg", // google, ddg
	barPlaceholder: "Search", // if blank, use search engine name. Set to ' ' for no placeholder.
	autoFocusBar: true,

	// Greetings
	greetingMorning: "Good morning,",
	greetingAfternoon: "Good afternoon,",
	greetingEvening: "Good evening,",
	greetingNight: "Sweet dreams,",

	// Layout
	layout: "bento", // 'bento', 'lists', 'buttons'

	// Weather
	weatherKey: import.meta.env.VITE_API_KEY, // Set your OpenWeatherMap key in .env - Move the included .env.example to .env
	weatherIcons: "OneDark", // 'Onedark', 'Nord', 'Dark', 'White'
	weatherUnit: "C", // 'F', 'C'
	language: "en", // More languages in https://openweathermap.org/current#multi

	trackLocation: true, // Request location from the browser. If false, or location is denied, use the coordinates below.
	defaultLatitude: "37.775",
	defaultLongitude: "-122.419",

	// Automatic theme switching:
	// "system" - Switches based on OS color preference
	// "location" - Switches based on local sunrise/sunset (requires OpenWeatherMap API key)
	// "preset" - Switches based on set hours
	// "none" - No automatic switching
	autoTheme: "system",

	// If autoTheme is set to "preset", set the hours below.
	darkModeOnTime: "18:30",
	lightModeOnTime: "07:00",

	// Set any of the below options to false to disable drawing the component on the page.
	// If themeButton is set to false, the theme can only be set in this file.
	// Disabling the weather component may cause issues with location-based light/dark switching.
	componentsEnabled: {
		searchBar: true,
		themeButton: true,
		clock: true,
		greeter: true,
		date: true,
		weather: true,
	},

	// Buttons
	// * Prefix brand icons with 'fab-' (e.g. 'fab-github')
	buttons: [
		// First buttons group
		// If you're using the 'bento' layout, this is the only group that will be used.
		[
			{
				name: "Github",
				icon: "fab-github",
				url: "https://github.com",
			},
			{
				name: "Proxer",
				icon: "play",
				url: "https://proxer.me",
			},
			{
				name: "YouTube",
				icon: "fab-youtube",
				url: "https://youtube.com",
			},
			{
				name: "Reddit",
				icon: "fab-reddit",
				url: "https://reddit.com",
			},
			{
				name: "Instagram",
				icon: "fab-instagram",
				url: "https://www.instagram.com",
			},
			{
				name: "X", 
				icon: "fab-x-twitter", 
				url: "https://x.com/home", 
			},
		],
		// Second buttons group
		// You muse use the 'buttons' layout to use this group.
		[
			{
				name: "Music",
				icon: "fab-spotify",
				url: "https://open.spotify.com",
			},
			{
				name: "twitter",
				icon: "fab-twitter",
				url: "https://twitter.com/",
			},
			{
				name: "bot",
				icon: "fab-discord",
				url: "https://discord.com/app",
			},
			{
				name: "Amazon",
				icon: "fab-amazon",
				url: "https://amazon.com/",
			},
			{
				name: "Hashnode",
				icon: "fab-hashnode",
				url: "https://hashnode.com/",
			},
			{
				name: "Figma",
				icon: "fab-figma",
				url: "https://figma.com/",
			},
		],
	],

	// Lists
	lists: [
		// First list group
		// If you're using the 'bento' layout, this is the only group that will be used.
		[
			{
				icon: "toolbox", // Icon for the list to use. The same as the buttons.
				links: [
					{
						name: "Cobalt", // Display text for the link
						url: "https://cobalt.tools", // URL to the page
					},
					{
						name: "PDF Tools",
						url: "https://tools.pdf24.org",
					},
					{
						name: "Translator",
						url: "https://www.deepl.com",
					},
					{
						name: "Google Drive",
						url: "https://drive.google.com/drive/home",
					},
				],
			},
			{
				icon: "building-columns",
				links: [
					{
						name: "S-Plan",
						url: "https://splan.hdm-stuttgart.de/splan",
					},
					{
						name: "Selma",
						url: "https://idp.hdm-stuttgart.de/idp/profile/SAML2/Redirect/SSO?execution=e1s1",
					},
					{
						name: "Moodle",
						url: "https://moodle.hdm-stuttgart.de",
					},
					{
						name: "ILIAS",
						url: "https://learn.mi.hdm-stuttgart.de",
					},
				],
			},
		],
		// Second list group
		// You muse use the 'lists' layout to use this group.
		[
			{
				icon: "house-user",
				links: [
					{
						name: "Spotify",
						url: "https://www.spotify.com",
					},
					{
						name: "Reddit",
						url: "https://www.reddit.com",
					},
					{
						name: "Hashnode",
						url: "https://www.hashnode.com",
					},
					{
						name: "Pocket",
						url: "https://www.pocket.com",
					},
				],
			},
			{
				icon: "fab-github",
				links: [
					{
						name: "Front",
						url: "https://www.reddit.com/r/Frontend/",
					},
					{
						name: "Rust",
						url: "https://www.reddit.com/r/rust/",
					},
					{
						name: "Go",
						url: "https://www.reddit.com/r/golang/",
					},
					{
						name: "Repos",
						url: "https://github.com/migueravila",
					},
				],
			},
		],
	],
};
