import Auth from '../utils/Auth/index.js'
import { setAuthorization } from './main/client/axiosConfig.js'


export default () => {
  if (Auth.isLoggedIn()) {
    return new Promise(() => {
      setAuthorization(Auth.isLoggedIn().token, Auth.isLoggedIn().refreshToken);
    })
  }
  return new Promise(() => {
  })
}
