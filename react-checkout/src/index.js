import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';
import Header from './components/Header';
import Products from './components/Products';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import QuickView from './components/QuickView';
import './scss/style.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends Component{
	constructor(){
		super();
		this.state = {
			products: [],
			cart: [],
			totalItems: 0,
			totalAmount: 0, 
			term: '',
			category: '',
			cartBounce: false,
			quantity : 1,
			quickViewProduct: {},
			modalActive: false,
			checkingOut: false
		};

		this.handleAddToCart = this.handleAddToCart.bind(this);
		this.sumTotalItems = this.sumTotalItems.bind(this);
		this.sumTotalAmount = this.sumTotalAmount.bind(this);
		this.checkProduct = this.checkProduct.bind(this);
		this.updateQuantity = this.updateQuantity.bind(this);
		this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	// Fetch Initial Set of Products from external API
	getProducts(){
		//For Localhost use the below url
		const url = "src/products.json";

		axios.get(url)
			.then(response => {
				this.setState({
					products : response.data
				})
			})
	}
	componentWillMount(){
		this.getProducts();

	}

	// // Search by Keyword
	// handleSearch(event){
	// 	this.setState({term: event.target.value});
	// }
	// // Mobile Search Reset
	// handleMobileSearch(){
	// 	this.setState({term: ""});
	// }
	// // Filter by Category
	// handleCategory(event){
	// 	this.setState({category: event.target.value});
	// 	console.log(this.state.category);
	// }
	
	// Add to Cart
	handleAddToCart(selectedProducts){
		let cartItem = this.state.cart;
		let productID = selectedProducts._id;
		let productQty = selectedProducts.quantity;
		if(this.checkProduct(productID)){
			console.log('hi' + productID);
			let index = cartItem.findIndex((x => x._id == productID));
			console.log(index);
			cartItem[index].quantity = Number(cartItem[index].quantity) + Number(productQty);
			this.setState({
				cart: cartItem
			})
		} else {
			cartItem.push(selectedProducts);
			console.log('not working');
		}
		this.setState({
			cart : cartItem,
			cartBounce: true,
		});
		setTimeout(function(){
			this.setState({
				cartBounce:false,
				quantity: 1
			});
			console.log(this.state.quantity);
			console.log(this.state.cart);
    }.bind(this),1000);  
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
	}
	handleRemoveProduct(_id, e){
		let cart = this.state.cart;
		let index = cart.findIndex((x => x._id == _id));
		cart.splice(index, 1);
		this.setState({
			cart: cart
		})
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
		e.preventDefault();
	}
	checkProduct(productID){
		let cart = this.state.cart;
		return cart.some(function(item) {
			return item._id === productID;
		}); 
	}
	sumTotalItems(){
        let total = 0;
        let cart = this.state.cart;
		total = cart.length;
		this.setState({
			totalItems: total
		})
    }
	sumTotalAmount(){
        let total = 0;
        let cart = this.state.cart;
        for (var i=0; i<cart.length; i++) {
            total += cart[i].price * parseInt(cart[i].quantity, 4);
        }
		this.setState({
			totalAmount: total
		})
    }

	//Reset Quantity
	updateQuantity(qty){
		console.log("quantity added...")
		this.setState({
				quantity: qty
		})
	}
	// Open Modal
	openModal(product){
		this.setState({
			quickViewProduct: product,
			modalActive: true
		})
	}
	// Close Modal
	closeModal(){
		this.setState({
			modalActive: false
		})
	}

	handleClick() {
		let done = this.state.checkingOut
		this.setState({
		checkingOut: true
		})
		alert(done);

}
	render(){
	
		return(

			<div className="container">
				<Header
					cartBounce={this.state.cartBounce}
					total={this.state.totalAmount}
					totalItems={this.state.totalItems}
					cartItems={this.state.cart}
					removeProduct={this.handleRemoveProduct}
					// handleSearch={this.handleSearch}
					// handleMobileSearch={this.handleMobileSearch}
					// handleCategory={this.handleCategory}
					// categoryTerm={this.state.category}
					updateQuantity={this.updateQuantity}
					productQuantity={this.state.moq}
					handleClick={this.handleClick}
				/>
				<Products
					productsList={this.state.products}
					searchTerm={this.state.term}
					addToCart={this.handleAddToCart}
					productQuantity={this.state.quantity}
					updateQuantity={this.updateQuantity}
					openModal={this.openModal}
				/>
				<Footer />
		

			</div>
		)
	}
}


ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))