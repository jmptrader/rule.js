var ClassActionTest, ClassBaseTest, ClassConditionAndTest, ClassConditionOrTest, ClassConditionTest, ClassEventTest, ClassOtherwiseTest, ClassRootTest, ClassSimpleElementsActionTest, ClassSimpleElementsConditionTest, ClassValidatorEmailTest, ClassValidatorFloatTest, ClassValidatorIntegerTest, ClassValidatorRegexTest, ClassValidatorRequiredTest, ClassWhenTest, ComplexConditionsFunctionalTest, DelayedEventHandlingTest, FormFieldValidatorFunctionalTest, MethodsEventTest, MethodsSimpleElementsActionsTest, MethodsSimpleElementsConditionsTest, RuleRootCallTest, SimpleConditionalFunctionalTest, SimpleFunctionalTest, TestUtil, UtilAsyncTest, UtilTest, classNames, spacelessStyle, testCase, testSuite;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
testSuite = TestCase;
testCase = function(clazz, name, func) {
  return clazz.prototype["test " + name] = func;
};
TestUtil = {
  createSinonMockFor: function(api, functionName, withArg, returnValue) {
    var expectation, mock;
    mock = sinon.mock(api);
    expectation = mock.expects(functionName);
    if (withArg != null) {
      expectation = expectation.withExactArgs(withArg);
    }
    expectation = expectation.once();
    if (returnValue != null) {
      expectation.returns(returnValue);
    }
    return mock;
  }
};
spacelessStyle = function(elementId) {
  var e;
  if (rule.U.isString(elementId)) {
    e = document.getElementById(elementId);
  } else {
    e = elementId;
  }
  return e.style.cssText.replace(new RegExp('[\\s;]', 'g'), '').toLowerCase();
};
classNames = function(elementId) {
  var e;
  if (rule.U.isString(elementId)) {
    e = document.getElementById(elementId);
  } else {
    e = elementId;
  }
  return e.className;
};
UtilTest = new TestCase("UtilTest");
testCase(UtilTest, "isFunction", function() {
  assertTrue(rule.U.isFunction(function() {}));
  assertFalse(rule.U.isFunction('not a function'));
  assertFalse(rule.U.isFunction(100));
  return assertFalse(rule.U.isFunction({}));
});
testCase(UtilTest, "isFunction handles null and undefined", function() {
  assertFalse(rule.U.isFunction(null));
  return assertFalse(rule.U.isFunction(void 0));
});
testCase(UtilTest, "isString", function() {
  assertTrue(rule.U.isString('a string'));
  assertFalse(rule.U.isString(function() {}));
  assertFalse(rule.U.isString(100));
  return assertFalse(rule.U.isString({}));
});
testCase(UtilTest, "isString handles null and undefined", function() {
  assertFalse(rule.U.isString(null));
  return assertFalse(rule.U.isString(void 0));
});
testCase(UtilTest, "isArray", function() {
  assertTrue(rule.U.isArray([]));
  assertTrue(rule.U.isArray([1, 2, 3]));
  assertFalse(rule.U.isArray(function() {}));
  assertFalse(rule.U.isArray('not an array'));
  assertFalse(rule.U.isArray(100));
  return assertFalse(rule.U.isArray({}));
});
testCase(UtilTest, "isArray handles null and undefined", function() {
  assertFalse(rule.U.isArray(null));
  return assertFalse(rule.U.isArray(void 0));
});
testCase(UtilTest, "toArray handles null and undefined", function() {
  assertNull(rule.U.toArray(null));
  return assertNull(rule.U.toArray(void 0));
});
testCase(UtilTest, "toArray handles array", function() {
  var arr;
  arr = [1, 2, 3];
  assertEquals(arr, rule.U.toArray(arr));
  return assertEquals(arr, rule.U.toArray(arr));
});
testCase(UtilTest, "toArray arguments object", function() {
  var getArgs;
  getArgs = function() {
    return arguments;
  };
  assertTrue(getArgs(1, 2, 3, 4)['shift'] === void 0);
  assertTrue(rule.U.toArray(getArgs(1, 2, 3, 4))['shift'] !== void 0);
  return assertTrue(rule.U.isFunction(rule.U.toArray(getArgs(1, 2, 3, 4))['shift']));
});
testCase(UtilTest, "elements, single element by id", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li class="l">notme!</li><li class="l">three</li></div> */
	;  var ele;
  ele = rule.U.elements('#testElement');
  assertEquals(1, ele.length);
  assertEquals('testElement', ele[0].id);
  return assertEquals('P', ele[0].tagName);
});
testCase(UtilTest, "element, plain id", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li class="l">notme!</li><li class="l">three</li></div> */
	;  var ele;
  ele = rule.U.element('testElement');
  assertEquals('testElement', ele.id);
  return assertEquals('P', ele.tagName);
});
testCase(UtilTest, "element, hash id", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li class="l">notme!</li><li class="l">three</li></div> */
	;  var ele;
  ele = rule.U.element('#testElement');
  assertEquals('testElement', ele.id);
  return assertEquals('P', ele.tagName);
});
testCase(UtilTest, "element, no such id", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li class="l">notme!</li><li class="l">three</li></div> */
	;  var ele;
  ele = rule.U.element('#noSuchElement');
  return assertNull(ele);
});
testCase(UtilTest, "elements, multi element by ids", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li class="l">notme!</li><li class="l">three</li></div> */
	;  var ele;
  ele = rule.U.elements('#testElement, #firstli');
  assertEquals(2, ele.length);
  assertEquals('testElement', ele[0].id);
  assertEquals('P', ele[0].tagName);
  assertEquals('firstli', ele[1].id);
  return assertEquals('LI', ele[1].tagName);
});
testCase(UtilTest, "elements, multi element by complex selector", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var ele;
  ele = rule.U.elements('#testElement, li.l');
  assertEquals(4, ele.length);
  assertEquals('testElement', ele[0].id);
  assertEquals('P', ele[0].tagName);
  assertEquals('firstli', ele[1].id);
  assertEquals('LI', ele[1].tagName);
  assertEquals('LI', ele[2].tagName);
  return assertEquals('LI', ele[3].tagName);
});
testCase(UtilTest, "observe and fire, single element, as element", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var ele, fired, listener;
  fired = false;
  listener = function() {
    return fired = true;
  };
  ele = rule.U.element("#testElement");
  rule.U.observe(ele, 'test:event', listener);
  assertFalse(fired);
  rule.U.fire(ele, 'test:event');
  return assertTrue(fired);
});
testCase(UtilTest, "observe and fire, single element, as selector", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var ele, fired, listener;
  fired = false;
  listener = function() {
    return fired = true;
  };
  ele = '#testElement';
  rule.U.observe(ele, 'test:event', listener);
  assertFalse(fired);
  rule.U.fire(ele, 'test:event');
  return assertTrue(fired);
});
testCase(UtilTest, "observe and fire, multi element", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var ele, fired, listener;
  fired = 0;
  listener = function() {
    return fired++;
  };
  ele = 'li.l';
  rule.U.observe(ele, 'test:event', listener);
  assertEquals(0, fired);
  rule.U.fire(ele, 'test:event');
  return assertEquals(3, fired);
});
testCase(UtilTest, "bind", function() {
  var f, fbound, o;
  o = {
    i: 0
  };
  f = function() {
    if (this.i != null) {
      return this.i++;
    }
  };
  assertEquals(0, o.i);
  f();
  assertEquals(0, o.i);
  fbound = rule.U.bind(f, o);
  f();
  assertEquals(0, o.i);
  fbound();
  assertEquals(1, o.i);
  fbound();
  return assertEquals(2, o.i);
});
testCase(UtilTest, "show", function() {
  /*:DOC += <div><p id="testElement" style="display: none;">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('display:none', spacelessStyle('testElement'));
  r = rule.U.show(rule.U.element("#testElement"));
  return assertEquals('', spacelessStyle('testElement'));
});
testCase(UtilTest, "show, not hidden", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('', spacelessStyle('testElement'));
  r = rule.U.show(rule.U.element("#testElement"));
  return assertEquals('', spacelessStyle('testElement'));
});
testCase(UtilTest, "hide, hidden", function() {
  /*:DOC += <div><p id="testElement" style="display: none;">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('display:none', spacelessStyle('testElement'));
  r = rule.U.hide(rule.U.element("#testElement"));
  return assertEquals('display:none', spacelessStyle('testElement'));
});
testCase(UtilTest, "hide", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('', spacelessStyle('testElement'));
  r = rule.U.hide(rule.U.element("#testElement"));
  return assertEquals('display:none', spacelessStyle('testElement'));
});
testCase(UtilTest, "toggle", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var ele, r;
  assertEquals('', spacelessStyle('testElement'));
  r = rule.U.toggle(ele = rule.U.element("#testElement"));
  assertEquals('display:none', spacelessStyle('testElement'));
  r = rule.U.toggle(ele);
  assertTrue(spacelessStyle('testElement') === '' || spacelessStyle('testElement') === 'display:block');
  r = rule.U.toggle(ele);
  return assertEquals('display:none', spacelessStyle('testElement'));
});
testCase(UtilTest, "addClass", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('', classNames('testElement'));
  r = rule.U.addClass(rule.U.element("#testElement"), "newClass");
  assertEquals('newClass', classNames('testElement'));
  r = rule.U.addClass(rule.U.element("#testElement"), "newClass");
  return assertEquals('newClass', classNames('testElement'));
});
testCase(UtilTest, "addClass to existing", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('l leaveme leavemetoo', classNames('firstli'));
  r = rule.U.addClass(rule.U.element("#firstli"), "l");
  assertEquals('l leaveme leavemetoo', classNames('firstli'));
  r = rule.U.addClass(rule.U.element("#firstli"), "newClass");
  return assertEquals('l leaveme leavemetoo newClass', classNames('firstli'));
});
testCase(UtilTest, "removeClass", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('l leaveme leavemetoo', classNames('firstli'));
  r = rule.U.removeClass(rule.U.element("#firstli"), "bzzt");
  assertEquals('l leaveme leavemetoo', classNames('firstli'));
  r = rule.U.removeClass(rule.U.element("#firstli"), "l");
  return assertEquals('leaveme leavemetoo', classNames('firstli'));
});
testCase(UtilTest, "toggleClass", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('l leaveme leavemetoo', classNames('firstli'));
  r = rule.U.toggleClass(rule.U.element("#firstli"), "bzzt");
  assertEquals('l leaveme leavemetoo bzzt', classNames('firstli'));
  r = rule.U.toggleClass(rule.U.element("#firstli"), "bzzt");
  assertEquals('l leaveme leavemetoo', classNames('firstli'));
  r = rule.U.toggleClass(rule.U.element("#firstli"), "l");
  assertEquals('leaveme leavemetoo', classNames('firstli'));
  r = rule.U.toggleClass(rule.U.element("#firstli"), "l");
  return assertEquals('leaveme leavemetoo l', classNames('firstli'));
});
testCase(UtilTest, "invoke", function() {
  var calls, o1, o2, o3;
  calls = 0;
  o1 = {
    call: function() {
      return calls += 1;
    }
  };
  o2 = {
    call: function() {
      return calls += 2;
    }
  };
  o3 = {
    call: function() {
      return calls += 10;
    }
  };
  assertEquals(0, calls);
  rule.U.invoke([o1, o2, o3], 'call');
  return assertEquals(13, calls);
});
testCase(UtilTest, "invoke with arg", function() {
  var calls, o1, o2, o3;
  calls = 0;
  o1 = {
    call: function(i) {
      return calls += 1 + i;
    }
  };
  o2 = {
    call: function() {
      return calls += 2;
    }
  };
  o3 = {
    call: function(i, j) {
      return calls += 10 + j;
    }
  };
  assertEquals(0, calls);
  rule.U.invoke([o1, o2, o3], 'call', 100, 1000);
  return assertEquals(1113, calls);
});
testCase(UtilTest, "each", function() {
  var f, o1, o2, o3;
  o1 = {
    count: 0
  };
  o2 = {
    count: 1
  };
  o3 = {
    count: 2
  };
  f = function(o) {
    return o.count++;
  };
  rule.U.each([o1, o2, o3], f);
  assertEquals(1, o1.count);
  assertEquals(2, o2.count);
  return assertEquals(3, o3.count);
});
testCase(UtilTest, "each with arg", function() {
  var f, o1, o2, o3;
  o1 = {
    count: 0
  };
  o2 = {
    count: 1
  };
  o3 = {
    count: 2
  };
  f = function(o, a1, a2) {
    return o.count = o.count + a1 - a2;
  };
  rule.U.each([o1, o2, o3], f, [1000, 100]);
  assertEquals(900, o1.count);
  assertEquals(901, o2.count);
  return assertEquals(902, o3.count);
});
testCase(UtilTest, "extend with null args", function() {
  return assertNull(rule.U.extend(null, null));
});
testCase(UtilTest, "extend with null second arg", function() {
  var obj, ret;
  obj = {
    k: 'v'
  };
  ret = rule.U.extend(obj, null);
  assertNotNull(ret);
  return assertEquals('v', ret.k);
});
testCase(UtilTest, "extend", function() {
  var obj1, obj2, ret, x;
  obj1 = {
    k: 'v',
    k2: 'v2'
  };
  x = {};
  obj2 = {
    o2k: 'ov2',
    x: x
  };
  ret = rule.U.extend(obj1, obj2);
  assertNotNull(ret);
  assertEquals('v', ret.k);
  assertEquals('v2', ret.k2);
  assertEquals('ov2', ret.o2k);
  return assertSame(x, ret.x);
});
testCase(UtilTest, "fieldValue input type=text", function() {
  /*:DOC += <div><form><input name="tinp" id="tinp" type="text" value="text value"><input name="rinp" type="radio" value="value1"><input name="rinp" type="radio" value="value2" checked><input name="rinp" type="radio" value="value3"><input name="cinp" type="checkbox" value="cvalue1" checked><input name="cinp" type="checkbox" value="cvalue2"><input name="cinp" type="checkbox" value="cvalue3" checked><textarea name="tainp">contents of the textarea</textarea><select name="sinp"><option value="one">1</option><option value="two" selected>2</option><option value="three">3</option></select></form></div> */
	;  return assertEquals("text value", rule.U.fieldValue(rule.U.elements("#tinp")));
});
testCase(UtilTest, "fieldValue input type=radio", function() {
  /*:DOC += <div><form><input name="tinp" id="tinp" type="text" value="text value"><input name="rinp" type="radio" value="value1"><input name="rinp" type="radio" value="value2" checked><input name="rinp" type="radio" value="value3"><input name="cinp" type="checkbox" value="cvalue1" checked><input name="cinp" type="checkbox" value="cvalue2"><input name="cinp" type="checkbox" value="cvalue3" checked><textarea name="tainp">contents of the textarea</textarea><select name="sinp"><option value="one">1</option><option value="two" selected>2</option><option value="three">3</option></select></form></div> */
	;  return assertEquals("value2", rule.U.fieldValue(rule.U.elements("input[type=\"radio\"]")));
});
testCase(UtilTest, "fieldValue input type=checkbox", function() {
  /*:DOC += <div><form><input name="tinp" id="tinp" type="text" value="text value"><input name="rinp" type="radio" value="value1"><input name="rinp" type="radio" value="value2" checked><input name="rinp" type="radio" value="value3"><input name="cinp" type="checkbox" value="cvalue1" checked><input name="cinp" type="checkbox" value="cvalue2"><input name="cinp" type="checkbox" value="cvalue3" checked><textarea name="tainp">contents of the textarea</textarea><select name="sinp"><option value="one">1</option><option value="two" selected>2</option><option value="three">3</option></select></form></div> */
	;  return assertEquals(["cvalue1", "cvalue3"], rule.U.fieldValue(rule.U.elements("input[type=checkbox]")));
});
testCase(UtilTest, "fieldValue textarea", function() {
  /*:DOC += <div><form><input name="tinp" id="tinp" type="text" value="text value"><input name="rinp" type="radio" value="value1"><input name="rinp" type="radio" value="value2" checked><input name="rinp" type="radio" value="value3"><input name="cinp" type="checkbox" value="cvalue1" checked><input name="cinp" type="checkbox" value="cvalue2"><input name="cinp" type="checkbox" value="cvalue3" checked><textarea name="tainp">contents of the textarea</textarea><select name="sinp"><option value="one">1</option><option value="two" selected>2</option><option value="three">3</option></select></form></div> */
	;  return assertEquals("contents of the textarea", rule.U.fieldValue(rule.U.elements("textarea")));
});
testCase(UtilTest, "fieldValue select (one)", function() {
  /*:DOC += <div><form><input name="tinp" id="tinp" type="text" value="text value"><input name="rinp" type="radio" value="value1"><input name="rinp" type="radio" value="value2" checked><input name="rinp" type="radio" value="value3"><input name="cinp" type="checkbox" value="cvalue1" checked><input name="cinp" type="checkbox" value="cvalue2"><input name="cinp" type="checkbox" value="cvalue3" checked><textarea name="tainp">contents of the textarea</textarea><select name="sinp"><option value="one">1</option><option value="two" selected>2</option><option value="three">3</option></select></form></div> */
	;  return assertEquals("two", rule.U.fieldValue(rule.U.elements("select")));
});
testCase(UtilTest, "trim empty", function() {
  return assertEquals("", rule.U.trim(""));
});
testCase(UtilTest, "trim nothing to trim", function() {
  return assertEquals("string", rule.U.trim("string"));
});
testCase(UtilTest, "trim", function() {
  assertEquals("string", rule.U.trim(" string"));
  assertEquals("string", rule.U.trim("   string"));
  assertEquals("string", rule.U.trim("string "));
  return assertEquals("string", rule.U.trim("string   "));
});
testCase(UtilTest, "trim both ends", function() {
  assertEquals("string", rule.U.trim(" string "));
  return assertEquals("string", rule.U.trim("   string  "));
});
testCase(UtilTest, "trim with internal space", function() {
  return assertEquals("string with space", rule.U.trim(" string with space "));
});
testCase(UtilTest, "trim with tabs", function() {
  return assertEquals("string with space", rule.U.trim("\t   string with space \t "));
});
testCase(UtilTest, "trim string with only spaces", function() {
  assertEquals("", rule.U.trim("   "));
  return assertEquals("", rule.U.trim(" \t\t"));
});
testCase(UtilTest, "trim null", function() {
  return assertEquals(null, rule.U.trim(null));
});
testCase(UtilTest, "isInt false", function() {
  assertFalse(rule.U.isInt(' '));
  assertFalse(rule.U.isInt('string'));
  assertFalse(rule.U.isInt('1.23'));
  assertFalse(rule.U.isInt('1s'));
  assertFalse(rule.U.isInt('$1'));
  return assertFalse(rule.U.isInt('0x30'));
});
testCase(UtilTest, "isInt true", function() {
  assertTrue('1', rule.U.isInt('1'));
  assertTrue('987654321', rule.U.isInt('987654321'));
  assertTrue('0101', rule.U.isInt('0101'));
  return assertTrue('9e10', rule.U.isInt('9e10'));
});
testCase(UtilTest, "isInt false", function() {
  assertFalse(rule.U.isInt(' '));
  assertFalse(rule.U.isInt('string'));
  assertFalse(rule.U.isInt('1.23'));
  assertFalse(rule.U.isInt('1s'));
  assertFalse(rule.U.isInt('$1'));
  return assertFalse(rule.U.isInt('0x30'));
});
testCase(UtilTest, "isInt with whitespace", function() {
  assertFalse(rule.U.isInt('1  '));
  return assertFalse(rule.U.isInt(' 1'));
});
testCase(UtilTest, "isInt true", function() {
  assertTrue('0', rule.U.isInt('0'));
  assertTrue('1', rule.U.isInt('1'));
  assertTrue('987654321', rule.U.isInt('987654321'));
  return assertTrue('0101', rule.U.isInt('0101'));
});
testCase(UtilTest, "isFloat false", function() {
  assertFalse(rule.U.isFloat(' '));
  assertFalse(rule.U.isFloat('string'));
  assertFalse(rule.U.isFloat('1s'));
  assertFalse(rule.U.isFloat('$1'));
  return assertFalse(rule.U.isFloat('0x30'));
});
testCase(UtilTest, "isFloat with whitespace", function() {
  assertFalse(rule.U.isFloat('1.1  '));
  return assertFalse(rule.U.isFloat(' 1.1'));
});
testCase(UtilTest, "isFloat true", function() {
  assertTrue('0', rule.U.isFloat('0'));
  assertTrue('1', rule.U.isFloat('1'));
  assertTrue('987654321', rule.U.isFloat('987654321'));
  assertTrue('0101', rule.U.isFloat('0101'));
  assertTrue('9e10', rule.U.isFloat('9e10'));
  assertTrue('3.14', rule.U.isFloat('3.14'));
  assertTrue('314e-2', rule.U.isFloat('314e-2'));
  return assertTrue('0.0314E+2', rule.U.isFloat('0.0314E+2'));
});
testCase(UtilTest, "isRegex false", function() {
  assertFalse('empty string', rule.U.isRegex(''));
  assertFalse('str', rule.U.isRegex('str'));
  assertFalse('null', rule.U.isRegex(null));
  assertFalse('obj', rule.U.isRegex({}));
  assertFalse('int', rule.U.isRegex(123));
  return assertFalse('float', rule.U.isRegex(1.1));
});
testCase(UtilTest, "isRegex true", function() {
  assertTrue('RegExp', rule.U.isRegex(new RegExp("xyz")));
  return assertTrue('/regex/', rule.U.isRegex(/xyz/));
});
testCase(UtilTest, "visible no", function() {
  /*:DOC += <div><p id="testElement" style="display: none;">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  return assertFalse(rule.U.isVisible(rule.U.element('testElement')));
});
testCase(UtilTest, "visible yes", function() {
  /*:DOC += <div><p id="testElement" style="display: none;">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  return assertTrue(rule.U.isVisible(rule.U.element('firstli')));
});
testCase(UtilTest, "visible nested no", function() {
  /*:DOC += <div><p id="testElement" style="display: none;">A paragraph element<span><span id="innerSpan">inner</span></span></p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  return assertFalse(rule.U.isVisible(rule.U.element('innerSpan')));
});
testCase(UtilTest, "visible nested yes", function() {
  /*:DOC += <div><p id="testElement">A paragraph element<span><span id="innerSpan">inner</span></span></p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  return assertTrue(rule.U.isVisible(rule.U.element('innerSpan')));
});
UtilAsyncTest = new AsyncTestCase("UtilAsyncTest");
/*
IMPORTANT NOTE: Firefox 5+ and Chrome 11+ round setTimeout and setInterval to nearest 1000ms for *background* tabs, so our 100ms call gets rounded to zero.
Make sure FF and Chrome test clients have foreground tabs
(dom.min_background_timeout_value can be modified in FF to change this behaviour)
see: https://bugzilla.mozilla.org/show_bug.cgi?id=633421
and: http://code.google.com/p/chromium/issues/detail?id=66078
*/
testCase(UtilAsyncTest, "delay 0", function(queue) {
  var func, o;
  o = {
    called: false
  };
  func = function() {
    return o.called = true;
  };
  expectAsserts(3);
  queue.call("1: sanity", function() {
    return assertFalse(o.called);
  });
  queue.call("2: invoke delay", function() {
    o.func = rule.U.delayed(func, 0);
    o.func();
    return assertFalse(o.called);
  });
  return queue.call("3: test delayed invoked", function(callbacks) {
    var f;
    f = callbacks.add(function() {
      return assertTrue("should be called by now", o.called);
    });
    return window.setTimeout(f, 10);
  });
});
testCase(UtilAsyncTest, "delay 100", function(queue) {
  var func, o;
  o = {
    called: false
  };
  func = function() {
    return o.called = true;
  };
  expectAsserts(5);
  queue.call("1: sanity", function() {
    return assertFalse(o.called);
  });
  queue.call("2: invoke delay", function() {
    o.func = rule.U.delayed(func, 0.1);
    o.func();
    return assertFalse(o.called);
  });
  queue.call("3: test delayed not invoked at 10ms", function(callbacks) {
    var f;
    f = callbacks.add(function() {
      return assertFalse("shouldn't be called at 10ms", o.called);
    });
    return window.setTimeout(f, 10);
  });
  queue.call("4: test delayed not invoked at 50ms", function(callbacks) {
    var f;
    f = callbacks.add(function() {
      return assertFalse("shouldn't be called at 50ms", o.called);
    });
    return window.setTimeout(f, 40);
  });
  return queue.call("4: test delayed invoked at 150ms", function(callbacks) {
    var f;
    f = callbacks.add(function() {
      return assertTrue("should be called by now", o.called);
    });
    return window.setTimeout(f, 100);
  });
});
testCase(UtilAsyncTest, "cumulativeDelay 0, no call", function(queue) {
  var func, o;
  o = {
    called: false
  };
  func = function() {
    return o.called = true;
  };
  expectAsserts(3);
  queue.call("1: sanity", function() {
    return assertFalse(o.called);
  });
  queue.call("2: invoke delay", function() {
    o.func = rule.U.cumulativeDelayed(func, 0);
    o.func();
    return assertFalse(o.called);
  });
  return queue.call("3: test delayed invoked", function(callbacks) {
    var f;
    f = callbacks.add(function() {
      return assertTrue("should be called by now", o.called);
    });
    return window.setTimeout(f, 10);
  });
});
testCase(UtilAsyncTest, "cumulativeDelay 100, no call", function(queue) {
  var func, o;
  o = {
    called: false
  };
  func = function() {
    return o.called = true;
  };
  expectAsserts(5);
  queue.call("1: sanity", function() {
    return assertFalse(o.called);
  });
  queue.call("2: invoke delay", function() {
    o.func = rule.U.cumulativeDelayed(func, 0.1);
    o.func();
    return assertFalse(o.called);
  });
  queue.call("3: test delayed not invoked at 10ms", function(callbacks) {
    var f;
    f = callbacks.add(function() {
      return assertFalse("shouldn't be called at 10ms", o.called);
    });
    return window.setTimeout(f, 10);
  });
  queue.call("4: test delayed not invoked at 50ms", function(callbacks) {
    var f;
    f = callbacks.add(function() {
      return assertFalse("shouldn't be called at 50ms", o.called);
    });
    return window.setTimeout(f, 40);
  });
  return queue.call("4: test delayed invoked at 150ms", function(callbacks) {
    var f;
    f = callbacks.add(function() {
      return assertTrue("should be called by now", o.called);
    });
    return window.setTimeout(f, 100);
  });
});
testCase(UtilAsyncTest, "cumulativeDelay 50, subsequent calls should delay further", function(queue) {
  var func, o;
  o = {
    called: false
  };
  func = function() {
    return o.called = true;
  };
  expectAsserts(8);
  queue.call("1: sanity", function() {
    return assertFalse(o.called);
  });
  queue.call("2: invoke delay", function() {
    o.func = rule.U.cumulativeDelayed(func, 0.05);
    o.func();
    return assertFalse(o.called);
  });
  queue.call("3: test delayed not invoked at 10ms", function(callbacks) {
    var f;
    f = callbacks.add(function() {
      o.func();
      return assertFalse("shouldn't be called at 10ms", o.called);
    });
    return window.setTimeout(f, 10);
  });
  queue.call("3: test delayed not invoked at 40ms", function(callbacks) {
    var f;
    f = callbacks.add(function() {
      o.func();
      return assertFalse("shouldn't be called at 40ms", o.called);
    });
    return window.setTimeout(f, 30);
  });
  queue.call("4: test delayed not invoked at 70ms", function(callbacks) {
    var f;
    f = callbacks.add(function() {
      o.func();
      return assertFalse("shouldn't be called at 70ms", o.called);
    });
    return window.setTimeout(f, 30);
  });
  queue.call("5: test delayed not invoked at 100ms", function(callbacks) {
    var f;
    f = callbacks.add(function() {
      o.func();
      return assertFalse("shouldn't be called at 100ms", o.called);
    });
    return window.setTimeout(f, 20);
  });
  queue.call("6: test delayed not invoked at 120ms", function(callbacks) {
    var f;
    f = callbacks.add(function() {
      return assertFalse("shouldn't be called at 120ms", o.called);
    });
    return window.setTimeout(f, 20);
  });
  return queue.call("7: test delayed invoked at 200ms", function(callbacks) {
    var f;
    f = callbacks.add(function() {
      return assertTrue("should be called by now", o.called);
    });
    return window.setTimeout(f, 80);
  });
});
MethodsEventTest = new TestCase("MethodsEventTest");
testCase(MethodsEventTest, "custom event", function() {
  return /*:DOC += <div><p id="testElement">A paragraph element</p><p id="para" style="display: none;">just a paragraph.</p><ul id="ul"><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;
});
MethodsSimpleElementsActionsTest = new TestCase("MethodsSimpleElementsActionsTest");
testCase(MethodsSimpleElementsActionsTest, "show", function() {
  /*:DOC += <div><p id="testElement" style="display: none;">A paragraph element</p><ul><li class="l">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('display:none', spacelessStyle('testElement'));
  r = rule.show('#testElement');
  r.trigger();
  return assertEquals('', spacelessStyle('testElement'));
});
testCase(MethodsSimpleElementsActionsTest, "show, multi-element", function() {
  /*:DOC += <div><p id="testElement" style="display: none;">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo" style="display: none;">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('display:none', spacelessStyle('testElement'));
  assertEquals('display:none', spacelessStyle('firstli'));
  r = rule.show('#testElement,ul li:first-child');
  r.trigger();
  assertEquals('', spacelessStyle('testElement'));
  return assertEquals('', spacelessStyle('firstli'));
});
testCase(MethodsSimpleElementsActionsTest, "hide", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li class="l">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('', spacelessStyle('testElement'));
  r = rule.hide('#testElement');
  r.trigger();
  return assertEquals('display:none', spacelessStyle('testElement'));
});
testCase(MethodsSimpleElementsActionsTest, "hide, multi-element", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('', spacelessStyle('testElement'));
  assertEquals('', spacelessStyle('firstli'));
  r = rule.hide('#testElement,ul li:first-child');
  r.trigger();
  assertEquals('display:none', spacelessStyle('testElement'));
  return assertEquals('display:none', spacelessStyle('firstli'));
});
testCase(MethodsSimpleElementsActionsTest, "toggle", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li class="l">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('', spacelessStyle('testElement'));
  r = rule.toggle('#testElement');
  r.trigger();
  assertEquals('display:none', spacelessStyle('testElement'));
  r.trigger();
  assertTrue(spacelessStyle('testElement') === '' || spacelessStyle('testElement') === 'display:block');
  r.trigger();
  return assertEquals('display:none', spacelessStyle('testElement'));
});
testCase(MethodsSimpleElementsActionsTest, "toggle, multi-element", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('', spacelessStyle('testElement'));
  assertEquals('', spacelessStyle('firstli'));
  r = rule.toggle('#testElement, ul li');
  r.trigger();
  assertEquals('display:none', spacelessStyle('testElement'));
  assertEquals('display:none', spacelessStyle('firstli'));
  r.trigger();
  assertTrue(spacelessStyle('testElement') === '' || spacelessStyle('testElement') === 'display:block');
  assertTrue(spacelessStyle('firstli') === '' || spacelessStyle('firstli') === 'display:block' || spacelessStyle('firstli') === 'display:list-item');
  r.trigger();
  assertEquals('display:none', spacelessStyle('testElement'));
  return assertEquals('display:none', spacelessStyle('firstli'));
});
testCase(MethodsSimpleElementsActionsTest, "addClass simple", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('', classNames('testElement'));
  r = rule.addClass('#testElement', 'newClass');
  r.trigger();
  assertEquals('newClass', classNames('testElement'));
  r.trigger();
  return assertEquals('newClass', classNames('testElement'));
});
testCase(MethodsSimpleElementsActionsTest, "addClass simple, multi-element", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('', classNames('testElement'));
  assertEquals('l', classNames('firstli'));
  r = rule.addClass('#testElement, #firstli', 'newClass');
  r.trigger();
  assertEquals('newClass', classNames('testElement'));
  assertEquals('l newClass', classNames('firstli'));
  r.trigger();
  assertEquals('newClass', classNames('testElement'));
  return assertEquals('l newClass', classNames('firstli'));
});
testCase(MethodsSimpleElementsActionsTest, "addClass to existing class", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('l', classNames('firstli'));
  r = rule.addClass('#firstli', 'newClass');
  r.trigger();
  assertEquals('l newClass', classNames('firstli'));
  r.trigger();
  return assertEquals('l newClass', classNames('firstli'));
});
testCase(MethodsSimpleElementsActionsTest, "removeClass from existing", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('l', classNames('firstli'));
  r = rule.removeClass('#firstli', 'l');
  r.trigger();
  assertEquals('', classNames('firstli'));
  r.trigger();
  return assertEquals('', classNames('firstli'));
});
testCase(MethodsSimpleElementsActionsTest, "removeClass from existing, multi-element", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l">one</li><li class="l">two</li><li>notme!</li><li class="l" id="lastli">three</li></div> */
	;  var r;
  assertEquals('l', classNames('firstli'));
  assertEquals('l', classNames('lastli'));
  r = rule.removeClass('li', 'l');
  r.trigger();
  assertEquals('', classNames('firstli'));
  assertEquals('', classNames('lastli'));
  r.trigger();
  assertEquals('', classNames('firstli'));
  return assertEquals('', classNames('lastli'));
});
testCase(MethodsSimpleElementsActionsTest, "removeClass from existing leaving others intact", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('l leaveme leavemetoo', classNames('firstli'));
  r = rule.removeClass('#firstli', 'l');
  r.trigger();
  assertEquals('leaveme leavemetoo', classNames('firstli'));
  r.trigger();
  return assertEquals('leaveme leavemetoo', classNames('firstli'));
});
testCase(MethodsSimpleElementsActionsTest, "removeClass from element without", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('', classNames('testElement'));
  r = rule.removeClass('#testElement', 'l');
  r.trigger();
  return assertEquals('', classNames('testElement'));
});
testCase(MethodsSimpleElementsActionsTest, "toggleClass simple", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('', classNames('testElement'));
  r = rule.toggleClass('#testElement', 'aClass');
  r.trigger();
  assertEquals('aClass', classNames('testElement'));
  r.trigger();
  assertEquals('', classNames('testElement'));
  r.trigger();
  return assertEquals('aClass', classNames('testElement'));
});
testCase(MethodsSimpleElementsActionsTest, "toggleClass simple, multi-element", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('', classNames('testElement'));
  assertEquals('l leaveme leavemetoo', classNames('firstli'));
  r = rule.toggleClass('#testElement, li', 'aClass');
  r.trigger();
  assertEquals('aClass', classNames('testElement'));
  assertEquals('l leaveme leavemetoo aClass', classNames('firstli'));
  r.trigger();
  assertEquals('', classNames('testElement'));
  assertEquals('l leaveme leavemetoo', classNames('firstli'));
  r.trigger();
  assertEquals('aClass', classNames('testElement'));
  return assertEquals('l leaveme leavemetoo aClass', classNames('firstli'));
});
testCase(MethodsSimpleElementsActionsTest, "toggleClass with other classes", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  assertEquals('l leaveme leavemetoo', classNames('firstli'));
  r = rule.toggleClass('#firstli', 'aClass');
  r.trigger();
  assertEquals('l leaveme leavemetoo aClass', classNames('firstli'));
  r.trigger();
  assertEquals('l leaveme leavemetoo', classNames('firstli'));
  r.trigger();
  return assertEquals('l leaveme leavemetoo aClass', classNames('firstli'));
});
MethodsSimpleElementsConditionsTest = new TestCase("MethodsSimpleElementsConditionsTest");
testCase(MethodsSimpleElementsConditionsTest, "hasClass yes", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  r = rule.hasClass('#firstli', 'l');
  return assertTrue(r.satisfied());
});
testCase(MethodsSimpleElementsConditionsTest, "hasClass no, but has others", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  r = rule.hasClass('#firstli', 'x');
  return assertFalse(r.satisfied());
});
testCase(MethodsSimpleElementsConditionsTest, "hasClass no, classless", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var r;
  r = rule.hasClass('#testElement', 'x');
  return assertFalse(r.satisfied());
});
testCase(MethodsSimpleElementsConditionsTest, "hasClass, multi element, yes", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li class="l">notme!</li><li class="l">three</li></div> */
	;  var r;
  r = rule.hasClass('li', 'l');
  return assertTrue(r.satisfied());
});
testCase(MethodsSimpleElementsConditionsTest, "hasClass, multi element, no, none have class", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li class="l">notme!</li><li class="l">three</li></div> */
	;  var r;
  r = rule.hasClass('li', 'x');
  return assertFalse(r.satisfied());
});
testCase(MethodsSimpleElementsConditionsTest, "hasClass, multi element, no, but one has class", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><ul><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li class="l">notme!</li><li class="l">three</li></div> */
	;  var r;
  r = rule.hasClass('li', 'leaveme');
  return assertFalse(r.satisfied());
});
RuleRootCallTest = new TestCase("RuleRootCallTest");
testCase(RuleRootCallTest, "root call", function() {
  var invoked;
  invoked = false;
  rule(function() {
    invoked = true;
    assertSame(rule, this);
    assertSame(rule.U, this.U);
    assertSame(rule.C, this.C);
    assertSame(rule.on, this.on);
    assertSame(rule["do"], this["do"]);
    assertSame(rule.run, this.run);
    return assertSame(rule.show, this.show);
  });
  return assertTrue(invoked);
});
testCase(RuleRootCallTest, "root call with arg", function() {
  var invoked;
  invoked = false;
  rule(function(_) {
    invoked = true;
    assertSame(rule, _);
    assertSame(rule.U, _.U);
    assertSame(rule.C, _.C);
    assertSame(rule.on, _.on);
    assertSame(rule["do"], _["do"]);
    assertSame(rule.run, _.run);
    return assertSame(rule.show, _.show);
  });
  return assertTrue(invoked);
});
ClassBaseTest = new TestCase("ClassBaseTest");
testCase(ClassBaseTest, "constructor", function() {
  var b, child, t;
  t = {};
  child = {};
  b = new rule.C.Base(t, child);
  assertSame(t, b.t);
  return assertSame(child, b.child);
});
testCase(ClassBaseTest, "childless connect", function() {
  var b, parent;
  parent = {};
  b = new rule.C.Base();
  b.connect(parent);
  return assertSame(parent, b.parent);
});
testCase(ClassBaseTest, "childed connect", function() {
  var b, child, child_mock, parent;
  parent = {};
  child = {
    connect: function(parent) {}
  };
  b = new rule.C.Base('', child);
  child_mock = TestUtil.createSinonMockFor(child, "connect", b, null);
  b.connect(parent);
  assertSame(parent, b.parent);
  return child_mock.verify();
});
testCase(ClassBaseTest, "setTrigger pass-through (no parent)", function() {
  var b, t;
  t = {};
  b = new rule.C.Base();
  return b.setTrigger(t);
});
testCase(ClassBaseTest, "setTrigger pass-through", function() {
  var b, parent, parent_mock, t;
  parent = {
    setTrigger: function() {}
  };
  t = {};
  parent_mock = TestUtil.createSinonMockFor(parent, "setTrigger", t, null);
  b = new rule.C.Base();
  b.connect(parent);
  b.setTrigger(t);
  return parent_mock.verify();
});
testCase(ClassBaseTest, "setCondition pass-through (no parent)", function() {
  var b, t;
  t = {};
  b = new rule.C.Base();
  return b.setCondition(t);
});
testCase(ClassBaseTest, "setCondition pass-through", function() {
  var b, parent, parent_mock, t;
  parent = {
    setCondition: function() {}
  };
  t = {};
  parent_mock = TestUtil.createSinonMockFor(parent, "setCondition", t, null);
  b = new rule.C.Base();
  b.connect(parent);
  b.setCondition(t);
  return parent_mock.verify();
});
testCase(ClassBaseTest, "setAction pass-through (no parent)", function() {
  var b, t;
  t = {};
  b = new rule.C.Base();
  return b.setAction(t);
});
testCase(ClassBaseTest, "setAction pass-through", function() {
  var b, parent, parent_mock, t;
  parent = {
    setAction: function() {}
  };
  t = {};
  parent_mock = TestUtil.createSinonMockFor(parent, "setAction", t, null);
  b = new rule.C.Base();
  b.connect(parent);
  b.setAction(t);
  return parent_mock.verify();
});
testCase(ClassBaseTest, "trigger pass-through (no parent)", function() {
  var b, t;
  t = {};
  b = new rule.C.Base();
  return b.trigger(t);
});
testCase(ClassBaseTest, "trigger pass-through", function() {
  var b, parent, parent_mock, t;
  parent = {
    trigger: function() {}
  };
  t = {};
  (parent_mock = sinon.mock(parent)).expects("trigger").withExactArgs(t, void 0).once();
  b = new rule.C.Base();
  b.connect(parent);
  b.trigger(t);
  return parent_mock.verify();
});
ClassRootTest = new TestCase("ClassRootTest");
testCase(ClassRootTest, "no-arg constructor", function() {
  return new rule.C.Root();
});
testCase(ClassRootTest, "name-only constructor as array", function() {
  var r;
  r = new rule.C.Root(['root', 'a name']);
  assertEquals('root', r.t);
  return assertEquals('a name', r.name);
});
testCase(ClassRootTest, "name-only constructor", function() {
  var r;
  r = new rule.C.Root('root', 'a name');
  assertEquals('root', r.t);
  return assertEquals('a name', r.name);
});
testCase(ClassRootTest, "child without connect", function() {
  var r;
  return r = new rule.C.Root('name', 'str', {});
});
testCase(ClassRootTest, "children with connect", function() {
  var child1, child1_mock, child3, child3_mock, r;
  r = {};
  child1 = {
    connect: function(r) {}
  };
  child3 = {
    connect: function(r) {}
  };
  child1_mock = TestUtil.createSinonMockFor(child1, "connect", r, null);
  child3_mock = TestUtil.createSinonMockFor(child3, "connect", r, null);
  r.prototype = rule.C.Root.prototype;
  rule.C.Root.apply(r, ['root', 'name', child1, {}, child3]);
  child1_mock.verify();
  return child3_mock.verify();
});
testCase(ClassRootTest, "setTrigger appends to trigger list", function() {
  var r, t1, t2;
  r = new rule.C.Root('name');
  r.setTrigger(t1 = {});
  r.setTrigger(t2 = 't2');
  assertNotNull(r.triggers);
  assertEquals(2, r.triggers.length);
  assertSame(r.triggers[0], t1);
  return assertSame(r.triggers[1], t2);
});
testCase(ClassRootTest, "setCondition appends to condition list", function() {
  var r, t1, t2;
  r = new rule.C.Root('name');
  r.setCondition(t1 = {});
  r.setCondition(t2 = 't2');
  assertNotNull(r.conditions);
  assertEquals(2, r.conditions.length);
  assertSame(r.conditions[0], t1);
  return assertSame(r.conditions[1], t2);
});
testCase(ClassRootTest, "setAction appends to action list", function() {
  var r, t1, t2;
  r = new rule.C.Root('name');
  r.setAction(t1 = {});
  r.setAction(t2 = 't2');
  assertNotNull(r.actions);
  assertEquals(2, r.actions.length);
  assertSame(r.actions[0], t1);
  return assertSame(r.actions[1], t2);
});
testCase(ClassRootTest, "setActionOtherwise appends to actionOtherwise list", function() {
  var r, t1, t2;
  r = new rule.C.Root('name');
  r.setActionOtherwise(t1 = {});
  r.setActionOtherwise(t2 = 't2');
  assertNotNull(r.actionsOtherwise);
  assertEquals(2, r.actionsOtherwise.length);
  assertSame(r.actionsOtherwise[0], t1);
  return assertSame(r.actionsOtherwise[1], t2);
});
testCase(ClassRootTest, "trigger, conditions not satisfied", function() {
  var c, event, r, root_mock;
  r = new rule.C.Root('name');
  c = {};
  event = {};
  root_mock = sinon.mock(r);
  root_mock.expects("conditionsSatisfied").withExactArgs(c, event).once().returns(false);
  root_mock.expects("invokeActions").never();
  root_mock.expects("invokeActionsOtherwise").withExactArgs(c, event).once();
  r.trigger(c, event);
  return root_mock.verify();
});
testCase(ClassRootTest, "trigger, conditions satisfied", function() {
  var c, event, r, root_mock;
  r = new rule.C.Root('name');
  c = {};
  event = {};
  root_mock = sinon.mock(r);
  root_mock.expects("conditionsSatisfied").withExactArgs(c, event).once().returns(true);
  root_mock.expects("invokeActionsOtherwise").never();
  root_mock.expects("invokeActions").withExactArgs(c, event).once();
  r.trigger(c, event);
  return root_mock.verify();
});
testCase(ClassRootTest, "conditions satisfied, no conditions, should be yes", function() {
  var r;
  r = new rule.C.Root('name');
  return assertTrue(r.conditionsSatisfied());
});
testCase(ClassRootTest, "conditions satisfied, one yes condition, should be yes", function() {
  var c, condition, condition_mock, event, r;
  c = {};
  event = {};
  condition = {
    satisfied: function() {}
  };
  (condition_mock = sinon.mock(condition)).expects("satisfied").withExactArgs(c, event).once().returns(true);
  r = new rule.C.Root('name');
  r.setCondition(condition);
  assertTrue(r.conditionsSatisfied(c, event));
  return condition_mock.verify();
});
testCase(ClassRootTest, "conditions satisfied, one no condition, should be no", function() {
  var c, condition, condition_mock, event, r;
  c = 'c';
  event = 'event';
  condition = {
    satisfied: function() {}
  };
  (condition_mock = sinon.mock(condition)).expects("satisfied").once().withExactArgs(c, event).returns(false);
  r = new rule.C.Root('name');
  r.setCondition(condition);
  assertFalse(r.conditionsSatisfied(c, event));
  return condition_mock.verify();
});
testCase(ClassRootTest, "conditions satisfied, one no and one yes condition, should be no", function() {
  var c, condition1, condition1_mock, condition2, condition2_mock, event, r;
  c = {};
  event = {};
  condition1 = {
    satisfied: function() {}
  };
  (condition1_mock = sinon.mock(condition1)).expects("satisfied").withExactArgs(c, event).once().returns(true);
  condition2 = {
    satisfied: function() {}
  };
  (condition2_mock = sinon.mock(condition2)).expects("satisfied").withExactArgs(c, event).once().returns(false);
  r = new rule.C.Root('name');
  r.setCondition(condition1);
  r.setCondition(condition2);
  assertFalse(r.conditionsSatisfied(c, event));
  condition1_mock.verify();
  return condition2_mock.verify();
});
testCase(ClassRootTest, "conditions satisfied, two yes conditions, should be yes", function() {
  var c, condition1, condition1_mock, condition2, condition2_mock, event, r;
  c = {};
  event = {};
  condition1 = {
    satisfied: function() {}
  };
  (condition1_mock = sinon.mock(condition1)).expects("satisfied").withExactArgs(c, event).once().returns(true);
  condition2 = {
    satisfied: function() {}
  };
  (condition2_mock = sinon.mock(condition2)).expects("satisfied").withExactArgs(c, event).once().returns(true);
  r = new rule.C.Root('name');
  r.setCondition(condition1);
  r.setCondition(condition2);
  assertTrue(r.conditionsSatisfied(c, event));
  condition1_mock.verify();
  return condition2_mock.verify();
});
testCase(ClassRootTest, "invokeActions, no actions", function() {
  var r;
  r = new rule.C.Root('name');
  return r.invokeActions();
});
testCase(ClassRootTest, "invokeActionsOtherwise, no actionsOtherwise", function() {
  var r;
  r = new rule.C.Root('name');
  return r.invokeActionsOtherwise();
});
testCase(ClassRootTest, "invokeActions, multiple actions", function() {
  var action1, action1_mock, action2, action2_mock, e, event, r;
  e = {};
  event = {};
  action1 = {
    trigger: function() {}
  };
  (action1_mock = sinon.mock(action1)).expects("trigger").withExactArgs(e, event).once();
  action2 = {
    trigger: function() {}
  };
  (action2_mock = sinon.mock(action2)).expects("trigger").withExactArgs(e, event).once();
  r = new rule.C.Root('name');
  r.setAction(action1);
  r.setAction(action2);
  r.invokeActions(e, event);
  action1_mock.verify();
  return action2_mock.verify();
});
testCase(ClassRootTest, "invokeActionsOtherwise, multiple actionsOtherwise", function() {
  var action1, action1_mock, action2, action2_mock, e, event, r;
  e = {};
  event = {};
  action1 = {
    trigger: function() {}
  };
  (action1_mock = sinon.mock(action1)).expects("trigger").withExactArgs(e, event).once();
  action2 = {
    trigger: function() {}
  };
  (action2_mock = sinon.mock(action2)).expects("trigger").withExactArgs(e, event).once();
  r = new rule.C.Root('name');
  r.setActionOtherwise(action1);
  r.setActionOtherwise(action2);
  r.invokeActionsOtherwise(e, event);
  action1_mock.verify();
  return action2_mock.verify();
});
ClassConditionTest = new TestCase("ClassConditionTest");
testCase(ClassConditionTest, "constructor", function() {
  var child, r, t;
  t = {};
  child = 'child';
  r = new rule.C.Condition(t, child);
  assertSame(t, r.t);
  return assertSame(child, r.child);
});
testCase(ClassConditionTest, "connect no child", function() {
  var r;
  r = new rule.C.Condition('condition');
  return r.connect;
});
testCase(ClassConditionTest, "connect to child", function() {
  var child, child_mock, r;
  r = new rule.C.Condition;
  child = {
    connect: function() {}
  };
  child_mock = TestUtil.createSinonMockFor(child, "connect", r, null);
  r.child = child;
  r.connect({
    setCondition: function() {}
  });
  return child_mock.verify();
});
testCase(ClassConditionTest, "set condition on parent", function() {
  var parent, parent_mock, r;
  r = new rule.C.Condition;
  parent = {
    setCondition: function() {}
  };
  parent_mock = TestUtil.createSinonMockFor(parent, "setCondition", r, null);
  r.connect(parent);
  return parent_mock.verify();
});
testCase(ClassConditionTest, "default satisfied is yes", function() {
  return assertTrue(new rule.C.Condition().satisfied());
});
ClassConditionAndTest = new TestCase("ClassConditionAndTest");
testCase(ClassConditionAndTest, "no-arg constructor", function() {
  var r;
  return r = new rule.C.ConditionAnd();
});
testCase(ClassConditionAndTest, "child without connect", function() {
  var r;
  r = new rule.C.ConditionAnd({});
  assertEquals('and', r.t);
  return assertEquals('and', r.name);
});
testCase(ClassConditionAndTest, "children with connect", function() {
  var child1, child1_mock, child3, child3_mock, r;
  r = new rule.C.ConditionAnd;
  child1 = {
    connect: function(r) {}
  };
  child3 = {
    connect: function(r) {}
  };
  child1_mock = TestUtil.createSinonMockFor(child1, "connect", r, null);
  child3_mock = TestUtil.createSinonMockFor(child3, "connect", r, null);
  rule.C.ConditionAnd.apply(r, [child1, {}, child3]);
  child1_mock.verify();
  return child3_mock.verify();
});
testCase(ClassConditionAndTest, "setCondition appends to condition list", function() {
  var r, t1, t2;
  r = new rule.C.ConditionAnd({});
  r.setCondition(t1 = {});
  r.setCondition(t2 = 't2');
  assertNotNull(r.conditions);
  assertEquals(2, r.conditions.length);
  assertSame(r.conditions[0], t1);
  return assertSame(r.conditions[1], t2);
});
testCase(ClassConditionAndTest, "set condition on parent", function() {
  var parent, parent_mock, r;
  r = new rule.C.ConditionAnd;
  parent = {
    setCondition: function() {}
  };
  parent_mock = TestUtil.createSinonMockFor(parent, "setCondition", r, null);
  r.connect(parent);
  return parent_mock.verify();
});
testCase(ClassConditionAndTest, "connect doesn't connect children", function() {
  var child1, child1_mock, parent, r;
  r = new rule.C.ConditionAnd;
  child1 = {
    connect: function(r) {}
  };
  (child1_mock = sinon.mock(child1)).expects("connect").withExactArgs(r).once();
  rule.C.ConditionAnd.apply(r, [child1]);
  parent = {
    setCondition: function() {}
  };
  r.connect(parent);
  return child1_mock.verify();
});
testCase(ClassConditionAndTest, "conditions satisfied, one no and one yes condition, should be no", function() {
  var c, condition1, condition1_mock, condition2, condition2_mock, event, r;
  c = {};
  event = {};
  condition1 = {
    satisfied: function() {}
  };
  (condition1_mock = sinon.mock(condition1)).expects("satisfied").withExactArgs(c, event).once().returns(true);
  condition2 = {
    satisfied: function() {}
  };
  (condition2_mock = sinon.mock(condition2)).expects("satisfied").withExactArgs(c, event).once().returns(false);
  r = new rule.C.ConditionAnd('name');
  r.setCondition(condition1);
  r.setCondition(condition2);
  assertFalse(r.conditionsSatisfied(c, event));
  condition1_mock.verify();
  return condition2_mock.verify();
});
testCase(ClassConditionAndTest, "conditions satisfied, both no, should be no", function() {
  var c, condition1, condition1_mock, condition2, condition2_mock, event, r;
  c = {};
  event = {};
  condition1 = {
    satisfied: function() {}
  };
  (condition1_mock = sinon.mock(condition1)).expects("satisfied").withExactArgs(c, event).once().returns(false);
  condition2 = {
    satisfied: function() {}
  };
  (condition2_mock = sinon.mock(condition2)).expects("satisfied").never();
  r = new rule.C.ConditionAnd('name');
  r.setCondition(condition1);
  r.setCondition(condition2);
  assertFalse(r.conditionsSatisfied(c, event));
  condition1_mock.verify();
  return condition2_mock.verify();
});
testCase(ClassConditionAndTest, "conditions satisfied, two yes conditions, should be yes", function() {
  var c, condition1, condition1_mock, condition2, condition2_mock, event, r;
  c = {};
  event = {};
  condition1 = {
    satisfied: function() {}
  };
  (condition1_mock = sinon.mock(condition1)).expects("satisfied").withExactArgs(c, event).once().returns(true);
  condition2 = {
    satisfied: function() {}
  };
  (condition2_mock = sinon.mock(condition2)).expects("satisfied").withExactArgs(c, event).once().returns(true);
  r = new rule.C.ConditionAnd('name');
  r.setCondition(condition1);
  r.setCondition(condition2);
  assertTrue(r.conditionsSatisfied(c, event));
  condition1_mock.verify();
  return condition2_mock.verify();
});
ClassConditionOrTest = new TestCase("ClassConditionOrTest");
testCase(ClassConditionOrTest, "no-arg constructor", function() {
  var r;
  return r = new rule.C.ConditionOr();
});
testCase(ClassConditionOrTest, "child without connect", function() {
  var r;
  r = new rule.C.ConditionOr({});
  assertEquals('or', r.t);
  return assertEquals('or', r.name);
});
testCase(ClassConditionOrTest, "children with connect", function() {
  var child1, child1_mock, child3, child3_mock, r;
  r = {};
  child1 = {
    connect: function(r) {}
  };
  child3 = {
    connect: function(r) {}
  };
  child1_mock = TestUtil.createSinonMockFor(child1, "connect", r, null);
  child3_mock = TestUtil.createSinonMockFor(child3, "connect", r, null);
  r.prototype = rule.C.ConditionOr.prototype;
  rule.C.ConditionOr.apply(r, [child1, {}, child3]);
  child1_mock.verify();
  return child3_mock.verify();
});
testCase(ClassConditionOrTest, "setCondition appends to condition list", function() {
  var r, t1, t2;
  r = new rule.C.ConditionOr({});
  r.setCondition(t1 = {});
  r.setCondition(t2 = 't2');
  assertNotNull(r.conditions);
  assertEquals(2, r.conditions.length);
  assertSame(r.conditions[0], t1);
  return assertSame(r.conditions[1], t2);
});
testCase(ClassConditionOrTest, "set condition on parent", function() {
  var parent, parent_mock, r;
  r = new rule.C.ConditionOr;
  parent = {
    setCondition: function() {}
  };
  parent_mock = TestUtil.createSinonMockFor(parent, "setCondition", r, null);
  r.connect(parent);
  return parent_mock.verify();
});
testCase(ClassConditionOrTest, "connect doesn't connect children", function() {
  var child1, child1_mock, parent, r;
  r = new rule.C.ConditionOr;
  child1 = {
    connect: function(r) {}
  };
  (child1_mock = sinon.mock(child1)).expects("connect").withExactArgs(r).once();
  rule.C.ConditionOr.apply(r, [child1]);
  parent = {
    setCondition: function() {}
  };
  r.connect(parent);
  return child1_mock.verify();
});
testCase(ClassConditionOrTest, "conditions satisfied, one no and one yes condition, should be yes", function() {
  var c, condition1, condition1_mock, condition2, condition2_mock, event, r;
  c = {};
  event = {};
  condition1 = {
    satisfied: function() {}
  };
  (condition1_mock = sinon.mock(condition1)).expects("satisfied").withExactArgs(c, event).once().returns(true);
  condition2 = {
    satisfied: function() {}
  };
  (condition2_mock = sinon.mock(condition2)).expects("satisfied").never();
  r = new rule.C.ConditionOr('name');
  r.setCondition(condition1);
  r.setCondition(condition2);
  assertTrue(r.conditionsSatisfied(c, event));
  condition1_mock.verify();
  return condition2_mock.verify();
});
testCase(ClassConditionOrTest, "conditions satisfied, one yes and one no condition, should be yes", function() {
  var c, condition1, condition1_mock, condition2, condition2_mock, event, r;
  c = {};
  event = {};
  condition1 = {
    satisfied: function() {}
  };
  (condition1_mock = sinon.mock(condition1)).expects("satisfied").withExactArgs(c, event).once().returns(false);
  condition2 = {
    satisfied: function() {}
  };
  (condition2_mock = sinon.mock(condition2)).expects("satisfied").withExactArgs(c, event).once().returns(true);
  r = new rule.C.ConditionOr('name');
  r.setCondition(condition1);
  r.setCondition(condition2);
  assertTrue(r.conditionsSatisfied(c, event));
  condition1_mock.verify();
  return condition2_mock.verify();
});
testCase(ClassConditionOrTest, "conditions satisfied, both no, should be no", function() {
  var c, condition1, condition1_mock, condition2, condition2_mock, event, r;
  c = {};
  event = {};
  condition1 = {
    satisfied: function() {}
  };
  (condition1_mock = sinon.mock(condition1)).expects("satisfied").withExactArgs(c, event).once().returns(false);
  condition2 = {
    satisfied: function() {}
  };
  (condition2_mock = sinon.mock(condition2)).expects("satisfied").withExactArgs(c, event).once().returns(false);
  r = new rule.C.ConditionOr('name');
  r.setCondition(condition1);
  r.setCondition(condition2);
  assertFalse(r.conditionsSatisfied(c, event));
  condition1_mock.verify();
  return condition2_mock.verify();
});
testCase(ClassConditionOrTest, "conditions satisfied, two yes conditions, should be yes", function() {
  var c, condition1, condition1_mock, condition2, condition2_mock, event, r;
  c = {};
  event = {};
  condition1 = {
    satisfied: function() {}
  };
  (condition1_mock = sinon.mock(condition1)).expects("satisfied").withExactArgs(c, event).once().returns(true);
  condition2 = {
    satisfied: function() {}
  };
  (condition2_mock = sinon.mock(condition2)).expects("satisfied").never();
  r = new rule.C.ConditionOr('name');
  r.setCondition(condition1);
  r.setCondition(condition2);
  assertTrue(r.conditionsSatisfied(c, event));
  condition1_mock.verify();
  return condition2_mock.verify();
});
ClassWhenTest = new TestCase("ClassWhenTest");
testCase(ClassWhenTest, "constructor", function() {
  var child, r, t;
  t = {};
  child = 'child';
  r = new rule.C.When(t, child);
  assertSame(t, r.t);
  return assertSame(child, r.child);
});
testCase(ClassWhenTest, "connect no child", function() {
  var r;
  r = new rule.C.When('condition');
  return r.connect;
});
testCase(ClassWhenTest, "connect to child", function() {
  var child, child_mock, r;
  r = new rule.C.When;
  child = {
    connect: function() {}
  };
  child_mock = TestUtil.createSinonMockFor(child, "connect", r, null);
  r.child = child;
  r.connect({
    setCondition: function() {}
  });
  return child_mock.verify();
});
testCase(ClassWhenTest, "constructor called with function runs function and uses result as child", function() {
  var child, f, r;
  child = 'child';
  f = function() {
    return child;
  };
  r = new rule.C.When('when', f);
  return assertSame(r.child, child);
});
testCase(ClassWhenTest, "constructor called with function runs function against additional arguments", function() {
  var arg1, arg2, args, f, r;
  args = null;
  arg1 = 'arg1';
  arg2 = 'arg2';
  f = function(a1, a2) {
    return args = [a2, a1];
  };
  r = new rule.C.When('when', f, arg1, arg2);
  assertNotNull(args);
  assertEquals(2, args.length);
  assertSame(arg2, args[0]);
  return assertSame(arg1, args[1]);
});
ClassEventTest = new TestCase("ClassEventTest");
testCase(ClassEventTest, "constructor, no arg", function() {
  return new rule.C.Event;
});
testCase(ClassEventTest, "constructor, 2 arg", function() {
  var e, ev, t;
  t = 'type';
  e = 'event';
  ev = new rule.C.Event(t, e);
  assertSame(t, ev.t);
  return assertSame(e, ev.e);
});
testCase(ClassEventTest, "set trigger on parent", function() {
  var ev, parent, parent_mock;
  ev = new rule.C.Event;
  parent = {
    setTrigger: function() {}
  };
  parent_mock = TestUtil.createSinonMockFor(parent, "setTrigger", ev, null);
  ev.connect(parent);
  return parent_mock.verify();
});
testCase(ClassEventTest, "observe elemement with bound listener", function() {
  var bindFunc, ev, util_mock;
  ev = new rule.C.Event('eventType', 'element');
  ev.e = 'element';
  ev.t = 'eventType';
  bindFunc = function() {};
  util_mock = sinon.mock(rule.U);
  util_mock.expects("bind").withExactArgs(ev.event, ev).once().returns(bindFunc);
  util_mock.expects("observe").withExactArgs(ev.e, ev.t, bindFunc).once();
  ev.connect();
  return util_mock.verify();
});
testCase(ClassEventTest, "test event listener", function() {
  var ev, event, parent, parent_mock;
  ev = new rule.C.Event;
  event = {};
  parent = {
    trigger: function() {}
  };
  (parent_mock = sinon.mock(parent)).expects("trigger").withExactArgs(ev, event).once();
  ev.parent = parent;
  ev.event(event);
  return parent_mock.verify();
});
testCase(ClassEventTest, "observe elemement with bound listener, delayed", function() {
  var bindFunc, delayFunc, ev, util_mock;
  ev = new rule.C.Event('eventType', 'element', {
    delayed: 0.25
  });
  bindFunc = function() {};
  delayFunc = function() {};
  util_mock = sinon.mock(rule.U);
  util_mock.expects("bind").withExactArgs(ev.event, ev).once().returns(bindFunc);
  util_mock.expects("delayed").withExactArgs(bindFunc, 0.25).once().returns(delayFunc);
  util_mock.expects("observe").withExactArgs(ev.e, ev.t, delayFunc).once();
  ev.connect();
  return util_mock.verify();
});
testCase(ClassEventTest, "observe elemement with bound listener, cumulativeDelayed", function() {
  var bindFunc, delayFunc, ev, util_mock;
  ev = new rule.C.Event('eventType', 'element', {
    cumulativeDelayed: 0.3
  });
  bindFunc = function() {};
  delayFunc = function() {};
  util_mock = sinon.mock(rule.U);
  util_mock.expects("bind").withExactArgs(ev.event, ev).once().returns(bindFunc);
  util_mock.expects("cumulativeDelayed").withExactArgs(bindFunc, 0.3).once().returns(delayFunc);
  util_mock.expects("observe").withExactArgs(ev.e, ev.t, delayFunc).once();
  ev.connect();
  return util_mock.verify();
});
ClassActionTest = new TestCase("ClassActionTest");
testCase(ClassActionTest, "constructor", function() {
  var child, r, t;
  t = {};
  child = 'child';
  r = new rule.C.Action(t, child);
  assertSame(t, r.t);
  return assertSame(child, r.child);
});
testCase(ClassActionTest, "connect no child", function() {
  var r;
  r = new rule.C.Action('condition');
  return r.connect;
});
testCase(ClassActionTest, "connect to child", function() {
  var child, child_mock, r;
  r = new rule.C.Action;
  child = {
    connect: function() {}
  };
  child_mock = TestUtil.createSinonMockFor(child, "connect", r, null);
  r.child = child;
  r.connect({
    setAction: function() {}
  });
  return child_mock.verify();
});
testCase(ClassActionTest, "set condition on parent", function() {
  var parent, parent_mock, r;
  r = new rule.C.Action;
  parent = {
    setAction: function() {}
  };
  parent_mock = TestUtil.createSinonMockFor(parent, "setAction", r, null);
  r.connect(parent);
  return parent_mock.verify();
});
testCase(ClassActionTest, "default trigger does nothing", function() {
  return new rule.C.Action().trigger();
});
ClassOtherwiseTest = new TestCase("ClassOtherwiseTest");
testCase(ClassOtherwiseTest, "constructor", function() {
  var b, child, t;
  t = {};
  child = {};
  b = new rule.C.Otherwise(t, child);
  assertSame(t, b.t);
  return assertSame(child, b.child);
});
testCase(ClassOtherwiseTest, "childless connect", function() {
  var b, parent;
  parent = {};
  b = new rule.C.Otherwise();
  b.connect(parent);
  return assertSame(parent, b.parent);
});
testCase(ClassOtherwiseTest, "childed connect", function() {
  var b, child, child_mock, parent;
  parent = {};
  child = {
    connect: function(parent) {}
  };
  b = new rule.C.Otherwise('', child);
  child_mock = TestUtil.createSinonMockFor(child, "connect", b, null);
  b.connect(parent);
  assertSame(parent, b.parent);
  return child_mock.verify();
});
testCase(ClassOtherwiseTest, "child calling setAction should cause parent.setActionOtherwise call", function() {
  var child, o, parent, parent_mock;
  child = {};
  parent = {
    setAction: function() {},
    setActionOtherwise: function() {}
  };
  parent_mock = sinon.mock(parent);
  parent_mock.expects("setAction").never();
  parent_mock.expects("setActionOtherwise").withExactArgs(child).once();
  o = new rule.C.Otherwise;
  o.connect(parent);
  o.setAction(child);
  return parent_mock.verify();
});
ClassSimpleElementsActionTest = new TestCase("ClassSimpleElementsActionTest");
testCase(ClassSimpleElementsActionTest, "constructor, no extra args", function() {
  var elements, func, r, t;
  t = {};
  func = 'function to call';
  elements = 'element selector';
  r = new rule.C.SimpleElementsAction(t, func, elements);
  assertSame(t, r.t);
  assertSame(func, r.func);
  return assertSame(elements, r.elements);
});
testCase(ClassSimpleElementsActionTest, "constructor, extra args", function() {
  var elements, extraArg1, extraArg2, func, r, t;
  t = {};
  func = 'function to call';
  elements = 'element selector';
  extraArg1 = {};
  extraArg2 = {};
  r = new rule.C.SimpleElementsAction(t, func, elements, extraArg1, extraArg2);
  assertSame(t, r.t);
  assertSame(func, r.func);
  assertSame(elements, r.elements);
  assertNotNull(r.args);
  assertEquals(2, r.args.length);
  assertSame(extraArg1, r.args[0]);
  return assertSame(extraArg2, r.args[1]);
});
testCase(ClassSimpleElementsActionTest, "trigger function on DOM elements", function() {
  var domElements, elements, extraArg1, func, r, util_mock;
  elements = 'element selector';
  domElements = {};
  func = 'function to call';
  extraArg1 = {};
  r = new rule.C.SimpleElementsAction('type', func, elements, extraArg1);
  util_mock = sinon.mock(rule.U);
  util_mock.expects("elements").withExactArgs(elements).once().returns(domElements);
  util_mock.expects("each").withExactArgs(domElements, func, [extraArg1]).once();
  r.trigger();
  util_mock.verify();
  return util_mock.restore();
});
ClassSimpleElementsConditionTest = new TestCase("ClassSimpleElementsConditionTest");
testCase(ClassSimpleElementsConditionTest, "constructor, no extra args", function() {
  var elements, func, r, t;
  t = {};
  func = 'function to call';
  elements = 'element selector';
  r = new rule.C.SimpleElementsCondition(t, func, elements);
  assertSame(t, r.t);
  assertSame(func, r.func);
  return assertSame(elements, r.elements);
});
testCase(ClassSimpleElementsConditionTest, "constructor, extra args", function() {
  var elements, extraArg1, extraArg2, func, r, t;
  t = {};
  func = 'function to call';
  elements = 'element selector';
  extraArg1 = {};
  extraArg2 = {};
  r = new rule.C.SimpleElementsCondition(t, func, elements, extraArg1, extraArg2);
  assertSame(t, r.t);
  assertSame(func, r.func);
  assertSame(elements, r.elements);
  assertNotNull(r.args);
  assertEquals(2, r.args.length);
  assertSame(extraArg1, r.args[0]);
  return assertSame(extraArg2, r.args[1]);
});
testCase(ClassSimpleElementsConditionTest, "satisfied function on DOM elements, all yes", function() {
  var domElements, element1, element2, elements, extraArg1, f, r, util_mock;
  elements = 'element selector';
  element1 = {
    called: false,
    ret: true
  };
  element2 = {
    called: false,
    ret: true
  };
  extraArg1 = 'extra arg';
  f = {
    func: function(element, extra) {
      assertSame(extraArg1, extra);
      element.called = true;
      return element.ret;
    }
  };
  domElements = [element1, element2];
  r = new rule.C.SimpleElementsCondition('type', f.func, elements, extraArg1);
  (util_mock = sinon.mock(rule.U)).expects("elements").withExactArgs(elements).once().returns(domElements);
  assertTrue(r.satisfied());
  util_mock.verify();
  util_mock.restore();
  assertTrue(element1.called);
  return assertTrue(element2.called);
});
testCase(ClassSimpleElementsConditionTest, "satisfied function on DOM elements, all no", function() {
  var domElements, element1, element2, elements, extraArg1, f, r, util_mock;
  elements = 'element selector';
  element1 = {
    called: false,
    ret: false
  };
  element2 = {
    called: false,
    ret: false
  };
  extraArg1 = 'extra arg';
  f = {
    func: function(element, extra) {
      assertSame(extraArg1, extra);
      element.called = true;
      return element.ret;
    }
  };
  domElements = [element1, element2];
  r = new rule.C.SimpleElementsCondition('type', f.func, elements, extraArg1);
  (util_mock = sinon.mock(rule.U)).expects("elements").withExactArgs(elements).once().returns(domElements);
  assertFalse(r.satisfied());
  util_mock.verify();
  util_mock.restore();
  assertTrue(element1.called);
  return assertFalse(element2.called);
});
testCase(ClassSimpleElementsConditionTest, "satisfied function on DOM elements, 1 yes, 2 no", function() {
  var domElements, element1, element2, elements, extraArg1, f, r, util_mock;
  elements = 'element selector';
  element1 = {
    called: false,
    ret: true
  };
  element2 = {
    called: false,
    ret: false
  };
  extraArg1 = 'extra arg';
  f = {
    func: function(element, extra) {
      assertSame(extraArg1, extra);
      element.called = true;
      return element.ret;
    }
  };
  domElements = [element1, element2];
  r = new rule.C.SimpleElementsCondition('type', f.func, elements, extraArg1);
  (util_mock = sinon.mock(rule.U)).expects("elements").withExactArgs(elements).once().returns(domElements);
  assertFalse(r.satisfied());
  util_mock.verify();
  util_mock.restore();
  assertTrue(element1.called);
  return assertTrue(element2.called);
});
testCase(ClassSimpleElementsConditionTest, "satisfied function on DOM elements, no elements", function() {
  var elements, extraArg1, r, util_mock;
  elements = 'element selector';
  extraArg1 = 'extra arg';
  (util_mock = sinon.mock(rule.U)).expects("elements").withExactArgs(elements).once().returns([]);
  r = new rule.C.SimpleElementsCondition('type', {}, elements, extraArg1);
  assertTrue(r.satisfied());
  util_mock.verify();
  return util_mock.restore();
});
ClassValidatorRequiredTest = new TestCase("ClassValidatorRequiredTest");
testCase(ClassValidatorRequiredTest, "no-arg constructor", function() {
  var r;
  return r = new rule.C.ValidatorRequired;
});
testCase(ClassValidatorRequiredTest, "empty string, should be unsatisfied", function() {
  var elements, mock_u, r, satisfied, selector;
  selector = 'xyz';
  elements = 'elements array';
  mock_u = sinon.mock(rule.U);
  mock_u.expects("elements").withExactArgs(selector).once().returns(elements);
  mock_u.expects("fieldValue").withExactArgs(elements).once().returns("");
  r = new rule.C.ValidatorRequired('t', selector);
  satisfied = r.satisfied();
  mock_u.verify();
  return assertFalse(satisfied);
});
testCase(ClassValidatorRequiredTest, "whitespace string, no trim, should be satisfied", function() {
  var elements, mock_u, r, satisfied, selector;
  selector = 'xyz';
  elements = 'elements array';
  mock_u = sinon.mock(rule.U);
  mock_u.expects("elements").withExactArgs(selector).once().returns(elements);
  mock_u.expects("fieldValue").withExactArgs(elements).once().returns("   ");
  r = new rule.C.ValidatorRequired('t', selector);
  satisfied = r.satisfied();
  mock_u.verify();
  return assertTrue(satisfied);
});
testCase(ClassValidatorRequiredTest, "whitespace string, with trim, should be unsatisfied", function() {
  var elements, mock_u, r, satisfied, selector;
  selector = 'xyz';
  elements = 'elements array';
  mock_u = sinon.mock(rule.U);
  mock_u.expects("elements").withExactArgs(selector).once().returns(elements);
  mock_u.expects("fieldValue").withExactArgs(elements).once().returns("   ");
  r = new rule.C.ValidatorRequired('t', selector, {
    trim: true
  });
  satisfied = r.satisfied();
  mock_u.verify();
  return assertFalse(satisfied);
});
ClassValidatorIntegerTest = new TestCase("ClassValidatorIntegerTest");
ClassValidatorIntegerTest.prototype.runTest = function(str, expected, options) {
  var elements, mock_u, r, satisfied, selector;
  selector = 'xyz';
  elements = 'elements array';
  mock_u = sinon.mock(rule.U);
  mock_u.expects("elements").withExactArgs(selector).once().returns(elements);
  mock_u.expects("fieldValue").withExactArgs(elements).once().returns(str);
  r = new rule.C.ValidatorInteger('t', selector, options);
  satisfied = r.satisfied();
  mock_u.verify();
  return assertEquals(expected, satisfied);
};
testCase(ClassValidatorIntegerTest, "no-arg constructor", function() {
  var r;
  return r = new rule.C.ValidatorInteger;
});
testCase(ClassValidatorIntegerTest, "empty string, should be satisfied", function() {
  return this.runTest("", true);
});
testCase(ClassValidatorIntegerTest, "simple int, should be satisfied", function() {
  return this.runTest("10", true);
});
testCase(ClassValidatorIntegerTest, "negative int, should be satisfied", function() {
  return this.runTest("-10", true);
});
testCase(ClassValidatorIntegerTest, "simple int with whitespace, no trim, should be unsatisfied", function() {
  return this.runTest("10   ", false);
});
testCase(ClassValidatorIntegerTest, "simple int with whitespace, trim, should be satisfied", function() {
  return this.runTest("10   ", true, {
    trim: true
  });
});
testCase(ClassValidatorIntegerTest, "int lt min, should be unsatisfied", function() {
  return this.runTest("9", false, {
    min: 10
  });
});
testCase(ClassValidatorIntegerTest, "int gt min, should be satisfied", function() {
  return this.runTest("11", true, {
    min: 10
  });
});
testCase(ClassValidatorIntegerTest, "int eq min, should be satisfied", function() {
  return this.runTest("10", true, {
    min: 10
  });
});
testCase(ClassValidatorIntegerTest, "int lt max, should be satisfied", function() {
  return this.runTest("9", true, {
    max: 10
  });
});
testCase(ClassValidatorIntegerTest, "int gt max, should be satisfied", function() {
  return this.runTest("11", false, {
    max: 10
  });
});
testCase(ClassValidatorIntegerTest, "int eq max, should be satisfied", function() {
  return this.runTest("10", true, {
    max: 10
  });
});
testCase(ClassValidatorIntegerTest, "int within min and max, should be satisfied", function() {
  return this.runTest("6", true, {
    min: 5,
    max: 10
  });
});
testCase(ClassValidatorIntegerTest, "int lt min with max, should be unsatisfied", function() {
  return this.runTest("4", false, {
    min: 5,
    max: 10
  });
});
testCase(ClassValidatorIntegerTest, "int gt max with min, should be unsatisfied", function() {
  return this.runTest("11", false, {
    min: 5,
    max: 10
  });
});
ClassValidatorFloatTest = new TestCase("ClassValidatorFloatTest");
ClassValidatorFloatTest.prototype.runTest = function(str, expected, options) {
  var elements, mock_u, r, satisfied, selector;
  selector = 'xyz';
  elements = 'elements array';
  mock_u = sinon.mock(rule.U);
  mock_u.expects("elements").withExactArgs(selector).once().returns(elements);
  mock_u.expects("fieldValue").withExactArgs(elements).once().returns(str);
  r = new rule.C.ValidatorFloat('t', selector, options);
  satisfied = r.satisfied();
  mock_u.verify();
  return assertEquals(expected, satisfied);
};
testCase(ClassValidatorFloatTest, "no-arg constructor", function() {
  var r;
  return r = new rule.C.ValidatorFloat;
});
testCase(ClassValidatorFloatTest, "empty string, should be satisfied", function() {
  return this.runTest("", true);
});
testCase(ClassValidatorFloatTest, "simple float, should be satisfied", function() {
  return this.runTest("10.1", true);
});
testCase(ClassValidatorFloatTest, "negative float, should be satisfied", function() {
  return this.runTest("-10.1", true);
});
testCase(ClassValidatorFloatTest, "simple float with whitespace, no trim, should be unsatisfied", function() {
  return this.runTest("10   ", false);
});
testCase(ClassValidatorFloatTest, "simple float with whitespace, trim, should be satisfied", function() {
  return this.runTest("10   ", true, {
    trim: true
  });
});
testCase(ClassValidatorFloatTest, "float lt minInclusive, should be unsatisfied", function() {
  return this.runTest("9.999", false, {
    minInclusive: 10
  });
});
testCase(ClassValidatorFloatTest, "float gt minInclusive, should be satisfied", function() {
  return this.runTest("10.00001", true, {
    minInclusive: 10
  });
});
testCase(ClassValidatorFloatTest, "float eq minInclusive, should be satisfied", function() {
  return this.runTest("10.0", true, {
    minInclusive: 10
  });
});
testCase(ClassValidatorFloatTest, "float lt minExclusive, should be unsatisfied", function() {
  return this.runTest("9.999", false, {
    minExclusive: 10
  });
});
testCase(ClassValidatorFloatTest, "float gt minExclusive, should be satisfied", function() {
  return this.runTest("10.00001", true, {
    minExclusive: 10
  });
});
testCase(ClassValidatorFloatTest, "float eq minExclusive, should be unsatisfied", function() {
  return this.runTest("10.0", false, {
    minExclusive: 10
  });
});
testCase(ClassValidatorFloatTest, "float lt maxInclusive, should be satisfied", function() {
  return this.runTest("9.9999", true, {
    maxInclusive: 10
  });
});
testCase(ClassValidatorFloatTest, "float gt maxInclusive, should be satisfied", function() {
  return this.runTest("10.01", false, {
    maxInclusive: 10
  });
});
testCase(ClassValidatorFloatTest, "float eq maxInclusive, should be satisfied", function() {
  return this.runTest("10.0", true, {
    maxInclusive: 10
  });
});
testCase(ClassValidatorFloatTest, "float lt maxExclusive, should be satisfied", function() {
  return this.runTest("9.9999", true, {
    maxExclusive: 10
  });
});
testCase(ClassValidatorFloatTest, "float gt maxExclusive, should be satisfied", function() {
  return this.runTest("10.01", false, {
    maxExclusive: 10
  });
});
testCase(ClassValidatorFloatTest, "float eq maxExclusive, should be unsatisfied", function() {
  return this.runTest("10.0", false, {
    maxExclusive: 10
  });
});
testCase(ClassValidatorFloatTest, "float within minInclusive and maxInclusive, should be satisfied", function() {
  return this.runTest("6.1", true, {
    minInclusive: 5,
    maxInclusive: 10
  });
});
testCase(ClassValidatorFloatTest, "float lt minInclusive with maxInclusive, should be unsatisfied", function() {
  return this.runTest("4.9", false, {
    minInclusive: 5,
    maxInclusive: 10
  });
});
testCase(ClassValidatorFloatTest, "float gt maxInclusive with minInclusive, should be unsatisfied", function() {
  return this.runTest("11", false, {
    minInclusive: 5,
    maxInclusive: 10
  });
});
ClassValidatorRegexTest = new TestCase("ClassValidatorRegexTest");
ClassValidatorRegexTest.prototype.runTest = function(str, expected, options) {
  var elements, mock_u, r, satisfied, selector;
  selector = 'xyz';
  elements = 'elements array';
  mock_u = sinon.mock(rule.U);
  mock_u.expects("elements").withExactArgs(selector).once().returns(elements);
  mock_u.expects("fieldValue").withExactArgs(elements).once().returns(str);
  r = new rule.C.ValidatorRegex('t', selector, options);
  satisfied = r.satisfied();
  mock_u.verify();
  return assertEquals(expected, satisfied);
};
testCase(ClassValidatorRegexTest, "no-arg constructor", function() {
  var r;
  return r = new rule.C.ValidatorRegex;
});
testCase(ClassValidatorRegexTest, "empty string, should be satisfied", function() {
  this.runTest("", true, 'xyz');
  this.runTest("", true, /xyz/);
  this.runTest("", true, {
    regex: 'xyz'
  });
  return this.runTest("", true, {
    regex: /xyz/
  });
});
testCase(ClassValidatorRegexTest, "simple exact match, option=string, should be satisfied", function() {
  return this.runTest("xyz", true, 'xyz');
});
testCase(ClassValidatorRegexTest, "simple exact match, option=/regex/, should be satisfied", function() {
  return this.runTest("xyz", true, /xyz/);
});
testCase(ClassValidatorRegexTest, "simple non match, option=/regex/, shouldn't be satisfied", function() {
  return this.runTest("abc", false, /xyz/);
});
testCase(ClassValidatorRegexTest, "simple exact match, option=RegExp, should be satisfied", function() {
  return this.runTest("xyz", true, new RegExp('xyz'));
});
testCase(ClassValidatorRegexTest, "simple non match, option=RegExp, shouldn't be satisfied", function() {
  return this.runTest("abc", false, new RegExp('xyz'));
});
testCase(ClassValidatorRegexTest, "simple exact match, option={regex=string}, should be satisfied", function() {
  return this.runTest("xyz", true, {
    regex: 'xyz'
  });
});
testCase(ClassValidatorRegexTest, "simple non match, option={regex=string}, shouldn't be satisfied", function() {
  return this.runTest("abc", false, {
    regex: 'xyz'
  });
});
testCase(ClassValidatorRegexTest, "simple exact match, option={regex=/regex/}, should be satisfied", function() {
  return this.runTest("xyz", true, {
    regex: /xyz/
  });
});
testCase(ClassValidatorRegexTest, "simple non match, option={regex=/regex/}, shouldn't be satisfied", function() {
  return this.runTest("abc", false, {
    regex: /xyz/
  });
});
testCase(ClassValidatorRegexTest, "simple exact match, option={regex=RegExp}, should be satisfied", function() {
  this.runTest("xyz", true, {
    regex: new RegExp('xyz')
  });
  return this.runTest("abc", false, {
    regex: new RegExp('xyz')
  });
});
testCase(ClassValidatorRegexTest, "ignore case match, option={regex=RegExp+ignore case}, should be satisfied", function() {
  return this.runTest("XYZ", true, {
    regex: new RegExp('xyz', 'i')
  });
});
testCase(ClassValidatorRegexTest, "ignore case match, option={regex=/regex/i}, should be satisfied", function() {
  return this.runTest("XYZ", true, {
    regex: /xyz/i
  });
});
testCase(ClassValidatorRegexTest, "ignore case match with option on RegExp object, option={regex=RegExp,options='i'}, shouldn't be satisfied", function() {
  return this.runTest("XYZ", false, {
    regex: new RegExp('xyz'),
    options: 'i'
  });
});
testCase(ClassValidatorRegexTest, "ignore case match with option on /regex/, option={regex=/regex/,options='i'}, shouldn't be satisfied", function() {
  return this.runTest("XYZ", false, {
    regex: /xyz/,
    options: 'i'
  });
});
testCase(ClassValidatorRegexTest, "ignore case match, option={regex=string,options='i'}, should be satisfied", function() {
  return this.runTest("XYZ", true, {
    regex: 'xyz',
    options: 'i'
  });
});
testCase(ClassValidatorRegexTest, "untrimmed match, shouldn't be satisfied", function() {
  return this.runTest("  xyz\t", false, {
    regex: '^xyz$'
  });
});
testCase(ClassValidatorRegexTest, "trimmed match, should be satisfied", function() {
  return this.runTest("  xyz\t", true, {
    regex: '^xyz$',
    trim: true
  });
});
testCase(ClassValidatorRegexTest, "partial string match, should be satisfied", function() {
  return this.runTest("abcxyz\t", true, 'xyz');
});
testCase(ClassValidatorRegexTest, "full string complex match, should be satisfied", function() {
  return this.runTest("aabxxxxz\t", true, '^[abc]+x+y*z?\\s$');
});
ClassValidatorEmailTest = new TestCase("ClassValidatorEmailTest");
ClassValidatorEmailTest.prototype.runTest = function(str, expected, options) {
  var elements, mock_u, r, satisfied, selector;
  selector = 'xyz';
  elements = 'elements array';
  mock_u = sinon.mock(rule.U);
  mock_u.expects("elements").withExactArgs(selector).once().returns(elements);
  mock_u.expects("fieldValue").withExactArgs(elements).once().returns(str);
  r = new rule.C.ValidatorEmail('t', selector, options);
  satisfied = r.satisfied();
  mock_u.verify();
  return assertEquals(str, expected, satisfied);
};
testCase(ClassValidatorEmailTest, "no-arg constructor", function() {
  var r;
  return r = new rule.C.ValidatorEmail;
});
testCase(ClassValidatorEmailTest, "empty string, should be satisfied", function() {
  return this.runTest("", true);
});
testCase(ClassValidatorEmailTest, "valid emails, should be satisfied", function() {
  this.runTest("me@me.com", true);
  this.runTest("me@me.com.au", true);
  this.runTest("me@me.edu", true);
  this.runTest("me@me.net", true);
  this.runTest("me@co.uk", true);
  this.runTest("me@some.long.domain.name.not.really.sensible.but.still.valid.com", true);
  this.runTest("m.e@me.com", true);
  this.runTest("me@me.hah", true);
  this.runTest("me@me.coke", true);
  return this.runTest("_me_@me.org", true);
});
testCase(ClassValidatorEmailTest, "invalid emails, shouldn't be satisfied", function() {
  this.runTest("me", false);
  this.runTest("me.me.com", false);
  this.runTest("@me.com", false);
  this.runTest("me@me@me.com", false);
  this.runTest("me@me", false);
  this.runTest("@me", false);
  this.runTest("m@me!", false);
  this.runTest("me@hoo.haa?", false);
  return this.runTest("me@me..com", false);
});
SimpleFunctionalTest = new TestCase("SimpleFunctionalTest");
testCase(SimpleFunctionalTest, "simple functional test", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><p id="para" style="display: none;">just a paragraph.</p><ul id="ul"><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var li, lis, para, testElement, _i, _j, _k, _l, _len, _len2, _len3, _len4, _results;
  rule(function() {
    return this.define('simple functional test', this.on(this.event('#testElement', 'test:event')), this["do"](this.toggle('li, #para')));
  });
  lis = rule.U.elements('li');
  para = rule.U.element('#para');
  testElement = rule.U.element('#testElement');
  assertEquals('display:none', spacelessStyle(para));
  for (_i = 0, _len = lis.length; _i < _len; _i++) {
    li = lis[_i];
    assertEquals('', spacelessStyle(li));
  }
  rule.U.fire(testElement, 'test:event');
  assertTrue(spacelessStyle(para) === '' || spacelessStyle(para) === 'display:block');
  for (_j = 0, _len2 = lis.length; _j < _len2; _j++) {
    li = lis[_j];
    assertEquals('display:none', spacelessStyle(li));
  }
  rule.U.fire(testElement, 'test:event');
  assertEquals('display:none', spacelessStyle(para));
  for (_k = 0, _len3 = lis.length; _k < _len3; _k++) {
    li = lis[_k];
    assertTrue(spacelessStyle(li) === '' || spacelessStyle(li) === 'display:block' || spacelessStyle(li) === 'display:list-item');
  }
  rule.U.fire(testElement, 'test:event');
  assertTrue(spacelessStyle(para) === '' || spacelessStyle(para) === 'display:block');
  _results = [];
  for (_l = 0, _len4 = lis.length; _l < _len4; _l++) {
    li = lis[_l];
    _results.push(assertEquals('display:none', spacelessStyle(li)));
  }
  return _results;
});
SimpleConditionalFunctionalTest = new TestCase("SimpleConditionalFunctionalTest");
testCase(SimpleConditionalFunctionalTest, "simple functional test", function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><p id="para" style="display: none;">just a paragraph.</p><ul id="ul"><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  var li, lis, para, testElement, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _len6, _len7, _m, _n, _o, _results;
  rule(function() {
    return this.define('simple functional test', this.on(this.event('#testElement', 'test:event')), this.when(this.hasClass('#firstli', 'toggleable')), this["do"](this.toggle('li, #para')));
  });
  lis = rule.U.elements('li');
  para = rule.U.element('#para');
  testElement = rule.U.element('#testElement');
  assertEquals('1: para not shown', 'display:none', spacelessStyle(para));
  for (_i = 0, _len = lis.length; _i < _len; _i++) {
    li = lis[_i];
    assertEquals('1: li shown', '', spacelessStyle(li));
  }
  rule.U.fire(testElement, 'test:event');
  assertEquals('2: para not shown', 'display:none', spacelessStyle(para));
  for (_j = 0, _len2 = lis.length; _j < _len2; _j++) {
    li = lis[_j];
    assertEquals('2: li shown', '', spacelessStyle(li));
  }
  rule.U.addClass(lis[0], 'nottoggleable');
  rule.U.fire(testElement, 'test:event');
  assertEquals('3: para not shown', 'display:none', spacelessStyle(para));
  for (_k = 0, _len3 = lis.length; _k < _len3; _k++) {
    li = lis[_k];
    assertEquals('3: li not shown', '', spacelessStyle(li));
  }
  rule.U.addClass(lis[0], 'toggleable');
  rule.U.fire(testElement, 'test:event');
  assertTrue('4: para shown', spacelessStyle(para) === '' || spacelessStyle(para) === 'display:block');
  for (_l = 0, _len4 = lis.length; _l < _len4; _l++) {
    li = lis[_l];
    assertEquals('4: li not shown', 'display:none', spacelessStyle(li));
  }
  rule.U.fire(testElement, 'test:event');
  assertEquals('5: para not shown', 'display:none', spacelessStyle(para));
  for (_m = 0, _len5 = lis.length; _m < _len5; _m++) {
    li = lis[_m];
    assertTrue('5: li shown', spacelessStyle(li) === '' || spacelessStyle(li) === 'display:block' || spacelessStyle(li) === 'display:list-item');
  }
  rule.U.fire(testElement, 'test:event');
  assertTrue('6: para shown', spacelessStyle(para) === '' || spacelessStyle(para) === 'display:block');
  for (_n = 0, _len6 = lis.length; _n < _len6; _n++) {
    li = lis[_n];
    assertEquals('6: li not shown', 'display:none', spacelessStyle(li));
  }
  rule.U.removeClass(lis[0], 'toggleable');
  rule.U.fire(testElement, 'test:event');
  assertTrue('7: para shown', spacelessStyle(para) === '' || spacelessStyle(para) === 'display:block');
  _results = [];
  for (_o = 0, _len7 = lis.length; _o < _len7; _o++) {
    li = lis[_o];
    _results.push(assertEquals('7: li not shown', 'display:none', spacelessStyle(li)));
  }
  return _results;
});
ComplexConditionsFunctionalTest = new TestCase("ComplexConditionsFunctionalTest");
ComplexConditionsFunctionalTest.prototype.setUp = function() {
  /*:DOC += <div><p id="testElement">A paragraph element</p><p id="para" style="display: none;">just a paragraph.</p><ul id="ul"><li id="firstli" class="l leaveme leavemetoo">one</li><li class="l">two</li><li>notme!</li><li class="l">three</li></div> */
	;  rule(function() {
    return this.define('complex conditions functional test', this.on(this.event('#testElement', 'test:event')), this.when(this.or, this.when(this.and, this.when(this.hasClass('#testElement', 'eventable')), this.when(this.hasClass('#testElement', 'shortcut'))), this.when(this.hasClass('#testElement', 'toggleable'))), this["do"](this.toggle('li, #para')));
  });
  this.lis = rule.U.elements('li');
  this.para = rule.U.element('#para');
  return this.testElement = rule.U.element('#testElement');
};
testCase(ComplexConditionsFunctionalTest, "sanity", function() {
  var li, _i, _len, _ref, _results;
  assertEquals('display:none', spacelessStyle(this.para));
  _ref = this.lis;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    li = _ref[_i];
    _results.push(assertEquals('', spacelessStyle(li)));
  }
  return _results;
});
testCase(ComplexConditionsFunctionalTest, "event (only), shouldn't trigger", function() {
  var li, _i, _len, _ref, _results;
  rule.U.fire(this.testElement, 'test:event');
  assertEquals('display:none', spacelessStyle(this.para));
  _ref = this.lis;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    li = _ref[_i];
    _results.push(assertEquals('', spacelessStyle(li)));
  }
  return _results;
});
testCase(ComplexConditionsFunctionalTest, "simple or condition met, shouldn't trigger", function() {
  var li, _i, _j, _len, _len2, _ref, _ref2, _results;
  rule.U.addClass(this.testElement, 'toggleable');
  rule.U.fire(this.testElement, 'test:event');
  assertTrue(spacelessStyle(this.para) === '' || spacelessStyle(this.para) === 'display:block');
  _ref = this.lis;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    li = _ref[_i];
    assertEquals('display:none', spacelessStyle(li));
  }
  rule.U.fire(this.testElement, 'test:event');
  assertEquals('display:none', spacelessStyle(this.para));
  _ref2 = this.lis;
  _results = [];
  for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
    li = _ref2[_j];
    _results.push(assertTrue(spacelessStyle(li) === '' || spacelessStyle(li) === 'display:block' || spacelessStyle(li) === 'display:list-item'));
  }
  return _results;
});
testCase(ComplexConditionsFunctionalTest, "half of and condition met, shouldn't trigger", function() {
  var li, _i, _len, _ref, _results;
  rule.U.addClass(this.testElement, 'eventable');
  rule.U.fire(this.testElement, 'test:event');
  assertEquals('display:none', spacelessStyle(this.para));
  _ref = this.lis;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    li = _ref[_i];
    _results.push(assertEquals('', spacelessStyle(li)));
  }
  return _results;
});
testCase(ComplexConditionsFunctionalTest, "all of and condition met, should trigger", function() {
  var li, _i, _j, _len, _len2, _ref, _ref2, _results;
  rule.U.addClass(this.testElement, 'eventable');
  rule.U.addClass(this.testElement, 'shortcut');
  rule.U.fire(this.testElement, 'test:event');
  assertTrue(spacelessStyle(this.para) === '' || spacelessStyle(this.para) === 'display:block');
  _ref = this.lis;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    li = _ref[_i];
    assertEquals('display:none', spacelessStyle(li));
  }
  rule.U.fire(this.testElement, 'test:event');
  assertEquals('display:none', spacelessStyle(this.para));
  _ref2 = this.lis;
  _results = [];
  for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
    li = _ref2[_j];
    _results.push(assertTrue(spacelessStyle(li) === '' || spacelessStyle(li) === 'display:block' || spacelessStyle(li) === 'display:list-item'));
  }
  return _results;
});
testCase(ComplexConditionsFunctionalTest, "all conditions met, should trigger", function() {
  var li, _i, _j, _len, _len2, _ref, _ref2, _results;
  rule.U.addClass(this.testElement, 'eventable');
  rule.U.addClass(this.testElement, 'shortcut');
  rule.U.addClass(this.testElement, 'eventable');
  rule.U.fire(this.testElement, 'test:event');
  assertTrue(spacelessStyle(this.para) === '' || spacelessStyle(this.para) === 'display:block');
  _ref = this.lis;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    li = _ref[_i];
    assertEquals('display:none', spacelessStyle(li));
  }
  rule.U.fire(this.testElement, 'test:event');
  assertEquals('display:none', spacelessStyle(this.para));
  _ref2 = this.lis;
  _results = [];
  for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
    li = _ref2[_j];
    _results.push(assertTrue(spacelessStyle(li) === '' || spacelessStyle(li) === 'display:block' || spacelessStyle(li) === 'display:list-item'));
  }
  return _results;
});
FormFieldValidatorFunctionalTest = new TestCase("FormFieldValidatorFunctionalTest");
FormFieldValidatorFunctionalTest.prototype.setUp = function() {
  /*:DOC += <div><div style="display: none;" id="correct">Correct!</div><div style="display: none;" id="incorrect">Incorrect!</div><form><input type="text" name="intInput"><input type="text" name="intInput2"><input type="text" name="floatInput"><input type="radio" name="radioInput" value="one"><input type="radio" name="radioInput" value="two"><input type="radio" name="radioInput" value="three"><button id="validate">Validate!</button></form></div> */
	;  rule(function() {
    return this.define('form field validator functional test', this.on(this.event('#validate', 'test:event')), this.validate(this.required('input[name=intInput]')), this.validate(this.int('input[name=intInput]')), this.validate(this.int('input[name=intInput2]', {
      trim: true,
      min: -10,
      max: 0
    })), this.validate(this.float('input[name=floatInput]', {
      trim: true,
      minExclusive: 0,
      maxInclusive: 4.5
    })), this.validate(this.required('input[type=radio]')), this["do"](this.show('#correct')), this.otherwise(this.show('#incorrect')));
  });
  this.U = rule.U;
  this.correct = this.U.element('#correct');
  this.incorrect = this.U.element('#incorrect');
  this.radios = this.U.elements('input[type=radio]');
  this.intInp = this.U.elements('input[name=intInput]')[0];
  this.intInp2 = this.U.elements('input[name=intInput2]')[0];
  this.floatInp = this.U.elements('input[name=floatInput]')[0];
  return this.validate = this.U.element('#validate');
};
testCase(FormFieldValidatorFunctionalTest, "sanity, nothing happened", function() {
  assertFalse(this.U.isVisible(this.correct));
  return assertFalse(this.U.isVisible(this.incorrect));
});
testCase(FormFieldValidatorFunctionalTest, "nothing changed, event shouldn't validate, should show incorrect", function() {
  this.U.fire(this.validate, 'test:event');
  assertFalse(this.U.isVisible(this.correct));
  return assertTrue(this.U.isVisible(this.incorrect));
});
testCase(FormFieldValidatorFunctionalTest, "only int in intInput, shouldn't validate", function() {
  this.intInp.value = '100';
  this.U.fire(this.validate, 'test:event');
  assertFalse(this.U.isVisible(this.correct));
  return assertTrue(this.U.isVisible(this.incorrect));
});
testCase(FormFieldValidatorFunctionalTest, "only int in intInput, int in intInput2 shouldn't validate", function() {
  this.intInp.value = '100';
  this.intInp.value = '-5';
  this.U.fire(this.validate, 'test:event');
  assertFalse(this.U.isVisible(this.correct));
  return assertTrue(this.U.isVisible(this.incorrect));
});
testCase(FormFieldValidatorFunctionalTest, "only int in intInput, int in intInput2, float in floatInput shouldn't validate", function() {
  this.intInp.value = '100';
  this.intInp2.value = '-5';
  this.floatInp.value = '3.1';
  this.U.fire(this.validate, 'test:event');
  assertFalse(this.U.isVisible(this.correct));
  return assertTrue(this.U.isVisible(this.incorrect));
});
FormFieldValidatorFunctionalTest.prototype.setValidValues = function() {
  this.intInp.value = '100';
  this.intInp2.value = '-5';
  this.floatInp.value = '3.1';
  return this.radios[0].checked = true;
};
testCase(FormFieldValidatorFunctionalTest, "all valid values, should validate", function() {
  this.setValidValues();
  this.U.fire(this.validate, 'test:event');
  assertTrue(this.U.isVisible(this.correct));
  return assertFalse(this.U.isVisible(this.incorrect));
});
testCase(FormFieldValidatorFunctionalTest, "all valid values, except intInput, shouldn't validate", function() {
  this.setValidValues();
  this.intInp.value = 'nonint';
  this.U.fire(this.validate, 'test:event');
  assertFalse(this.U.isVisible(this.correct));
  return assertTrue(this.U.isVisible(this.incorrect));
});
testCase(FormFieldValidatorFunctionalTest, "all valid values, except intInput2, shouldn't validate", function() {
  this.setValidValues();
  this.intInp2.value = 'nonint';
  this.U.fire(this.validate, 'test:event');
  assertFalse(this.U.isVisible(this.correct));
  return assertTrue(this.U.isVisible(this.incorrect));
});
testCase(FormFieldValidatorFunctionalTest, "all valid values, except intInput2 (>max), shouldn't validate", function() {
  this.setValidValues();
  this.intInp2.value = '1';
  this.U.fire(this.validate, 'test:event');
  assertFalse(this.U.isVisible(this.correct));
  return assertTrue(this.U.isVisible(this.incorrect));
});
testCase(FormFieldValidatorFunctionalTest, "all valid values, except intInput2 (<min), shouldn't validate", function() {
  this.setValidValues();
  this.intInp2.value = '-11';
  this.U.fire(this.validate, 'test:event');
  assertFalse(this.U.isVisible(this.correct));
  return assertTrue(this.U.isVisible(this.incorrect));
});
testCase(FormFieldValidatorFunctionalTest, "all valid values, except floatInput, shouldn't validate", function() {
  this.setValidValues();
  this.floatInp.value = 'nonint';
  this.U.fire(this.validate, 'test:event');
  assertFalse(this.U.isVisible(this.correct));
  return assertTrue(this.U.isVisible(this.incorrect));
});
testCase(FormFieldValidatorFunctionalTest, "all valid values, except floatInput (>maxInclusive), shouldn't validate", function() {
  this.setValidValues();
  this.floatInp.value = '5';
  this.U.fire(this.validate, 'test:event');
  assertFalse(this.U.isVisible(this.correct));
  return assertTrue(this.U.isVisible(this.incorrect));
});
testCase(FormFieldValidatorFunctionalTest, "all valid values, except floatInput (=minExclusive), shouldn't validate", function() {
  this.setValidValues();
  this.floatInp.value = '0';
  this.U.fire(this.validate, 'test:event');
  assertFalse(this.U.isVisible(this.correct));
  return assertTrue(this.U.isVisible(this.incorrect));
});
DelayedEventHandlingTest = new AsyncTestCase("DelayedEventHandlingTest");
DelayedEventHandlingTest.prototype.setUp = function() {
  /*:DOC += <div><span id="toggleElement" style="display: none;">toggle</span><span id="eventElement">event</span></div> */
	;  rule(function() {
    return this.define('delayed event handling functional test', this.on(this.event('#eventElement', 'delay:event', {
      delayed: 0.1
    })), this.on(this.event('#eventElement', 'cumulativeDelayed:event', {
      cumulativeDelayed: 0.1
    })), this["do"](this.show('#toggleElement')));
  });
  this.U = rule.U;
  this.eEle = this.U.element('eventElement');
  return this.tEle = this.U.element('toggleElement');
};
testCase(DelayedEventHandlingTest, 'delayed event handle', function(queue) {
  expectAsserts(4);
  queue.call("1: sanity", __bind(function() {
    return assertFalse(this.U.isVisible(this.tEle));
  }, this));
  queue.call("2: trigger", __bind(function() {
    return this.U.fire(this.eEle, 'delay:event');
  }, this));
  queue.call("3: test delayed not invoked at 10ms", __bind(function(callbacks) {
    var f;
    f = callbacks.add(__bind(function() {
      return assertFalse("shouldn't be visible at 10ms", this.U.isVisible(this.tEle));
    }, this));
    return window.setTimeout(f, 10);
  }, this));
  queue.call("4: test delayed not invoked at 50ms", __bind(function(callbacks) {
    var f;
    f = callbacks.add(__bind(function() {
      this.U.fire(this.eEle, 'delay:event');
      return assertFalse("shouldn't be visible at 50ms", this.U.isVisible(this.tEle));
    }, this));
    return window.setTimeout(f, 40);
  }, this));
  return queue.call("5: test delayed invoked at 200ms", __bind(function(callbacks) {
    var f;
    f = callbacks.add(__bind(function() {
      return assertTrue("should be visible by now", this.U.isVisible(this.tEle));
    }, this));
    return window.setTimeout(f, 150);
  }, this));
});
testCase(DelayedEventHandlingTest, 'cumulativeDelayed event handle, no additional events', function(queue) {
  expectAsserts(4);
  queue.call("1: sanity", __bind(function() {
    return assertFalse(this.U.isVisible(this.tEle));
  }, this));
  queue.call("2: trigger", __bind(function() {
    return this.U.fire(this.eEle, 'cumulativeDelayed:event');
  }, this));
  queue.call("3: test delayed not invoked at 10ms", __bind(function(callbacks) {
    var f;
    f = callbacks.add(__bind(function() {
      return assertFalse("shouldn't be visible at 10ms", this.U.isVisible(this.tEle));
    }, this));
    return window.setTimeout(f, 10);
  }, this));
  queue.call("4: test delayed not invoked at 50ms", __bind(function(callbacks) {
    var f;
    f = callbacks.add(__bind(function() {
      return assertFalse("shouldn't be visible at 50ms", this.U.isVisible(this.tEle));
    }, this));
    return window.setTimeout(f, 40);
  }, this));
  return queue.call("5: test delayed invoked at 200ms", __bind(function(callbacks) {
    var f;
    f = callbacks.add(__bind(function() {
      return assertTrue("should be visible by now", this.U.isVisible(this.tEle));
    }, this));
    return window.setTimeout(f, 150);
  }, this));
});
testCase(DelayedEventHandlingTest, 'cumulativeDelayed event handle, additional events', function(queue) {
  expectAsserts(7);
  queue.call("1: sanity", __bind(function() {
    return assertFalse(this.U.isVisible(this.tEle));
  }, this));
  queue.call("2: trigger", __bind(function() {
    return this.U.fire(this.eEle, 'cumulativeDelayed:event');
  }, this));
  queue.call("3: test delayed not invoked at 10ms", __bind(function(callbacks) {
    var f;
    f = callbacks.add(__bind(function() {
      this.U.fire(this.eEle, 'cumulativeDelayed:event');
      return assertFalse("shouldn't be visible at 10ms", this.U.isVisible(this.tEle));
    }, this));
    return window.setTimeout(f, 10);
  }, this));
  queue.call("4: test delayed not invoked at 40ms", __bind(function(callbacks) {
    var f;
    f = callbacks.add(__bind(function() {
      this.U.fire(this.eEle, 'cumulativeDelayed:event');
      return assertFalse("shouldn't be visible at 40ms", this.U.isVisible(this.tEle));
    }, this));
    return window.setTimeout(f, 30);
  }, this));
  queue.call("5: test delayed not invoked at 70ms", __bind(function(callbacks) {
    var f;
    f = callbacks.add(__bind(function() {
      this.U.fire(this.eEle, 'cumulativeDelayed:event');
      return assertFalse("shouldn't be visible at 70ms", this.U.isVisible(this.tEle));
    }, this));
    return window.setTimeout(f, 30);
  }, this));
  queue.call("6: test delayed not invoked at 100ms", __bind(function(callbacks) {
    var f;
    f = callbacks.add(__bind(function() {
      this.U.fire(this.eEle, 'cumulativeDelayed:event');
      return assertFalse("shouldn't be visible at 100ms", this.U.isVisible(this.tEle));
    }, this));
    return window.setTimeout(f, 20);
  }, this));
  queue.call("7: test delayed not invoked at 120ms", __bind(function(callbacks) {
    var f;
    f = callbacks.add(__bind(function() {
      return assertFalse("shouldn't be visible at 120ms", this.U.isVisible(this.tEle));
    }, this));
    return window.setTimeout(f, 20);
  }, this));
  return queue.call("8: test delayed invoked at 250ms", __bind(function(callbacks) {
    var f;
    f = callbacks.add(__bind(function() {
      return assertTrue("should be visible by now", this.U.isVisible(this.tEle));
    }, this));
    return window.setTimeout(f, 130);
  }, this));
});