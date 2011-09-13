(function() {
  $.rule.domReady(function() {
    this.define('button click', this.on(this.click('#testButton')), this.when(this.hasClass('#testButton', 'toggle')), this["do"](this.toggle('.toggleable')), this["do"](this.show('.showable')), this["do"](this.hide('.hideable')));
    this.define('sub-button click', this.on(this.click('#subButton')), this["do"](this.toggleClass('#testButton', 'toggle')));
    this.define('complex conditions functional test', this.on(this.event('#testElement', 'test:event')), this.when(this.or, this.when(this.and, this.when(this.hasClass('#testElement', 'eventable')), this.when(this.hasClass('#testElement', 'shortcut'))), this.when(this.hasClass('#testElement', 'toggleable'))), this["do"](this.toggle('li, #para')));
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
}).call(this);
