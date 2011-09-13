DelayedEventHandlingTest = new AsyncTestCase "DelayedEventHandlingTest"

DelayedEventHandlingTest::setUp = ->
	`/*:DOC += <div><span id="toggleElement" style="display: none;">toggle</span><span id="eventElement">event</span></div> */
	`

	#---------------------------------------------------------------------#

	rule ->
		@define 'delayed event handling functional test',
			@on	@event	'#eventElement', 'delay:event', { delayed: 0.1 }
			@on	@event	'#eventElement', 'cumulativeDelayed:event', { cumulativeDelayed: 0.1 }
			@do	@show	'#toggleElement'

	#---------------------------------------------------------------------#

	@U = rule.U
	@eEle = @U.element 'eventElement'
	@tEle = @U.element 'toggleElement'

testCase DelayedEventHandlingTest, 'delayed event handle', (queue) ->
	expectAsserts 4

	queue.call "1: sanity", =>
		assertFalse @U.isVisible @tEle
	queue.call "2: trigger", =>
		@U.fire @eEle, 'delay:event'
	queue.call "3: test delayed not invoked at 10ms", (callbacks) =>
		f = callbacks.add =>
			assertFalse "shouldn't be visible at 10ms", @U.isVisible @tEle
		window.setTimeout f, 10
	queue.call "4: test delayed not invoked at 50ms", (callbacks) =>
		f = callbacks.add =>
			@U.fire @eEle, 'delay:event' # shouldn't do a cumulative, test it out to make sure it doesn't add another 100ms
			assertFalse "shouldn't be visible at 50ms", @U.isVisible @tEle
		window.setTimeout f, 40
	queue.call "5: test delayed invoked at 140ms", (callbacks) =>
		f = callbacks.add =>
			assertTrue "should be visible by now", @U.isVisible @tEle
		window.setTimeout f, 90

testCase DelayedEventHandlingTest, 'cumulativeDelayed event handle, no additional events', (queue) ->
	expectAsserts 4

	queue.call "1: sanity", =>
		assertFalse @U.isVisible @tEle
	queue.call "2: trigger", =>
		@U.fire @eEle, 'cumulativeDelayed:event'
	queue.call "3: test delayed not invoked at 10ms", (callbacks) =>
		f = callbacks.add =>
			assertFalse "shouldn't be visible at 10ms", @U.isVisible @tEle
		window.setTimeout f, 10
	queue.call "4: test delayed not invoked at 50ms", (callbacks) =>
		f = callbacks.add =>
			assertFalse "shouldn't be visible at 50ms", @U.isVisible @tEle
		window.setTimeout f, 40
	queue.call "5: test delayed invoked at 140ms", (callbacks) =>
		f = callbacks.add =>
			assertTrue "should be visible by now", @U.isVisible @tEle
		window.setTimeout f, 90

testCase DelayedEventHandlingTest, 'cumulativeDelayed event handle, additional events', (queue) ->
	expectAsserts 7

	queue.call "1: sanity", =>
		assertFalse @U.isVisible @tEle
	queue.call "2: trigger", =>
		@U.fire @eEle, 'cumulativeDelayed:event'
	queue.call "3: test delayed not invoked at 10ms", (callbacks) =>
		f = callbacks.add =>
			@U.fire @eEle, 'cumulativeDelayed:event'
			assertFalse "shouldn't be visible at 10ms", @U.isVisible @tEle
		window.setTimeout f, 10
	queue.call "4: test delayed not invoked at 40ms", (callbacks) =>
		f = callbacks.add =>
			@U.fire @eEle, 'cumulativeDelayed:event'
			assertFalse "shouldn't be visible at 40ms", @U.isVisible @tEle
		window.setTimeout f, 30
	queue.call "5: test delayed not invoked at 70ms", (callbacks) =>
		f = callbacks.add =>
			@U.fire @eEle, 'cumulativeDelayed:event'
			assertFalse "shouldn't be visible at 70ms", @U.isVisible @tEle
		window.setTimeout f, 30
	queue.call "6: test delayed not invoked at 100ms", (callbacks) =>
		f = callbacks.add =>
			@U.fire @eEle, 'cumulativeDelayed:event'
			assertFalse "shouldn't be visible at 100ms", @U.isVisible @tEle
		window.setTimeout f, 20
	queue.call "7: test delayed not invoked at 120ms", (callbacks) =>
		f = callbacks.add =>
			assertFalse "shouldn't be visible at 120ms", @U.isVisible @tEle
		window.setTimeout f, 20
	queue.call "8: test delayed invoked at 200ms", (callbacks) =>
		f = callbacks.add =>
			assertTrue "should be visible by now", @U.isVisible @tEle
		window.setTimeout f, 80

