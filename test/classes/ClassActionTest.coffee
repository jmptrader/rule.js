ClassActionTest = new TestCase "ClassActionTest"

testCase ClassActionTest, "constructor", ->
	t = {}
	child = 'child'
	r = new rule.C.Action t, child
	assertSame t, r.t
	assertSame child, r.child

testCase ClassActionTest, "connect no child", ->
	r = new rule.C.Action 'condition'
	r.connect

testCase ClassActionTest, "connect to child", ->
	r = new rule.C.Action
	child = { connect: -> }
	child_mock = TestUtil.createSinonMockFor(child, "connect", r, null)
	r.child = child
	r.connect({ setAction: -> })
	child_mock.verify()
	
testCase ClassActionTest, "set condition on parent", ->
	r = new rule.C.Action
	parent = { setAction: -> }
	parent_mock = TestUtil.createSinonMockFor(parent, "setAction", r, null)
	r.connect parent
	parent_mock.verify()

testCase ClassActionTest, "default trigger does nothing", ->
	new rule.C.Action().trigger()

