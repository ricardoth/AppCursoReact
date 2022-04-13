import {mount} from 'enzyme';
import {MemoryRouter, useNavigate} from 'react-router-dom';
import {SearchScreen} from '../../../components/search/SearchScreen';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Pruebas en Search', () => { 
    test('debe mostrarse correctamente con los valores por defecto ', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect(wrapper.find('.alert-info').text().trim()).toBe('Buscar un héroe')
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe mostrar a batman y el input con el valor de queroString', () => { 
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect(wrapper.find('input').prop('value')).toBe('batman')
        expect(wrapper).toMatchSnapshot();

    });

    test('Mostrar un error si no existe el hero', () => { 
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect(wrapper.find('.alert-danger').text().trim()).toBe('No hay resultados: batman123');
        expect(wrapper).toMatchSnapshot();

    });


    test('Debe llamar al navigate a la nueva pantalla', () => { 
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target:{ 
                name: 'searchText',
                value: 'batman'
            }   
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })
        
        expect(mockNavigate).toHaveBeenCalledWith('?q=batman');
    });
})