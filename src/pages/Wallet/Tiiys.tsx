import {
  Button,
  Divider,
  Flex,
  Paper,
  Stack,
  Table,
  TextInput,
  Text,
} from "@mantine/core";
import { Statement } from "./Statement";
import { IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import { useAppSelector } from "../../store/hooks";

export function Tiiys({ query }: { query: any }) {
  const user = useAppSelector((state) => state.user);

  const tiiysValue = query?.data?.tiiys?.reduce(
    (prev: number, current: any) =>
      prev + current.amount * current.sellerUser.price,
    0
  );

  return (
    <Stack mt={"sm"}>
      <Divider my={"sm"} />
      <Statement label="TIIYS" value={`$ ${tiiysValue}`} />
      <Statement
        label={`Your Equity ${user.userEquity.toFixed(2)}%`}
        value={Math.round(user.shares * (user.userEquity / 100))}
      />
      <Statement
        label="Platform Equity 2.5%"
        value={Math.round(user.shares * 0.025)}
      />
      <Button color="green">Sell Equity</Button>

      <Divider my={"sm"} />
      <Paper>
        <Flex justify={"space-between"}>
          <Text weight={600}>Investors</Text>
          <TextInput
            placeholder="search"
            size="xs"
            icon={<IonIcon icon={searchOutline} />}
          />
        </Flex>
        <Table mt={"sm"}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Held</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {query.data?.tiiys.map((item: any) => (
              <tr>
                <td>{item.buyerUser.username}</td>
                <td>{item.amount}</td>
                <td>{item.amount * item.sellerUser.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
