ClassValidatorEmailTest = new TestCase "ClassValidatorEmailTest"

ClassValidatorEmailTest::runTest = (str, expected, options) ->
	selector = 'xyz'
	elements = 'elements array'
	mock_u = sinon.mock(rule.U)
	mock_u.expects("elements").withExactArgs(selector).once().returns(elements)
	mock_u.expects("fieldValue").withExactArgs(elements).once().returns(str)

	r = new rule.C.ValidatorEmail 't', selector, options
	satisfied = r.satisfied()

	mock_u.verify()
	assertEquals str, expected, satisfied

testCase ClassValidatorEmailTest, "no-arg constructor", ->
	r = new rule.C.ValidatorEmail

# use a RequiredString validator ontop of Email if you need empty string to not validate
testCase ClassValidatorEmailTest, "empty string, should be satisfied", ->
	@runTest "", yes
	
testCase ClassValidatorEmailTest, "valid emails, should be satisfied", ->
	@runTest "me@me.com", yes
	@runTest "me@me.com.au", yes
	@runTest "me@me.edu", yes
	@runTest "me@me.net", yes
	@runTest "me@co.uk", yes
	@runTest "me@some.long.domain.name.not.really.sensible.but.still.valid.com", yes
	@runTest "m.e@me.com", yes
	@runTest "me@me.hah", yes
	@runTest "me@me.coke", yes
	@runTest "_me_@me.org", yes
	
testCase ClassValidatorEmailTest, "invalid emails, shouldn't be satisfied", ->
	@runTest "me", no
	@runTest "me.me.com", no
	@runTest "@me.com", no
	@runTest "me@me@me.com", no
	@runTest "me@me", no
	@runTest "@me", no
	@runTest "m@me!", no
	@runTest "me@hoo.haa?", no
	@runTest "me@me..com", no

