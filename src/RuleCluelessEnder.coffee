#= require "Head"
	#= require "RuleInit"
	if ender? and ender.clue?
		rule.U = $.clue
	else
		throw "Must have Ender installed with Clue.js added for $.clue / ender.clue"

	#= require "classes/Classes"
	#= require "Methods"
	rule