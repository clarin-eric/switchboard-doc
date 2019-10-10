Architecture overview
---------------------

The Switchboard is composed of a Java backend and a JS+React+Redux frontend.

- The backend serves the html, js, css and font resources to a browser, handles the list of all tools, handles the temporary storage of user resources, and profiles the user data to detect its mediatype and language.

- The frontend (running in a user browser) renders the UI, handles user interaction and makes API calls to the backend for getting or updating the user data and the tools.
