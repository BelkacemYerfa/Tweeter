import './App.css';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import { RegisterForm } from './components/authForm/RegistrationFrom';
import { LoginForm } from './components/authForm/LoginForm';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/registration' element={<RegisterForm />} />
          <Route exact path='/login' element={<LoginForm />} />
          <Route exact path='*' element={()=>(
            <h1>
              404 - Page not found
            </h1>
          )} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
