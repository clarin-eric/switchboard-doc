Tool Description Specification, v1.0
-------------------------------------

A Tool is specified in Switchboard by a JSON file, with the following entries:

* `task`: A short description of a tool's task, e.g. "Constituency Parsing".

* `deployment`: The status of its instance, should be either "production", or "development".

* `softwareType`: Can be "qualitative" or "quantitative".

* `name`: A short name uniquely describing the tool, e.g. "UDPipe".

* `logo`: The name of the logo file, e.g. "weblicht.jpg". Currently the logo files are stored in the Switchboard itself, but this will change in the future.

* `homepage`: The tool's home page. It should not the actual tool url, but a landing page for a user wanting to know more about the tool. E.g.: [https://weblicht.sfs.uni-tuebingen.de/weblichtwiki/index.php/Main_Page](https://weblicht.sfs.uni-tuebingen.de/weblichtwiki/index.php/Main_Page).

* `location`: The geographical location of the tool, e.g. "Tuebingen, Germany". This information is currently only displayed to the user and not used in other ways.

* `creators`: The tool's creators, as a string. E.g. "CLARIN-D Centre at the University of Tuebingen, Germany",

* `contact`: A JSON object with `person` and `email` entries, which can be used to report issues or user requests.

* `version`: The (semantic) version of the tool, e.g. "v1.0".

* `authentication`: Should be either `"no"` (for publicly available tools) or a string describing the authentication procedure.

* `licence`: Should be either `null` (meaning that the licence information is not specified) or a string describing the tool's licence.

* `description`: A short (less than 100 words) description of the tool.

* `languages`: A JSON array of ISO 639-3 language identifiers, specifying the input data languages that the tool supports. E.g. `["deu"]` for German.

* `langEncoding`: On a tool invocation besides the actual data, the input data language is also sent to the tool. This language can be specified in different encodings, depending on the tool's supported format. This parameter specifies either "639-1" or "639-3", for the corresponding ISO format.

* `mimetypes`: A JSON array containing the input data mediatypes that the tool supports. E.g. `["text/plain", "application/pdf"]`.

* `output`: A JSON array containing the description of the output data, as mediatypes. E.g. `["application/tcf+xml"]`.

* `url`: The actual url of the tool, used for direct invocation. See the [Tool Call API](./ToolCallAPI.md) for more information.

* `parameters`: A JSON object containing a list of parameters to be sent to the tool when invoked by the user. See the [Tool Call API](./ToolCallAPI.md) for more information.

* `mapping`: A JSON object mapping the descriptive parameters from the `parameters` section to the actual parameters required by the web tool. See the [Tool Call API](./ToolCallAPI.md) for more information.


For details on how a tool is matched for a specific resource, see the [./ToolMatching.md](./ToolMatching.md) document.

For details on how a tool is actually invoked when selected by the user, see the [./ToolCallAPI.md](./ToolCallAPI.md) document.