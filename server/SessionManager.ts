import Session from './Session'

interface SessionManagerInterface {
	create(id: string): Session
	get(id: string): Session
}

type SessionsMap = Map<string, Session>

class SessionManager implements SessionManagerInterface {
	private sessions: SessionsMap = new Map()
	public get(id: string): Session {
		return this.sessions.get(id)
	}
	public create(id: string): Session {
		const session = new Session(id)
		this.sessions.set(id, session)
		return session
	}
}
// singleton
export default new SessionManager()
