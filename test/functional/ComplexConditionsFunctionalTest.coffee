ComplexConditionsFunctionalTest = new TestCase "ComplexConditionsFunctionalTest"

ComplexConditionsFunctionalTest::setUp = ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><p id="para" style="display: none;">just a paragraph.</p><ul id="ul"><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	#---------------------------------------------------------------------#

	rule ->
		@define 'complex conditions functional test',
			@on	@event		'#testElement', 'test:event'
			@when	@or,
					@when	@and,
							@when	@hasClass	'#testElement', 'eventable'
							@when	@hasClass	'#testElement', 'shortcut'
					@when	@hasClass	'#testElement', 'toggleable'
			@do	@toggle		'li, #para'

	#---------------------------------------------------------------------#

	@lis = rule.U.elements 'li'
	@para = rule.U.element '#para'
	@testElement = rule.U.element '#testElement'


testCase ComplexConditionsFunctionalTest, "sanity", ->
	assertEquals 'display:none', spacelessStyle @para
	for li in @lis
		assertEquals '', spacelessStyle li

testCase ComplexConditionsFunctionalTest, "event (only), shouldn't trigger", ->
	rule.U.fire @testElement, 'test:event'

	assertEquals 'display:none', spacelessStyle @para
	for li in @lis
		assertEquals '', spacelessStyle li

testCase ComplexConditionsFunctionalTest, "simple or condition met, shouldn't trigger", ->
	rule.U.addClass @testElement, 'toggleable'
	rule.U.fire @testElement, 'test:event'

	assertTrue spacelessStyle(@para) is '' or spacelessStyle(@para) is 'display:block'
	for li in @lis
		assertEquals 'display:none', spacelessStyle li

	#toggle
	rule.U.fire @testElement, 'test:event'

	assertEquals 'display:none', spacelessStyle @para
	for li in @lis
		assertTrue spacelessStyle(li) is '' or spacelessStyle(li) is 'display:block' or spacelessStyle(li) is 'display:list-item'

testCase ComplexConditionsFunctionalTest, "half of and condition met, shouldn't trigger", ->
	rule.U.addClass @testElement, 'eventable'
	rule.U.fire @testElement, 'test:event'

	assertEquals 'display:none', spacelessStyle @para
	for li in @lis
		assertEquals '', spacelessStyle li

testCase ComplexConditionsFunctionalTest, "all of and condition met, should trigger", ->
	rule.U.addClass @testElement, 'eventable'
	rule.U.addClass @testElement, 'shortcut'
	rule.U.fire @testElement, 'test:event'

	assertTrue spacelessStyle(@para) is '' or spacelessStyle(@para) is 'display:block'
	for li in @lis
		assertEquals 'display:none', spacelessStyle li

	#toggle
	rule.U.fire @testElement, 'test:event'

	assertEquals 'display:none', spacelessStyle @para
	for li in @lis
		assertTrue spacelessStyle(li) is '' or spacelessStyle(li) is 'display:block' or spacelessStyle(li) is 'display:list-item'


testCase ComplexConditionsFunctionalTest, "all conditions met, should trigger", ->
	rule.U.addClass @testElement, 'eventable'
	rule.U.addClass @testElement, 'shortcut'
	rule.U.addClass @testElement, 'eventable'
	rule.U.fire @testElement, 'test:event'

	assertTrue spacelessStyle(@para) is '' or spacelessStyle(@para) is 'display:block'
	for li in @lis
		assertEquals 'display:none', spacelessStyle li

	#toggle
	rule.U.fire @testElement, 'test:event'

	assertEquals 'display:none', spacelessStyle @para
	for li in @lis
		assertTrue spacelessStyle(li) is '' or spacelessStyle(li) is 'display:block' or spacelessStyle(li) is 'display:list-item'


