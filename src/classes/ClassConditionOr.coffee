class c.ConditionOr extends c.ConditionAnd
	conditionsSatisfied: (e, event) ->
		for c in @conditions
			return yes if c.satisfied(e, event)
		no
	toString: -> 'Or'