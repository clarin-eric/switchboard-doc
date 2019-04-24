[//]: # "C. Zinn, Time-stamp: <2019-04-24 13:51:32 (zinn)>"

# Piwik reporting

- Piwik is initialized in App.jsx, the main component of the switchboard.

- records tool invocation. This happens in Tool.jsx, invokeTool(URL).

- records whether users change the mimetype/language after it is automatically set by
  switchboard, see Resource.jsx, setLanguage and setMimetype

- records pressing of Show Tools button ("dashboard).

- records textual input in DropArea.jsx (when pressing submit, see handeTextInputSubmit)

- records URL input in DropArea.jsx (when pressing submit, see handeUrlInputSubmit)

- records file drops in DropArea.jsx, see onDrop

- records entering the switchboard in DropArea.jsx/render
 

# Plans for future reporting 

### From where do users come
- report route invocation /vlo or /vcr or /fcs or /b2drop or /d4science

### Quality of resoure characteristics detection
- report resource-specific information 
  - resource mimetype
  - resource language
  - resource size

- record whether there's a mismatch between VLO-passed information on mimetype/language
  and such information obtained from Apache Tika


  
