ClassOtherwiseTest = new TestCase "ClassOtherwiseTest"

testCase ClassOtherwiseTest, "constructor", ->
	t = {}; child = {}
	b = new rule.C.Otherwise t, child
	assertSame t, b.t
	assertSame child, b.child

testCase ClassOtherwiseTest, "childless connect", ->
	parent = {}
	b = new rule.C.Otherwise()
	b.connect parent
	assertSame parent, b.parent

testCase ClassOtherwiseTest, "childed connect", ->
	parent = {}
	child = { connect: (parent) -> }
	b = new rule.C.Otherwise('', child)
	child_mock = TestUtil.createSinonMockFor(child, "connect", b, null)
	b.connect parent
	assertSame parent, b.parent
	child_mock.verify()

testCase ClassOtherwiseTest, "child calling setAction should cause parent.setActionOtherwise call", ->
	child = {}
	parent =
		setAction: ->
		setActionOtherwise: ->
	parent_mock = sinon.mock(parent)
	parent_mock.expects("setAction").never()
	parent_mock.expects("setActionOtherwise").withExactArgs(child).once()
	o = new rule.C.Otherwise
	o.connect parent
	o.setAction child
	parent_mock.verify()

