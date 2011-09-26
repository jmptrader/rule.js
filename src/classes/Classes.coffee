rule.C = {}

((c, u) ->
	#= require "ClassBase"
	#= require "ClassRoot"
	#= require "ClassCondition"
	#= require "ClassConditionAnd"
	#= require "ClassConditionOr"
	#= require "ClassWhen"
	#= require "ClassMust"
	#= require "ClassSimpleElementsCondition"
	#= require "ClassEvent"
	#= require "ClassCustomEvent"
	#= require "ClassOtherwise"
	#= require "ClassAction"
	#= require "ClassSimpleElementsAction"

	#= require "validators/Validators"
)(rule.C, rule.U)
