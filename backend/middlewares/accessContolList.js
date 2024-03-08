

const authAdmin = (req, res, next) => {
    if (req.user.role === 'Admin') {
        return next();
    }
    return res.status(403).json({ msg: 'ACCESS DENIED' })
}

const authUser = (req,res,next) =>{
  if(req.user.role === "User"){
    return next();
  }
  return res.status(404).json({success: false, message:"only user can add feedback..."})
}

const authGetAllTasks = (req,res,next)=>{
      
      if((req.user.role === "User") || (req.user.role === "Admin") || (req.user.role === "Manager") ){
        return next();
      }
      return res.status(403).json({ msg: 'ACCESS DENIED' })
}
const authUpdateTask = (req,res,next)=>{
    if((req.user.role === "Admin") || (req.user.role === "Manager") ){
      return next();
    }
    return res.status(403).json({ msg: 'ACCESS DENIED' })
}

  export {authAdmin, authGetAllTasks, authUpdateTask, authUser}
