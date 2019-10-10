Tool Calling API v1.0
---------------------

The [Tool Description Spec](./ToolDescriptionSpec.md) document presents how a tool is specified in Switchboard. The following keys are important for invoking a tool by the Switchboard:

* `url`: The actual url of the tool, used for direct invocation. E.g. `"https://weblicht.sfs.uni-tuebingen.de/weblicht/"`.

* `parameters`: A JSON object containing a list of parameters to be sent to the tool when invoked by the user. The parameters are sent with the described value, with the following exception:
  - an `input` parameter will have the value of the input data URL.
  - a `lang` parameter will have the value of the input data language, in the encoding specified by the `langEncoding` parameter.
  - a `type` parameter will be given the mediatype of the input data.
  E.g. the parameters object `{"project": "new", "input": null}` will determine the Switchboard to send to the tool two parameters, encoded as a URL query string as `?project=new&input=<INPUT_URL>` (where <INPUT_URL> is an actual URL-encoded data url).

* `mapping`: A JSON object mapping the descriptive parameters from the `parameters` section to the actual parameters required by the web tool. A parameter name in the `parameters` object will be rewritten with a new name if present in the mapping object. E.g., if the `parameters` are as described above and the `mapping` is `{"input": "untokinput_url"}`, then the URL query string example will become `?project=new&untokinput_url=<INPUT_URL>` (where <INPUT_URL> is an actual URL-encoded data url).

When the user clicks the `Start Tool` button, the tool's url and required parameters are combined into an invocation url and opened in a new tab. For the following tool description:

````
    "url": "https://example.com/mytool/",
    "parameters": {
        "project": "new",
        "input": null
    },
    "mapping": {
        "input": "untokinput_url"
    }
````

the following invocation url will be produced:

`https://example.com/mytool/?project=new&untokinput_url=<INPUT_URL>`

(where <INPUT_URL> is an actual URL-encoded data url)
