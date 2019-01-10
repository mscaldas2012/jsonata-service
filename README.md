# JSONata-NodeJs-Processor

a Node Js based project to JSONata processing as a web service.

The purpose of this project is as a prototype to provide a basic web service 
to accept an input json and an input JSONata, and provide the JSONata 
processed ‘input json’ as output. There are several required packages, 
‘jsonata’, ‘fs’, ‘dotenv’, ‘express’ and ‘body-parser’. These support 
a variety of needed functions that are currently used and to support 
future configurations. The program consists of a web server with two 
‘Posts’ and a ‘Get’.   This app can be run with ‘sudo node jsonataserver.js’, 
or It can be run from Docker by running the build 
with ‘sudo docker build  -t ubuntuadmin/docker_web_env3 .’ and then 
running it with ‘sudo docker run -p 8626:8081 -d ubuntuadmin/docker_web_env3’. 

Current server paths are:

Path	        Description

/api/inputJson	Post function: 

    Takes the json to be processed in the body.

/api/jsonata    Post function: 

    This takes the jsonata to tranaform the body.
                
    It is added to an array. Takes two parameters jsonataid a guid,
                
    and jsonatadesc a description of the jsonata.
                
                
/api/jsonata/list

    Provides a list of the Jsonata Transforms that have been added.
/api/result	    Get function:

    this takes one parameter, an integer, 

    for accessing the array the jsonata is tored in. 
                
    This will be used to process the current jsoninput,
                
    and then return the result.
                
/api/info/ping  Get function:

    returns 'Ok'.

/api/info/about Get function: 

    returns description of code.

/api/info/versio    Get function: 

    returns the version number.

