import { mount } from 'enzyme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HeroScreen } from '../../../components/hero/HeroScreen';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Pruebas en HeroScreen', () => {  
    test('No debe mostrar el heroscreen si no hay un heroe en la url', () => {  
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path='/hero' element={<HeroScreen/>} />
                    <Route path='/' element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );
        expect(wrapper.find('h1').text().trim()).toBe('No Hero Page');
    });

    test('Debe mostrar un hero si el parametro existe y se encuentra', () => {  
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path='/hero/:heroeId' element={<HeroScreen/>} />
                    <Route path='/' element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );
        expect(wrapper.find('.row').exists()).toBe(true);
    });

    test('Debe regresar a la pantalla anterior', () => { 
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path='/hero/:heroeId' element={<HeroScreen/>} />
                </Routes>
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect(mockNavigate).toHaveBeenCalledWith(-1);
    })

    test('Debe mostrar el no hero page si no tenemos un heroe', () => { 
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider2342423']}>
                <Routes>
                    <Route path='/hero/:heroeId' element={<HeroScreen/>} />
                    <Route path='/' element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect(wrapper.text().trim()).toBe('No Hero Page');
    })
});