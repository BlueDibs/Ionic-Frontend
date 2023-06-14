import { Flex, Text } from '@mantine/core';

type TStatement = {
  label: string;
  value: string | number;
};

export const Statement = (data: TStatement) => (
  <Flex
    style={{
      padding: '4px 20px',
      borderStyle: 'solid',
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: '8px',
      backgroundColor: 'white',
    }}
    justify={'space-between'}
  >
    <Text weight={700} size={'md'}>
      {data.label}
    </Text>
    <Text weight={500} size={'md'}>
      {data.value}
    </Text>
  </Flex>
);
