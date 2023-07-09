import { Flex, TextInput, Button, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { sellSharesAPI } from "./buySell.api";
import { useState } from "react";
import { SellConfirmation } from "../../Wallet/Sell Confirmaation";

export function SellForm({
  userData,
  CharHOC,
  closeModal,
}: {
  userData: any;
  CharHOC: any;
  closeModal: () => void;
}) {
  const [confirm, setConfirm] = useState(false);
  const sellForm = useForm({
    validate: {
      amount: (vals) => (!vals ? "Amont but not be empty" : null),
    },
  });

  const sell_shares_mut = useMutation({
    mutationFn: (vals: any) => sellSharesAPI(userData.id, vals),

    onSuccess() {
      closeModal();
    },
  });

  return (
    <form onSubmit={sellForm.onSubmit((vals) => setConfirm(true))}>
      <SellConfirmation
        txn={() => sell_shares_mut.mutate(sellForm.values)}
        data={{
          shares_amount: sellForm.values.amount,
          amount_receive:
            parseInt(sellForm.values.amount as string) * userData.price,
          share_price: userData.price,
        }}
        onWillDismiss={() => setConfirm(false)}
        isOpen={confirm}
        isLoading={sell_shares_mut.isLoading}
      />
      {!!userData?.graphData && <div style={{ height: 200 }}>{CharHOC}</div>}
      <Flex direction={"column"} gap={"md"} p={"lg"}>
        <TextInput
          variant="filled"
          label="Market Rate"
          style={{ pointerEvents: "none" }}
          value={`₹ ${userData.price}`}
        />

        <TextInput
          variant="filled"
          label="Shares Holding"
          style={{ pointerEvents: "none" }}
          value={`${userData.shares}`}
        />

        <TextInput
          variant="filled"
          label="Total"
          style={{ pointerEvents: "none" }}
          {...sellForm.getInputProps("total")}
          value={`₹ ${(sellForm.values.amount || 0) * userData.price}`}
        />

        <TextInput
          type="number"
          variant="filled"
          label="Amount"
          {...sellForm.getInputProps("amount")}
          onChange={(e) => {
            sellForm.setValues({
              amount: parseInt(e.target.value),
              total: parseInt(e.target.value) * userData.price,
            });
          }}
        />

        <Flex gap={"xs"}>
          <Text size={"sm"} weight={500}>
            Platform Fees:{" "}
          </Text>

          <Text size={"sm"}> 0.2% </Text>
          <Text size={"sm"} weight={500} ml={"auto"}>
            Balance:{" "}
          </Text>

          <Text size={"sm"}> ₹ 10000 </Text>
        </Flex>
      </Flex>

      <Button
        size="md"
        type="submit"
        variant="filled"
        color="red"
        style={{
          bottom: 0,
          position: "fixed",
          width: "100%",
          borderRadius: 0,
        }}
      >
        Sell
      </Button>
    </form>
  );
}
