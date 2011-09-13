((name, definition) ->
	if typeof define is 'function' then define definition
	else if typeof module isnt 'undefined' and module.exports then module.exports = definition()
	else this[name] = definition()
)('rule', ->
	rule = (f) -> rule.U.bind(f, rule)(rule)
	rule.domReady = (f) ->	rule.U.domReady rule.U.bind(f, rule)
	rule._meta =
		version: '0.1'
		author: 'Rod Vagg <rod@vagg.org> @rvagg'
	
	#= require "Util"
	#= require "classes/Classes"
	#= require "Methods"

	rule
)