// Login page for LHNT leadership members to login
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/useAuth';
import EyeToggle from '../components/EyeToggle';

const Login = () => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const headline = 'Welcome!';
  const subtitle = 'Enter your full name and the organization password to access your member account.';

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
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

      const success = await login({ fullName, password });

      if (success) {
        Swal.fire({
          title: 'Success!',
          text: 'You are authorized',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate('/member');
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
    <div className="bg-prussian_blue min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[40em] mx-[1em] mt-0" style={{borderRadius: '10px'}}>
        <h2 className="text-prussian_blue text-4xl text-center font-bold mb-3 heading font-antonio">{headline}</h2>
        <h2 className=" text-prussian_blue text-xl text-center font-bold mb-8 leading-7 font-antonio">{subtitle}</h2>
        <form onSubmit={handleSubmit} className="mx-auto">
          {/* Full Name Field */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-prussian_blue font-semibold text-lg mb-2 font-antonio">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name (e.g., Jane Q. Doe)"
              autoComplete="name"
              className={`w-full h-11 px-3 rounded-lg text-lg focus:outline-none ${
                errors.fullName ? 'border-red-600 border-2' : 'border-silver_lake_blue border-2'
              }`}
            />
            {errors.fullName && (
              <p className="text-red-600 mt-1 font-semibold text-sm font-antonio">{errors.fullName}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-xl font-medium text-prussian_blue mb-2 subheading"
            >
              Password
            </label>
            <div
              style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the organization password"
                autoComplete="current-password"
                className={`w-full h-11 px-3 rounded-lg text-lg focus:outline-none ${
                  errors.password ? 'border-red-600 border-2' : 'border-silver_lake_blue border-2'
                }`}
                style={{
                  height: '44px',
                  fontSize: '1.15rem',
                  paddingLeft: '0.75em',
                  paddingRight: '2.5em',
                  minWidth: 0,
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  right: '0.75em',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <EyeToggle
                  visible={showPassword}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </span>
            </div>
            {errors.password && (
              <p className="text-red-600 mt-1 font-semibold text-sm font-antonio">{errors.password}</p>
            )}
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-lg font-bold text-bone_white text-xl ${
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