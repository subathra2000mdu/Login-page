import jwt from 'jsonwebtoken';

export const cookieGenerator = (res, user) => {
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none': 'strict',
        maxAge: 7* 24* 60* 60* 1000,
    });
}

export const cookieClear = (res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none': 'strict',
    });
}