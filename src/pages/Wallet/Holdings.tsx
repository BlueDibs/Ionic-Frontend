import { IonIcon } from '@ionic/react';
import {
  Stack,
  Divider,
  Button,
  Paper,
  Flex,
  Text,
  TextInput,
  Table,
} from '@mantine/core';
import { searchOutline } from 'ionicons/icons';
import { Statement } from './Statement';

export function Holdings({ query }: { query: any }) {
  return (
    <Stack mt={'sm'}>
      <Divider my={'sm'} />
      <Statement label="Balance" value={`$ ${query.data?.balance || 0}`} />
      <Statement
        label="Total Investment"
        value={`$ ${query.data?.ttlInvestment || 0}`}
      />
      <Statement
        label="Total Returns"
        value={`$ ${query.data?.ttlReturns || 0}`}
      />
      <Button color="green">Add Money</Button>
      <Divider my={'sm'} />
      <Paper>
        <Flex justify={'space-between'}>
          <Text weight={600}>Current Statistics</Text>
          <TextInput
            placeholder="search"
            size="xs"
            icon={<IonIcon icon={searchOutline} />}
          />
        </Flex>
        <Table mt={'sm'}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Held</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {query.data?.holdings.map((item: any) => (
              <tr>
                <td>{item.sellerUser.username}</td>
                <td>{item.amount}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
