#= require "Head"
	#= require "RuleInit"
	rule.U = (->
		module = { exports: {} }
		#= require "../clue"
		module.exports
	)()
	#= require "classes/Classes"
	#= require "Methods"
	rule
