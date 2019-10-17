Internal API Specification
--------------------------

The following API is used by the frontend to get various information from the backend. The information is returned as JSON.
It is not recommended for third parties to use this API, as it may change in the future.

## GET /api/info

Returns a JSON object with information about the server version, server host, and configuration parameters.

## GET /api/tools?mediatype=[MEDIATYPE]&language=[LANGUAGE]&deployment=[DEPLOYMENT]

Returns a JSON document with descriptions of all tools registered with the Switchboard that match the designated values supplied by the arguments (any order permitted):

- `mediatype`: find tools that can process the specified mediatype. The a mediatype identifier follows the [classification of IANA.org](https://www.iana.org/assignments/media-types/media-types.xhtml).

- `language`: find tools that can process the specified language. The language identifier must use the [ISO 639-3](https://iso639-3.sil.org/code_tables/639/data) standard.

- `deployment`: specifies the inclusion of tools (and web services) that are deployed in `production` or `development` instances. If absent, all tools are returned.

All parameters must be [URL-encoded](https://en.wikipedia.org/wiki/Percent-encoding).

The tool descriptions should correspond to the data in [https://github.com/clarin-eric/switchboard-tool-registry](https://github.com/clarin-eric/switchboard-tool-registry). See the [tool description specification](./ToolDescriptionSpec.md) for more information.

### Examples

* GET https://switchboard.clarin.eu/api/tools

  Retrieve all tools, without applying any filters.
  A possible result is:

````
{
    "maxAllowedDataSize": 20971520,
    "git": {
          "git.build.version": "2.1.0",
          ...
    },
    "contactEmail": "switchboard@clarin.eu",
    "host": {
        "ip": "172.19.0.2",
    },
    "version": "2.1.0"
}
````

* GET https://switchboard.clarin.eu/api/tools?mediatype=application%2Fpdf&language=eng

  Retrieve all tools capable of processing English text encoded in PDF format.

* GET https://switchboard.clarin.eu/api/tools?mediatype=text%2Fplain&language=tur&deployment=production

  Retrieve all tools capable of processing Turkish plain text documents, deployed as production instances.
  A possible result is:

````
{
    {
        "licence": "public",
        "mapping": {"input": "untokinput_url"},
        "languages": ["nld"],
        "softwareType": "qualitative",
        "creators": "Maarten van Gompel, Ko van der Sloot (CLST, Radboud University Nijmegen)",
        "description": "Alpino is a dependency parser for Dutch, developed in the context of the PIONIER Project Algorithms for Linguistic Processing, developed by Gertjan van Noord at the University of Groningen. You can upload either tokenised or untokenised files (which will be automatically tokenised for you using ucto), the output will consist of a zip file containing XML files, one for each sentence in the input document.",
        "langEncoding": "639-1",
        "version": "x.y.z",
        "url": "https://webservices-lst.science.ru.nl/alpino/",
        "output": ["alpinooutput", "text/folia+xml", "tokoutput"],
        "task": "Dependency Parsing",
        "contact": {
            "person": "Maarten van Gompel",
            "email": "proycon@anaproy.nl"
        },
        "name": "Alpino",
        "logo": "alpino.jpg",
        "location": "Nijmegen, The Netherlands (CLAM Webservices)",
        "parameters": {
            "project": "new",
            "input": "self.linkToResource"
        },
        "deployment": "development",
        "homepage": "http://www.let.rug.nl/vannoord/alp/Alpino/",
        "authentication": "Yes. Before tool use, please register at https://webservices-lst.science.ru.nl/register.",
        "mimetypes": ["text/plain"]
    },
    ...
}
````
