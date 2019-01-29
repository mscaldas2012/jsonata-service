'use sctrict';

var jsonata = require('jsonata');
var specs = require('../service/specificationService')

module.exports = {
    transform
  };

//POST /transform/{specName}  
function transform(req, res) {
    var specName =  req.swagger.params['specName'].value ;
    console.log("spec: " + specName);
    var spec = specs.getExistingSpec(specName)
    if (spec) {
        var expression = jsonata(spec);
        var result = expression.evaluate(JSON.parse(req.body));
        res.json(result);
    } else {
        res.status(400).json({status: 400, message: "Unable to find specification for provided name: " + specName})
    }
}
