
import { Helmet } from "react-helmet";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";



const Register = () => {
    const [error, setError] = useState('');
    const { createUser } = useContext(AuthContext);
    const handleRegistration = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const photoU = '/user.png';
        const password = form.get('password');
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{6,}$/;

        if (!password.match(passwordRegex)) {
            setError(
                'Password must be at least 6 characters long, contain at least one capital letter, and one special character.'
            );
            return;
        }else{
            setError('');
            createUser(email, password,name,photo)
        }
        

        
        
    }

    return (
        <div >
            <div className="flex justify-center items-center">
            <Helmet>
                <title>Food Unity Exchange | Register</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
                <div className="flex justify-center items-center bg-base-200 flex-col gap-4 my-10 px-36 py-6 rounded-lg">
                    <h1 className="text-3xl">Registration Form</h1>
                    <form onSubmit={handleRegistration} className="flex flex-col gap-2 text-xl">
                        <input className="my-2 border p-2 rounded-lg" type="text" placeholder="name" name="name" required/>
                        <input className="my-2 border p-2 rounded-lg" type="text" placeholder="photo URL" name="photo" required/>
                        <input className="my-2 border p-2 rounded-lg" type="email" placeholder="email" name="email" required/>
                        <input className="my-2 border p-2 rounded-lg" type="password" placeholder="password" name="password" required/>
                        <button className="btn btn-primary" type="submit">Register</button>
                        {error && <p className="text-sm w-[350px] flex flex-wrap" style={{ color: 'red' }}>{error}</p>}
                    </form>
                    <p>Already have an account ? Please <Link to='/login' className="text-blue-400 font-bold">Login</Link>.</p>
                </div>
            </div>

        </div>

    )
}

export default Register