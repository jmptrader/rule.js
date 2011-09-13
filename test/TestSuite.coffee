testSuite = TestCase
testCase = (clazz, name, func) ->
	clazz.prototype["test #{name}"] = func
TestUtil =
	createSinonMockFor: (api, functionName, withArg, returnValue) ->
		mock = sinon.mock(api)
		expectation = mock.expects(functionName)
		expectation = expectation.withExactArgs(withArg) if withArg?
		expectation = expectation.once()
		expectation.returns(returnValue) if returnValue?
		mock
spacelessStyle = (elementId) ->
	if rule.U.isString elementId
		e = document.getElementById(elementId)
	else
		e = elementId
	e.style.cssText.replace(new RegExp('[\\s;]', 'g'), '').toLowerCase()

classNames = (elementId) ->
	if rule.U.isString elementId
		e = document.getElementById(elementId)
	else
		e = elementId
	e.className

#= require "MethodsEventTest"
#= require "MethodsSimpleElementsActionsTest"
#= require "MethodsSimpleElementsConditionsTest"
#= require "RuleRootCallTest"

#= require "classes/ClassesTestSuite"
#= require "functional/FunctionalTestSuite"
