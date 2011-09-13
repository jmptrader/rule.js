ClassSimpleElementsActionTest = new TestCase "ClassSimpleElementsActionTest"

testCase ClassSimpleElementsActionTest, "constructor, no extra args", ->
	t = {}
	func = 'function to call'
	elements = 'element selector'
	r = new rule.C.SimpleElementsAction t, func, elements
	assertSame t, r.t
	assertSame func, r.func
	assertSame elements, r.elements

testCase ClassSimpleElementsActionTest, "constructor, extra args", ->
	t = {}
	func = 'function to call'
	elements = 'element selector'
	extraArg1 = {}
	extraArg2 = {}
	r = new rule.C.SimpleElementsAction t, func, elements, extraArg1, extraArg2
	assertSame t, r.t
	assertSame func, r.func
	assertSame elements, r.elements
	assertNotNull r.args
	assertEquals 2, r.args.length
	assertSame extraArg1, r.args[0]
	assertSame extraArg2, r.args[1]

testCase ClassSimpleElementsActionTest, "trigger function on DOM elements", ->
	elements = 'element selector'
	domElements = {}
	func = 'function to call'
	extraArg1 = {}
	r = new rule.C.SimpleElementsAction 'type', func, elements, extraArg1
	util_mock = sinon.mock(rule.U);
	util_mock.expects("elements").withExactArgs(elements).once().returns(domElements)
	util_mock.expects("each").withExactArgs(domElements, func, [ extraArg1 ]).once()

	r.trigger()
	
	util_mock.verify()
	util_mock.restore()
	
