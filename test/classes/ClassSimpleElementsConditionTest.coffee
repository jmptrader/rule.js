ClassSimpleElementsConditionTest = new TestCase "ClassSimpleElementsConditionTest"

testCase ClassSimpleElementsConditionTest, "constructor, no extra args", ->
	t = {}
	func = 'function to call'
	elements = 'element selector'
	r = new rule.C.SimpleElementsCondition t, func, elements
	assertSame t, r.t
	assertSame func, r.func
	assertSame elements, r.elements

testCase ClassSimpleElementsConditionTest, "constructor, extra args", ->
	t = {}
	func = 'function to call'
	elements = 'element selector'
	extraArg1 = {}
	extraArg2 = {}
	r = new rule.C.SimpleElementsCondition t, func, elements, extraArg1, extraArg2
	assertSame t, r.t
	assertSame func, r.func
	assertSame elements, r.elements
	assertNotNull r.args
	assertEquals 2, r.args.length
	assertSame extraArg1, r.args[0]
	assertSame extraArg2, r.args[1]

testCase ClassSimpleElementsConditionTest, "satisfied function on DOM elements, all yes", ->
	elements = 'element selector'
	element1 = { called: no, ret: yes }
	element2 = { called: no, ret: yes }
	extraArg1 = 'extra arg'
	f =
		func: (element, extra) ->
			assertSame extraArg1, extra
			element.called = yes
			element.ret
	domElements = [ element1, element2 ]
	r = new rule.C.SimpleElementsCondition 'type', f.func, elements, extraArg1
	(util_mock = sinon.mock(rule.U)).expects("elements").withExactArgs(elements).once().returns(domElements)
	assertTrue r.satisfied()
	util_mock.verify()
	util_mock.restore()
	assertTrue element1.called
	assertTrue element2.called

testCase ClassSimpleElementsConditionTest, "satisfied function on DOM elements, all no", ->
	elements = 'element selector'
	element1 = { called: no, ret: no }
	element2 = { called: no, ret: no }
	extraArg1 = 'extra arg'
	f =
		func: (element, extra) ->
			assertSame extraArg1, extra
			element.called = yes
			element.ret
	domElements = [ element1, element2 ]
	r = new rule.C.SimpleElementsCondition 'type', f.func, elements, extraArg1
	(util_mock = sinon.mock(rule.U)).expects("elements").withExactArgs(elements).once().returns(domElements)
	assertFalse r.satisfied()
	util_mock.verify()
	util_mock.restore()
	assertTrue element1.called
	assertFalse element2.called

testCase ClassSimpleElementsConditionTest, "satisfied function on DOM elements, 1 yes, 2 no", ->
	elements = 'element selector'
	element1 = { called: no, ret: yes }
	element2 = { called: no, ret: no }
	extraArg1 = 'extra arg'
	f =
		func: (element, extra) ->
			assertSame extraArg1, extra
			element.called = yes
			element.ret
	domElements = [ element1, element2 ]
	r = new rule.C.SimpleElementsCondition 'type', f.func, elements, extraArg1
	(util_mock = sinon.mock(rule.U)).expects("elements").withExactArgs(elements).once().returns(domElements)
	assertFalse r.satisfied()
	util_mock.verify()
	util_mock.restore()
	assertTrue element1.called
	assertTrue element2.called

testCase ClassSimpleElementsConditionTest, "satisfied function on DOM elements, no elements", ->
	elements = 'element selector'
	extraArg1 = 'extra arg'
	(util_mock = sinon.mock(rule.U)).expects("elements").withExactArgs(elements).once().returns([])
	r = new rule.C.SimpleElementsCondition 'type', {}, elements, extraArg1
	assertTrue r.satisfied()
	util_mock.verify()
	util_mock.restore()

