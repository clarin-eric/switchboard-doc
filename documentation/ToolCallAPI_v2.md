Tool Calling API v2.0
---------------------

The [Tool Description Spec v2](./ToolDescriptionSpec_v2.md) document presents how a web application tool is specified in Switchboard. Any tool specifies a list of input slots that must be satisfied before the tool can be invoked. When the user provided resources match all the input slots of a tool, then the Switchboard can build an invokation URL. How this is built is specified in the `webApplication` JSON entry of the tool. The following steps are performed:

1. the url is initialized with the provided URL of the tool (the `url` entry).

2. if `pathParameters` entry is present, each of its parts is evaluated and added to the URL path, in order.

3. if `queryParameters` entry is present, each of its parts is evaluated and added to the URL query, in order.

A parameter component has the following entries:

- `name` (mandatory): Specifies the query parameter name.

- `value`: A fixed value to send to the tool, independent of any input slots.
E.g. `{"name": "title", "value": "From the Switchboard"}`

- `bind`: A value which depends on an input slot. The input slot and specific value that this query parameter is to be set is specified as an "input/variable" string entry. The "input" part must be set to the input id. The "variable" part can take the following values:
    - "dataurl" for specifying the URL of the resource;
    - "type" for specifying the mediatype of the resource;
    - "language" for specifying the language of the resource;
    - "content" for specifying the actual content of the resource (but limited to maximum 4KB).
E.g.: `{"name": "input", "bind": "text/dataurl"}`

- `encoding`: By default language specifications are sent to the web application as ISO 639-3 encodings. If this field is present and set to "639-1", then the language spec is first converted to ISO 639-1 and only then sent to the tool. E.g. `{"name": "lang", "bind": "text/language", "encoding": "639-1"}`

As an example, for the following tool description fragment:

````
    inputs: [{
        id: "text",
        mediatypes: ["text/plain", "application/pdf"],
        languages: ["eng", "deu"]
    }, {
        id: "image",
        mediatypes: ["image/jpeg"]
    }],
    webApplication: {
        url: "https://example.com/mytool/",
        queryParameters: [{
            name: "projectName",
            value: "FromSwitchboard"
        }, {
            name: "url1",
            bind: "text/dataurl"
        }, {
            name: "lang",
            bind: "text/language",
            encoding: "639-1"
        }, {
            name: "imageurl",
            bind: "image/dataurl"
        }],
    }
````

the following invocation url can be produced (for an English resource):

`https://example.com/mytool/?projectName=FromSwitchboard&url1=<INPUT_URL1>&lang=en&imageurl=<INPUT_URL2>`

(where <INPUT_URL1>, <INPUT_URL2> are actual URL-encoded data urls)
