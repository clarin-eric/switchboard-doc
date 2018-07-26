[//]: # "C. Zinn, Time-stamp: <2018-07-26 15:28:50 (zinn)>"

# Piwik reporting

- Piwik is initialized in App.jsx, the main component of the switchboard.

- Piwik gets a report whenever a Tool or WebService is invoked. This happens in Tool.jsx where the
  invoked tool/web service is recorded



# Plans for future reporting 

### From where do users come
- report route invocation /vlo or /vcr or /fcs or /b2drop or /d4science

### How do they file their input with direct access to LRS
- in 'standalone mode', report 
  - file drop OR
  - text drop OR
  - URL  drop

### Quality of resoure characteristics detection
- report resource-specific information 
  - resource mimetype
  - resource language
  - resource size

- record whether there's a mismatch between VLO-passed information on mimetype/language
  and such information obtained from Apache Tika

- record whether users change the mimetype/language after it is automatically set by
  switchboard 

  
