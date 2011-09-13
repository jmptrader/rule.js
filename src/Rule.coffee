rule = (f) -> rule.U.bind(f, rule)(rule)
rule.domReady = (f) ->	rule.U.domReady rule.U.bind(f, rule)
rule._meta =
	version: '0.1'
	author: 'Rod Vagg <rod@vagg.org> @rvagg'

//= require "Util"
//= require "classes/Classes"
//= require "Methods"

if typeof module isnt 'undefined'
	module.exports = rule
else
	@['rule'] = rule

