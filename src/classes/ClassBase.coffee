class c.Base
	constructor: (@t, @child) ->
	connect: (@parent) ->
		@child.connect @ if u.isFunction @child?.connect
	setTrigger: (t) ->
		@parent.setTrigger t if @parent? and u.isFunction @parent.setTrigger
	setCondition: (c) ->
		@parent.setCondition c if @parent? and u.isFunction @parent.setCondition
	setAction: (a) ->
		@parent.setAction a if @parent? and u.isFunction @parent.setAction
	setActionOtherwise: (ao) ->
		@parent.setActionOtherwise ao if @parent? and u.isFunction @parent.setActionOtherwise
	trigger: (c, event) ->
		@parent.trigger c, event if @parent? and u.isFunction @parent.trigger
	toString: -> 'Base'
