((name, definition) ->
	if typeof define is 'function' then define definition
	else if typeof module isnt 'undefined' and module.exports then module.exports = definition()
	else this[name] = definition()
)('clue', ->

	clue = (->
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

		if Prototype?

			elements = $$
			element = (id) ->
				return null if not id? or not isString(id)
				id = id.substring(1) if id.charAt(0) is '#'
				$ id
			observe = (ele, event, listener) ->
				ob = (e) -> Event.observe e, event, listener
				if isString ele then elements(ele).each ob else ob ele
			fire = (ele, event, memo) ->
				f = (e) -> Element.fire e, event, memo
				if Object.isString ele then elements(ele).each f else f ele
			hasClass = Element.hasClassName
			show = Element.show
			hide = Element.hide
			toggle = Element.toggle
			addClass = Element.addClassName
			removeClass = Element.removeClassName
			domReady = (f) -> document.observe 'dom:loaded', f
			fieldValue = (elements) ->
				ret = []
				ret.push(value) for key, value of Form.serializeElements elements, {hash: yes}
				return switch ret.length
					when 0 then null
					when 1 then ret[0]
					else ret
			
			## internal util
			styleValue = (e, key) -> $(e).getStyle key

		else if jQuery?

			elements = jQuery
			element = (id) ->
				return null if not id? or not isString(id) or id.length is 0
				id = '#' + id if id.charAt(0) isnt '#'
				ele = elements(id)
				return ele[0] if ele.length > 0
				null
			observe = (ele, event, listener) -> jQuery(ele).bind event, listener
			fire = (ele, event, memo) -> jQuery(ele).trigger event, memo
			show = (e) -> jQuery(e).show()
			hide = (e) -> jQuery(e).hide()
			toggle = (e) -> jQuery(e).toggle()
			hasClass = (e, c) -> jQuery(e).hasClass(c)
			addClass = (e, c) -> jQuery(e).addClass(c)
			removeClass = (e, c) -> jQuery(e).removeClass(c)
			domReady = (f) -> jQuery.ready f
			fieldValue = (elements) ->
				ret = []
				for ele in elements.serializeArray()
					ret.push(value) for key, value of ele when key is 'value'
				return switch ret.length
					when 0 then null
					when 1 then ret[0]
					else ret
			
			## internal util
			styleValue = (e, key) -> jQuery.css e, key
			

		else if ender?

			elements = ender
			element = (id) ->
				return null if not id? or not isString(id) or id.length is 0
				id = '#' + id if id.charAt(0) isnt '#'
				ele = elements(id)
				return ele[0] if ele.length > 0
				null
			observe = (ele, event, listener) -> ender(ele).bind event, listener
			fire = (ele, event, memo) -> ender(ele).emit event, memo
			show = (e) -> ender(e).show()
			hide = (e) -> ender(e).hide()
			toggle = (e) -> ender(e).toggle()
			hasClass = (e, c) -> ender(e).hasClass(c)
			addClass = (e, c) -> ender(e).addClass(c)
			removeClass = (e, c) -> ender(e).removeClass(c)
			domReady = (f) -> ender.domReady f
			fieldValue = (elements) ->
				ret = []
				for e in elements
					value = formSerializers[e.tagName.toLowerCase()](e)
					ret.push value if value isnt null
				return switch ret.length
					when 0 then null
					when 1 then ret[0]
					else ret
			
			## internal util
			styleValue = (e, key) -> ender(e).css key
			formSerializers = (->
				input = (e) ->
					return inputSelector(e) if (type = e.type.toLowerCase()) is 'checkbox' or type is 'radio'
					valueSelector(e)
				inputSelector = (e) -> if e.checked then e.value else null
				valueSelector = (e) -> e.value
				select = (e) -> if e.type.toLowerCase() is 'select-one' then selectOne(e) else selectMany(e)
				selectOne = (e) -> if (i = e.selectedIndex) >= 0 then optionValue(e.options[i]) else null
				selectMany = (e) ->
					return null if not e.length?
					values = []
					values.push(optionValue(o)) for o in e.options where o.selected
				optionValue = (e) -> if e.value? then e.value else e.text
				
				{ input: input, select: select, textarea: valueSelector, button: valueSelector }
			)()

		else
			throw "Clue.js must have one of Prototype, jQuery or Ender available in the execution environment"

		{
			isFunction: isFunction
			isString: isString
			isArray: isArray
			isRegex: isRegex
			toArray: toArray
			elements: elements
			element: element
			observe: observe
			fire: fire
			bind: bind
			hasClass: hasClass
			show: show
			hide: hide
			toggle: toggle
			isVisible: isVisible
			addClass: addClass
			removeClass: removeClass
			toggleClass: toggleClass
			invoke: invoke
			each: each
			domReady: domReady
			styleValue: styleValue
			extend: extend
			fieldValue: fieldValue
			trim: trim
			isInt: isInt
			isFloat: isFloat
			delayed: delayed
			cumulativeDelayed: cumulativeDelayed
		}
	)()

	clue._meta =
			version: '0.1'
			author: 'Rod Vagg <rod@vagg.org> @rvagg'
			description: 'Simple unified utility interface to a variety of popular JavaScript libraries'

	clue
)
