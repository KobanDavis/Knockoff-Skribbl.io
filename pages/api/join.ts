import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as generateGUID } from 'uuid'
import SessionManager from '../../server/SessionManager'
import { createError, createResponse } from '../../server/Response'
import User from '../../server/User'
import { JoinResponse } from '../../server/API'

export default (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		res.status(405)
		return res.json(createError(`Method \`${req.method}\` not allowed.`))
	}

	const { id, name } = req.body
	console.log(id, name)
	if (typeof id !== 'string') {
		res.status(400)
		return res.json(createError('Failed to join: field `id` is missing or is not a string.'))
	}

	const session = SessionManager.get(id)

	if (!session) {
		res.status(400)
		return res.json(createError('Failed to join: session does not exist.'))
	} else {
		const userId = generateGUID()
		const user = new User(name, userId)
		session.join(user)
		res.json(
			createResponse<JoinResponse>(`Joined room ${id}`, { sessionId: id, userId })
		)
	}
}
