const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const {User} = require('../models');

module.exports = (passport) =>{
    passport.serualizeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=>{
        User.find({where:{id}})
        .then(user=>done(null, users))
        .catch(err=>done(err));
    });

    local(passport);
    kakao(passport);
};