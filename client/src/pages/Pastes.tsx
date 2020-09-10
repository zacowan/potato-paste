import React, { FC, useState, useEffect } from 'react';
import { PageContent, Stack, Card, Heading, Paragraph } from 'bumbag';
import { useCookies } from 'react-cookie';

const Pastes: FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['uid']);

  const generateNum = () => {
    let ret = [];
    for (let i = 0; i < 10; i++) {
      ret.push(i + 1);
    }
    return ret;
  };

  return (
    <PageContent>
      <Stack>
        <Heading>Pastes</Heading>
        <Paragraph>Last 10 pastes from user id {cookies['uid']}.</Paragraph>
        <Stack spacing='major-1'>
          {generateNum().map((num) => (
            <Card key={num} title={num.toString()}>
              Some text
            </Card>
          ))}
        </Stack>
      </Stack>
    </PageContent>
  );
};

export default Pastes;
