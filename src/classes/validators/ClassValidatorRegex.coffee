class c.ValidatorRegex extends c.ValidatorBase
	constructor: (t, @elements, options) ->
		if u.isString options
			@regex = new RegExp options
			options = {}
		if u.isRegExp options
			@regex = options
			options = {}
		super t, @elements, options,
			trim: no
		if @options.regex?
			if u.isString @options.regex
				@regex = new RegExp(@options.regex, if @options.options? then @options.options else '')
			if u.isRegExp @options.regex
				@regex = @options.regex
	valid: (value) ->
		value = @trim(value)
		return yes if value is ''
		return @regex.test(value) if @regex?
		no
	toString: -> 'ValidatorRegex'

