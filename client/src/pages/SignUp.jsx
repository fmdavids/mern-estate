import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError]= useState(null)
  const [loading, setLoading]= useState(false)

  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
    const res = await fetch('/api/auth/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json()
    if(data.success === false){
      setError(data.message)
      return
    }
    setLoading(false)
    setError(null)
    navigate('/sign-in')
  } catch (error) {
    setLoading(false)
    setError(error.message )
  }
};
    
  return (
    <div>
      <h1 className="py-3 text-3xl text-center font-semibold">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-xl mx-auto"
      >
        <input
          onChange={handleChange}
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          onChange={handleChange}
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button
          onChange={handleChange}
          className={`${loading && 'disable opacity-60 hover:backdrop:'}  bg-gray-800 py-3 text-white font-bold fon uppercase hover:opacity-90 transition-all ease-in-out `}
        >{loading? 'loading': 'sign up'}
        </button>
      </form>
      {
error &&
          <p className="text-red-500 text-center py-3">{error}</p>
        }
      <div className="flex gap-4 justify-center">
        <p>Dont have an account</p>
        <Link to="/sign-up">
          <span className="text-blue-500 font-semibold">sigUp</span>
        </Link>
        
      </div>
    </div>
  );
}
