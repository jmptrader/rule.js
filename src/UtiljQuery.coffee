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

