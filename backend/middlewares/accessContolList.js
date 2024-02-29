const authManager = (req, res, next) => {
    console.log(req.user.role);
    if (req.user.role === 'Manager') {
        return next();
    }
    return res.status(403).json({ msg: 'ACCESS DENIED' })
}

// export { DataHolder }

const authAdmin = (req, res, next) => {
    console.log(req.user.role);
    if (req.user.role === 'Admin') {
        return next();
    }
    return res.status(403).json({ msg: 'ACCESS DENIED' })
}

// export { DataHolder }

const authUser = (req, res, next) => {
    console.log(req.user.role);
    if (req.user.role === 'User') {
        return next();
    }
    return res.status(403).json({ msg: 'ACCESS DENIED' })
}

export { authManager, authAdmin, authUser }