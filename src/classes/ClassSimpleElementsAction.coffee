class c.SimpleElementsAction extends c.Action
	constructor: ->
		return if arguments.length is 0
		@args = u.toArray arguments
		super @args.shift()
		@func = @args.shift()
		@elements = @args.shift()
	toString: -> 'SimpleElementsAction'
	trigger: -> u.each u.elements(@elements), @func, @args
