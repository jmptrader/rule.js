rule.U = (->
	lib = if Prototype?
			'prototype'
		else if jQuery?
			'jquery'
		else if ender?
			'ender'
		else
			'unknown'

	# internal functions defined by libaries
	styleValue = (e, key) ->
	
	isFunction = (f) -> Object.prototype.toString.call(f) is '[object Function]'
	isString = (s) -> Object.prototype.toString.call(s) is '[object String]'
	isArray = (a) -> Object.prototype.toString.call(a) is '[object Array]'
	isRegex = (a) -> Object.prototype.toString.call(a) is '[object RegExp]'
	toArray = (a) ->
		return null if not a?
		return a.toArray() if Object(a)['toArray']?
		ret = new Array(length = (a.length || 0))
		while length--
			ret[length] = a[length]
		ret
	bind = (f, ctx) -> return -> f.apply ctx, arguments
	toggleClass = (e, c) -> if hasClass e, c then removeClass e, c else addClass e, c
	invoke = ->
		args = toArray arguments
		arr = args.shift()
		func = args.shift()
		e[func].apply(e, args) for e in arr
	each = (arr, func, args) -> func.apply(null, [e].concat(args)) for e in arr; yes
	extend = (dst, src) ->
		return null if not dst?
		return dst if not src?
		dst[key] = value for key, value of src
		dst
	trim = (s) -> s = /^\s*(.*)$/.exec(s.replace(/^(.*\S)\s*$/, '$1'))[1] if s?; s
	isInt = (s) ->
		return no if s.indexOf(' ') isnt -1 # no forgiveness!
		return no if s is '' or parseInt(s, 10) isnt (s * 1)
		return yes
	isFloat = (s) ->
		return no if s.indexOf(' ') isnt -1 # no forgiveness!
		return no if s is '' or parseFloat(s, 10) isnt (s * 1)
		return yes
	
	#String::trim = -> /^\s*(.*)$/.exec(@replace(/^(.*\S)\s*$/, '$1'))[1]
	#jstestdriver.console.log("TRIM: [#{"   \t a long string  ".trim()}]")

	isVisible = (e) ->
		while e and e.parentNode
			return no if styleValue(e, 'display') is 'none'
			e = e.parentNode
		yes

	delayed = ->
		args = toArray arguments
		func = args.shift()
		timeout = args.shift() * 1000
		f = -> func.apply func, args
		-> setTimeout f, timeout
	cumulativeDelayed = ->
		args = toArray arguments
		func = args.shift()
		timeout = args.shift() * 1000
		__delayedId = null
		->
			_args = args.concat toArray(arguments)
			if __delayedId isnt null then clearTimeout(__delayedId)
			f = -> func.apply f, _args
			__delayedId = setTimeout f, timeout

	if lib is 'jquery'
		#= require "UtiljQuery"
	else if lib is 'prototype'
		#= require "UtilPrototype"
	else if lib is 'ender'
		#= require "UtilEnder"
	else
		throw "PrototypeJS or jQuery required for rule.js"

	#= require "UtilFunctionMap"

)()
