const kakaoStrategy = require('passport-kakao');

const {User} = require('../models');

module.exports = (passport)=>{
    passport.use(new kakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL:'/auth/kakao/callback',
    },async(accessToken, refreshToken, profile, done)=>{
        try{
            const exUser = await User.findOne({where:{snsId:profile.id, provider: 'kakao'}});
            if(exUser){
                done(null, exUser);
            }else{
                const newUser = await User.create({
                    email: profile._json && profile.kaccount_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider:'kakao',
                });
                done(null, newUser);
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};