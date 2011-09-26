class c.ValidatorBase extends c.Condition
	constructor: (t, @elements, options, defaultOptions) ->
		return if arguments.length is 0
		super t
		@options = u.extend defaultOptions, options
	satisfied: ->
		values = @fieldValues()
		for value in values
			valid = @valid(value)
			if @options.all is yes and not valid
				return no
			if @options.all isnt yes and valid
				return yes
		@options.all is yes
	fieldValues: ->
		values = u.fieldValue u.elements(@elements)
		values = [values] if not u.isArray values
		values
	valid: (value) -> no
	trim: (value) ->
		return u.trim(value) if @options.trim is yes
		value

