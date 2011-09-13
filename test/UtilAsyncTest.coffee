UtilAsyncTest = new AsyncTestCase "UtilAsyncTest"

###
IMPORTANT NOTE: Firefox 5+ and Chrome 11+ round setTimeout and setInterval to nearest 1000ms for *background* tabs, so our 100ms call gets rounded to zero.
Make sure FF and Chrome test clients have foreground tabs
(dom.min_background_timeout_value can be modified in FF to change this behaviour)
see: https://bugzilla.mozilla.org/show_bug.cgi?id=633421
and: http://code.google.com/p/chromium/issues/detail?id=66078
###
testCase UtilAsyncTest, "delay 0", (queue) ->
	o = {called: no}
	func = -> o.called = yes
	expectAsserts 3

	queue.call "1: sanity", ->
		assertFalse o.called
	queue.call "2: invoke delay", ->
		o.func = rule.U.delayed func, 0
		o.func() # need to make a call to start the countdown
		assertFalse o.called
	queue.call "3: test delayed invoked", (callbacks) ->
		f = callbacks.add -> assertTrue "should be called by now", o.called
		window.setTimeout f, 10

testCase UtilAsyncTest, "delay 100", (queue) ->
	o = {called: no}
	func = -> o.called = yes
	expectAsserts 5

	queue.call "1: sanity", ->
		assertFalse o.called
	queue.call "2: invoke delay", ->
		o.func = rule.U.delayed func, 0.1
		o.func() # need to make a call to start the countdown
		assertFalse o.called
	queue.call "3: test delayed not invoked at 10ms", (callbacks) ->
		f = callbacks.add -> assertFalse "shouldn't be called at 10ms", o.called
		window.setTimeout f, 10
	queue.call "4: test delayed not invoked at 50ms", (callbacks) ->
		f = callbacks.add -> assertFalse "shouldn't be called at 50ms", o.called
		window.setTimeout f, 40
	queue.call "4: test delayed invoked at 150ms", (callbacks) ->
		f = callbacks.add -> assertTrue "should be called by now", o.called
		window.setTimeout f, 100

testCase UtilAsyncTest, "cumulativeDelay 0, no call", (queue) ->
	o = {called: no}
	func = -> o.called = yes
	expectAsserts 3

	queue.call "1: sanity", ->
		assertFalse o.called	
	queue.call "2: invoke delay", ->
		o.func = rule.U.cumulativeDelayed func, 0
		o.func() # need to make a call to start the countdown
		assertFalse o.called
	queue.call "3: test delayed invoked", (callbacks) ->
		f = callbacks.add -> assertTrue "should be called by now", o.called
		window.setTimeout f, 10

testCase UtilAsyncTest, "cumulativeDelay 100, no call", (queue) ->
	o = {called: no}
	func = -> o.called = yes
	expectAsserts 5

	queue.call "1: sanity", ->
		assertFalse o.called
	queue.call "2: invoke delay", ->
		o.func = rule.U.cumulativeDelayed func, 0.1
		o.func() # need to make a call to start the countdown
		assertFalse o.called
	queue.call "3: test delayed not invoked at 10ms", (callbacks) ->
		f = callbacks.add -> assertFalse "shouldn't be called at 10ms", o.called
		window.setTimeout f, 10
	queue.call "4: test delayed not invoked at 50ms", (callbacks) ->
		f = callbacks.add -> assertFalse "shouldn't be called at 50ms", o.called
		window.setTimeout f, 40
	queue.call "4: test delayed invoked at 150ms", (callbacks) ->
		f = callbacks.add -> assertTrue "should be called by now", o.called
		window.setTimeout f, 100

testCase UtilAsyncTest, "cumulativeDelay 50, subsequent calls should delay further", (queue) ->
	o = {called: no}
	func = -> o.called = yes
	expectAsserts 8

	queue.call "1: sanity", ->
		assertFalse o.called
	queue.call "2: invoke delay", ->
		o.func = rule.U.cumulativeDelayed func, 0.05
		o.func() # need to make a call to start the countdown
		assertFalse o.called
	queue.call "3: test delayed not invoked at 10ms", (callbacks) ->
		f = callbacks.add ->
			o.func()
			assertFalse "shouldn't be called at 10ms", o.called
		window.setTimeout f, 10
	queue.call "3: test delayed not invoked at 40ms", (callbacks) ->
		f = callbacks.add ->
			o.func()
			assertFalse "shouldn't be called at 40ms", o.called
		window.setTimeout f, 30
	queue.call "4: test delayed not invoked at 70ms", (callbacks) ->
		f = callbacks.add ->
			o.func()
			assertFalse "shouldn't be called at 70ms", o.called
		window.setTimeout f, 30
	queue.call "5: test delayed not invoked at 100ms", (callbacks) ->
		f = callbacks.add ->
			o.func()
			assertFalse "shouldn't be called at 100ms", o.called
		window.setTimeout f, 20
	queue.call "6: test delayed not invoked at 120ms", (callbacks) ->
		f = callbacks.add ->
			assertFalse "shouldn't be called at 120ms", o.called
		window.setTimeout f, 20
	queue.call "7: test delayed invoked at 200ms", (callbacks) ->
		f = callbacks.add ->
			assertTrue "should be called by now", o.called
		window.setTimeout f, 80

