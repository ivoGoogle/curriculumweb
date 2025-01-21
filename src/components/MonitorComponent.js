import React from 'react';
import { ScrollView, Window, WindowContent } from 'react95';
import styled from 'styled-components';

// Estilizar el contenedor de fondo para darle apariencia de Windows 98
const Wrapper = styled.div`
  padding: 5rem;
  background: ${({ theme }) => theme.desktopBackground || '#008080'}; /* Fondo clásico verde agua */
`;

// Estilo para el contenido del scroll
const ContentWrapper = styled.div`
  font-family: 'MS Sans Serif', sans-serif; /* Fuente retro */
  font-size: 14px;
  color: #000; /* Texto en negro */
  background-color: #C3C7CB; /* Color de fondo clásico */
  padding: 1rem;
  border: 2px solid #000;
  box-shadow: inset 2px 2px 0px rgba(255, 255, 255, 0.6),
              inset -2px -2px 0px rgba(0, 0, 0, 0.5); /* Efecto de borde 3D */
  z-index: 350; /* Asignar z-index */
  position: relative; /* Asegurarse que el z-index funcione */
`;

export function Default({ style, content }) { 
  return (
    <Window>
      <WindowContent>
        <ScrollView style={{ ...style, width: '600px', height: 'auto', position: 'relative', zIndex: 350 }}> {/* Aplicar z-index */}
          <ContentWrapper>
            {content} {/* Renderizar el contenido pasado como prop */}
          </ContentWrapper>
        </ScrollView>
      </WindowContent>
    </Window>
  );
}

// Configuración para Storybook
const storyConfig = {
  title: 'Layout/ScrollView',
  component: ScrollView,
  decorators: [story => <Wrapper>{story()}</Wrapper>],
};

// Exportar la configuración de la historia
export default storyConfig;

// Nombre de la historia
Default.story = {
  name: 'default',
};
