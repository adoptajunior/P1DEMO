// PASO 1: createContext 
// PASO 2: useReducer (Hook de React)
import { createContext, useReducer } from 'react'
// Instalar dependencia axios
import axios from 'axios'
// PASO 2: importamos > context/UserContext/UseReducer
import UserReducer from './UserReducer'

// PASO 1: variable para recuperar el token de localStorage
// para que persistan los datos aún con el refresco de la página
// en localStorage hasta que haga log out
const storageToken = JSON.parse(localStorage.getItem('token'))

// PASO 1: contexto de usuario con estado inicial
// + si existe token en localStorage
// que sea el valor inicial de la propiedad token
const initialState = {
	// si hay storageToken / si no hay es null
	token: storageToken ? storageToken : null,
	user: null,
}

// puesto que levantamos en local del backend (el que sea)
const API_URL = 'http://localhost:3001'

// ---
// PASO 2:
// children representa todo el árbol de componentes a partir de App
export const UserProvider = ({ children }) => {
	// state = estado inicial de todo lo que vamos generando en initialState
	// dispatch = representa todas las acciones 
	// >>> que pasamos a traves de UserReducer.jsx
	// >>>>>> el initialState lo pasamos para usarlo como estado (state)
	const [state, dispatch] = useReducer(UserReducer, initialState)
	// primer método: login
	// variable que recupera la petición POST al usuario
	const login = async (user) => {
		// esto lo recuperamos luego en Login.jsx (const onFinish)
		const res = await axios.post(`${API_URL}/users/login`, user)
		// para que nos devuelva los datos del post (usuario)
		dispatch({
			type: 'LOGIN',
			payload: res.data,
		})
		// en caso correcto:
		// seteamos en localStorage lo que nos devuelve
		if (res.data) {
			localStorage.setItem('token', JSON.stringify(res.data.token))
		}
	}

	// SEGUNDA PARTE (35:00)
	// recuperamos otros datos a través del token en localStorage
	// comprobar que sea el mimo usuario
	const getUserInfo = async () => {
		const token = JSON.parse(localStorage.getItem('token'))
		// pasamos la petición por el Header
		// END POINT + token de autorización
		const res = await axios.get(`${API_URL}/users/info`, {
			headers: {
				authorization: token,
			},
			// si es correcto, nos devolverá la info del usuario
		})
		// en segundo lugar realiza una nueva acción
		// para guardar los datos de usuario recogidos en la res de arriba
		dispatch({
			type: 'GET_USER_INFO',
			payload: res.data,
		})
		return res
	}

	// 51:30
	// Logout (cerrar sesión borrando de localStorage etc)
	// En UserReducer se hace la copia ...state para evitar
	// eliminar cosas que nos queramos perder
	const logout = async () => {
		const token = JSON.parse(localStorage.getItem('token'))

		const res = await axios.delete(API_URL + '/users/logout', {
			headers: {
				authorization: token,
			},
		})
		dispatch({
			type: 'LOGOUT',
			payload: res.data,
		}) // despachada la acción
		// si existe respuesta (es correcto) borra token de localStorage
		if (res.data) {
			localStorage.removeItem('token')
		}
	}

	// exportar todos los valores para tenerlos en App
	// para que sean "globales"
	// y lo importamos en App
	return (
		// hacemos accesible la función logout
		// al resto de la App (global)
		// >>> pasando referencia a través del provider
		<UserContext.Provider
			value={{
				token: state.token,
				user: state.user,
				login,
				getUserInfo,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export const UserContext = createContext(initialState)
