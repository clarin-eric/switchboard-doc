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

## Client redirect

### URL pattern
```
{switchboard base URL}#/{origin}/{URI}[/{mimetype}[/{language}]]
```

* All values **have to be URL encoded**.
* For production, `{switchboard base URL}` is `https://switchboard.clarin.eu`
* An arbitrary identifying string for the calling service can be chosen for `{origin}`. The following are currently in use (non-exhaustive list):
  * `vlo`
  * `vcr`
  * `fcs`
  * `b2drop`
  * `d4science`

### Examples
* https://switchboard.clarin.eu/#/vlo/https%3A%2F%2Fwww.clarin.eu
* https://switchboard.clarin.eu/#/vlo/https%3A%2F%2Fwww.clarin.eu%2Fcmdi/application%2Fhtml
* https://switchboard.clarin.eu/#/vlo/http%3A%2F%2Fxmlns.com%2Ffoaf%2Fdoc%2FREADME.txt/text%2Fplain/eng

## User interface

The [VLO](https://vlo.clarin.eu) and [VCR](https://collections.clarin.eu) provide access to the switchboard through their resources listings.

### VCR
The VCR provides a drop down menu for each resource in the resources table of a collection. See for example [hdl:11372/VC-1002](http://hdl.handle.net/11372/VC-1002)
![VCR](../images/integration-example-vcr.png)

### VLO
Very much like the VCR, the VLO provides a drop down menu for each resource in the links section of a record page:
![VLO](../images/integration-example-vlo.png)

The VLO web app is implemented using [Apache Wicket](https://wicket.apache.org/). The UI part of the Switchboard connection is implemented in the [`ResourceLinksPanelItem`](https://github.com/clarin-eric/VLO/blob/master/vlo-web-app/src/main/java/eu/clarin/cmdi/vlo/wicket/panels/record/ResourceLinksPanelItem.java) class, where a [`LanguageResourceSwitchboardLink`](https://github.com/clarin-eric/VLO/blob/master/vlo-web-app/src/main/java/eu/clarin/cmdi/vlo/wicket/components/LanguageResourceSwitchboardLink.java) is instantiated.

## Video tutorial

On the [CLARIN ERIC Youtube channel](https://www.youtube.com/channel/UCJPks1mzisqsS4NrBFKIWag), you can find the video tutorial ["Connecting resource providers to the Language Resource Switchboard"](https://www.youtube.com/watch?v=YX5oGr949bQ).
