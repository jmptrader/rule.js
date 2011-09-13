ClassRootTest = new TestCase "ClassRootTest"

testCase ClassRootTest, "no-arg constructor", ->
	new rule.C.Root()

testCase ClassRootTest, "name-only constructor as array", ->
	r = new rule.C.Root [ 'root', 'a name' ]
	assertEquals 'root', r.t
	assertEquals 'a name', r.name

testCase ClassRootTest, "name-only constructor", ->
	r = new rule.C.Root 'root', 'a name'
	assertEquals 'root', r.t
	assertEquals 'a name', r.name

testCase ClassRootTest, "child without connect", ->
	r = new rule.C.Root 'name', 'str', {}

testCase ClassRootTest, "children with connect", ->
	r = {}
	child1 = { connect: (r) -> }
	child3 = { connect: (r) -> }
	child1_mock = TestUtil.createSinonMockFor(child1, "connect", r, null)
	child3_mock = TestUtil.createSinonMockFor(child3, "connect", r, null)

	r:: = rule.C.Root::
	rule.C.Root.apply r, [ 'root', 'name', child1, {}, child3 ]

	child1_mock.verify()
	child3_mock.verify()

testCase ClassRootTest, "setTrigger appends to trigger list", ->
	r = new rule.C.Root 'name'
	r.setTrigger t1 = {}
	r.setTrigger t2 = 't2'
	assertNotNull r.triggers
	assertEquals 2, r.triggers.length
	assertSame r.triggers[0], t1
	assertSame r.triggers[1], t2

testCase ClassRootTest, "setCondition appends to condition list", ->
	r = new rule.C.Root 'name'
	r.setCondition t1 = {}
	r.setCondition t2 = 't2'
	assertNotNull r.conditions
	assertEquals 2, r.conditions.length
	assertSame r.conditions[0], t1
	assertSame r.conditions[1], t2

testCase ClassRootTest, "setAction appends to action list", ->
	r = new rule.C.Root 'name'
	r.setAction t1 = {}
	r.setAction t2 = 't2'
	assertNotNull r.actions
	assertEquals 2, r.actions.length
	assertSame r.actions[0], t1
	assertSame r.actions[1], t2

testCase ClassRootTest, "setActionOtherwise appends to actionOtherwise list", ->
	r = new rule.C.Root 'name'
	r.setActionOtherwise t1 = {}
	r.setActionOtherwise t2 = 't2'
	assertNotNull r.actionsOtherwise
	assertEquals 2, r.actionsOtherwise.length
	assertSame r.actionsOtherwise[0], t1
	assertSame r.actionsOtherwise[1], t2

testCase ClassRootTest, "trigger, conditions not satisfied", ->
	r = new rule.C.Root 'name'
	c = {}
	event = {}
	root_mock = sinon.mock(r)
	root_mock.expects("conditionsSatisfied").withExactArgs(c, event).once().returns(no)
	root_mock.expects("invokeActions").never()
	root_mock.expects("invokeActionsOtherwise").withExactArgs(c, event).once()
	r.trigger c, event
	root_mock.verify()
	
testCase ClassRootTest, "trigger, conditions satisfied", ->
	r = new rule.C.Root 'name'
	c = {}
	event = {}
	root_mock = sinon.mock(r)
	root_mock.expects("conditionsSatisfied").withExactArgs(c, event).once().returns(yes)
	root_mock.expects("invokeActionsOtherwise").never()
	root_mock.expects("invokeActions").withExactArgs(c, event).once()
	r.trigger c, event
	root_mock.verify()

testCase ClassRootTest, "conditions satisfied, no conditions, should be yes", ->
	r = new rule.C.Root 'name'
	assertTrue r.conditionsSatisfied()

testCase ClassRootTest, "conditions satisfied, one yes condition, should be yes", ->
	c = {}
	event = {}
	condition = { satisfied: -> }
	(condition_mock = sinon.mock(condition)).expects("satisfied").withExactArgs(c, event).once().returns(yes)
	r = new rule.C.Root 'name'
	r.setCondition condition
	assertTrue r.conditionsSatisfied(c, event)
	condition_mock.verify()

testCase ClassRootTest, "conditions satisfied, one no condition, should be no", ->
	c = 'c'
	event = 'event'
	condition = { satisfied: -> }
	(condition_mock = sinon.mock(condition)).expects("satisfied").once().withExactArgs(c, event).returns(no)
	r = new rule.C.Root 'name'
	r.setCondition condition
	assertFalse r.conditionsSatisfied(c, event)
	condition_mock.verify()

testCase ClassRootTest, "conditions satisfied, one no and one yes condition, should be no", ->
	c = {}
	event = {}
	condition1 = { satisfied: -> }
	(condition1_mock = sinon.mock(condition1)).expects("satisfied").withExactArgs(c, event).once().returns(yes)
	condition2 = { satisfied: -> }
	(condition2_mock = sinon.mock(condition2)).expects("satisfied").withExactArgs(c, event).once().returns(no)
	r = new rule.C.Root 'name'
	r.setCondition condition1
	r.setCondition condition2
	assertFalse r.conditionsSatisfied(c, event)
	condition1_mock.verify()
	condition2_mock.verify()

testCase ClassRootTest, "conditions satisfied, two yes conditions, should be yes", ->
	c = {}
	event = {}
	condition1 = { satisfied: -> }
	(condition1_mock = sinon.mock(condition1)).expects("satisfied").withExactArgs(c, event).once().returns(yes)
	condition2 = { satisfied: -> }
	(condition2_mock = sinon.mock(condition2)).expects("satisfied").withExactArgs(c, event).once().returns(yes)
	r = new rule.C.Root 'name'
	r.setCondition condition1
	r.setCondition condition2
	assertTrue r.conditionsSatisfied(c, event)
	condition1_mock.verify()
	condition2_mock.verify()

testCase ClassRootTest, "invokeActions, no actions", ->
	r = new rule.C.Root 'name'
	r.invokeActions()

testCase ClassRootTest, "invokeActionsOtherwise, no actionsOtherwise", ->
	r = new rule.C.Root 'name'
	r.invokeActionsOtherwise()

testCase ClassRootTest, "invokeActions, multiple actions", ->
	e = {}
	event = {}
	action1 = { trigger: -> }
	(action1_mock = sinon.mock(action1)).expects("trigger").withExactArgs(e, event).once()
	action2 = { trigger: -> }
	(action2_mock = sinon.mock(action2)).expects("trigger").withExactArgs(e, event).once()
	r = new rule.C.Root 'name'
	r.setAction action1
	r.setAction action2
	r.invokeActions(e, event)
	action1_mock.verify()
	action2_mock.verify()

testCase ClassRootTest, "invokeActionsOtherwise, multiple actionsOtherwise", ->
	e = {}
	event = {}
	action1 = { trigger: -> }
	(action1_mock = sinon.mock(action1)).expects("trigger").withExactArgs(e, event).once()
	action2 = { trigger: -> }
	(action2_mock = sinon.mock(action2)).expects("trigger").withExactArgs(e, event).once()
	r = new rule.C.Root 'name'
	r.setActionOtherwise action1
	r.setActionOtherwise action2
	r.invokeActionsOtherwise(e, event)
	action1_mock.verify()
	action2_mock.verify()

