'use strict';

var specList = {}

exports.getSpec = function (specname) {
    return specList[specname];
}

exports.addSpec = function (specName, newspec) {
    specList[specName] = newspec;
}

exports.getExistingSpec = function(specname) {
    return specList[specname];
}