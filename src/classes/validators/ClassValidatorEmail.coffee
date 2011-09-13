class c.ValidatorEmail extends c.ValidatorRegex
	constructor: (t, @elements, options) ->
		super t, @elements, options,
			trim: no
		# I'm not inclined to go the whole hog: http://www.ex-parrot.com/pdw/Mail-RFC822-Address.html
		@regex = new RegExp '^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@([A-Za-z0-9-])+(\\.[A-Za-z0-9-]+)*((\\.[A-Za-z0-9]{2,})|(\\.[A-Za-z0-9]{2,}\\.[A-Za-z0-9]{2,}))$'
