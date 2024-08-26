export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Set httpOnly to true
  };

  //This line sends the response back to the client
  //Sets a cookie named "token" in the client's browser with the JWT as its value. The options defined earlier are applied to this cookie (e.g., expiration, httpOnly).
  //json({ ... }): Sends a JSON response containing the following properties:

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
