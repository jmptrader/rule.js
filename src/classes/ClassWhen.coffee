class c.When extends c.Base
	constructor: (t, child) ->
		return if arguments.length is 0
		if u.isFunction child
			args = u.toArray arguments
			args.shift()
			func = args.shift()
			child = func.apply null, args
		super t, child
	toString: -> 'When'
