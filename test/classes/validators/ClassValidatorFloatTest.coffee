ClassValidatorFloatTest = new TestCase "ClassValidatorFloatTest"

ClassValidatorFloatTest::runTest = (str, expected, options) ->
	selector = 'xyz'
	elements = 'elements array'
	mock_u = sinon.mock(rule.U)
	mock_u.expects("elements").withExactArgs(selector).once().returns(elements)
	mock_u.expects("fieldValue").withExactArgs(elements).once().returns(str)

	r = new rule.C.ValidatorFloat 't', selector, options
	satisfied = r.satisfied()
	
	mock_u.verify()
	assertEquals expected, satisfied

testCase ClassValidatorFloatTest, "no-arg constructor", ->
	r = new rule.C.ValidatorFloat

# use a RequiredString validator ontop of Float if you need empty string to not validate
testCase ClassValidatorFloatTest, "empty string, should be satisfied", ->
	@runTest "", yes

testCase ClassValidatorFloatTest, "simple float, should be satisfied", ->
	@runTest "10.1", yes

testCase ClassValidatorFloatTest, "negative float, should be satisfied", ->
	@runTest "-10.1", yes

testCase ClassValidatorFloatTest, "simple float with whitespace, no trim, should be unsatisfied", ->
	@runTest "10   ", no

testCase ClassValidatorFloatTest, "simple float with whitespace, trim, should be satisfied", ->
	@runTest "10   ", yes, { trim: yes }

testCase ClassValidatorFloatTest, "float lt minInclusive, should be unsatisfied", ->
	@runTest "9.999", no, { minInclusive: 10 }

testCase ClassValidatorFloatTest, "float gt minInclusive, should be satisfied", ->
	@runTest "10.00001", yes, { minInclusive: 10 }

testCase ClassValidatorFloatTest, "float eq minInclusive, should be satisfied", ->
	@runTest "10.0", yes, { minInclusive: 10 }

testCase ClassValidatorFloatTest, "float lt minExclusive, should be unsatisfied", ->
	@runTest "9.999", no, { minExclusive: 10 }

testCase ClassValidatorFloatTest, "float gt minExclusive, should be satisfied", ->
	@runTest "10.00001", yes, { minExclusive: 10 }

testCase ClassValidatorFloatTest, "float eq minExclusive, should be unsatisfied", ->
	@runTest "10.0", no, { minExclusive: 10 }

testCase ClassValidatorFloatTest, "float lt maxInclusive, should be satisfied", ->
	@runTest "9.9999", yes, { maxInclusive: 10 }

testCase ClassValidatorFloatTest, "float gt maxInclusive, should be satisfied", ->
	@runTest "10.01", no, { maxInclusive: 10 }

testCase ClassValidatorFloatTest, "float eq maxInclusive, should be satisfied", ->
	@runTest "10.0", yes, { maxInclusive: 10 }

testCase ClassValidatorFloatTest, "float lt maxExclusive, should be satisfied", ->
	@runTest "9.9999", yes, { maxExclusive: 10 }

testCase ClassValidatorFloatTest, "float gt maxExclusive, should be satisfied", ->
	@runTest "10.01", no, { maxExclusive: 10 }

testCase ClassValidatorFloatTest, "float eq maxExclusive, should be unsatisfied", ->
	@runTest "10.0", no, { maxExclusive: 10 }

testCase ClassValidatorFloatTest, "float within minInclusive and maxInclusive, should be satisfied", ->
	@runTest "6.1", yes, { minInclusive: 5, maxInclusive: 10 }

testCase ClassValidatorFloatTest, "float lt minInclusive with maxInclusive, should be unsatisfied", ->
	@runTest "4.9", no, { minInclusive: 5, maxInclusive: 10 }

testCase ClassValidatorFloatTest, "float gt maxInclusive with minInclusive, should be unsatisfied", ->
	@runTest "11", no, { minInclusive: 5, maxInclusive: 10 }

