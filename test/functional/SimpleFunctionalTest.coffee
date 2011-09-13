SimpleFunctionalTest = new TestCase "SimpleFunctionalTest"

testCase SimpleFunctionalTest, "simple functional test", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><p id="para" style="display: none;">just a paragraph.</p><ul id="ul"><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

	#---------------------------------------------------------------------#

	rule ->
		@define 'simple functional test',
			@on		@event		'#testElement', 'test:event'
			@do		@toggle		'li, #para'


	#---------------------------------------------------------------------#

	lis = rule.U.elements 'li'
	para = rule.U.element '#para'
	testElement = rule.U.element '#testElement'
	assertEquals 'display:none', spacelessStyle para
	for li in lis
		assertEquals '', spacelessStyle li

	rule.U.fire testElement, 'test:event'
	assertTrue spacelessStyle(para) is '' or spacelessStyle(para) is 'display:block'
	for li in lis
		assertEquals 'display:none', spacelessStyle li

	rule.U.fire testElement, 'test:event'
	assertEquals 'display:none', spacelessStyle para
	for li in lis
		assertTrue spacelessStyle(li) is '' or spacelessStyle(li) is 'display:block' or spacelessStyle(li) is 'display:list-item'

	rule.U.fire testElement, 'test:event'
	assertTrue spacelessStyle(para) is '' or spacelessStyle(para) is 'display:block'
	for li in lis
		assertEquals 'display:none', spacelessStyle li

