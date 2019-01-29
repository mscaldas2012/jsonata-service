'use strict';

module.exports = { getSpec, saveSpec, updateSpec, deleteSpec };


//var specList = {};
var Specification = require('../service/specificationService');

//GET /spec/{specName} operationId
function getSpec(req, resp) {
    var specName = req.swagger.params['specName'].value ;
    console.log('Retrieving spec');
    resp.json(Specification.getSpec(specName));
}

//POST /spec/{specName} operationId
function saveSpec(req, resp) {
    var specName = req.swagger.params['specName'].value ;
    var newSpec = req.body;
    Specification.addSpec(specName, newSpec);
    //specList[specName] = newSpec;
    resp.json({success: 1, description: "specification saved!"})
}

//PUT /spec/{specName} operationId
function updateSpec(req, resp) {

}

//DELETE /spec/{specName} operationId
function deleteSpec(req, resp) {

}

