class c.ConditionAnd extends c.Root
	constructor: (args) ->
		return if arguments.length is 0
		args = u.toArray arguments if not u.isArray args
		args = [ @toString().toLowerCase(), @toString().toLowerCase() ].concat args
		super(args)
		@
	connect: (@parent) ->
		@parent.setCondition @ if @parent? and u.isFunction @parent.setCondition
	satisfied: (e, event) -> @conditionsSatisfied e, event
	toString: -> 'And'