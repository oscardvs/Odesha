# Odesha

An early Electron desktop app (package name `odesharaffles`, window title "Odesha Raffles"). It opens one URL in several separate browser windows at once, each with its own session and a random desktop Chrome user agent, and optionally each through a different proxy. Per the package description, "Simply Bot Raffles", the purpose was to open a raffle page from several sessions in parallel.

How it works: type a link in the input field, then click "Add Local Task" for a window on your own IP, or "Add Proxy Task" to pick a text file with one proxy per line (`host:port` or `host:port:user:pass`) and get one task per proxy. "Launch All Raffles" opens every task; each row also has its own Launch and Delete buttons.

To run: `package.json` expects the files under an `app/` folder, so create `app/`, put `main.js` and `index.html` in it, `loader.js` in `app/js/` and `main.css` in `app/css/`. Then run `npm install && npm start`. It was written against Electron 7, which `package.json` pins.

This is an early project. The commits date from January and February 2020, and it is not maintained.
