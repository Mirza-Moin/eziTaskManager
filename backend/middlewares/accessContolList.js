

const authAdmin = (req, res, next) => {
    // console.log(req.user.role);
    if (req.user.role === 'Admin') {
        return next();
    }
    return res.status(403).json({ msg: 'ACCESS DENIED' })
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

  export {authAdmin, authGetAllTasks, authUpdateTask}
