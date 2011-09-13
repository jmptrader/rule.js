MethodsEventTest = new TestCase "MethodsEventTest"

testCase MethodsEventTest, "custom event", ->
	`/*:DOC += <div><p id="testElement">A paragraph element</p><p id="para" style="display: none;">just a paragraph.</p><ul id="ul"><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	`

