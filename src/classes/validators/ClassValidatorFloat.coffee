class c.ValidatorFloat extends c.ValidatorBase
	constructor: (t, @elements, options) ->
		super t, @elements, options,
			trim: no
	valid: (value) ->
		value = @trim(value)
		return yes if value is ''
		return no if not u.isFloat value
		f = parseFloat value, 10
		return no if @options.maxInclusive? and f > @options.maxInclusive
		return no if @options.minInclusive? and f < @options.minInclusive
		return no if @options.maxExclusive? and f >= @options.maxExclusive
		return no if @options.minExclusive? and f <= @options.minExclusive
		yes
	toString: -> 'ValidatorFloat'

