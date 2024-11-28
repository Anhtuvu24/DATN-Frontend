import React from 'react';

// Styles
import { MainLayoutWrapper } from './local.styles';

function MainLayout({ children  }) {
    return (
        <MainLayoutWrapper>
            {children }
        </MainLayoutWrapper>
    );
}

export default MainLayout