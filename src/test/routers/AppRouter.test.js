import { AppRouter } from '../../routers/AppRouter';
import { mount } from 'enzyme';
import { AuthContext } from '../../auth/authContext';

describe('Pruebas en AppRouter', () => { 
    
    test('Debe mostrarse el login si no está autenticado', () => { 
        const contextValue = {
            user: {
                logged: false
            }
        };
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('LoginScreen');
    });

    test('Debe mostrarse el componente marviel si está autenticado', () => { 
        const contextValue = {
            user: {
                logged: true,
                name: 'Ricardo'
            }
        };
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBe(true);
    });
});