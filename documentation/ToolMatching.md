Tool Matching Specification
---------------------------

In the current implementation, The Switchboard makes use of two pieces of information to find the tools that can process a given user resource. These are the **mediatype** and the **language** of the resource. Any tool that contains in its list of accepted mediatypes and languages the mediatype and respectively the language of the resource will be matched by the Switchboard and displayed in the list of tools.

For details on how a tool is specified in Switchboard, see the [Tool Description Spec v2](./ToolDescriptionSpec_v2.md) document.

For details on how a tool is actually invoked when selected by the user, see the [Tool Call API v2](./ToolCallAPI_v2.md) document.