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
		@["invokeActions#{if @conditionsSatisfied(e, event) then '' else 'Otherwise'}"](e, event)
	conditionsSatisfied: (e, event) ->
		for c in @conditions
			return no if not c.satisfied(e, event)
		yes
	invokeActions: (e, event) -> u.invoke @actions, 'trigger', e, event
	invokeActionsOtherwise: (e, event) -> u.invoke @actionsOtherwise, 'trigger', e, event
