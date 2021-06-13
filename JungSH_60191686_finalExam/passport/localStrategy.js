// Import Modules
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Import Models
const User = require('../models/user');

// setting local strategy
module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
    }, async (id, password, done) => {
        console.log(id, password);
        try {
            const exUser = await User.findOne({ where: { userID: id }});
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { message: '가입하지 않은 사용자입니다.' });
            }
        } catch(error) {
            console.error(error);
            done(error);
        }
    }));
};