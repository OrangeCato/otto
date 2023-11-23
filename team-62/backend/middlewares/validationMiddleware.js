exports.validateInput = (req, res, next) => {
    const { email, password, name } = req.body;
  
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Please provide name, email, and password.' });
    }
  
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }
  
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }
  
    next();
  };
  
  function isValidEmail(email) {
    // Implement a regular expression or library-based email validation here
    // Example using a simple regex for basic email format checking
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  