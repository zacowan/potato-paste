import React, { FC, useState } from 'react';
import { useMutation } from 'react-query';
import {
  PageContent,
  Button,
  Stack,
  Box,
  Input,
  Heading,
  Paragraph,
  Divider,
  Card,
  Link as BumbagLink,
} from 'bumbag';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  COOKIE_AGE,
  POTATO_ID,
  POTATO_HISTORY,
  PotatoHistory,
} from '../utils/CookieTypes';
import { createPotato } from '../api';

const DateText = styled(Paragraph)`
  color: #727d90;
`;

const Login: FC = () => {
  const [generatePotato, { isLoading }] = useMutation(createPotato);
  const [nickname, setNickname] = useState<string>('');
  const [cookies, setCookie] = useCookies([POTATO_ID, POTATO_HISTORY]);
  const history = useHistory();
  const linkProps = BumbagLink.useProps();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await generatePotato(nickname);
    setCookie(POTATO_ID, res?.id, { maxAge: COOKIE_AGE });
    history.push(`/potatoes/${res?.id}`);
  };

  return (
    <PageContent>
      <Stack>
        <Heading>Potato Paste</Heading>
        <Paragraph>
          Potatoes are places where you can save your clipboard and share it
          with your friends. To get started, simply generate your unique potato!
        </Paragraph>
        <Stack spacing='minor-2' use='form' onSubmit={handleSubmit}>
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
        <Divider />
        <Heading use='h2'>Recently Visited</Heading>
        {cookies[POTATO_HISTORY] ? (
          <Stack spacing='major-1'>
            {[...(cookies[POTATO_HISTORY] as PotatoHistory)]
              .sort((a, b) => b.visitedOn - a.visitedOn)
              .map((hist) => (
                <Card title={hist.nickname} key={hist.id}>
                  <Stack spacing='major-2'>
                    <Box>
                      <Link {...linkProps} to={`/potatoes/${hist.id}`}>
                        {hist.link}
                      </Link>
                    </Box>
                    <DateText>
                      {moment(hist.visitedOn).format('h:mm a, MM/DD/YYYY')}
                    </DateText>
                  </Stack>
                </Card>
              ))}
          </Stack>
        ) : (
          <Paragraph>
            Looks like you have not visited any potatoes recently.
          </Paragraph>
        )}
      </Stack>
    </PageContent>
  );
};

export default Login;
