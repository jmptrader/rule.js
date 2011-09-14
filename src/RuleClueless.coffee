#= require "Head"
	#= require "RuleInit"
	if clue?
		rule.U = clue
	else
		throw "Must have Clue.js available in the execution environment as 'clue'"

	#= require "classes/Classes"
	#= require "Methods"
	rule