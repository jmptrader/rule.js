class c.Root extends c.Base
	constructor: (args) ->
		return if arguments.length is 0
		args = u.toArray arguments if not u.isArray args
		@triggers = []
		@conditions = []
		@actions = []
		@actionsOtherwise = []
		@t = args.shift()
		@name = args.shift()
		while (r = args.shift())?
			r.connect @ if u.isFunction r.connect
		@
	setTrigger: (t) -> @triggers.push t
	setCondition: (c) -> @conditions.push c
	setAction: (a) -> @actions.push a
	setActionOtherwise: (a) -> @actionsOtherwise.push a
	trigger: (e, event) ->
		c = @conditionsSatisfied e, event
		@["invokeActions#{if c is _yes then '' else 'Otherwise'}"](e, event) if c isnt _fail
	conditionsSatisfied: (e, event) ->
		for cond in @conditions
			c = cond.satisfied(e, event)
			if u.isBoolean c
				c = if c then _yes else _no
			return c if c isnt _yes
		_yes
	invokeActions: (e, event) -> u.invoke @actions, 'trigger', e, event
	invokeActionsOtherwise: (e, event) -> u.invoke @actionsOtherwise, 'trigger', e, event
