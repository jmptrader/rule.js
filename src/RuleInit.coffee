rule = (f) -> rule.U.bind(f, rule)(rule)
rule.domReady = (f) ->	rule.U.domReady rule.U.bind(f, rule)
rule._meta =
	version: '0.1'
	author: 'Rod Vagg <rod@vagg.org> @rvagg'

_yes = 'yes'
_no = 'no'
_fail = 'fail'