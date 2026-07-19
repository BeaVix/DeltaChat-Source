class Command{
	constructor(name, callback, nArgs){
		this.name = name;
		this.callback = callback;
		this.nArgs = nArgs;
	}
	execute(obj, args){
		return this.callback(obj, ...args);
	}
}

export {Command}