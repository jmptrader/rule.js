class c.Event extends c.Base
	constructor: (@eventType, @e, @options = {}) ->
		super(@eventType)
	connect: (r) ->
		super(r)
		@setTrigger @
		if @e? and @eventType?
			f = u.bind(@event, @)
			if @options.delayed?
				f = u.delayed f, @options.delayed
			else if @options.cumulativeDelayed?
				f = u.cumulativeDelayed f, @options.cumulativeDelayed
			u.observe @e, @eventType, f
	event: (event) -> @trigger @, event
	toString: -> "Event [#{if @t? then @t}]"
