import { NextApiRequest, NextApiResponse } from 'next'
import SessionManager from '../../server/SessionManager'
import { createError, createResponse } from '../../server/Response'
import User from '../../server/User'
import { CreateResponse } from '../../server/API'
import { v4 as generateGUID } from 'uuid'

export default (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		res.status(405)
		return res.json(createError(`Method \`${req.method}\` not allowed.`))
	}

	const { name } = req.body

	const userId = generateGUID()
	const sessionId = generateGUID()

	const session = SessionManager.create(sessionId)
	const user = new User(name, userId)

	session.join(user)

	res.json(
		createResponse<CreateResponse>(`Created room ${sessionId}`, { sessionId, userId })
	)
}
