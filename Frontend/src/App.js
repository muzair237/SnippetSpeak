import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import PrivateComponent from './Components/PrivateComponent';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import ExploreBlogs from './Components/ExploreBlogs';
import CreateBlog from './Components/CreateBlog';
import Profile from './Components/Profile';
import MyBlogs from './Components/MyBlogs';
import UpdateBlog from './Components/UpdateBlog';
import Footer from './Components/Footer';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ExploreBlogs />} />
            <Route path='/createblog' element={<CreateBlog />} />
            <Route path='/myblogs' element={<MyBlogs />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/updateBlog/:id' element={<UpdateBlog />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} /> 
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
