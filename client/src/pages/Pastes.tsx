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
} from 'bumbag';
import { useCookies } from 'react-cookie';

const Pastes: FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['uid']);
  const [pastes, setPastes] = useState<Array<string>>([]);
  const toasts = useToasts();

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
      message: 'Successfully copied paste to clipboard.',
    });
  };

  const selectInput = (id: string) => {
    const input = document.getElementById(id)!;
    input.focus();
    // @ts-ignore
    input.select();
  };

  return (
    <PageContent>
      <Stack>
        <Heading>Pastes</Heading>
        <Paragraph>Last 10 pastes from user id {cookies['uid']}.</Paragraph>
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
      </Stack>
    </PageContent>
  );
};

export default Pastes;
