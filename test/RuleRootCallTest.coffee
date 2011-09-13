RuleRootCallTest = new TestCase "RuleRootCallTest"

testCase RuleRootCallTest, "root call", ->
	invoked = no
	rule ->
		invoked = yes
		assertSame rule, @
		assertSame rule.U, @U
		assertSame rule.C, @C
		assertSame rule.on, @on
		assertSame rule.do, @do
		assertSame rule.run, @run
		assertSame rule.show, @show

	assertTrue invoked

testCase RuleRootCallTest, "root call with arg", ->
	invoked = no
	rule (_) ->
		invoked = yes
		assertSame rule, _
		assertSame rule.U, _.U
		assertSame rule.C, _.C
		assertSame rule.on, _.on
		assertSame rule.do, _.do
		assertSame rule.run, _.run
		assertSame rule.show, _.show

	assertTrue invoked
