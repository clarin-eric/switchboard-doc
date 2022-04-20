Tool Description Specification, v2.0
-------------------------------------

A Tool is specified in Switchboard by a JSON file, with the following entries:

* `formatVersion` (mandatory): must be set to "2"

* `id` (mandatory): a short number used to identify the tool; must be unique in the set of all tools.

* `task` (mandatory): A short description of a tool's task, e.g. "Constituency Parsing". See [below](#lookup-tools) for the special "Lookup Tools" task.

* `deployment` (mandatory): The status of its instance, should be either "production", or "development".

* `integrationType` (mandatory): can be "Integrated" (for normal web applications integrated with the Switchboard), "External" (for web applications that have no integration with the Switchboard) or "Local" (for applications that have to be downloaded and installed locally).

* `name` (mandatory): A short name uniquely describing the tool, e.g. "UDPipe".

* `description` (mandatory): A short (less than 100 words) description of the tool. This field supports [GitHub Markdown](https://github.github.com/gfm), except for the HTML blocks.

* `logo` (mandatory): The name of the logo file, e.g. "weblicht.jpg". The logo files must be stored in the [switchboard-tool-registry](https://github.com/clarin-eric/switchboard-tool-registry) repository, in the "logos" directory.

* `homepage` (mandatory): The tool's home page. It should not the actual tool url, but a landing page for a user wanting to know more about the tool. E.g.: [https://weblicht.sfs.uni-tuebingen.de/weblichtwiki/index.php/Main_Page](https://weblicht.sfs.uni-tuebingen.de/weblichtwiki/index.php/Main_Page).

* `creators` (mandatory): The tool's creators, as a string. E.g. "CLARIN-D Centre at the University of Tuebingen, Germany",

* `contact` (mandatory): A JSON object with `person` and `email` entries, which can be used to report issues or user requests.

* `keywords`: Can be an array of string elements, containing keywords about the tool.

* `location`: The geographical location of the tool, e.g. "Tuebingen, Germany". This information is currently only displayed to the user and not used in other ways.

* `authentication`: Should be either `"no"` (for publicly available tools) or a string describing the authentication procedure. This field supports [GitHub Markdown][1], except for the HTML blocks.

* `output`: A JSON array containing the description of the output data, as mediatypes. E.g. `["application/tcf+xml"]`. This field is currently not used.

* `inputs` (mandatory): A JSON array containing JSON objects. Each JSON object is a description of an input slot and can have the following fields:

	- `id` (mandatory): the unique id of the input slot
	- `mediatypes`: A JSON array containing the mediatypes that this input slot accepts. E.g. `["text/plain", "application/pdf"]`.
    - `languages`: A JSON array of ISO 639-3 language identifiers, specifying the input data languages that the tool supports. E.g. `["deu"]` for German. Input slots that accept any language can use just the string "generic" instead of the JSON array. Input slots that do not have or need a language specification should simply not have this entry.
    - `maxSize`: An integer value representing the maximum accepted value of the input, in bytes. Resources that have a larger size will be matched with the input, but an error message will explain to the user that such resources cannot be used because of this limit.
    - `optional`: A boolean value specifying if the current input slot is optional (default "false"). An optional input slot will be matched against a resource only after all the non-optional have been filled.
    - `multiple`: A boolean value specifying if the current input slot accepts multiple resources (default "false").

* `webApplication` (mandatory for web applications): A JSON object with more information on how the web application is reachable from the Switchboard. It can have the following fields:

	- `url` (mandatory): A string value representing the root URL used to invoke the tool, e.g. "https://weblicht.sfs.uni-tuebingen.de/weblicht/".

    - `queryParameters`: A JSON array with JSON objects, each describing how the resources matching an input slot are sent to the web application as **query** parameters. Accepted fields in the JSON objects are:

    	- `name` (mandatory): Specifies the query parameter name.

    	- `value`: If the query parameter is not bound to an input slot and requires just a fixed value.
    	E.g. `{"name": "title", "value": "From the Switchboard"}`

    	- `bind`: Specifies the input slot and specific value that this query parameter is to be set to, in the form of "input/variable" string entry. The "input" part is specified by the input id. The "variable" part can take the following values: "dataurl" for specifying the URL of the resource; "type" for specifying the mediatype of the resource; "language" for specifying the language of the resource; "content" for specifying the actual content of the resource (but limited to maximum 4KB).
    	E.g.: `{"name": "input", "bind": "text/dataurl"}`

    	- `encoding`: By default language specifications are sent to the web application as ISO 639-3 encodings. If this field is present and set to "639-1", then the language spec is first converted to ISO 639-1 and only then sent to the tool.
    	E.g. `{"name": "lang", "bind": "text/language", "encoding": "639-1"}`

    - `pathParameters`: A JSON array with JSON objects, each describing how the resources matching an input slot are to be sent to the web application as **path** parameters. The JSON object spec is identical with the one from the `queryParameters`.

* `standaloneApplication` (mandatory for locally installable applications): Please consult the JSON schema (linked below) and the used model documentation from [schema.org](https://schema.org/SoftwareApplication)

All the fields which are not described as mandatory are optional (but recommended).

For details on how a tool is matched for a specific resource, see the [Tool Matching](./ToolMatching.md) document.

For details on how a tool is actually invoked when selected by the user, see the [Tool Call API v2](./ToolCallAPI_v2.md) document.

A more formal description can be found in the JSON schema used to verify a tool description file: [JSON schema for Tool Specification](https://github.com/clarin-eric/switchboard-tool-registry/blob/master/schemas/spec-v2.schema.json)

### Lookup Tools

The special "Lookup Tools" task describes tools that are used to provide more information about a particular item. The tools belonging to this task are only matched against resources in a special Switchboard mode, which is only accessible from certain sites. The lookup tools usually require as input the content of a resource and not just the data profile (i.e. they use the `content` bind), but are otherwise behaving as all the other tools.
