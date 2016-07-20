'use strict';

var StringMask = require('string-mask');
var BrV = require('br-validations');
var maskFactory = require('mask-factory');
var conv = require('converters');

var cnpjPattern = new StringMask('00.000.000\/0000-00');
var cpfPattern = new StringMask('000.000.000-00');

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return conv.convertNumberToCpfCnpj(rawValue).replace(/[^\d]/g, '').slice(0, 14);
	},
	format: function(cleanValue) {
		var formatedValue;

		if (cleanValue.length > 11) {
			formatedValue = cnpjPattern.apply(cleanValue);
		} else {
			formatedValue = cpfPattern.apply(cleanValue) || '';
		}

		return formatedValue.trim().replace(/[^0-9]$/, '');
	},
	validations: {
		cpf: function(value) {
			return value.toString().length > 11 || BrV.cpf.validate(conv.convertNumberToCpfCnpj(value));
		},
		cnpj: function(value) {
			return value.toString().length <= 11 || BrV.cnpj.validate(conv.convertNumberToCpfCnpj(value));
		}
	}
});
