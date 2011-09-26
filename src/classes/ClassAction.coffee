class c.Action extends c.Base
	toString: -> 'Action'
	connect: (r) ->
		super(r)
		@setAction @
	trigger: ->
		# TODO: test raw functions passed through @do @run -> X
		if u.isFunction @child?.trigger
			@child.trigger @
		else if u.isFunction @child
			@child @
