import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
import Product from './components/Product.jsx';
import { CartContextProvider, ShoppingCartContext } from './store/ShoppingCartContext.jsx';

function App() {
    return (
        // NB* The value attr is actually the starting value for the context, the one set in the ShoppingCartContext is set
        // to enable better autocompletion. By setting this value to the state, you link the state to the context api. If you want
        // to be able to edit via the context, add the method pointers to the context
        <CartContextProvider>
            <Header/>
            <Shop>
                { DUMMY_PRODUCTS.map((product) => (
                    <li key={ product.id }>
                        <Product { ...product } />
                    </li>
                )) }
            </Shop>
        </CartContextProvider>
    );
}

export default App;
