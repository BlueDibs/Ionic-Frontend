import { Flex, TextInput, Button, Text } from '@mantine/core';

export function SellForm({ userData }: { userData: any }) {
  return (
    <>
      <Flex direction={'column'} gap={'md'} p={'lg'}>
        <TextInput
          variant="filled"
          label="Market Rate"
          style={{ pointerEvents: 'none' }}
          value={`₹ ${userData.price}`}
        />

        <TextInput
          variant="filled"
          label="Shares Holding"
          style={{ pointerEvents: 'none' }}
          value={`${userData.shares}`}
        />

        {/* <TextInput
          variant="filled"
          label="Total"
          style={{ pointerEvents: 'none' }}
          {...form.getInputProps('amount')}
          value={`₹ ${(form.values.amount || 0) * userData.price}`}
        />

        <TextInput
          type="number"
          variant="filled"
          label="Amount"
          {...form.getInputProps('total')}
          onChange={(e) => {
            form.setValues({
              amount: parseInt(e.target.value),
              total: parseInt(e.target.value) * userData.price,
            });
          }}
        /> */}

        <Flex gap={'xs'}>
          <Text size={'sm'} weight={500}>
            Platform Fees:{' '}
          </Text>

          <Text size={'sm'}> 0.2% </Text>
          <Text size={'sm'} weight={500} ml={'auto'}>
            Balance:{' '}
          </Text>

          <Text size={'sm'}> ₹ 10000 </Text>
        </Flex>
      </Flex>

      <Button
        size="md"
        variant="filled"
        color="red"
        style={{
          bottom: 0,
          position: 'fixed',
          width: '100%',
          borderRadius: 0,
        }}
      >
        Sell
      </Button>
    </>
  );
}
