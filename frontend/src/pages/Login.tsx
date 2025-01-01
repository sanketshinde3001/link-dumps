
export const GitHubLogin = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/github';
  };

  return (
    <button onClick={handleLogin}>
      Login with GitHub
    </button>
  );
};
