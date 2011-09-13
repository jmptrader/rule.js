class c.Condition extends c.Base
	toString: -> 'Condition'
	connect: (r) ->
		super(r)
		@setCondition @
	satisfied: (c, event) -> yes
