# Example: Tic Tac Toe

This repository demonstrates some essential concept of the [UIX](https://uix.unyt.org) framework such as [pointers](https://unyt.org/glossary#pointer) and [Web components](https://unyt.org/glossary#web-components) using the example of a **Tic Tac Toe game**.


The repository implements [front-end](https://unyt.org/glossary#back-end) rendering.

## Installation
1. Install the **UIX command line tool** following the [Getting Started](https://docs.unyt.org/manual/uix/getting-started#the-uix-command-line-tool) guide in our documentation.

2. Clone this repository to your local machine:

	```bash
	$ git clone https://github.com/unyt-org/example-tic-tac-toe.git
	```
3. Run the project local
	```bash
	$ uix --port 8000
	```
4. Navigate to your favourite web browser and open http://localhost:8000 to see everything in action. 

## Structure
This diagram outlines the UIX default project structure.
We split our code base in [back-end](https://unyt.org/glossary#back-end), [front-end](https://unyt.org/glossary#front-end), and commons folder.
```
.
└── example-tic-tac-toe/
    ├── backend/
    │   ├── .dx                 // Config file for deployment
    │   ├── Map.ts              // Map for games
    │   └── entrypoint.tsx      // Back-end entrypoint
    ├── common/
    │   ├── compoments/
    │   │   ├── GamePage.scss   // Game style declaration
    │   │   └── GamePage.tsx    // Game component
    │   └── theme.ts            // Global style theme
    ├── frontend/
    │   ├── entrypoint.css      // Front-end style declaration
    │   └── entrypoint.tsx      // Front-end entrypoint
    ├── app.dx                  // Endpoint config file
    └── deno.json               // Deno config file
```

## Features
* Support for multiple games
* Reset option
* Player turn handling

## Preview
<img src=".github/screenshot.png" width="400">


## Explanation
### Concept of Pointers
In [UIX](https://uix.unyt.org), [Pointers](https://unyt.org/glossary#pointer) are a fundamental concept for managing shared data across different parts of your application. Pointers allow different components or [endpoints](https://unyt.org/glossary#endpoint) to access and modify the same data. In the context of our game, a Pointer could represent a single value of a tile (either empty, `X` or `O`).

Pointers are synchronized over the [Supranet](https://unyt.org/glossary#supranet), based on our powerful [DATEX](https://datex.unyt.org) networking protocol that ensures real-time updates and consistency across endpoints. When one user checks a tile, the changes are propagated to the other player through the Supranet, keeping the data in sync.

---

<sub>&copy; unyt 2024 • [unyt.org](https://unyt.org)</sub>
