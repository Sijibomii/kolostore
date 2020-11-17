import { Header} from './components/Header'
import {Footer} from './components/Footer'
import {HomeScreen} from './Screens/HomeScreen'
import { CartScreen } from './Screens/CartScreen'
import { CollectionScreen} from './Screens/CollectionScreen'
import { SignupScreen } from './Screens/SignupScreen'
import { LoginScreen } from './Screens/LoginScreen'
import { ProductScreen } from './Screens/ProductScreen'
import { ShippingScreen } from './Screens/ShippingScreen'
import { PlaceOrderScreen } from './Screens/PlaceOrderScreen'
import { ProfileScreen} from './Screens/ProfileScreen'
import {OrderScreen} from './Screens/OrderScreen'
import { loadStripe} from '@stripe/stripe-js'
import { Elements} from '@stripe/react-stripe-js'
import {OrderListScreen } from './Screens/OrderListScreen'
import { UserListScreen } from './Screens/UserListScreen'
import { UserEditScreen } from './Screens/UserEditScreen'
import { ProductListScreen } from './Screens/ProductListScreen'
import { OrderAdminListScreen} from './Screens/OrderAdminListScreen'
import { ProductEditScreen} from './Screens/ProductEditScreen'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const promise= loadStripe('pk_test_rv1sVXCVNaFYVfD7htlXARwx00o8HK8491')
function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
      
      <Elements stripe={promise}>
      <Route path='/order/:id' component={OrderScreen} />
      </Elements>
      <Route path='/admin/orderlist' component={OrderAdminListScreen} />
      <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
      <Route path='/admin/productslist' component={ProductListScreen} />
      <Route path='/admin/user/:id/edit' component={UserEditScreen} />
      <Route path='/admin/userlist' component={UserListScreen} />
      <Route path='/myorders' component={OrderListScreen} />
      <Route path='/profile' component={ProfileScreen} />
      <Route path='/placeorder' component={PlaceOrderScreen} />
      <Route path='/shipping' component={ShippingScreen} />
      <Route path='/product/:id' component={ProductScreen} />
      <Route path='/signup' component={SignupScreen} />
      <Route path='/auth/login' component={LoginScreen} exact/>
      <Route path='/login' component={LoginScreen} exact/>
      <Route path='/collections/:collections' component={CollectionScreen} />
      <Route path='/cart/:id?' component={CartScreen} />
      <Route path="/" component={HomeScreen} exact />  
      
      <Footer />
    </div>
    </Router>
  );
}

export default App;
