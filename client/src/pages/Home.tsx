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
  POTATO_FAVORITE,
  POTATO_HISTORY,
  PotatoHistory,
  FavoritePotato,
} from '../utils/CookieTypes';
import { createPotato } from '../api';

const DateText = styled(Paragraph)`
  color: #727d90;
`;

const Login: FC = () => {
  const [generatePotato, { isLoading }] = useMutation(createPotato);
  const [nickname, setNickname] = useState<string>('');
  const [cookies] = useCookies([POTATO_FAVORITE, POTATO_HISTORY]);
  const history = useHistory();
  const linkProps = BumbagLink.useProps();

  const getPotatoHistory = () => {
    if (cookies[POTATO_HISTORY]) {
      return ([...cookies[POTATO_HISTORY]] as PotatoHistory).sort(
        (a, b) => b.visitedOn - a.visitedOn
      );
    } else {
      return undefined;
    }
  };
  const getFavoritePotato = () => {
    if (cookies[POTATO_FAVORITE]) {
      return cookies[POTATO_FAVORITE] as FavoritePotato;
    } else {
      return undefined;
    }
  };

  // Cookie values
  const favoritePotato = getFavoritePotato();
  const potatoHistory = getPotatoHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await generatePotato(nickname);
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
        <Heading use='h2'>Favorite</Heading>
        {favoritePotato ? (
          <Card title={favoritePotato.nickname} key={favoritePotato.id}>
            <Stack spacing='major-2'>
              <Box textOverflow='ellipsis' overflowX='hidden'>
                <Link {...linkProps} to={`/potatoes/${favoritePotato.id}`}>
                  {favoritePotato.link}
                </Link>
              </Box>
              <DateText>
                {moment(favoritePotato.visitedOn).format('h:mm a, MM/DD/YYYY')}
              </DateText>
            </Stack>
          </Card>
        ) : (
          <Paragraph>
            Looks like you have not set a favorite potato yet. Try selecting a
            potato as your favorite now!
          </Paragraph>
        )}
        <Heading use='h2'>Recently Visited</Heading>
        {potatoHistory ? (
          <Stack spacing='major-1'>
            {potatoHistory.map((hist) => (
              <Card title={hist.nickname} key={hist.id}>
                <Stack spacing='major-2'>
                  <Box textOverflow='ellipsis' overflowX='hidden'>
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
