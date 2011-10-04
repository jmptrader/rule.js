class c.ConditionOr extends c.ConditionAnd
	conditionsSatisfied: (e, event) ->
		for cond in @conditions
			c = cond.satisfied(e, event)
			return yes if c is true or c is _yes
		no
	toString: -> 'Or'