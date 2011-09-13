for k, v of meths
	r[k] = ((k, v) ->
		->
			clazz = if v.class? then v.class else v
			args = [ k ]
			args = args.concat v.curry if v.curry?
			args.push a for a in arguments
			f = new (c = r.C[clazz])
			c::constructor.apply(f, args)
			f
		)(k, v)
