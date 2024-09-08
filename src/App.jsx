// podemos llamar como queramos a Router, mientras luego usemos
// la misma etiqueta en el resto del código
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import 'antd/dist/antd.css'
import Login from './components/Login/Login'
// import Register from './components/Register/Register'
import Profile from './components/Profile/Profile'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'
import TheHeader from './components/TheHeader/TheHeader'
import { UserProvider } from './context/UserContext/UserState'
// FLUJO DE COMPRA
import { ProductsProvider } from './context/ProductsContext/ProductsState'
// damos acceso global desde el árbol de componentes
// PEDIDO
import { OrdersProvider } from './context/OrdersContext/OrdersState'
// ADMIN
import Admin from './components/Admin/Admin'

function App() {
	return (
		<UserProvider>
			<ProductsProvider>
				<OrdersProvider>
					<Router>
						{/* sólo cambiará lo que tenemos dentro de TheHeader */}
						<TheHeader />
						<Routes>
							<Route path="/" element={<Login />} />
							{/* 
						<Route path="/register" element={<Register />} />
						*/}
							<Route path="/profile" element={<Profile />} />
							<Route path="/products" element={<Products />} />
							<Route path="/cart" element={<Cart />} />
							<Route path="/admin" element={<Admin />} />
						</Routes>
					</Router>
				</OrdersProvider>
			</ProductsProvider >
		</UserProvider>
	)
}

export default App
