ClassEventTest = new TestCase "ClassEventTest"

testCase ClassEventTest, "constructor, no arg", ->
	new rule.C.Event

testCase ClassEventTest, "constructor, 2 arg", ->
	t = 'type'
	e = 'event'
	ev = new rule.C.Event t, e
	assertSame t, ev.t
	assertSame e, ev.e

testCase ClassEventTest, "set trigger on parent", ->
	ev = new rule.C.Event
	parent = { setTrigger: -> }
	parent_mock = TestUtil.createSinonMockFor(parent, "setTrigger", ev, null)
	ev.connect parent
	parent_mock.verify()

testCase ClassEventTest, "observe elemement with bound listener", ->
	ev = new rule.C.Event 'eventType', 'element'
	ev.e = 'element'
	ev.t = 'eventType'
	bindFunc = ->
	util_mock = sinon.mock(rule.U);
	util_mock.expects("bind").withExactArgs(ev.event, ev).once().returns(bindFunc)
	util_mock.expects("observe").withExactArgs(ev.e, ev.t, bindFunc).once()
	ev.connect()
	util_mock.verify()

testCase ClassEventTest, "test event listener", ->	
	ev = new rule.C.Event
	event = {}
	parent = { trigger: -> }
	(parent_mock = sinon.mock(parent)).expects("trigger").withExactArgs(ev, event).once()
	ev.parent = parent
	ev.event event
	parent_mock.verify()

testCase ClassEventTest, "observe elemement with bound listener, delayed", ->
	ev = new rule.C.Event 'eventType', 'element', { delayed: 0.25 }
	bindFunc = ->
	delayFunc = ->
	util_mock = sinon.mock(rule.U);
	util_mock.expects("bind").withExactArgs(ev.event, ev).once().returns(bindFunc)
	util_mock.expects("delayed").withExactArgs(bindFunc, 0.25).once().returns(delayFunc)
	util_mock.expects("observe").withExactArgs(ev.e, ev.t, delayFunc).once()
	ev.connect()
	util_mock.verify()

testCase ClassEventTest, "observe elemement with bound listener, cumulativeDelayed", ->
	ev = new rule.C.Event 'eventType', 'element', { cumulativeDelayed: 0.3 }
	bindFunc = ->
	delayFunc = ->
	util_mock = sinon.mock(rule.U);
	util_mock.expects("bind").withExactArgs(ev.event, ev).once().returns(bindFunc)
	util_mock.expects("cumulativeDelayed").withExactArgs(bindFunc, 0.3).once().returns(delayFunc)
	util_mock.expects("observe").withExactArgs(ev.e, ev.t, delayFunc).once()
	ev.connect()
	util_mock.verify()

