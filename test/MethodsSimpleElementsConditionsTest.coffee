MethodsSimpleElementsConditionsTest = new TestCase "MethodsSimpleElementsConditionsTest"

testCase MethodsSimpleElementsConditionsTest, "hasClass yes", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	r = rule.hasClass '#firstli', 'l'
	assertTrue r.satisfied()

testCase MethodsSimpleElementsConditionsTest, "hasClass no, but has others", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	r = rule.hasClass '#firstli', 'x'
	assertFalse r.satisfied()

testCase MethodsSimpleElementsConditionsTest, "hasClass no, classless", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	r = rule.hasClass '#testElement', 'x'
	assertFalse r.satisfied()

testCase MethodsSimpleElementsConditionsTest, "hasClass, multi element, yes", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li class="l">notme!</li><li class="l">three</li></div> */
	`

	r = rule.hasClass 'li', 'l'
	assertTrue r.satisfied()


testCase MethodsSimpleElementsConditionsTest, "hasClass, multi element, no, none have class", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li class="l">notme!</li><li class="l">three</li></div> */
	`

	r = rule.hasClass 'li', 'x'
	assertFalse r.satisfied()


testCase MethodsSimpleElementsConditionsTest, "hasClass, multi element, no, but one has class", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li class="l">notme!</li><li class="l">three</li></div> */
	`

	r = rule.hasClass 'li', 'leaveme'
	assertFalse r.satisfied()

