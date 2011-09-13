ClassBaseTest = new TestCase "ClassBaseTest"

testCase ClassBaseTest, "constructor", ->
	t = {}; child = {}
	b = new rule.C.Base t, child
	assertSame t, b.t
	assertSame child, b.child

testCase ClassBaseTest, "childless connect", ->
	parent = {}
	b = new rule.C.Base()
	b.connect parent
	assertSame parent, b.parent

testCase ClassBaseTest, "childed connect", ->
	parent = {}
	child = { connect: (parent) -> }
	b = new rule.C.Base('', child)
	child_mock = TestUtil.createSinonMockFor(child, "connect", b, null)
	b.connect parent
	assertSame parent, b.parent
	child_mock.verify()

testCase ClassBaseTest, "setTrigger pass-through (no parent)", ->
	t = {}
	b = new rule.C.Base()
	b.setTrigger t

testCase ClassBaseTest, "setTrigger pass-through", ->
	parent = { setTrigger: -> }
	t = {}
	parent_mock = TestUtil.createSinonMockFor parent, "setTrigger", t, null
	b = new rule.C.Base()
	b.connect parent
	b.setTrigger t
	parent_mock.verify()


testCase ClassBaseTest, "setCondition pass-through (no parent)", ->
	t = {}
	b = new rule.C.Base()
	b.setCondition t

testCase ClassBaseTest, "setCondition pass-through", ->
	parent = { setCondition: -> }
	t = {}
	parent_mock = TestUtil.createSinonMockFor parent, "setCondition", t, null
	b = new rule.C.Base()
	b.connect parent
	b.setCondition t
	parent_mock.verify()

	
testCase ClassBaseTest, "setAction pass-through (no parent)", ->
	t = {}
	b = new rule.C.Base()
	b.setAction t

testCase ClassBaseTest, "setAction pass-through", ->
	parent = { setAction: -> }
	t = {}
	parent_mock = TestUtil.createSinonMockFor parent, "setAction", t, null
	b = new rule.C.Base()
	b.connect parent
	b.setAction t
	parent_mock.verify()

	
testCase ClassBaseTest, "trigger pass-through (no parent)", ->
	t = {}
	b = new rule.C.Base()
	b.trigger t

testCase ClassBaseTest, "trigger pass-through", ->
	parent = { trigger: -> }
	t = {}
	(parent_mock = sinon.mock(parent)).expects("trigger").withExactArgs(t, undefined).once()
	b = new rule.C.Base()
	b.connect parent
	b.trigger t
	parent_mock.verify()
	
