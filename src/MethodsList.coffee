define: 'Root'

on: 'Base'
"do": 'Base'
otherwise: 'Otherwise'
"when": 'When'
validate: 'When'

"and": 'ConditionAnd'
"or": 'ConditionOr'

required: 'ValidatorRequired'
"int": 'ValidatorInteger'
"float": 'ValidatorFloat'

event: 'CustomEvent'
click: 'Event'
change: 'Event'
keyup: 'Event'
classChange: { class: 'Event', curry: [ 'rule:classChange' ] }

show: { class: 'SimpleElementsAction', curry: [ r.U.show ] }
hide: { class: 'SimpleElementsAction', curry: [ r.U.hide ] }
toggle: { class: 'SimpleElementsAction', curry: [ r.U.toggle ] }
addClass: { class: 'SimpleElementsAction', curry: [ r.U.addClass ] }
removeClass: { class: 'SimpleElementsAction', curry: [ r.U.removeClass ] }
toggleClass: { class: 'SimpleElementsAction', curry: [ r.U.toggleClass ] }

run: 'Action'

hasClass: { class: 'SimpleElementsCondition', curry: [ r.U.hasClass ] }
