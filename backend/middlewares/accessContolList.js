// const authManager = (req, res, next) => {
//     console.log("role i auth manager",req.user.role);
//     if (req.user.role === 'Manager') {
//         return next();
//     }
//     return res.status(403).json({ msg: 'ACCESS DENIED' })
// }

// // export { DataHolder }



// // export { DataHolder }

// const authUser = (req, res, next) => {
//     // console.log(req.user.role);
//     if (req.user.role === 'User') {
//         return next();
//     }
//     return res.status(403).json({ msg: 'ACCESS DENIED' })
// }

// export { authManager, authAdmin, authUser }

const authAdmin = (req, res, next) => {
    console.log(req.user.role);
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
