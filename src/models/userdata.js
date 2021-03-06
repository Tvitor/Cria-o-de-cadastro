// Methods to database
const assert = require("assert");
const User = require("./userschema");

module.exports = {
    
    //Create User
    async createUser(newUser) {
        const user = await User.create(newUser);
        return user;
    },

    //find User
    async findUser(email, password, id){
        if(!password){
            const result = await User.findOne(email).exec();
            return result;
        }else{
            const result = await User.findOne(email).select('+senha');
            return result;
        }
    },

       //Find User by id
        findUserById(id){
        
            return User.findOne({_id:id});
        
    },

    //update login
    updatelastLogin(data, now) {
           User.findOneAndUpdate({ultimo_login:data.ultimo_login},{ultimo_login:now}).then( () =>{
                    User.findOne({_id:data._id}).then((result) => {
                        assert(result.ultimo_login , now);
                        return;
                    })
                    
            });
        
    }

}
