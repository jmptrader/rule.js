((name, definition) ->
	if typeof define is 'function' then define definition
	else if typeof module isnt 'undefined' and module.exports then module.exports = definition()
	else this[name] = definition()
) 'rule', ->
