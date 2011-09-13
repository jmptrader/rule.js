class c.CustomEvent extends c.Event
	constructor: (t, e, eventType, options = {}) ->
		super(t, e, options)
		@eventType = eventType
		@t = t
