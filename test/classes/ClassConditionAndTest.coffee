ClassConditionAndTest = new TestCase "ClassConditionAndTest"

testCase ClassConditionAndTest, "no-arg constructor", ->
	r = new rule.C.ConditionAnd()

testCase ClassConditionAndTest, "child without connect", ->
	r = new rule.C.ConditionAnd {}
	assertEquals 'and', r.t
	assertEquals 'and', r.name

testCase ClassConditionAndTest, "children with connect", ->
	r = new rule.C.ConditionAnd
	child1 = { connect: (r) -> }
	child3 = { connect: (r) -> }
	child1_mock = TestUtil.createSinonMockFor(child1, "connect", r, null)
	child3_mock = TestUtil.createSinonMockFor(child3, "connect", r, null)

	rule.C.ConditionAnd.apply r, [ child1, {}, child3 ]

	child1_mock.verify()
	child3_mock.verify()

testCase ClassConditionAndTest, "setCondition appends to condition list", ->
	r = new rule.C.ConditionAnd {}
	r.setCondition t1 = {}
	r.setCondition t2 = 't2'
	assertNotNull r.conditions
	assertEquals 2, r.conditions.length
	assertSame r.conditions[0], t1
	assertSame r.conditions[1], t2
	
testCase ClassConditionAndTest, "set condition on parent", ->
	r = new rule.C.ConditionAnd
	parent = { setCondition: -> }
	parent_mock = TestUtil.createSinonMockFor(parent, "setCondition", r, null)
	r.connect parent
	parent_mock.verify()

testCase ClassConditionAndTest, "connect doesn't connect children", ->
	r = new rule.C.ConditionAnd
	child1 = { connect: (r) -> }
	(child1_mock = sinon.mock(child1)).expects("connect").withExactArgs(r).once()

	rule.C.ConditionAnd.apply r, [ child1 ]

	parent = { setCondition: -> }
	r.connect parent

	child1_mock.verify()
	
testCase ClassConditionAndTest, "conditions satisfied, one no and one yes condition, should be no", ->
	c = {}
	event = {}
	condition1 = { satisfied: -> }
	(condition1_mock = sinon.mock(condition1)).expects("satisfied").withExactArgs(c, event).once().returns(yes)
	condition2 = { satisfied: -> }
	(condition2_mock = sinon.mock(condition2)).expects("satisfied").withExactArgs(c, event).once().returns(no)
	r = new rule.C.ConditionAnd 'name'
	r.setCondition condition1
	r.setCondition condition2
	assertFalse r.conditionsSatisfied(c, event)
	condition1_mock.verify()
	condition2_mock.verify()

testCase ClassConditionAndTest, "conditions satisfied, both no, should be no", ->
	c = {}
	event = {}
	condition1 = { satisfied: -> }
	(condition1_mock = sinon.mock(condition1)).expects("satisfied").withExactArgs(c, event).once().returns(no)
	condition2 = { satisfied: -> }
	(condition2_mock = sinon.mock(condition2)).expects("satisfied").never()
	r = new rule.C.ConditionAnd 'name'
	r.setCondition condition1
	r.setCondition condition2
	assertFalse r.conditionsSatisfied(c, event)
	condition1_mock.verify()
	condition2_mock.verify()

testCase ClassConditionAndTest, "conditions satisfied, two yes conditions, should be yes", ->
	c = {}
	event = {}
	condition1 = { satisfied: -> }
	(condition1_mock = sinon.mock(condition1)).expects("satisfied").withExactArgs(c, event).once().returns(yes)
	condition2 = { satisfied: -> }
	(condition2_mock = sinon.mock(condition2)).expects("satisfied").withExactArgs(c, event).once().returns(yes)
	r = new rule.C.ConditionAnd 'name'
	r.setCondition condition1
	r.setCondition condition2
	assertTrue r.conditionsSatisfied(c, event)
	condition1_mock.verify()
	condition2_mock.verify()
