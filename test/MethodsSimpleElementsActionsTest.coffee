MethodsSimpleElementsActionsTest = new TestCase "MethodsSimpleElementsActionsTest"

testCase MethodsSimpleElementsActionsTest, "show", ->
	`/*:DOC += <div><p id="testElement" style="display: none;">A paragraph element</p><ul><li class="l">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals 'display:none', spacelessStyle 'testElement'
	r = rule.show '#testElement'
	r.trigger()
	assertEquals '', spacelessStyle 'testElement'

testCase MethodsSimpleElementsActionsTest, "show, multi-element", ->
	`/*:DOC += <div><p id="testElement" style="display: none;">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo" style="display: none;">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`
	
	assertEquals 'display:none', spacelessStyle 'testElement'
	assertEquals 'display:none', spacelessStyle 'firstli'
	r = rule.show '#testElement,ul li:first-child'
	r.trigger()
	assertEquals '', spacelessStyle 'testElement'
	assertEquals '', spacelessStyle 'firstli'

testCase MethodsSimpleElementsActionsTest, "hide", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li class="l">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals '', spacelessStyle 'testElement'
	r = rule.hide '#testElement'
	r.trigger()
	assertEquals 'display:none', spacelessStyle 'testElement'

testCase MethodsSimpleElementsActionsTest, "hide, multi-element", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`
	
	assertEquals '', spacelessStyle 'testElement'
	assertEquals '', spacelessStyle 'firstli'
	r = rule.hide '#testElement,ul li:first-child'
	r.trigger()
	assertEquals 'display:none', spacelessStyle 'testElement'
	assertEquals 'display:none', spacelessStyle 'firstli'

testCase MethodsSimpleElementsActionsTest, "toggle", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li class="l">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals '', spacelessStyle 'testElement'
	r = rule.toggle '#testElement'
	r.trigger()
	assertEquals 'display:none', spacelessStyle 'testElement'
	r.trigger()
	assertTrue spacelessStyle('testElement') is '' or spacelessStyle('testElement') is 'display:block'
	r.trigger()
	assertEquals 'display:none', spacelessStyle 'testElement'

testCase MethodsSimpleElementsActionsTest, "toggle, multi-element", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals '', spacelessStyle 'testElement'
	assertEquals '', spacelessStyle 'firstli'
	r = rule.toggle '#testElement, ul li' # this one toggles all LI elements rather than just first-element
	r.trigger()
	assertEquals 'display:none', spacelessStyle 'testElement'
	assertEquals 'display:none', spacelessStyle 'firstli'
	r.trigger()
	assertTrue spacelessStyle('testElement') is '' or spacelessStyle('testElement') is 'display:block'
	assertTrue spacelessStyle('firstli') is '' or spacelessStyle('firstli') is 'display:block' or spacelessStyle('firstli') is 'display:list-item'
	r.trigger()
	assertEquals 'display:none', spacelessStyle 'testElement'
	assertEquals 'display:none', spacelessStyle 'firstli'

testCase MethodsSimpleElementsActionsTest, "addClass simple", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals '', classNames 'testElement'
	r = rule.addClass '#testElement', 'newClass'
	r.trigger()
	assertEquals 'newClass', classNames 'testElement'
	r.trigger()
	assertEquals 'newClass', classNames 'testElement'

testCase MethodsSimpleElementsActionsTest, "addClass simple, multi-element", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals '', classNames 'testElement'
	assertEquals 'l', classNames 'firstli'
	r = rule.addClass '#testElement, #firstli', 'newClass'
	r.trigger()
	assertEquals 'newClass', classNames 'testElement'
	assertEquals 'l newClass', classNames 'firstli'
	r.trigger()
	assertEquals 'newClass', classNames 'testElement'
	assertEquals 'l newClass', classNames 'firstli'

testCase MethodsSimpleElementsActionsTest, "addClass to existing class", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals 'l', classNames 'firstli'
	r = rule.addClass '#firstli', 'newClass'
	r.trigger()
	assertEquals 'l newClass', classNames 'firstli'
	r.trigger()
	assertEquals 'l newClass', classNames 'firstli'

testCase MethodsSimpleElementsActionsTest, "removeClass from existing", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals 'l', classNames 'firstli'
	r = rule.removeClass '#firstli', 'l'
	r.trigger()
	assertEquals '', classNames 'firstli'
	r.trigger()
	assertEquals '', classNames 'firstli'

testCase MethodsSimpleElementsActionsTest, "removeClass from existing, multi-element", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l">one</li><li class="l">two</li><li>notme!</li><li class="l" id="lastli">three</li></div> */
	`

	assertEquals 'l', classNames 'firstli'
	assertEquals 'l', classNames 'lastli'
	r = rule.removeClass 'li', 'l'
	r.trigger()
	assertEquals '', classNames 'firstli'
	assertEquals '', classNames 'lastli'
	r.trigger()
	assertEquals '', classNames 'firstli'
	assertEquals '', classNames 'lastli'

testCase MethodsSimpleElementsActionsTest, "removeClass from existing leaving others intact", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals 'l leaveme leavemetoo', classNames 'firstli'
	r = rule.removeClass '#firstli', 'l'
	r.trigger()
	assertEquals 'leaveme leavemetoo', classNames 'firstli'
	r.trigger()
	assertEquals 'leaveme leavemetoo', classNames 'firstli'

testCase MethodsSimpleElementsActionsTest, "removeClass from element without", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals '', classNames 'testElement'
	r = rule.removeClass '#testElement', 'l'
	r.trigger()
	assertEquals '', classNames 'testElement'

testCase MethodsSimpleElementsActionsTest, "toggleClass simple", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals '', classNames 'testElement'
	r = rule.toggleClass '#testElement', 'aClass'
	r.trigger()
	assertEquals 'aClass', classNames 'testElement'
	r.trigger()
	assertEquals '', classNames 'testElement'
	r.trigger()
	assertEquals 'aClass', classNames 'testElement'

testCase MethodsSimpleElementsActionsTest, "toggleClass simple, multi-element", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals '', classNames 'testElement'
	assertEquals 'l leaveme leavemetoo', classNames 'firstli'
	r = rule.toggleClass '#testElement, li', 'aClass'
	r.trigger()
	assertEquals 'aClass', classNames 'testElement'
	assertEquals 'l leaveme leavemetoo aClass', classNames 'firstli'
	r.trigger()
	assertEquals '', classNames 'testElement'
	assertEquals 'l leaveme leavemetoo', classNames 'firstli'
	r.trigger()
	assertEquals 'aClass', classNames 'testElement'
	assertEquals 'l leaveme leavemetoo aClass', classNames 'firstli'

testCase MethodsSimpleElementsActionsTest, "toggleClass with other classes", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	assertEquals 'l leaveme leavemetoo', classNames 'firstli'
	r = rule.toggleClass '#firstli', 'aClass'
	r.trigger()
	assertEquals 'l leaveme leavemetoo aClass', classNames 'firstli'
	r.trigger()
	assertEquals 'l leaveme leavemetoo', classNames 'firstli'
	r.trigger()
	assertEquals 'l leaveme leavemetoo aClass', classNames 'firstli'

	
