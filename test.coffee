$.rule.domReady ->

	@define 'button click',
		@on		@click			'#testButton'
		@when	@hasClass		'#testButton', 'toggle'
		@do		@toggle			'.toggleable'
		@do		@show			'.showable'
		@do		@hide			'.hideable'

	@define 'sub-button click',
		@on		@click			'#subButton'
		@do		@toggleClass	'#testButton', 'toggle'

	@define 'complex conditions functional test',
		@on	@event		'#testElement', 'test:event'
		@when	@or,
				@when	@and,
						@when	@hasClass	'#testElement', 'eventable'
						@when	@hasClass	'#testElement', 'shortcut'
				@when	@hasClass	'#testElement', 'toggleable'
		@do	@toggle		'li, #para'
		


	@define 'form field validator functional test',
		@on		@event		'#validate', 'test:event'
		@validate	@required	'input[name=intInput]'
		@validate	@int		'input[name=intInput]'
		@validate	@int		'input[name=intInput2]', { trim: yes, min: -10, max: 0 }
		@validate	@float		'input[name=floatInput]', { trim: yes, minExclusive: 0, maxInclusive: 4.5 }
		@validate	@required	'input[type=radio]'
		@do		@show		'#correct'
		@otherwise	@show		'#incorrect'

