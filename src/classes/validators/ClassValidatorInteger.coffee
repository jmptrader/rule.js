class c.ValidatorInteger extends c.ValidatorBase
	constructor: (t, @elements, options) ->
		super t, @elements, options,
			trim: no
	valid: (value) ->
		value = @trim(value)
		return yes if value is ''
		return no if not u.isInt value
		i = parseInt value, 10
		return no if @options.max? and i > @options.max
		return no if @options.min? and i < @options.min
		yes
	toString: -> 'ValidatorInteger'

