FormFieldValidatorFunctionalTest = new TestCase "FormFieldValidatorFunctionalTest"

FormFieldValidatorFunctionalTest::setUp = ->
	`/*:DOC += <div><div style="display: none;" id="correct">Correct!</div><div style="display: none;" id="incorrect">Incorrect!</div><form><input type="text" name="intInput"><input type="text" name="intInput2"><input type="text" name="floatInput"><input type="radio" name="radioInput" value="one"><input type="radio" name="radioInput" value="two"><input type="radio" name="radioInput" value="three"><button id="validate">Validate!</button></form></div> */
	`

	#---------------------------------------------------------------------#

	rule ->
		@define 'form field validator functional test',
			@on		@event		'#validate', 'test:event'
			@validate	@required	'input[name=intInput]'
			@validate	@int		'input[name=intInput]'
			@validate	@int		'input[name=intInput2]', { trim: yes, min: -10, max: 0 }
			@validate	@float		'input[name=floatInput]', { trim: yes, minExclusive: 0, maxInclusive: 4.5 }
			@validate	@required	'input[type=radio]'
			@do		@show		'#correct'
			@otherwise	@show		'#incorrect'

	#---------------------------------------------------------------------#

	@U = rule.U
	@correct	= @U.element('#correct')
	@incorrect	= @U.element('#incorrect')
	@radios		= @U.elements('input[type=radio]')
	@intInp		= @U.elements('input[name=intInput]')[0]
	@intInp2	= @U.elements('input[name=intInput2]')[0]
	@floatInp	= @U.elements('input[name=floatInput]')[0]
	@validate	= @U.element('#validate')

testCase FormFieldValidatorFunctionalTest, "sanity, nothing happened", ->
	assertFalse @U.isVisible @correct
	assertFalse @U.isVisible @incorrect

testCase FormFieldValidatorFunctionalTest, "nothing changed, event shouldn't validate, should show incorrect", ->
	@U.fire @validate, 'test:event'
	assertFalse @U.isVisible @correct
	assertTrue @U.isVisible @incorrect

testCase FormFieldValidatorFunctionalTest, "only int in intInput, shouldn't validate", ->
	@intInp.value = '100'
	@U.fire @validate, 'test:event'
	assertFalse @U.isVisible @correct
	assertTrue @U.isVisible @incorrect

testCase FormFieldValidatorFunctionalTest, "only int in intInput, int in intInput2 shouldn't validate", ->
	@intInp.value = '100'
	@intInp.value = '-5'
	@U.fire @validate, 'test:event'
	assertFalse @U.isVisible @correct
	assertTrue @U.isVisible @incorrect

testCase FormFieldValidatorFunctionalTest, "only int in intInput, int in intInput2, float in floatInput shouldn't validate", ->
	@intInp.value = '100'
	@intInp2.value = '-5'
	@floatInp.value = '3.1'
	@U.fire @validate, 'test:event'
	assertFalse @U.isVisible @correct
	assertTrue @U.isVisible @incorrect

FormFieldValidatorFunctionalTest::setValidValues = ->
	@intInp.value = '100'
	@intInp2.value = '-5'
	@floatInp.value = '3.1'
	@radios[0].checked = true

testCase FormFieldValidatorFunctionalTest, "all valid values, should validate", ->
	@setValidValues()
	@U.fire @validate, 'test:event'
	assertTrue @U.isVisible @correct
	assertFalse @U.isVisible @incorrect

testCase FormFieldValidatorFunctionalTest, "all valid values, except intInput, shouldn't validate", ->
	@setValidValues()
	@intInp.value = 'nonint'
	@U.fire @validate, 'test:event'
	assertFalse @U.isVisible @correct
	assertTrue @U.isVisible @incorrect

testCase FormFieldValidatorFunctionalTest, "all valid values, except intInput2, shouldn't validate", ->
	@setValidValues()
	@intInp2.value = 'nonint'
	@U.fire @validate, 'test:event'
	assertFalse @U.isVisible @correct
	assertTrue @U.isVisible @incorrect

testCase FormFieldValidatorFunctionalTest, "all valid values, except intInput2 (>max), shouldn't validate", ->
	@setValidValues()
	@intInp2.value = '1'
	@U.fire @validate, 'test:event'
	assertFalse @U.isVisible @correct
	assertTrue @U.isVisible @incorrect

testCase FormFieldValidatorFunctionalTest, "all valid values, except intInput2 (<min), shouldn't validate", ->
	@setValidValues()
	@intInp2.value = '-11'
	@U.fire @validate, 'test:event'
	assertFalse @U.isVisible @correct
	assertTrue @U.isVisible @incorrect

testCase FormFieldValidatorFunctionalTest, "all valid values, except floatInput, shouldn't validate", ->
	@setValidValues()
	@floatInp.value = 'nonint'
	@U.fire @validate, 'test:event'
	assertFalse @U.isVisible @correct
	assertTrue @U.isVisible @incorrect

testCase FormFieldValidatorFunctionalTest, "all valid values, except floatInput (>maxInclusive), shouldn't validate", ->
	@setValidValues()
	@floatInp.value = '5'
	@U.fire @validate, 'test:event'
	assertFalse @U.isVisible @correct
	assertTrue @U.isVisible @incorrect

testCase FormFieldValidatorFunctionalTest, "all valid values, except floatInput (=minExclusive), shouldn't validate", ->
	@setValidValues()
	@floatInp.value = '0'
	@U.fire @validate, 'test:event'
	assertFalse @U.isVisible @correct
	assertTrue @U.isVisible @incorrect

