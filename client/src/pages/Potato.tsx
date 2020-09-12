import React, { FC, useState, useEffect } from 'react';
import {
  PageContent,
  Stack,
  Card,
  Heading,
  Paragraph,
  Input,
  Button,
  Box,
  useToasts,
  Code,
  Divider,
  Flex,
} from 'bumbag';
import { useParams, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { COOKIE_AGE, POTATO_ID } from '../utils/CookieTypes';

type PotatoParams = {
  potatoId: string;
};

const Pastes: FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies([POTATO_ID]);
  const [pastes, setPastes] = useState<Array<string>>([]);
  const toasts = useToasts();
  const history = useHistory();
  const { potatoId } = useParams<PotatoParams>();

  useEffect(() => {
    setPastes(generateNum());
  }, []);

  const generateNum = () => {
    let ret = [];
    for (let i = 0; i < 10; i++) {
      ret.push((i + 1).toString());
    }
    return ret;
  };

  const copyPaste = (index: number) => {
    navigator.clipboard.writeText(pastes[index]);
    toasts.success({
      showCountdown: false,
      title: 'Copied!',
      message: 'Successfully copied to clipboard.',
    });
  };

  const selectInput = (id: string) => {
    const input = document.getElementById(id)!;
    input.focus();
    // @ts-ignore
    input.select();
  };

  if (!!!cookies[POTATO_ID]) {
    setCookie(POTATO_ID, potatoId, { maxAge: COOKIE_AGE });
  }

  return (
    <PageContent height='100vh'>
      <Stack
        display='flex'
        flexDirection='column'
        position='relative'
        height='100%'
      >
        <Box flexGrow={0} flexShrink={0} flexBasis='auto'>
          <Stack>
            <Button
              palette='primary'
              variant='link'
              onClick={() => history.push('/home')}
            >
              Go home
            </Button>
            <Heading>Pastes</Heading>
            <Paragraph>
              Pastes for potato <Code>{potatoId}</Code>.
            </Paragraph>
            <Stack spacing='minor-2'>
              <Input placeholder='Text to paste...' />
              <Box alignX='right'>
                <Button palette='primary'>Paste</Button>
              </Box>
            </Stack>
            <Divider />
          </Stack>
        </Box>
        <Box flexGrow={1} flexBasis='auto' overflowY='scroll'>
          <Stack spacing='major-1'>
            {pastes.map((paste, index) => (
              <Card key={`${paste}-${index.toString()}`} title={paste}>
                <Stack spacing='minor-2'>
                  <Input
                    id={`${paste}-${index.toString()}-input`}
                    onClick={() =>
                      selectInput(`${paste}-${index.toString()}-input`)
                    }
                    readOnly
                    value={paste}
                  />
                  <Box alignX='right'>
                    <Button onClick={() => copyPaste(index)}>Copy</Button>
                  </Box>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Box>
      </Stack>
    </PageContent>
  );
};

export default Pastes;
