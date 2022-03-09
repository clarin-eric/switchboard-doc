PUBLIC API Specification
--------------------------

The following API endpoints are designed to be publicly available and used by third parties as well as by the frontend itself. The data format used by all the endpoints is JSON.

## GET /api/tools

Returns a JSON document with descriptions of all tools registered with the Switchboard, as an array of tool objects. Currently no paging or filtering is implemented. A tool object has the fields described in the [ToolDescriptionSpec_v2.md](./ToolDescriptionSpec_v2.md). Each tool has a unique (for the Switchboard) numeric `id` field, which can be used to identify the tool and which can be used as a url parameter in the `/api/tools/{id}` endpoint (see below).

## GET /api/tools/{id}

Returns a JSON document with the description of the tool registered with the Switchboard that has the particular **id** used as a path parameter.

Example:
```
GET https://switchboard.clarin.eu/api/tools/112

Returns:
{
    "formatVersion":"2",
    "id":112,
    "task":"Text Analytics",
    "name":"WebLicht Advanced Mode",
    ...
}
```

## POST /api/tools/match

The endpoint requires as input a list of data profiles in the form of a JSON array of profile objects. This data must be sent in the body of the POST call and must have an `application/json` content type header.

A data profile is a simple object describing the data. The most important values are the data **mediatype** (mandatory) and its **language** (optional, specified in the ISO 639-3 format).

The endpoint returns a list of tools, each tool with one or more possible matches for the provided data profiles. The degree in which the input data profiles match the tool's input slots is described by three values returned for each tool: `allInputsMatchPercent` describes in percents how many of the tool's inputs are covered by the input profiles; `mandatoryInputsMatchPercent` describes in percents how many of the tool's mandatory inputs (because a tool input slot can be optional) are covered; and `profileMatchPercent` describes how many of the input data profiles are covered by the current match.

In addition to these values a tool match also returns a `matches` array, which is a list of possible *mappings* between the input profiles and the tool's input slots. A *mapping* is a list of integers specifying which tool's input slot index fits a data profile. For example, a mapping of `[1, 0, null]` specifies that the user specified three data profiles, of which the first one matches the tool input slot of index 1 (the second input slot); the second data profile matches the tool input slot of index 0 (the first input slot); and the third data profile does not match any input slots of the current tool (it is `null` in the mapping).

No paging or filtering of the results is currently possible.

Single input profile example:
```
POST https://switchboard.clarin.eu/api/tools/match
Content-Type: application/json
body: [{"mediaType":"text/plain","language":"eng"}]

Returns:
[
    {
        "tool": {"formatVersion": "2", "id": 110, "task": "Distant Reading", "deployment": "production", ...},
        "matches": [[0]],
        "allInputsMatchPercent": 100.0,
        "mandatoryInputsMatchPercent": 100.0,
        "profileMatchPercent": 100.0
    },
    {
        "tool": {"formatVersion": "2", "id": 112, "task": "Text Analytics", "deployment": "production", ... },
        "matches": [[0]],
        "allInputsMatchPercent": 100.0,
        "mandatoryInputsMatchPercent": 100.0,
        "profileMatchPercent": 100.0
    }
]
```

Multiple input profiles example:
```
POST https://switchboard.clarin.eu/api/tools/match
Content-Type: application/json
body: [{"mediaType":"text/plain","language":"eng"},{"mediaType":"audio/vnd.wave"}]

Returns: [
    {
        "tool": {"formatVersion": "2", "id": 9, "task": "Speech segmentation", "name": "WebMAUS", ... },
        "matches": [[1, 0]],
        "mandatoryInputsMatchPercent": 100,
        "profileMatchPercent": 100,
        "allInputsMatchPercent": 100
    },
    {
        "tool": {"formatVersion": "2", "id": 3, "task": "Text Enhancement", "name": "Apache Stanbol Enhancer", ... },
        "matches": [[0, null]],
        "mandatoryInputsMatchPercent": 100,
        "profileMatchPercent": 50,
        "allInputsMatchPercent": 100
    },
]`
