import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { Helmet } from "react-helmet";



const Login = () => {
    
    const { login,googleSignIn,error } = useContext(AuthContext);
    const handleLogin = async(e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');
        login(email,password)
    }
    const handleGoogleSignIn =()=>{
        googleSignIn();
    }

    return (
        <div>
            <Helmet>
                <title>Food Unity Exchange | Login</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Please Login to view the services of Food Unity Exchange.</p>
                        
                        <button className="btn , btn-primary" onClick={handleGoogleSignIn}>Login with Google</button>
                        
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" name="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" name="password" className="input input-bordered" />
                                    {error? <p className="text-red-600 font-semibold">{error}</p>:''}
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            <p>Don't Have an account ? Please <Link to='/register' className="text-blue-400 font-bold">Register</Link>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login