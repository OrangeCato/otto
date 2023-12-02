exports.taskValidationMiddleware = (req, res, next) => {
    const { taskname, rating } = req.body;
  
    if (!taskname || !rating) {
      return res.status(400).json({ error: 'Please provide taskname and rating.' });
    }
  
    // Check if rating is a valid number between 1 and 5
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be a number between 1 and 5.' });
    }
  
    next();
  };