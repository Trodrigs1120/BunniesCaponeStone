import React, {Component} from 'react';
import Counter from './Counter';

class Product extends Component{
	constructor(props){
		super(props);
        this.state = {
            selectedProduct: {},
            quickViewProduct: {},
            isAdded: false
        }
    }
    addToCart(imgurl, name, price, _id, quantity, contains, weight){
        this.setState({
            selectedProduct: {
                imgurl: imgurl,
                name: name,
                price: price,
                _id: _id,
                quantity: quantity,
                contains: contains,
                weight: weight
            }
        }, function(){
            this.props.addToCart(this.state.selectedProduct);
        })
        this.setState({
            isAdded: true
        }, function(){
            setTimeout(() => {
                this.setState({
                    isAdded: false,
                    selectedProduct: {} 
                });
            }, 3500);
        });
    }
    quickView(imgurl, name, price, _id, contains, weight){
        this.setState({
            quickViewProduct: {
                imgurl: imgurl,
                name: name,
                price: price,
                _id: _id,
                weight: weight,
            }
        }, function(){
            this.props.openModal(this.state.quickViewProduct);
        })
    }
    render(){
        let imgurl = this.props.imgurl;
        let name = this.props.name;
        let price = this.props.price;
        let _id = this.props._id;
        let quantity = this.props.productQuantity;
        let weight = this.props.weight
        let contains = this.props.contains
        return(
            <div className="product">
                <div className="product-imgurl">
                    <img src={imgurl} alt={this.props.name} onClick={this.quickView.bind(this, imgurl, name, price, _id, quantity, weight)}/>
                </div>
                <h4 className="product-name">{this.props.name}</h4>
                <p className="product-price">{this.props.price}</p>
                <p className="product-weight">{this.props.weight}</p>
                <Counter productQuantity={quantity} updateQuantity={this.props.updateQuantity} resetQuantity={this.resetQuantity}/>
                <div className="product-action">
                    <button className={!this.state.isAdded ? "" : "added"} type="button" onClick={this.addToCart.bind(this, imgurl, name, price, _id, quantity, weight, contains)}>{!this.state.isAdded ? "ADD TO CART" : "✔ ADDED"}</button>
                </div>
            </div>
        )
    }
}

export default Product;
