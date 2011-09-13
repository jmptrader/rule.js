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
