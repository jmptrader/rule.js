ClassValidatorIntegerTest = new TestCase "ClassValidatorIntegerTest"

ClassValidatorIntegerTest::runTest = (str, expected, options) ->
	selector = 'xyz'
	elements = 'elements array'
	mock_u = sinon.mock(rule.U)
	mock_u.expects("elements").withExactArgs(selector).once().returns(elements)
	mock_u.expects("fieldValue").withExactArgs(elements).once().returns(str)

	r = new rule.C.ValidatorInteger 't', selector, options
	satisfied = r.satisfied()
	
	mock_u.verify()
	assertEquals expected, satisfied

testCase ClassValidatorIntegerTest, "no-arg constructor", ->
	r = new rule.C.ValidatorInteger

# use a RequiredString validator ontop of Integer if you need empty string to not validate
testCase ClassValidatorIntegerTest, "empty string, should be satisfied", ->
	@runTest "", yes

testCase ClassValidatorIntegerTest, "simple int, should be satisfied", ->
	@runTest "10", yes

testCase ClassValidatorIntegerTest, "negative int, should be satisfied", ->
	@runTest "-10", yes

testCase ClassValidatorIntegerTest, "simple int with whitespace, no trim, should be unsatisfied", ->
	@runTest "10   ", no

testCase ClassValidatorIntegerTest, "simple int with whitespace, trim, should be satisfied", ->
	@runTest "10   ", yes, { trim: yes }

testCase ClassValidatorIntegerTest, "int lt min, should be unsatisfied", ->
	@runTest "9", no, { min: 10 }

testCase ClassValidatorIntegerTest, "int gt min, should be satisfied", ->
	@runTest "11", yes, { min: 10 }

testCase ClassValidatorIntegerTest, "int eq min, should be satisfied", ->
	@runTest "10", yes, { min: 10 }

testCase ClassValidatorIntegerTest, "int lt max, should be satisfied", ->
	@runTest "9", yes, { max: 10 }

testCase ClassValidatorIntegerTest, "int gt max, should be satisfied", ->
	@runTest "11", no, { max: 10 }

testCase ClassValidatorIntegerTest, "int eq max, should be satisfied", ->
	@runTest "10", yes, { max: 10 }

testCase ClassValidatorIntegerTest, "int within min and max, should be satisfied", ->
	@runTest "6", yes, { min: 5, max: 10 }

testCase ClassValidatorIntegerTest, "int lt min with max, should be unsatisfied", ->
	@runTest "4", no, { min: 5, max: 10 }

testCase ClassValidatorIntegerTest, "int gt max with min, should be unsatisfied", ->
	@runTest "11", no, { min: 5, max: 10 }

