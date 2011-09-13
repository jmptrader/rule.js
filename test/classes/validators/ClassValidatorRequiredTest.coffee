ClassValidatorRequiredTest = new TestCase "ClassValidatorRequiredTest"

testCase ClassValidatorRequiredTest, "no-arg constructor", ->
	r = new rule.C.ValidatorRequired

testCase ClassValidatorRequiredTest, "empty string, should be unsatisfied", ->
	selector = 'xyz'
	elements = 'elements array'
	mock_u = sinon.mock(rule.U)
	mock_u.expects("elements").withExactArgs(selector).once().returns(elements)
	mock_u.expects("fieldValue").withExactArgs(elements).once().returns("")

	r = new rule.C.ValidatorRequired 't', selector
	satisfied = r.satisfied()
	
	mock_u.verify()
	assertFalse satisfied

testCase ClassValidatorRequiredTest, "whitespace string, no trim, should be satisfied", ->
	selector = 'xyz'
	elements = 'elements array'
	mock_u = sinon.mock(rule.U)
	mock_u.expects("elements").withExactArgs(selector).once().returns(elements)
	mock_u.expects("fieldValue").withExactArgs(elements).once().returns("   ")

	r = new rule.C.ValidatorRequired 't', selector
	satisfied = r.satisfied()

	mock_u.verify()
	assertTrue satisfied

testCase ClassValidatorRequiredTest, "whitespace string, with trim, should be unsatisfied", ->
	selector = 'xyz'
	elements = 'elements array'
	mock_u = sinon.mock(rule.U)
	mock_u.expects("elements").withExactArgs(selector).once().returns(elements)
	mock_u.expects("fieldValue").withExactArgs(elements).once().returns("   ")

	r = new rule.C.ValidatorRequired 't', selector, { trim: yes }

	satisfied = r.satisfied()

	mock_u.verify()
	assertFalse satisfied
