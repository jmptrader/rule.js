ClassValidatorRegexTest = new TestCase "ClassValidatorRegexTest"

ClassValidatorRegexTest::runTest = (str, expected, options) ->
	selector = 'xyz'
	elements = 'elements array'
	mock_u = sinon.mock(rule.U)
	mock_u.expects("elements").withExactArgs(selector).once().returns(elements)
	mock_u.expects("fieldValue").withExactArgs(elements).once().returns(str)

	r = new rule.C.ValidatorRegex 't', selector, options
	satisfied = r.satisfied()

	mock_u.verify()
	assertEquals expected, satisfied

testCase ClassValidatorRegexTest, "no-arg constructor", ->
	r = new rule.C.ValidatorRegex

# use a RequiredString validator ontop of Regex if you need empty string to not validate
testCase ClassValidatorRegexTest, "empty string, should be satisfied", ->
	@runTest "", yes, 'xyz'
	@runTest "", yes, /xyz/
	@runTest "", yes, { regex: 'xyz' }
	@runTest "", yes, { regex: /xyz/ }
	
testCase ClassValidatorRegexTest, "simple exact match, option=string, should be satisfied", ->
	@runTest "xyz", yes, 'xyz'

testCase ClassValidatorRegexTest, "simple exact match, option=/regex/, should be satisfied", ->
	@runTest "xyz", yes, /xyz/

testCase ClassValidatorRegexTest, "simple non match, option=/regex/, shouldn't be satisfied", ->
	@runTest "abc", no, /xyz/

testCase ClassValidatorRegexTest, "simple exact match, option=RegExp, should be satisfied", ->
	@runTest "xyz", yes, new RegExp('xyz')

testCase ClassValidatorRegexTest, "simple non match, option=RegExp, shouldn't be satisfied", ->
	@runTest "abc", no, new RegExp('xyz')

testCase ClassValidatorRegexTest, "simple exact match, option={regex=string}, should be satisfied", ->
	@runTest "xyz", yes, { regex: 'xyz' }

testCase ClassValidatorRegexTest, "simple non match, option={regex=string}, shouldn't be satisfied", ->
	@runTest "abc", no, { regex: 'xyz' }

testCase ClassValidatorRegexTest, "simple exact match, option={regex=/regex/}, should be satisfied", ->
	@runTest "xyz", yes, { regex: /xyz/ }

testCase ClassValidatorRegexTest, "simple non match, option={regex=/regex/}, shouldn't be satisfied", ->
	@runTest "abc", no, { regex: /xyz/ }

testCase ClassValidatorRegexTest, "simple exact match, option={regex=RegExp}, should be satisfied", ->
	@runTest "xyz", yes, { regex: new RegExp('xyz') }
	@runTest "abc", no, { regex: new RegExp('xyz') }

testCase ClassValidatorRegexTest, "ignore case match, option={regex=RegExp+ignore case}, should be satisfied", ->
	@runTest "XYZ", yes, { regex: new RegExp('xyz', 'i') }

testCase ClassValidatorRegexTest, "ignore case match, option={regex=/regex/i}, should be satisfied", ->
	@runTest "XYZ", yes, { regex: /xyz/i }

testCase ClassValidatorRegexTest, "ignore case match with option on RegExp object, option={regex=RegExp,options='i'}, shouldn't be satisfied", ->
	# can't do this
	@runTest "XYZ", no, { regex: new RegExp('xyz'), options: 'i'  }

testCase ClassValidatorRegexTest, "ignore case match with option on /regex/, option={regex=/regex/,options='i'}, shouldn't be satisfied", ->
	# can't do this
	@runTest "XYZ", no, { regex: /xyz/, options: 'i'  }

testCase ClassValidatorRegexTest, "ignore case match, option={regex=string,options='i'}, should be satisfied", ->
	@runTest "XYZ", yes, { regex: 'xyz', options: 'i' }

testCase ClassValidatorRegexTest, "untrimmed match, shouldn't be satisfied", ->
	@runTest "  xyz\t", no, { regex: '^xyz$' }

testCase ClassValidatorRegexTest, "trimmed match, should be satisfied", ->
	@runTest "  xyz\t", yes, { regex: '^xyz$', trim: yes }

testCase ClassValidatorRegexTest, "partial string match, should be satisfied", ->
	@runTest "abcxyz\t", yes, 'xyz'

testCase ClassValidatorRegexTest, "full string complex match, should be satisfied", ->
	@runTest "aabxxxxz\t", yes, '^[abc]+x+y*z?\\s$'

