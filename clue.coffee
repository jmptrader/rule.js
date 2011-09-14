((name, definition) ->
	if typeof define is 'function' then define definition
	else if typeof module isnt 'undefined' and module.exports then module.exports = definition()
	else this[name] = definition()
) 'clue', ->
	clue =
		_meta:
			version: '0.1'
			author: 'Rod Vagg <rod@vagg.org> @rvagg'
			description: 'Simple unified utility interface to a variety of popular JavaScript libraries'
	
		extend: (dst, src) ->
			return null if not dst?
			return dst if not src?
			dst[key] = value for key, value of src
			dst
	clue.extend clue, ((clue) ->
		isFunction = (f) -> Object.prototype.toString.call(f) is '[object Function]'
		isString = (s) -> Object.prototype.toString.call(s) is '[object String]'
		isArray = (a) -> Object.prototype.toString.call(a) is '[object Array]'
		isRegExp = (a) -> Object.prototype.toString.call(a) is '[object RegExp]'
	
		#TODO: test these 3
		isBoolean = (a) -> Object.prototype.toString.call(a) is '[object Boolean]'
		isNumber = (a) -> Object.prototype.toString.call(a) is '[object Number]'
		isPrimitive = (o) -> o? and (clue.isString(o) or clue.isNumber(o) or clue.isBoolean(o) or clue.isRegExp(o))
	
		###
		TODO: test these
		type = jQuery.type
		###
	
		isInt = (s) ->
			return no if s.indexOf(' ') isnt -1 # no forgiveness!
			return no if s is '' or parseInt(s, 10) isnt (s * 1)
			return yes
		isFloat = (s) ->
			return no if s.indexOf(' ') isnt -1 # no forgiveness!
			return no if s is '' or parseFloat(s, 10) isnt (s * 1)
			return yes
		toArray = (a) ->
			return null if not a?
			return a.toArray() if Object(a)['toArray']?
			ret = new Array(length = (a.length || 0))
			while length--
				ret[length] = a[length]
			ret
		bind = (f, ctx) -> return -> f.apply ctx, arguments
		toggleClass = (e, c) -> if clue.hasClass e, c then clue.removeClass e, c else clue.addClass e, c
		#TODO: test this
		contains = (e, a) -> clue.indexOf(e, a) isnt -1
		###
		TODO: test these 2
		stopEvent = (e) -> e.stopPropagation()
		indexOf = jQuery.inArray
		###
		invoke = ->
			args = toArray arguments
			arr = args.shift()
			func = args.shift()
			e[func].apply(e, args) for e in arr
		each = (arr, func, args) -> func.apply(null, [e].concat(args)) for e in arr; yes
		trim = (s) -> s = /^\s*(.*)$/.exec(s.replace(/^(.*\S)\s*$/, '$1'))[1] if s?; s
		isVisible = (e) ->
			while e and e.parentNode
				return no if clue.styleValue(e, 'display') is 'none'
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
		
		{
			isFunction: isFunction
			isString: isString
			isArray: isArray
			isRegExp: isRegExp
			isBoolean: isBoolean
			isNumber: isNumber
			isPrimitive: isPrimitive
			isInt: isInt
			isFloat: isFloat
			toArray: toArray
			bind: bind
			toggleClass: toggleClass
			contains: contains
			invoke: invoke
			each: each
			trim: trim
			isVisible: isVisible
			delayed: delayed
			cumulativeDelayed: cumulativeDelayed
		}
	)(clue)
	if Prototype?
		clue.extend clue, ((clue) ->
			isArray = Object.isArray
			isString = Object.isString
			isNumber = Object.isNumber
			isFunction = Object.isFunction
			type = Object.inspect
			elements = $$
			element = (id) ->
				return null if not id? or not clue.isString(id)
				id = id.substring(1) if id.charAt(0) is '#'
				$ id
			observe = (ele, event, listener) ->
				ob = (e) -> Event.observe e, event, listener
				if clue.isString ele then elements(ele).each ob else ob ele
			fire = (ele, event, memo) ->
				f = (e) -> Element.fire e, event, memo
				if clue.isString ele then elements(ele).each f else f ele
			stopEvent = Event.stop
			indexOf = (value, array) -> Array.prototype.indexOf.apply(array, [ value ])
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
			styleValue = (e, key) -> $(e).getStyle key
			
			{
				isArray: isArray
				isString: isString
				isNumber: isNumber
				isFunction: isFunction
				type: type
				elements: elements
				element: element
				observe: observe
				fire: fire
				stopEvent: stopEvent
				indexOf: indexOf
				show: show
				hide: hide
				toggle: toggle
				hasClass: hasClass
				addClass: addClass
				removeClass: removeClass
				domReady: domReady
				fieldValue: fieldValue
				styleValue: styleValue
			}
		)(clue)
	if jQuery?
		clue.extend clue, ((clue) ->
	
			isArray = jQuery.isArray
			isString = (o) -> jQuery.type(o) is 'string'
			isNumber = (o) -> jQuery.type(o) is 'number'
			isFunction = jQuery.isFunction
			isBoolean = (o) -> jQuery.type(o) is 'boolean'
			isRegExp = (o) -> jQuery.type(o) is 'regexp'
			type = jQuery.type
	
			elements = jQuery
			element = (id) ->
				return null if not id? or not clue.isString(id) or id.length is 0
				id = '#' + id if id.charAt(0) isnt '#'
				ele = elements(id)
				return ele[0] if ele.length > 0
				null
			observe = (ele, event, listener) -> jQuery(ele).bind event, listener
			fire = (ele, event, memo) -> jQuery(ele).trigger event, memo
			stopEvent = (e) -> e.stopPropagation()
			indexOf = jQuery.inArray
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
			styleValue = (e, key) -> jQuery.css e, key
			
			{
				isArray: isArray
				isString: isString
				isNumber: isNumber
				isFunction: isFunction
				isBoolean: isBoolean
				isRegExp: isRegExp
				type: type
				elements: elements
				element: element
				observe: observe
				fire: fire
				stopEvent: stopEvent
				indexOf: indexOf
				show: show
				hide: hide
				toggle: toggle
				hasClass: hasClass
				addClass: addClass
				removeClass: removeClass
				domReady: domReady
				fieldValue: fieldValue
				styleValue: styleValue
			}
		)(clue)
	if ender?
		clue.extend clue, ((clue) ->
			elements = ender
			element = (id) ->
				return null if not id? or not clue.isString(id) or id.length is 0
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
			styleValue = (e, key) -> ender(e).css key
			## internal util
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
			
			{
				elements: elements
				element: element
				observe: observe
				fire: fire
				show: show
				hide: hide
				toggle: toggle
				hasClass: hasClass
				addClass: addClass
				removeClass: removeClass
				domReady: domReady
				fieldValue: fieldValue
				styleValue: styleValue
			}
		)(clue)
	if not clue.element?
		throw "Clue.js must have one of Prototype, jQuery or Ender available in the execution environment"
	clue
