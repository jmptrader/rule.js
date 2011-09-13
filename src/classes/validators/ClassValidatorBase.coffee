class c.ValidatorBase extends c.Condition
	constructor: (t, @elements, options, defaultOptions) ->
		return if arguments.length is 0
		super t
		@options = u.extend defaultOptions, options
	satisfied: ->
		values = @fieldValues()
		return yes for value in values when @valid(value)
		no
	fieldValues: ->
		values = u.fieldValue u.elements(@elements)
		values = [values] if not u.isArray values
		values
	valid: (value) -> no
	trim: (value) ->
		return u.trim(value) if @options.trim is yes
		value

