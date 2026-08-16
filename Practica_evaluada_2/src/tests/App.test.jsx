import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('Pruebas de la Interfaz (Front End)', () => {
    it('Debería renderizar la aplicación correctamente', () => {
        render(<App />);
        const elemento = screen.getByText(/estudiantes/i);
        expect(elemento).toBeDefined();
    });
});