import { Link } from "react-router-dom";
import { RegistrationSchema } from "../../config/authSchema";
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import { ErrorMsg } from "../ErrorMsg/ErrorMsg";
import axios from "axios";

export const RegisterForm = ()=>{
 
  /*
   Tasks : 
    1-create the logIn form
    2-make the access to the form by the login or to register (Dynamic routing)
    3-the error message should be a component
  */

 const {register , handleSubmit , formState } = useForm({
  resolver : yupResolver(RegistrationSchema)
 })
 const onSubmitHandle = async (data)=>{
  const UserData = await axios.post('http://localhost:5000/api/v1/register',data)
  console.log(UserData) 
 }

 return (
  <section className="FormHolder" onSubmit={handleSubmit(onSubmitHandle)} >
   <div className="FormDetails" >
    <div className="FormCenter" >
     <h2 className="TitleRegistraion" >
       Join thousands of learners from around the world  
     </h2>
     <br />
     <p className="Description" >
       Master web development by making real-life projects. There are multiple paths for you to choose
     </p>
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
      <div className="InputFormHolder" >
        <span className="material-symbols-rounded">
         lock
        </span>
       <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" {...register('confirmPassword')} />
      </div>
      {
       formState.errors.confirmPassword?.message && (
        <ErrorMsg error={formState.errors.confirmPassword?.message} />
       )
      }
      <button type="submit" className="SubmitBtn" >
       start coding now
      </button>
    </form>
    <br />
    <div className="HolderAccount" >
     <p className="HolderUserAccount" >
       Already a member? <Link to='/login' className="Link" >Login</Link>
     </p>
    </div>
   </div>
  </section>
 );
}