import { Flex, Title } from '@mantine/core';
import { useHistory } from 'react-router';

export function HeaderComponent({ title, back }: any) {
  return (
    <Flex justify={'space-between'} px={10}>
      <Title mr={'auto'} weight={400} order={5} onClick={back}>
        Back
      </Title>

      <Title
        left={'50%'}
        pos={'absolute'}
        weight={500}
        order={4}
        style={{
          transform: `translateX(-50%)`,
        }}
      >
        {title}
      </Title>
    </Flex>
  );
}
