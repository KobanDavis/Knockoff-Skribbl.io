interface UserInterface {
	id: string
	getName(): string
}

class User implements UserInterface {
	constructor(private _name: string, public id: string) {}

	public getName(): string {
		return this._name
	}
}

export default User
