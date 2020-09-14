import React, { FC, useState, useEffect } from 'react';
import { useQuery } from 'react-query';
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
  Link,
  Spinner,
} from 'bumbag';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import { COOKIE_AGE, POTATO_ID } from '../utils/CookieTypes';
import { Paste } from '../utils/PasteTypes';
import { getPotato } from '../api';

type PotatoParams = {
  potatoId: string;
};

const DateText = styled(Paragraph)`
  color: #727d90;
`;

const Pastes: FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies([POTATO_ID]);
  const [pastes, setPastes] = useState<Array<Paste>>([]);
  const [inputVal, setInputVal] = useState<string>('');
  const toasts = useToasts();
  const history = useHistory();
  const { potatoId } = useParams<PotatoParams>();

  // Queries
  const { data: potatoData, isLoading: isLoadingPotato } = useQuery(
    ['potato', potatoId],
    getPotato
  );

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPaste();
  };

  const addPaste = () => {
    const newPaste: Paste = {
      id: (Math.random() + Date.now()).toString(),
      value: inputVal,
      createdAt: Date.now(),
    };
    setPastes([newPaste, ...pastes]);
    setInputVal('');
    document.getElementById('pastes-container')?.scrollTo({ top: 0 });
  };

  const copyPaste = (paste: Paste) => {
    navigator.clipboard.writeText(paste.value);
    toasts.success({
      showCountdown: false,
      title: 'Copied!',
      message: 'Successfully copied to clipboard.',
    });
  };

  const selectInput = (paste: Paste) => {
    const input = document.getElementById(`${paste.id}-input`)!;
    input.focus();
    // @ts-ignore
    input.select();
  };

  if (cookies[POTATO_ID] !== potatoId) {
    setCookie(POTATO_ID, potatoId, { maxAge: COOKIE_AGE });
  }

  if (isLoadingPotato) {
    return (
      <PageContent>
        <Spinner alignX='center' size='large' />
      </PageContent>
    );
  }

  return (
    <PageContent height='100vh'>
      <Stack
        display='flex'
        flexDirection='column'
        position='relative'
        height='100%'
      >
        <Link onClick={() => history.push('/home')}>Home</Link>
        <Box flexGrow={0} flexShrink={0} flexBasis='auto'>
          <Stack>
            <Heading>Pastes</Heading>
            <Paragraph>
              Pastes for <Code>{potatoData?.nickname ?? potatoId}</Code> potato.
            </Paragraph>
            <DateText>
              Created{' '}
              {moment(potatoData?.createdAt).format('h:mm a, MM/DD/YYYY')}.
            </DateText>
            <Stack use='form' onSubmit={handleInputSubmit} spacing='minor-2'>
              <Input
                value={inputVal}
                onChange={(e) => setInputVal(e.currentTarget.value)}
                placeholder='Text to paste...'
              />
              <Box alignX='right'>
                <Button type='submit' palette='primary'>
                  Paste
                </Button>
              </Box>
            </Stack>
            <Divider />
          </Stack>
        </Box>
        <Box
          flexGrow={1}
          flexBasis='auto'
          overflowY='scroll'
          scrollBehavior='smooth'
          id='pastes-container'
        >
          <Stack spacing='major-1'>
            {pastes.length > 0 ? (
              pastes.map((paste, index) => (
                <Card key={paste.id}>
                  <Stack spacing='minor-2'>
                    <Input
                      id={`${paste.id}-input`}
                      onClick={() => selectInput(paste)}
                      readOnly
                      value={paste.value}
                    />
                    <Box alignX='right'>
                      <Button onClick={() => copyPaste(paste)}>Copy</Button>
                    </Box>
                    <DateText>
                      {moment(paste.createdAt).format('h:mm:ss a, MM/DD/YYYY')}
                    </DateText>
                  </Stack>
                </Card>
              ))
            ) : (
              <Paragraph style={{ paddingBottom: 5 }}>
                There are no pastes on this potato yet.
              </Paragraph>
            )}
          </Stack>
        </Box>
      </Stack>
    </PageContent>
  );
};

export default Pastes;
