import Home from "./pages/Home";
import Product from "./pages/Product";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import AdminProductList from "./Admin/AdminProductList"
import UserList from "./Admin/UserList";
import AddUser from "./Admin/AddUser";
import CreateProduct from "./Admin/CreateProduct";
import authService from "./service/auth.service";
import AdminDashboard from "./Admin/AdminDashboard";
import OrderList from "./Admin/OrderList";
import CategoryList from "./Admin/CategoryList";
import StockReport from "./Admin/StockReport"
import Transactions from "./Admin/Transactions"
import UserProfile from "./pages/UserProfile";
import CheckOut from "./pages/CheckOut";
import RegisterDelivery from "./Admin/RegisterDelivery";
import DevPerList from "./Admin/DevPerList";
import DeliveryorderScreen from "./Delivery/DeliveryorderScreen";

function App() {
  const user = authService.getCurrentUser();
  let admin = false;
  if(user!==null){
    if(user.data.role === "ADMIN"){
      admin = true;
    }
  }
  

  return (
   <>
   <Router>
     <Routes>
     <Route path='/' element={<Home/>} />
     <Route path='/products' element={<ProductList/>} />
     <Route path='/product/detail/:id' element={<Product/>} />
     <Route path='/cart' element={<Cart/>} />
     <Route path="/login" element={user ? <Navigate to="/" /> :<Login />}/>
     <Route path='/register' element={user ? <Navigate to="/" /> :<Register />} />
     <Route path="/userProfile" element={user ?<UserProfile/> : <Navigate to="/"/>   } />
     <Route path="/checkoutPage" element={user ? <CheckOut/>:<Navigate to="/"/>}/>

     
     <Route path='/adminDashboard' element={admin ? <AdminDashboard />:<Home />} />
     <Route path="/userList" element={admin ? <UserList />:<Home />} />
     <Route path="/addUser" element={admin ?<AddUser />:<Home />} />
     <Route path="/adminProductList" element={admin?<AdminProductList />:<Home />} />
     <Route path="/createProduct" element={admin?<CreateProduct />:<Home />} />
     <Route  path="/products/edit/:id" element={admin?<CreateProduct />:<Home />} />
     <Route path="/orderList" element={admin?<OrderList />:<Home />} />
     <Route path="/categoryList" element={admin?<CategoryList />:<Home />} />
     <Route path="/stockReport" element={admin?<StockReport />:<Home />} />
     <Route path="/transactions" element={admin?<Transactions />:<Home />} />
     <Route path="/registerDelivery" element={<RegisterDelivery/>} />
     <Route path="/devPerList" element={<DevPerList/>} />
     <Route path="/deliverOrderScreen" element={<DeliveryorderScreen/>} />
     </Routes>
   </Router>
   
   </>
  );
}

export default App;
