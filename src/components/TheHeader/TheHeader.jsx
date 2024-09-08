// import './TheHeader.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
// nos traemos el UserState
import { UserContext } from '../../context/UserContext/UserState'
// el estilo para el carrito
import { ShoppingCartOutlined } from '@ant-design/icons'

function TheHeader() {
	const navigate = useNavigate()
	// nos traemos esto para acceder la info
	const { token, logout } = useContext(UserContext)

	// método que nos permite cerrar sesión
	// >>> viene del UserState.jsx
	const logoutUser = () => {
		logout()

		// esto para que vuelva a lo que sería la 
		// página de inicio / en blanco
		setTimeout(() => {
			navigate('/')
		}, 2000)
	}

	// TERNARIO que renderiza partes del Header
	// dependiendo de si existe token o no
	// (si hay usuario logeado o no)
	return (
		<nav className="header">
			<h1>Header</h1>
			{token ? (
				<>
					<button onClick={logoutUser}>
						<Link to="/">Logout</Link>
					</button>
					<Link to="/profile">Profile</Link>
					<Link to="/products">Products</Link>
					<Link to="/cart">
						<ShoppingCartOutlined />
					</Link>
				</>
			) : (
				<Link to="/">Login</Link>
			)}
		</nav>
	)
}

export default TheHeader
