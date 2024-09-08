import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext/UserState'

const Profile = () => {
	// importado del contexto global a través de UserContext
	const { getUserInfo, user } = useContext(UserContext)

	useEffect(() => {
		// cuando se monta el componente recibe esta acción
		// haciendo la petición a ese END POINT
		getUserInfo()
	}, [])

	// Ternaria > si el usuario no es null
	// pinta un h1 
	// al identifica al usuario (token) nos muestra la info
	// navegador > Componentes > UserProvider > hooks...
	return <>{user ? <h1>Profile {user.name}</h1> : <p>Loading...</p>}</>
}
export default Profile
