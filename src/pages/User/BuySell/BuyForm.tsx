import { Flex, TextInput, Button, Text } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { buySharesAPI } from './buySell.api';
import { useForm } from '@mantine/form';
import { Chart } from '../../../components/Chart';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { BuyConfirmation } from '../../Wallet/BuyConfirmaation';

export function BuyFrom({
  userData,
  CharHOC,
}: {
  userData: any;
  CharHOC: any;
}) {
  const [confirm, setConfirm] = useState(false);
  const buySharesMut = useMutation({
    mutationFn: (vals: any) => buySharesAPI(userData.id, vals),
  });

  const buyForm = useForm({
    validate: {
      amount: (val) => {
        if (!val) return 'Amount must not be empty';
      },
    },
  });

  console.log(buyForm.errors);

  return (
    <form onSubmit={buyForm.onSubmit(() => setConfirm(true))}>
      <BuyConfirmation
        isOpen={confirm}
        txn={() => buySharesMut.mutate(buyForm.values)}
        onWillDismiss={() => setConfirm(false)}
        data={{
          share_amont: buyForm.values.amount,
          share_price: userData.price,
          total_amount:
            userData.price * parseInt(buyForm.values.amount as string),
          txn_fee:
            (userData.price * parseInt(buyForm.values.amount as string) * 0.2) /
            100,
        }}
      />
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
        type="submit"
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
    </form>
  );
}
