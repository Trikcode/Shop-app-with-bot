import React, { Component } from 'react'
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Login from './components/Login'
import ProductList from './components/ProductList'
import AddProduct from './components/AddProduct'
import Cart from './components/Cart'
import data from './Data'
import Context from './Context'
import ChatbotComponent from './ChartBot'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      cart: {},
      products: [],
      showChatbot: false,
    }

    this.routerRef = React.createRef()
    this.chatbotRef = React.createRef()
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }

  handleClickOutside = (event) => {
    if (
      this.chatbotRef.current &&
      !this.chatbotRef.current.contains(event.target)
    ) {
      this.setState({ showChatbot: false })
    }
  }

  toggleChatbot = () => {
    this.setState((prevState) => ({
      showChatbot: !prevState.showChatbot,
    }))
  }

  login = (usn, pwd) => {
    let user = data.users.find((u) => u.username === usn && u.password === pwd)
    if (user) {
      this.setState({ user })
      localStorage.setItem('user', JSON.stringify(user))
      return true
    }
    return false
  }

  logout = (e) => {
    e.preventDefault()
    this.setState({ user: null })
    localStorage.removeItem('user')
  }

  addProduct = (product, callback) => {
    let products = this.state.products.slice()
    products.push(product)
    localStorage.setItem('products', JSON.stringify(products))
    this.setState({ products }, () => callback && callback())
  }

  addToCart = (cartItem) => {
    let cart = this.state.cart
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount
    } else {
      cart[cartItem.id] = cartItem
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    this.setState({ cart })
  }

  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push('/login')
      return
    }
    const cart = this.state.cart
    const products = this.state.products.map((p) => {
      if (cart[p.name]) {
        p.stock = p.stock - cart[p.name].amount
      }
      return p
    })
    this.setState({ products })
    this.clearCart()
  }

  removeFromCart = (cartItemId) => {
    let cart = this.state.cart
    delete cart[cartItemId]
    localStorage.setItem('cart', JSON.stringify(cart))
    this.setState({ cart })
  }

  clearCart = () => {
    let cart = {}
    localStorage.setItem('cart', JSON.stringify(cart))
    this.setState({ cart })
  }

  componentDidMount() {
    let products = localStorage.getItem('products')
    let cart = localStorage.getItem('cart')
    let user = localStorage.getItem('user')
    products = products ? JSON.parse(products) : data.initProducts
    cart = cart ? JSON.parse(cart) : {}
    user = user ? JSON.parse(user) : null
    this.setState({ products, user, cart })
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout,
        }}
      >
        <Router ref={this.routerRef}>
          <div className='App'>
            <nav
              className='navbar container'
              role='navigation'
              aria-label='main navigation'
            >
              <div className='navbar-brand'>
                <b className='navbar-item is-size-4 '>WiseKit</b>

                <a
                  href='/'
                  role='button'
                  className='navbar-burger burger'
                  aria-label='menu'
                  aria-expanded='false'
                  data-target='navbarBasicExample'
                  onClick={(e) => {
                    e.preventDefault()
                    this.setState({ showMenu: !this.state.showMenu })
                  }}
                >
                  <span aria-hidden='true'></span>
                  <span aria-hidden='true'></span>
                  <span aria-hidden='true'></span>
                </a>
              </div>
              <div
                className={`navbar-menu ${
                  this.state.showMenu ? 'is-active' : ''
                }`}
              >
                <Link to='/products' className='navbar-item'>
                  Products
                </Link>
                {this.state.user && this.state.user.accessLevel < 1 && (
                  <Link to='/add-product' className='navbar-item'>
                    Add Product
                  </Link>
                )}
                <Link to='/cart' className='navbar-item'>
                  Cart
                  <span
                    className='tag is-primary'
                    style={{ marginLeft: '5px' }}
                  >
                    {Object.keys(this.state.cart).length}
                  </span>
                </Link>
                {!this.state.user ? (
                  <Link to='/login' className='navbar-item'>
                    Login
                  </Link>
                ) : (
                  <a href='/' className='navbar-item' onClick={this.logout}>
                    Logout
                  </a>
                )}
              </div>
            </nav>

            <Switch>
              <Route exact path='/' component={ProductList} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/cart' component={Cart} />
              <Route exact path='/add-product' component={AddProduct} />
              <Route exact path='/products' component={ProductList} />
            </Switch>

            <div
              className='chatbot-icon'
              onClick={this.toggleChatbot}
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: '999',
              }}
            >
              {/* 'https://res.cloudinary.com/dam1ynce2/image/upload/v1700746792/bot_upykwt.png */}
              <img
                src='https://res.cloudinary.com/dam1ynce2/image/upload/v1700746792/bot_upykwt.png'
                alt='chatbot'
                width='100px'
                height='100px'
                style={{
                  objectFit: 'contain',
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>
          {this.state.showChatbot && (
            <div
              className='chatbot-container'
              ref={this.chatbotRef}
              style={{
                position: 'fixed',
                bottom: '120px',
                right: '0',
                width: '300px',
                height: '400px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                zIndex: '999',
              }}
            >
              <ChatbotComponent />
            </div>
          )}
        </Router>
      </Context.Provider>
    )
  }
}
