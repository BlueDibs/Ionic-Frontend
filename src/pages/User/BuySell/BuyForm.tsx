import { Flex, TextInput, Button, Text } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { buySharesAPI } from './buySell.api';
import { useForm } from '@mantine/form';
import { Chart } from '../../../components/Chart';

export function BuyFrom({ userData }: { userData: any }) {
  const buySharesMut = useMutation({
    mutationFn: (vals: any) => buySharesAPI(userData.id, vals),
  });

  const buyForm = useForm();

  return (
    <>
      <div style={{ height: 200 }}>
        <Chart
          data={[
            {
              id: 1,
              data: [{ x: 0, y: 1 }],
            },
            {
              id: 1,
              data: [{ x: 0, y: 2 }],
            },
            {
              id: 1,
              data: [{ x: 0, y: 3 }],
            },
            {
              id: 1,
              data: [{ x: 1, y: 1 }],
            },
          ]}
        />
      </div>
      <Flex direction={'column'} gap={'md'} p={'lg'}>
        <TextInput
          variant="filled"
          label="Market Rate"
          style={{ pointerEvents: 'none' }}
          value={`₹ ${userData.price}`}
        />

        <TextInput
          variant="filled"
          label="Total Shares Allocated"
          style={{ pointerEvents: 'none' }}
          value={`${userData.shares}`}
        />

        <TextInput
          variant="filled"
          label="Shares Available"
          style={{ pointerEvents: 'none' }}
          value={`${userData.shares - (userData.sold || 0)}`}
        />

        <TextInput
          mt={'lg'}
          variant="filled"
          label="Total"
          style={{ pointerEvents: 'none' }}
          {...buyForm.getInputProps('total')}
          value={`₹ ${(buyForm.values.amount || 0) * userData.price}`}
        />

        <TextInput
          type="number"
          variant="filled"
          label="Amount"
          {...buyForm.getInputProps('amount')}
          onChange={(e) => {
            buyForm.setValues({
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
        onClick={(e) => {
          e.preventDefault();
          buySharesMut.mutate(buyForm.values as any);
        }}
        size="md"
        variant="filled"
        color="green"
        style={{
          bottom: 0,
          position: 'fixed',
          width: '100%',
          borderRadius: 0,
        }}
      >
        Buy
      </Button>
    </>
  );
}
