#TODO: test this
class c.Must extends c.Base
	setCondition: (@childCondition) ->
		@parent.setCondition @ if @parent? and u.isFunction @parent.setCondition
	satisfied: ->
		if @childCondition? and u.isFunction @childCondition.satisfied
			s = @childCondition.satisfied()
			return _fail if s is no or s is _no
			return s
		_yes
	toString: -> 'Must'

