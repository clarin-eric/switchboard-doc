# Switchboard API v2

A resource provider connects to Switchboard by redirecting the client (browser) to the Switchboard and providing specific information that serves as input to the Switchboard's logic in doing so.

The following information can/has to be passed on to the Switchboard:

| Information | Description | Required? |
|-----|-----|-----|
| *origin* | Origin of the request - a name or identifier of the calling application | **Yes** |
| *URI* | Location or identifier of the potentially processable resource | **Yes** |
| *mediatype* | Media type (aka MIME type) of the potentially processable resource | No |
| *language* | Three letter language code ([ISO 639-3](https://iso639-3.sil.org/)) of the content language of the potentially processable resource | No |

**NOTE**: The `mediatype` argument replaces the similarly named `mimetype` argument in the previous API version. 

## Client redirect

### URL pattern
```
{switchboard base URL}?origin={origin}&uri={URI}[&mediatype={mediatype}][&language={language}]
```

* For production, `{switchboard base URL}` is `https://switchboard.clarin.eu`
* All values have to be URL encoded.

### Examples
* https://switchboard.clarin.eu/?origin=vlo&url=https%3A%2F%2Fwww.clarin.eu
* https://switchboard.clarin.eu/?origin=vlo&url=https%3A%2F%2Fwww.clarin.eu%2Fcmdi&mediatype=application%2Fhtml
* https://switchboard.clarin.eu/?origin=vlo&url=http%3A%2F%2Fxmlns.com%2Ffoaf%2Fdoc%2FREADME.txt&mediatype=text%2Fplain&language=eng

## User interface

The [VLO](https://vlo.clarin.eu) and [VCR](https://collections.clarin.eu) provide access to the switchboard through their resources listings.

### VCR
The VCR provides a drop down menu for each resource in the resources table of a collection. See for example [hdl:11372/VC-1002](http://hdl.handle.net/11372/VC-1002)
![VCR](../images/integration-example-vcr.png)

### VLO
Very much like the VCR, the VLO provides a drop down menu for each resource in the links section of a record page:
![VLO](../images/integration-example-vlo.png)

The VLO web app is implemented using [Apache Wicket](https://wicket.apache.org/). The UI part of the Switchboard connection is implemented in the [`ResourceLinksPanelItem`](https://github.com/clarin-eric/VLO/blob/master/vlo-web-app/src/main/java/eu/clarin/cmdi/vlo/wicket/panels/record/ResourceLinksPanelItem.java) class, where a [`LanguageResourceSwitchboardLink`](https://github.com/clarin-eric/VLO/blob/master/vlo-web-app/src/main/java/eu/clarin/cmdi/vlo/wicket/components/LanguageResourceSwitchboardLink.java) is instantiated.
