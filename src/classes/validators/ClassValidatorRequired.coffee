class c.ValidatorRequired extends c.ValidatorBase
	constructor: (t, @elements, options) ->
		super t, @elements, options,
			trim: no
	valid: (value) ->
		value = @trim value
		value?.length > 0
	toString: -> 'ValidatorRequired'
