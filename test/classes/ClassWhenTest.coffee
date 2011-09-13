ClassWhenTest = new TestCase "ClassWhenTest"

testCase ClassWhenTest, "constructor", ->
	t = {}
	child = 'child'
	r = new rule.C.When t, child
	assertSame t, r.t
	assertSame child, r.child

testCase ClassWhenTest, "connect no child", ->
	r = new rule.C.When 'condition'
	r.connect

testCase ClassWhenTest, "connect to child", ->
	r = new rule.C.When
	child = { connect: -> }
	child_mock = TestUtil.createSinonMockFor(child, "connect", r, null)
	r.child = child
	r.connect({ setCondition: -> })
	child_mock.verify()

# this is to handle the special @and and @or cases which end up just being functions that need calling
testCase ClassWhenTest, "constructor called with function runs function and uses result as child", ->
	child = 'child'
	f = -> child
	
	r = new rule.C.When 'when', f

	assertSame r.child, child
	
# this is to handle the special @and and @or cases which end up just being functions that need calling
testCase ClassWhenTest, "constructor called with function runs function against additional arguments", ->
	args = null
	arg1 = 'arg1'
	arg2 = 'arg2'
	f = (a1, a2) -> args = [a2,a1]
	
	r = new rule.C.When 'when', f, arg1, arg2

	assertNotNull args
	assertEquals 2, args.length
	assertSame arg2, args[0]
	assertSame arg1, args[1]

