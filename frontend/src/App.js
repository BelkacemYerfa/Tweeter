import './App.css';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import { RegisterForm } from './components/authForm/RegistrationFrom';
import { LoginForm } from './components/authForm/LoginForm';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/registration' element={<RegisterForm />} />
          <Route exact path='/login' element={<LoginForm />} />
          <Route exact path='/:username' element={<Home />}/>
          <Route exact path='/profile/:username' element={<Profile />}/>
          <Route exact path='*' element={()=>{
            return <h1>404</h1>
          }} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
