import React, { FC, useState } from 'react';
import { PageContent, styled, Button, Stack, Box } from 'bumbag';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { COOKIE_AGE, POTATO_ID } from '../utils/CookieTypes';

const StyledPageContent = styled(PageContent)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Login: FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies([POTATO_ID]);
  const history = useHistory();

  const handleGeneratePotato = () => {
    const generated = { id: 'asdf1234' };
    setCookie(POTATO_ID, generated.id, { maxAge: COOKIE_AGE });
    history.push(`/potatoes/${generated.id}`);
  };

  return (
    <StyledPageContent>
      <Box alignX='center'>
        <Button onClick={handleGeneratePotato} palette='primary'>
          Generate Potato
        </Button>
      </Box>
    </StyledPageContent>
  );
};

export default Login;
