import { Container, Flex, SimpleGrid, Text } from "@mantine/core";
import { roundOff } from "../../utils";

const SingleStat = (data: { label: string; value: number | string }) => (
  <Flex
    style={{
      justifyContent: "center",
      textAlign: "center",
    }}
    direction={"column"}
  >
    <Text size={"sm"} weight={500}>
      {data.label}
    </Text>
    <Text size={"sm"} weight={700}>
      {roundOff(data.value)}
    </Text>
  </Flex>
);

export function ProfileEquityStats(data: {
  stats: { label: string; value: string | number }[];
}) {
  return (
    <Container style={{ backgroundColor: "#F2F2F2" }}>
      <SimpleGrid cols={data?.stats?.length || 0} py={10} px={20}>
        {!!data?.stats &&
          data.stats.map((item) => (
            <SingleStat label={item.label} value={item.value} />
          ))}
      </SimpleGrid>
    </Container>
  );
}
