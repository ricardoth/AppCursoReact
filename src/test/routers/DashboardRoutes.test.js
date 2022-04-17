import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';

describe('Pruebas en Dashboards Routes', () => { 
    const contextValue = {
        user: {
            logged: true,
            name: 'Juanito'
        }
       
    }

    test('Debe mostrarse correctamente - Marvel', () => { 
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={ ['/']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        console.log(wrapper.html())

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim() ).toBe('Juanito');
        expect(wrapper.find('h1').text().trim()).toBe('MarvelScreen');
    });
    
    test('Debe mostrarse correctamente - DC', () => { 
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={ ['/dc']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('DcScreen');
    });
});