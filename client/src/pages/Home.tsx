import React, { FC, useState } from 'react';
import { useMutation } from 'react-query';
import {
  PageContent,
  styled,
  Button,
  Stack,
  Box,
  Input,
  Heading,
  Paragraph,
} from 'bumbag';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { COOKIE_AGE, POTATO_ID } from '../utils/CookieTypes';
import { createPotato } from '../api';

const StyledPageContent = styled(PageContent)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Login: FC = () => {
  const [generatePotato, { isLoading }] = useMutation(createPotato);
  const [nickname, setNickname] = useState<string>('');
  const [, setCookie] = useCookies([POTATO_ID]);
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await generatePotato(nickname);
    setCookie(POTATO_ID, res?.id, { maxAge: COOKIE_AGE });
    history.push(`/potatoes/${res?.id}`);
  };

  return (
    <PageContent>
      <Heading>Potato Paste</Heading>
      <Paragraph>
        Potatoes are places where you can save your clipboard and share it with
        your friends. To get started, simply generate your unique potato!
      </Paragraph>
      <StyledPageContent>
        <Stack use='form' onSubmit={handleSubmit}>
          <Input
            value={nickname}
            onChange={(e) => setNickname(e.currentTarget.value)}
            placeholder='Potato nickname...'
          />
          <Box alignX='right'>
            <Button type='submit' isLoading={isLoading} palette='primary'>
              Generate Potato
            </Button>
          </Box>
        </Stack>
      </StyledPageContent>
    </PageContent>
  );
};

export default Login;
