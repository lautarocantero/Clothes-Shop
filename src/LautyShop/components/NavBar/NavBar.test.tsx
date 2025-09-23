import {render, screen} from '@testing-library/react';
import NavBar from './NavBar';
import { MemoryRouter } from 'react-router-dom';

const linkArray = [
  { linkText: 'Tienda', linkUrl: '/'},
  { linkText: 'Cómo comprar', linkUrl: '/'},
  { linkText: 'Carrito', linkUrl: '/'},
  { linkText: 'Contacto', linkUrl: '/'}
]

describe('test in NavBar Component', () => {

    test('it should match the snapshot', () => {
        const {container} = render(
            <MemoryRouter>
                <NavBar  links={linkArray} /> 
            </MemoryRouter>
        )
        expect(container).toMatchSnapshot();
    })

})