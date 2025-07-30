import jwt from "jsonwebtoken"

const verifyUser = (req, res, next) => {
  if (!(req.session.token)) {
    return res.json({
      data: null,
      message: "please login"
    })
  }

  let token = req.session.token;
  let tokenData = jwt.verify(token, process.env.JWT_SECRET)

  if (!tokenData) {
    return res.json({
      data: null,
      message: "something went wrong"
    })
  }
  req.userId = tokenData._id
  next()
}

export default verifyUser;