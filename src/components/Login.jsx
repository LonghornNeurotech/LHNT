// Login page for LHNT leadership members to login
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const success = await login(password);

      if (success) {
        Swal.fire({
          title: 'Success!',
          text: 'You are authorized',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate('/');
      } else {
        Swal.fire({
          title: 'Authentication Failed',
          text: 'Invalid password',
          icon: 'error',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message || 'An error occurred during authentication',
        icon: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#213C58] min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[40em] mx-[1em] mt-0" style={{borderRadius: '10px'}}>
        <h2 className="text-center text-[2.2rem] font-bold mb-3 heading">Welcome!</h2>
        <h2 className="text-center text-[1.4rem] font-bold mb-6 heading leading-8">Enter the organization password to access your member account.</h2>
        <form onSubmit={handleSubmit} className="mx-auto">
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-xl font-medium text-[#213C58] mb-2 subheading"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-2 py-2 border rounded-lg focus:outline-none ${
                errors.password ? 'border-red-500' : 'border-[#598BBC]'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-md mt-1 subheading">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-lg font-bold text-white text-xl ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-[#598BBC] hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;