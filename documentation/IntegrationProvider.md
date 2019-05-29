# Integrating a resource provider

A resource provider connects to Switchboard by redirecting the client (browser) to the Switchboard and providing 
specific information that serves as input to the Switchboard's logic in doing so.

The following information can/has to be passed on to the Switchboard:

| Information | Description | Required? |
|-----|-----|-----|
| *origin* | Origin of the request - a name or identifier of the calling application | **Yes** |
| *URI* | Location or identifier of the potentially processable resource | **Yes** |
| *mimetype* | Media type (aka MIME type) of the potentially processable resource | No |
| *language* | Three letter language code ([ISO 639-3](https://iso639-3.sil.org/)) of the content language of the potentially processable resource | No |

## URL pattern
```
{switchboard base URL}#/{origin}/{URI}[/{mimetype}[/{language}]]
```

* For production, `{switchboard base URL}` is `https://switchboard.clarin.eu`
* All values have to be URL encoded.
* **NOTE**: currently __only the following values__ are supported for *origin*:
  * `vlo`
  * `vcr`
  * `fcs`
  * `b2drop`
  * `d4science`

### Examples
* https://switchboard.clarin.eu/#/vlo/https%3A%2F%2Fwww.clarin.eu
* https://switchboard.clarin.eu/#/vlo/https%3A%2F%2Fwww.clarin.eu%2Fcmdi/application%2Fhtml
* https://switchboard.clarin.eu/#/vlo/http%3A%2F%2Fxmlns.com%2Ffoaf%2Fdoc%2FREADME.txt/text%2Fplain/eng