import Head from 'next/head';
import Script from 'next/script';

export default function LoginPage() {
  return (
    <>
      <Head><title>Login - UNIDAR</title></Head>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      <nav className="navbar glass">
        <div className="nav-container">
          <a href="/" className="nav-logo">
            <span style={{ color: 'var(--color-brand)' }}>UNI</span>DAR
          </a>
          <div className="nav-links">
            <a href="/register" className="nav-link" data-i18n="nav_signup">Sign Up</a>
            <a href="/login" className="nav-link active" data-i18n="nav_login">Log In</a>
          </div>
        </div>
      </nav>

      <div className="section" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div className="container" style={{ maxWidth: 450 }}>
          <div className="card fade-in-up">
            <div className="card-header text-center">
              <div className="section-tag" data-i18n="login_welcome">Welcome Back</div>
              <h1 className="mb-xs" data-i18n="login_title">Sign In</h1>
              <p className="text-muted" data-i18n="login_access">Access your UNIDAR account</p>
            </div>
            <div className="card-body">
              <form id="loginForm">
                <div className="form-group">
                  <label className="form-label" htmlFor="email" data-i18n="login_email">Email Address</label>
                  <input type="email" id="email" className="form-input" placeholder="student@university.edu" required />
                </div>
                <div className="form-group">
                  <div className="flex justify-between items-center mb-xs">
                    <label className="form-label" htmlFor="password" style={{ marginBottom: 0 }} data-i18n="login_password">Password</label>
                    <a href="#" className="text-small" data-i18n="login_forgot">Forgot password?</a>
                  </div>
                  <input type="password" id="password" className="form-input" placeholder="••••••••" required />
                </div>
                <div id="errorMessage" className="alert alert-error" style={{ display: 'none' }}></div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <span data-i18n="login_signin">Sign In</span>
                </button>
              </form>
              <div className="text-center" style={{ marginTop: 'var(--space-xl)' }}>
                <p className="text-small text-muted">
                  <span data-i18n="login_no_account">Don't have an account? </span>
                  <a href="/register" style={{ fontWeight: 600 }} data-i18n="login_create">Create Account</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Script id="login-logic" strategy="afterInteractive">{`
        async function checkPreAuth() {
          try {
            const auth = await window.UNIDAR_API.Auth.check();
            if (auth && auth.authenticated) {
               if (auth.user.role === 'admin')  window.location.href = '/admin';
               else if (auth.user.role === 'owner') window.location.href = '/owner-listings';
               else window.location.href = '/user-dashboard';
            }
          } catch(e) {}
        }
        checkPreAuth();

        document.getElementById('loginForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const email    = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const errorDiv = document.getElementById('errorMessage');
          const btn      = e.target.querySelector('button[type="submit"]');
          errorDiv.style.display = 'none';
          btn.disabled = true;
          btn.querySelector('span').textContent = 'Signing in…';
          try {
            const res = await window.UNIDAR_API.Auth.login(email, password);
            if (res.user.role === 'admin')  window.location.href = '/admin';
            else if (res.user.role === 'owner') window.location.href = '/owner-listings';
            else window.location.href = '/user-dashboard';
          } catch (err) {
            errorDiv.textContent = err.message || 'Login failed';
            errorDiv.style.display = 'block';
            btn.disabled = false;
            btn.querySelector('span').textContent = 'Sign In';
          }
        });
      `}</Script>
    </>
  );
}
