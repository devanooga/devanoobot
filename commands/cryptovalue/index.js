const winston = require('winston')

module.exports = async (req, res, next) => {
	try {
		var input = req.body.text || 'bitcoin';
		$.getJSON(
			'https://api.coinmarketcap.com/v1/ticker/?convert=usd', 
			function(data) {
				var results = data.filter(function(d) {
					return d.id === input.toLowerCase() || d.symbol.toLowerCase() === input.toLowerCase();
				});
				if(results.length === 1) {
					var crypto = results[0];
					res.send({
						text: crypto.name + '(' + crypto.symbol + ') - $' + crypto.price_usd + '(USD)',
						response_type: 'in_channel',
					});
				} else {
					res.send({
						text: 'Could not find crypto currency with the name: ' + input,
						response_type: 'ephemeral',
					});
				}
			}
		);
	}
	catch (error) {
		winston.error(error)
	}
};