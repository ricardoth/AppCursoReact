import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => { 
    test('Debe retornar el estado por defecto', () => { 
        const state = authReducer({logged: false}, {});
        expect(state).toEqual({logged: false});
    })

    test('Debe autenticar y colocar el name del usuario', () => { 
        const action = {
            type: types.login,
            payload: {
                name: 'Ricardo'
            }
        }

        const state = authReducer({logged: false}, action);
        expect(state).toEqual({
            logged: true,
            name: 'Ricardo'
        });
    })

    test('Debe borrar el nombre del usuario y logged false', () => { 
        const action = {
            type: types.logout,
        }

        const state = authReducer({logged: true, name: 'Ricardo'}, action);
        expect(state).toEqual({
            logged: false
        });
    })
})