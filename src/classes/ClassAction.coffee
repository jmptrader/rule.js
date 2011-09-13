class c.Action extends c.Base
	toString: -> 'Action'
	connect: (r) ->
		super(r)
		@setAction @
	trigger: ->
