import { List, Stack, Text } from "@mantine/core";
import React from "react";

const TermsConditions = () => {
  return (
    <List
      spacing={3}
      icon={
        <Text component="span" color="red">
          *
        </Text>
      }
    >
      {[
        "You cannot sell EQ more then 2.5% in 24 Hours",
        "If you sell your whole EQ, You are not able to post anything.",
        "If you tried to do some suspicious activity or tried to manipulate market we will directly ban your account and your all shares automatically sold and get money who invested already in your shares.",
      ].map((str, index) => (
        <List.Item key={index}>
          <Text size="sm">{str}</Text>
        </List.Item>
      ))}
    </List>
  );
};

export default TermsConditions;
