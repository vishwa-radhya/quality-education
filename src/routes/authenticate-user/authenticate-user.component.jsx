import  { useState } from 'react';
import './authenticate-user.styles.scss';

const AuthenticateUser = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    organization: '',
  });

  const organizations = [
    { id: 1, name: 'Organization A' },
    { id: 2, name: 'Organization B' },
    { id: 3, name: 'Organization C' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Form submitted:', { isAdmin, authMode, ...formData });
    if(isAdmin){
      handleAdminSignIn()
    }else{
      if(authMode==='create'){
          handleCreateUser()
      }else if(authMode==='login'){
          handleSignInUser()
      }
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'create' : 'login');
    setFormData({
      email: '',
      password: '',
      username: '',
      organization: '',
    });
  };

  const handleCreateUser=()=>{
    console.log('call create user')
  }

  const handleSignInUser=()=>{
    console.log('call sign in user')
  }

  const handleAdminSignIn=()=>{
    console.log('call admin sign in')
  }

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>Authentication</h1>
        
        <div className="auth-switch">
          <button
            className={!isAdmin ? 'active' : ''}
            onClick={() => setIsAdmin(false)}
          >
            User
          </button>
          <button
            className={isAdmin ? 'active' : ''}
            onClick={() => setIsAdmin(true)}
          >
            Admin
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-fields">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isAdmin && authMode === 'create' && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {(isAdmin || (!isAdmin && authMode === 'create')) && (
            <div className="form-group">
              <label htmlFor="organization">Organization</label>
              <select
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                required
              >
                <option value="">Select Organization</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">
          {authMode === 'login' ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      {!isAdmin && (
        <div className="auth-toggle">
          <button onClick={toggleAuthMode} className="toggle-button">
            {authMode === 'login'
              ? "Don't have an account? Create one"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthenticateUser;