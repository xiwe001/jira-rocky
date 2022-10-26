module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "rocky" && req.body.password === "1") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({ message: "wrong username password." });
    }
  }else if (req.method === "GET" && req.path === "/me") {
    return res.status(200).json({
      user: {
        username:'rocky',
        token: "123",
      },
    });
  }
  next();
};
