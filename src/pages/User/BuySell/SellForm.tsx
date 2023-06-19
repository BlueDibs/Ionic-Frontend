import { Flex, TextInput, Button, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { sellSharesAPI } from './buySell.api';

export function SellForm({
  userData,
  CharHOC,
}: {
  userData: any;
  CharHOC: any;
}) {
  const sellForm = useForm();
  const sell_shares_mut = useMutation({
    mutationFn: (vals: any) => sellSharesAPI(userData.id, vals),
  });

  return (
    <>
      <div style={{ height: 200 }}>{CharHOC}</div>
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

        <TextInput
          variant="filled"
          label="Total"
          style={{ pointerEvents: 'none' }}
          {...sellForm.getInputProps('total')}
          value={`₹ ${(sellForm.values.amount || 0) * userData.price}`}
        />

        <TextInput
          type="number"
          variant="filled"
          label="Amount"
          {...sellForm.getInputProps('amount')}
          onChange={(e) => {
            sellForm.setValues({
              amount: parseInt(e.target.value),
              total: parseInt(e.target.value) * userData.price,
            });
          }}
        />

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
        onClick={() => sell_shares_mut.mutate(sellForm.values)}
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
