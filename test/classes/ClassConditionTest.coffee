ClassConditionTest = new TestCase "ClassConditionTest"

testCase ClassConditionTest, "constructor", ->
	t = {}
	child = 'child'
	r = new rule.C.Condition t, child
	assertSame t, r.t
	assertSame child, r.child

testCase ClassConditionTest, "connect no child", ->
	r = new rule.C.Condition 'condition'
	r.connect

testCase ClassConditionTest, "connect to child", ->
	r = new rule.C.Condition
	child = { connect: -> }
	child_mock = TestUtil.createSinonMockFor(child, "connect", r, null)
	r.child = child
	r.connect({ setCondition: -> })
	child_mock.verify()
	
testCase ClassConditionTest, "set condition on parent", ->
	r = new rule.C.Condition
	parent = { setCondition: -> }
	parent_mock = TestUtil.createSinonMockFor(parent, "setCondition", r, null)
	r.connect parent
	parent_mock.verify()

testCase ClassConditionTest, "default satisfied is yes", ->
	assertTrue new rule.C.Condition().satisfied()
