import { rootReducer } from "../src/app/store";

const deepFreeze = require('deep-freeze');


/*describe('Users reducer tests', () => {

    it('Should return the initial state', () => {
        expect(rootReducer(undefined, {})).toEqual({users: [], isBaby: undefined, aUser: undefined})
    });

    it('Should turn isBaby to true', () => {
        let state = {users: [], isBaby: undefined, aUser: undefined};
        deepFreeze(state);

        expect(rootReducer(state, {
            type: type.UsersActions.SET_TYPE,
            payload: true
        })).toEqual({users: [], isBaby: true, aUser: undefined})
    });

   /* it('Should add a new user to the array of users', () => {
        let state= {users: [], isBaby: undefined, aUser: undefined};
        deepFreeze(state);

        let newUser = {firstname : "Lamin", email: "lamin@gmail.com", password: 'shhh', isBaby: false,   profilePicture: "noimage.png", postaCode: "2400",  };

        expect(usersReducer(state, {
            type: types.UsersActions.ADD_USER,
            payload: newUser
        })).toEqual({users: [{fullname : "Lamin", email: "lamin@gmail.com", password: 'shhh', isBaby: false,  infoAboutUser: "nein", profilePicture: "noimage.png", zipCode: "2400", address:"William boothsvej 17"  }], isBaby: undefined, aUser: undefined})
    })
});
*/