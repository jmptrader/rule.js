UtilTest = new TestCase "UtilTest"

testCase UtilTest, "isFunction", ->
	assertTrue rule.U.isFunction ->
	assertFalse rule.U.isFunction 'not a function'
	assertFalse rule.U.isFunction 100
	assertFalse rule.U.isFunction {}

testCase UtilTest, "isFunction handles null and undefined", ->
	assertFalse rule.U.isFunction null
	assertFalse rule.U.isFunction undefined

testCase UtilTest, "isString", ->
	assertTrue rule.U.isString 'a string'
	assertFalse rule.U.isString ->
	assertFalse rule.U.isString 100
	assertFalse rule.U.isString {}

testCase UtilTest, "isString handles null and undefined", ->
	assertFalse rule.U.isString null
	assertFalse rule.U.isString undefined

testCase UtilTest, "isArray", ->
	assertTrue rule.U.isArray []
	assertTrue rule.U.isArray [1, 2, 3]
	assertFalse rule.U.isArray ->
	assertFalse rule.U.isArray 'not an array'
	assertFalse rule.U.isArray 100
	assertFalse rule.U.isArray {}

testCase UtilTest, "isArray handles null and undefined", ->
	assertFalse rule.U.isArray null
	assertFalse rule.U.isArray undefined

testCase UtilTest, "toArray handles null and undefined", ->
	assertNull rule.U.toArray null
	assertNull rule.U.toArray undefined

testCase UtilTest, "toArray handles array", ->
	arr = [1,2,3]
	assertEquals arr, rule.U.toArray arr
	assertEquals arr, rule.U.toArray arr

testCase UtilTest, "toArray arguments object", ->
	getArgs = -> return arguments

	assertTrue getArgs(1,2,3,4)['shift'] is undefined # sanity check
	assertTrue rule.U.toArray(getArgs(1,2,3,4))['shift'] isnt undefined
	assertTrue rule.U.isFunction(rule.U.toArray(getArgs(1,2,3,4))['shift'])

testCase UtilTest, "elements, single element by id", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li class="l">notme!</li><li class="l">three</li></div> */
	`
	
	ele = rule.U.elements '#testElement'
	assertEquals 1, ele.length
	assertEquals 'testElement', ele[0].id
	assertEquals 'P', ele[0].tagName

testCase UtilTest, "element, plain id", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li class="l">notme!</li><li class="l">three</li></div> */
	`
	
	ele = rule.U.element 'testElement'
	assertEquals 'testElement', ele.id
	assertEquals 'P', ele.tagName

testCase UtilTest, "element, hash id", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li class="l">notme!</li><li class="l">three</li></div> */
	`
	
	ele = rule.U.element '#testElement'
	assertEquals 'testElement', ele.id
	assertEquals 'P', ele.tagName

testCase UtilTest, "element, no such id", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li class="l">notme!</li><li class="l">three</li></div> */
	`
	
	ele = rule.U.element '#noSuchElement'
	assertNull ele

testCase UtilTest, "elements, multi element by ids", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li class="l">notme!</li><li class="l">three</li></div> */
	`
	
	ele = rule.U.elements '#testElement, #firstli'
	assertEquals 2, ele.length
	assertEquals 'testElement', ele[0].id
	assertEquals 'P', ele[0].tagName
	assertEquals 'firstli', ele[1].id
	assertEquals 'LI', ele[1].tagName


testCase UtilTest, "elements, multi element by complex selector", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`
	
	ele = rule.U.elements '#testElement, li.l'
	assertEquals 4, ele.length
	assertEquals 'testElement', ele[0].id
	assertEquals 'P', ele[0].tagName
	assertEquals 'firstli', ele[1].id
	assertEquals 'LI', ele[1].tagName
	assertEquals 'LI', ele[2].tagName
	assertEquals 'LI', ele[3].tagName

testCase UtilTest, "observe and fire, single element, as element", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`
	
	fired = no
	listener = -> fired = yes
	ele = rule.U.element("#testElement")

	rule.U.observe ele, 'test:event', listener
	assertFalse fired
	rule.U.fire ele, 'test:event'
	assertTrue fired

testCase UtilTest, "observe and fire, single element, as selector", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`
	
	fired = no
	listener = -> fired = yes
	ele = '#testElement'

	rule.U.observe ele, 'test:event', listener
	assertFalse fired
	rule.U.fire ele, 'test:event'
	assertTrue fired

testCase UtilTest, "observe and fire, multi element", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`
	
	fired = 0
	listener = -> fired++
	ele = 'li.l'

	rule.U.observe ele, 'test:event', listener
	assertEquals 0, fired
	rule.U.fire ele, 'test:event'
	assertEquals 3, fired

testCase UtilTest, "bind", ->
	o = { i: 0 }
	f = -> @i++ if @i?

	assertEquals 0, o.i
	f()
	assertEquals 0, o.i
	fbound = rule.U.bind f, o
	f()
	assertEquals 0, o.i
	fbound()
	assertEquals 1, o.i
	fbound()
	assertEquals 2, o.i

testCase UtilTest, "show", ->
	`/*:DOC += <div><p id="testElement" style="display: none;">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals 'display:none', spacelessStyle 'testElement'
	r = rule.U.show rule.U.element("#testElement")
	assertEquals '', spacelessStyle 'testElement'

testCase UtilTest, "show, not hidden", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals '', spacelessStyle 'testElement'
	r = rule.U.show rule.U.element("#testElement")
	assertEquals '', spacelessStyle 'testElement'

testCase UtilTest, "hide, hidden", ->
	`/*:DOC += <div><p id="testElement" style="display: none;">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals 'display:none', spacelessStyle 'testElement'
	r = rule.U.hide rule.U.element("#testElement")
	assertEquals 'display:none', spacelessStyle 'testElement'

testCase UtilTest, "hide", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals '', spacelessStyle 'testElement'
	r = rule.U.hide rule.U.element("#testElement")
	assertEquals 'display:none', spacelessStyle 'testElement'

testCase UtilTest, "toggle", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals '', spacelessStyle 'testElement'
	r = rule.U.toggle ele = rule.U.element("#testElement")
	assertEquals 'display:none', spacelessStyle 'testElement'
	r = rule.U.toggle ele
	assertTrue spacelessStyle('testElement') is '' or spacelessStyle('testElement') is 'display:block'
	r = rule.U.toggle ele
	assertEquals 'display:none', spacelessStyle 'testElement'
	
testCase UtilTest, "addClass", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals '', classNames 'testElement'
	r = rule.U.addClass rule.U.element("#testElement"), "newClass"
	assertEquals 'newClass', classNames 'testElement'
	r = rule.U.addClass rule.U.element("#testElement"), "newClass"
	assertEquals 'newClass', classNames 'testElement'
	
testCase UtilTest, "addClass to existing", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals 'l leaveme leavemetoo', classNames 'firstli'
	r = rule.U.addClass rule.U.element("#firstli"), "l"
	assertEquals 'l leaveme leavemetoo', classNames 'firstli'
	r = rule.U.addClass rule.U.element("#firstli"), "newClass"
	assertEquals 'l leaveme leavemetoo newClass', classNames 'firstli'

testCase UtilTest, "removeClass", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals 'l leaveme leavemetoo', classNames 'firstli'
	r = rule.U.removeClass rule.U.element("#firstli"), "bzzt"
	assertEquals 'l leaveme leavemetoo', classNames 'firstli'
	r = rule.U.removeClass rule.U.element("#firstli"), "l"
	assertEquals 'leaveme leavemetoo', classNames 'firstli'

testCase UtilTest, "toggleClass", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals 'l leaveme leavemetoo', classNames 'firstli'
	r = rule.U.toggleClass rule.U.element("#firstli"), "bzzt"
	assertEquals 'l leaveme leavemetoo bzzt', classNames 'firstli'
	r = rule.U.toggleClass rule.U.element("#firstli"), "bzzt"
	assertEquals 'l leaveme leavemetoo', classNames 'firstli'
	r = rule.U.toggleClass rule.U.element("#firstli"), "l"
	assertEquals 'leaveme leavemetoo', classNames 'firstli'
	r = rule.U.toggleClass rule.U.element("#firstli"), "l"
	assertEquals 'leaveme leavemetoo l', classNames 'firstli'

testCase UtilTest, "invoke", ->
	calls = 0
	o1 = { call: -> calls += 1 }
	o2 = { call: -> calls += 2 }
	o3 = { call: -> calls += 10 }
	assertEquals 0, calls
	rule.U.invoke [ o1, o2, o3 ], 'call'
	assertEquals 13, calls
 
testCase UtilTest, "invoke with arg", ->
	calls = 0
	o1 = { call: (i) -> calls += 1 + i}
	o2 = { call: -> calls += 2 }
	o3 = { call: (i, j) -> calls += 10 + j }
	assertEquals 0, calls
	rule.U.invoke [ o1, o2, o3 ], 'call', 100, 1000
	assertEquals 1113, calls
 
testCase UtilTest, "each", ->
	o1 = { count: 0 }
	o2 = { count: 1 }
	o3 = { count: 2 }
	f = (o) -> o.count++
	rule.U.each [ o1, o2, o3 ], f
	assertEquals 1, o1.count
	assertEquals 2, o2.count
	assertEquals 3, o3.count
 
testCase UtilTest, "each with arg", ->
	o1 = { count: 0 }
	o2 = { count: 1 }
	o3 = { count: 2 }
	f = (o, a1, a2) -> o.count = o.count + a1 - a2
	rule.U.each [ o1, o2, o3 ], f, [ 1000, 100 ]
	assertEquals 900, o1.count
	assertEquals 901, o2.count
	assertEquals 902, o3.count

testCase UtilTest, "extend with null args", ->
	assertNull rule.U.extend null, null

testCase UtilTest, "extend with null second arg", ->
	obj = { k: 'v' }
	ret = rule.U.extend obj, null
	assertNotNull ret
	assertEquals 'v', ret.k

testCase UtilTest, "extend", ->
	obj1 = { k: 'v', k2: 'v2' }
	x = {}
	obj2 = { o2k: 'ov2', x: x }
	ret = rule.U.extend obj1, obj2
	assertNotNull ret
	assertEquals 'v', ret.k
	assertEquals 'v2', ret.k2
	assertEquals 'ov2', ret.o2k
	assertSame x, ret.x

testCase UtilTest, "fieldValue input type=text", ->
	`/*:DOC += <div><form><input name="tinp" id="tinp" type="text" value="text value"><input name="rinp" type="radio" value="value1"><input name="rinp" type="radio" value="value2" checked><input name="rinp" type="radio" value="value3"><input name="cinp" type="checkbox" value="cvalue1" checked><input name="cinp" type="checkbox" value="cvalue2"><input name="cinp" type="checkbox" value="cvalue3" checked><textarea name="tainp">contents of the textarea</textarea><select name="sinp"><option value="one">1</option><option value="two" selected>2</option><option value="three">3</option></select></form></div> */
	`
	assertEquals "text value", rule.U.fieldValue(rule.U.elements("#tinp"))

testCase UtilTest, "fieldValue input type=radio", ->
	`/*:DOC += <div><form><input name="tinp" id="tinp" type="text" value="text value"><input name="rinp" type="radio" value="value1"><input name="rinp" type="radio" value="value2" checked><input name="rinp" type="radio" value="value3"><input name="cinp" type="checkbox" value="cvalue1" checked><input name="cinp" type="checkbox" value="cvalue2"><input name="cinp" type="checkbox" value="cvalue3" checked><textarea name="tainp">contents of the textarea</textarea><select name="sinp"><option value="one">1</option><option value="two" selected>2</option><option value="three">3</option></select></form></div> */
	`
	assertEquals "value2", rule.U.fieldValue(rule.U.elements("input[type=\"radio\"]"))

testCase UtilTest, "fieldValue input type=checkbox", ->
	`/*:DOC += <div><form><input name="tinp" id="tinp" type="text" value="text value"><input name="rinp" type="radio" value="value1"><input name="rinp" type="radio" value="value2" checked><input name="rinp" type="radio" value="value3"><input name="cinp" type="checkbox" value="cvalue1" checked><input name="cinp" type="checkbox" value="cvalue2"><input name="cinp" type="checkbox" value="cvalue3" checked><textarea name="tainp">contents of the textarea</textarea><select name="sinp"><option value="one">1</option><option value="two" selected>2</option><option value="three">3</option></select></form></div> */
	`
	assertEquals ["cvalue1","cvalue3"], rule.U.fieldValue(rule.U.elements("input[type=checkbox]"))

testCase UtilTest, "fieldValue textarea", ->
	`/*:DOC += <div><form><input name="tinp" id="tinp" type="text" value="text value"><input name="rinp" type="radio" value="value1"><input name="rinp" type="radio" value="value2" checked><input name="rinp" type="radio" value="value3"><input name="cinp" type="checkbox" value="cvalue1" checked><input name="cinp" type="checkbox" value="cvalue2"><input name="cinp" type="checkbox" value="cvalue3" checked><textarea name="tainp">contents of the textarea</textarea><select name="sinp"><option value="one">1</option><option value="two" selected>2</option><option value="three">3</option></select></form></div> */
	`
	assertEquals "contents of the textarea", rule.U.fieldValue(rule.U.elements("textarea"))

testCase UtilTest, "fieldValue select (one)", ->
	`/*:DOC += <div><form><input name="tinp" id="tinp" type="text" value="text value"><input name="rinp" type="radio" value="value1"><input name="rinp" type="radio" value="value2" checked><input name="rinp" type="radio" value="value3"><input name="cinp" type="checkbox" value="cvalue1" checked><input name="cinp" type="checkbox" value="cvalue2"><input name="cinp" type="checkbox" value="cvalue3" checked><textarea name="tainp">contents of the textarea</textarea><select name="sinp"><option value="one">1</option><option value="two" selected>2</option><option value="three">3</option></select></form></div> */
	`
	assertEquals "two", rule.U.fieldValue(rule.U.elements("select"))

testCase UtilTest, "trim empty", ->
	assertEquals "", rule.U.trim ""

testCase UtilTest, "trim nothing to trim", ->
	assertEquals "string", rule.U.trim "string"

testCase UtilTest, "trim", ->
	assertEquals "string", rule.U.trim " string"
	assertEquals "string", rule.U.trim "   string"
	assertEquals "string", rule.U.trim "string "
	assertEquals "string", rule.U.trim "string   "

testCase UtilTest, "trim both ends", ->
	assertEquals "string", rule.U.trim " string "
	assertEquals "string", rule.U.trim "   string  "

testCase UtilTest, "trim with internal space", ->
	assertEquals "string with space", rule.U.trim " string with space "

testCase UtilTest, "trim with tabs", ->
	assertEquals "string with space", rule.U.trim "\t   string with space \t "

testCase UtilTest, "trim string with only spaces", ->
	assertEquals "", rule.U.trim "   "
	assertEquals "", rule.U.trim " \t\t"

testCase UtilTest, "trim null", ->
	assertEquals null, rule.U.trim null

testCase UtilTest, "isInt false", ->
	assertFalse rule.U.isInt(' ')
	assertFalse rule.U.isInt('string')
	assertFalse rule.U.isInt('1.23')
	assertFalse rule.U.isInt('1s')
	assertFalse rule.U.isInt('$1')
	assertFalse rule.U.isInt('0x30')

testCase UtilTest, "isInt true", ->
	assertTrue '1', rule.U.isInt('1')
	assertTrue '987654321', rule.U.isInt('987654321')
	assertTrue '0101', rule.U.isInt('0101')
	assertTrue '9e10', rule.U.isInt('9e10')

testCase UtilTest, "isInt false", ->
	assertFalse rule.U.isInt(' ')
	assertFalse rule.U.isInt('string')
	assertFalse rule.U.isInt('1.23')
	assertFalse rule.U.isInt('1s')
	assertFalse rule.U.isInt('$1')
	assertFalse rule.U.isInt('0x30')

testCase UtilTest, "isInt with whitespace", ->
	assertFalse rule.U.isInt('1  ')
	assertFalse rule.U.isInt(' 1')

testCase UtilTest, "isInt true", ->
	assertTrue '0', rule.U.isInt('0')
	assertTrue '1', rule.U.isInt('1')
	assertTrue '987654321', rule.U.isInt('987654321')
	assertTrue '0101', rule.U.isInt('0101')

testCase UtilTest, "isFloat false", ->
	assertFalse rule.U.isFloat(' ')
	assertFalse rule.U.isFloat('string')
	assertFalse rule.U.isFloat('1s')
	assertFalse rule.U.isFloat('$1')
	assertFalse rule.U.isFloat('0x30')

testCase UtilTest, "isFloat with whitespace", ->
	assertFalse rule.U.isFloat('1.1  ')
	assertFalse rule.U.isFloat(' 1.1')

testCase UtilTest, "isFloat true", ->
	assertTrue '0', rule.U.isFloat('0')
	assertTrue '1', rule.U.isFloat('1')
	assertTrue '987654321', rule.U.isFloat('987654321')
	assertTrue '0101', rule.U.isFloat('0101')
	assertTrue '9e10', rule.U.isFloat('9e10')
	assertTrue '3.14', rule.U.isFloat('3.14')
	assertTrue '314e-2', rule.U.isFloat('314e-2')
	assertTrue '0.0314E+2', rule.U.isFloat('0.0314E+2')

testCase UtilTest, "isRegex false", ->
	assertFalse 'empty string', rule.U.isRegex('')
	assertFalse 'str', rule.U.isRegex('str')
	assertFalse 'null', rule.U.isRegex(null)
	assertFalse 'obj', rule.U.isRegex({})
	assertFalse 'int', rule.U.isRegex(123)
	assertFalse 'float', rule.U.isRegex(1.1)

testCase UtilTest, "isRegex true", ->
	assertTrue 'RegExp', rule.U.isRegex(new RegExp("xyz"))
	assertTrue '/regex/', rule.U.isRegex(/xyz/)

testCase UtilTest, "visible no", ->
	`/*:DOC += <div><p id="testElement" style="display: none;">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`
	assertFalse rule.U.isVisible(rule.U.element('testElement'))

testCase UtilTest, "visible yes", ->
	`/*:DOC += <div><p id="testElement" style="display: none;">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`
	assertTrue rule.U.isVisible(rule.U.element('firstli'))

testCase UtilTest, "visible nested no", ->
	`/*:DOC += <div><p id="testElement" style="display: none;">A paragraph element<span><span id="innerSpan">inner</span></span></p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`
	assertFalse rule.U.isVisible(rule.U.element('innerSpan'))

testCase UtilTest, "visible nested yes", ->
	`/*:DOC += <div><p id="testElement">A paragraph element<span><span id="innerSpan">inner</span></span></p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`
	assertTrue rule.U.isVisible(rule.U.element('innerSpan'))
	
