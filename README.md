crm
===

Using Spring rest-shell:

The current spring-rest shell does not support templated urls using HAL. 
This fork does: https://github.com/faisalferoz/rest-shell
Follow the Readme to build and install.

Unfortunately, the HTTP method PATCH is not supported by the fork above.
I have forked the fork to make the shell support patch.

Details coming soon.

Search API Example:

ContactsRepository has two custom methods:

http://localhost:9090/contacts:> follow search
http://localhost:9090/contacts/search:> get
> GET http://localhost:9090/contacts/search

< 200 OK
< Server: Apache-Coyote/1.1
< X-Application-Context: application:dev:9090
< Content-Type: application/hal+json
< Transfer-Encoding: chunked
< Date: Sun, 06 Apr 2014 23:54:25 GMT
<
{
  "_links" : {
    "crm:findByLastName" : {
      "href" : "http://localhost:9090/contacts/search/findByLastName"
    },
    "crm:findByFirstName" : {
      "href" : "http://localhost:9090/contacts/search/findByFirstName"
    },
    "curies" : [ {
      "href" : "http://localhost:9090/rels/{rel}",
      "name" : "crm",
      "templated" : true
    } ]
  }
}

This requires the repository methods that accept query parameters to be annotated with @Param(value = "paramNameHere")

http://localhost:9090/contacts:> get search/findByFirstName --params "{firstName: 'Shane'}"
> GET http://localhost:9090/contacts/search/findByFirstName?firstName=Shane


