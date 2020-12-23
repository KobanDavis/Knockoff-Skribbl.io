import User from './User'

interface SessionInterface {
	join(user: User)
}

class Session implements SessionInterface {
	private users: Map<string, User> = new Map()
	constructor(private _id: string) {}

	public join(user: User): void {
		this.users.set(user.id, user)
	}
}

export default Session
