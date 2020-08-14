import auth0 from '../../utils/auth0';
import UserRepository from '../../repositories/UserRepository'

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {
      redirectTo: '/',
      onUserLoaded: async (req, res, session, state) => {
        const { user } = session

        UserRepository.getOrCreateByEmailAndName(user.email, user.name)

        return session
      }
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}