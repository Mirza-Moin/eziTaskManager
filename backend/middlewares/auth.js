import  jwt  from "jsonwebtoken";
export const isAuthenticated = async(req,res,next)=>{

    const { headers } = req;
    // console.log(headers.authorization)
    const accessToken = headers.authorization.split(' ')[1];
    if (!accessToken) {
        return res.status(400).json({ msg: 'Bearer Token is required.' });
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decoded.user;
        
        // console.log(req.user.role)
        // console.log('running while requesting')
        return next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            console.log('Token Expired');
            return res.status(401).json({ msg: 'Token has expired.' });
        }
        if (err.name === 'JsonWebTokenError') {
            console.log('JSON Web Token Error');
            return res.status(401).json({ msg: err.message });
        }
        console.log('Error');
        return res.status(401).json({ msg: err.message });
    }
   
}