SimpleConditionalFunctionalTest = new TestCase "SimpleConditionalFunctionalTest"

testCase SimpleConditionalFunctionalTest, "simple functional test", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><p id="para" style="display: none;">just a paragraph.</p><ul id="ul"><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	#---------------------------------------------------------------------#

	rule ->
		@define 'simple functional test',
			@on		@event		'#testElement', 'test:event'
			@when		@hasClass	'#firstli', 'toggleable'
			@do		@toggle		'li, #para'

	#---------------------------------------------------------------------#

	# sanity
	lis = rule.U.elements 'li'
	para = rule.U.element '#para'
	testElement = rule.U.element '#testElement'
	assertEquals '1: para not shown', 'display:none', spacelessStyle para
	for li in lis
		assertEquals '1: li shown', '', spacelessStyle li

	# condition not met
	rule.U.fire testElement, 'test:event'
	assertEquals '2: para not shown', 'display:none', spacelessStyle para
	for li in lis
		assertEquals '2: li shown',  '', spacelessStyle li

	# condition still not met
	rule.U.addClass lis[0], 'nottoggleable'
	rule.U.fire testElement, 'test:event'
	assertEquals '3: para not shown', 'display:none', spacelessStyle para
	for li in lis
		assertEquals '3: li not shown',  '', spacelessStyle li

	# condition met
	rule.U.addClass lis[0], 'toggleable'
	rule.U.fire testElement, 'test:event'
	assertTrue '4: para shown', spacelessStyle(para) is '' or spacelessStyle(para) is 'display:block'
	for li in lis
		assertEquals '4: li not shown',  'display:none', spacelessStyle li

	rule.U.fire testElement, 'test:event'
	assertEquals '5: para not shown', 'display:none', spacelessStyle para
	for li in lis
		assertTrue '5: li shown',  spacelessStyle(li) is '' or spacelessStyle(li) is 'display:block' or spacelessStyle(li) is 'display:list-item'

	rule.U.fire testElement, 'test:event'
	assertTrue '6: para shown', spacelessStyle(para) is '' or spacelessStyle(para) is 'display:block'
	for li in lis
		assertEquals '6: li not shown',  'display:none', spacelessStyle li

	# condition not met
	rule.U.removeClass lis[0], 'toggleable'
	rule.U.fire testElement, 'test:event'
	assertTrue '7: para shown', spacelessStyle(para) is '' or spacelessStyle(para) is 'display:block'
	for li in lis
		assertEquals '7: li not shown',  'display:none', spacelessStyle li

