'use strict';

var StringMask = require('string-mask');
var BrV = require('br-validations');
var maskFactory = require('mask-factory');
var conv = require('converters');

var cpfPattern = new StringMask('000.000.000-00');

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return conv.convertNumberToCpfCnpj(rawValue).replace(/[^\d]/g, '').slice(0, 11);
	},
	format: function(cleanValue) {
		return (cpfPattern.apply(cleanValue) || '').trim().replace(/[^0-9]$/, '');
	},
	validations: {
		cpf: function(value) {
			return value === 0 || BrV.cpf.validate(conv.convertNumberToCpfCnpj(value));
		}
	}
});
