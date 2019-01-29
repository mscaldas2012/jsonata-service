'use sctrict';

module.exports = {
    ping, about
  };
function ping(req, res) {
    res.json({success: 1, description: "Hello there, you pinged me!"});
}

function about(req, res) {
    res.json({success: 1, description: "Information about this service", contacts: "mcaldas@cdc.gov"});
}