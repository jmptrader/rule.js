class c.SimpleElementsCondition extends c.Condition
	constructor: ->
		return if arguments.length is 0
		@args = u.toArray arguments
		super @args.shift()
		@func = @args.shift()
		@elements = @args.shift()
	toString: -> 'SimpleElementsCondition'
	satisfied: ->
		for e in u.elements(@elements)
			return no if not @func.apply(null, [e].concat(@args))
		return yes
