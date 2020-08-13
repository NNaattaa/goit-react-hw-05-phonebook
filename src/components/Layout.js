import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 3rem auto;
  max-width: 56rem;
`;

const Layout = ({ children }) => <Container>{children}</Container>;

export default Layout;
