class Command{
	constructor(name, callback, nArgs, desc){
		this.name = name;
		this.callback = callback;
		this.nArgs = nArgs;
		this.desc = desc
	}
	execute(obj, args){
		return this.callback(obj, ...args);
	}
}

export {Command}