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
