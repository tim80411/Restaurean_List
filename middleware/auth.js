module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('error_message', 'Please sign in before browsing')
    res.redirect('/users/login')
  }
}