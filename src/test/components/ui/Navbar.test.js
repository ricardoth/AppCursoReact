import { mount } from 'enzyme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { Navbar } from '../../../components/ui/NavBar';
import { types } from '../../../types/types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

describe('Pruebas en Navbar', () => { 
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Pedro',
            logged: true,
        }
        
    }
    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={ ['/'] }>
                <Routes>
                    <Route path='/' element={<Navbar />}/>
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('Debe mostrarse correctamente', () => { 
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Pedro');

    });

    test('Debe lamar el logout, llamar navigate y dispatch con argumentos', () => {
        wrapper.find('button').prop('onClick')();

        expect(contextValue.dispatch).toHaveBeenCalledWith({'type': types.logout});

        expect(mockNavigate).toHaveBeenLastCalledWith('/login', { 'replace': true });
        
    });
});