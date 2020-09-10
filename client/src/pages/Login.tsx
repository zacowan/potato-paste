import React, { FC, useState } from 'react';
import { PageContent, Input, styled, Button, Stack, Box } from 'bumbag';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const StyledPageContent = styled(PageContent)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Login: FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['uid']);
  const [uid, setUid] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    setCookie('uid', uid, { maxAge: 60 * 60 * 24 });
    history.push(`/${uid}/pastes`);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <StyledPageContent>
      <Stack>
        <form onSubmit={handleSubmit}>
          <Input
            value={uid}
            onChange={(e) => setUid(e.currentTarget.value)}
            placeholder='Enter your user id...'
          />
        </form>
        <Box alignX='right'>
          <Button onClick={handleLogin} palette='primary'>
            Continue
          </Button>
        </Box>
      </Stack>
    </StyledPageContent>
  );
};

export default Login;
