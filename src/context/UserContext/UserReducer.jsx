const users = (state, action) => {
	switch (action.type) {
		// acción login
		case 'LOGIN':
			return {
				// copia de todo lo que tengamos en el estado inicial
				// (toke y user en este caso) initialState en UserState.jsx
				...state,
				// se pasa lo que venga con la res.data > en este caso,
				// recuperando solo el token que es lo que interesa 
				token: action.payload.token,
			}
		case 'GET_USER_INFO':
			return {
				...state,
				// esto viene del UserState
				// sobre escribimos los datos
				// guardado en esta acción todo lo que traiga
				user: action.payload,
			}
		case 'LOGOUT':
			return {
				// copia datos y sobreescribimos sólo lo que
				// que "queramos que deje de aparecer"
				...state,
				user: null,
				token: null,
			}

		default:
			return state
	}
}
// lo exportamos para poder recibirlo en otros componentes
export default users
