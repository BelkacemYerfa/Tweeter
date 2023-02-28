import { Link } from "react-router-dom";
import { LoginSchema } from "../../config/authSchema";
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import { ErrorMsg } from "../ErrorMsg/ErrorMsg";
import axios from  'axios';

export const LoginForm = () => {

 const {register , handleSubmit , formState } = useForm({
  resolver : yupResolver(LoginSchema)
 })
 const onSubmitHandle = async (data)=>{
  const UserData = await axios.post('http://localhost:5000/api/v1/login',data)
  console.log(UserData)
 }

 return (
  <section className="FormHolder" onSubmit={handleSubmit(onSubmitHandle)} >
   <div className="FormDetails" >
    <div className="FormCenter" >
     <h2 className="TitleRegistraion" >
       Login
     </h2>
    </div>
    <br />
    <form action="" className="Form" >
      <div className="InputFormHolder" >
       <span className="material-symbols-rounded">
        mail
       </span>
       <input type="email" name="email" id="email" placeholder="Email" {...register('email')} />
      </div>
      {
       formState.errors.email?.message && (
        <ErrorMsg error={formState.errors.email?.message} />
       )
      }
      <div className="InputFormHolder" >
        <span className="material-symbols-rounded">
         lock
        </span>
       <input type="password" name="password" id="password" placeholder="Password" {...register('password')} />
      </div>
      {
       formState.errors.password?.message && (
        <ErrorMsg error={ formState.errors.password?.message} />
       )
      }
      <button type="submit" className="SubmitBtn" >
       start coding now
      </button>
    </form>
    <br />
    <div className="HolderAccount" >
     <p className="HolderUserAccount" >
      Don’t have an account yet? <Link to='/registration' className="Link" >Register</Link>
     </p>
    </div>
   </div>
  </section>
 );
}