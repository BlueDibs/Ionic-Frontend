import {
  Avatar,
  Container,
  Flex,
  Text,
  Title,
  createStyles,
  Button,
  Image,
  SimpleGrid,
} from '@mantine/core';
import { useAppSelector } from '../../store/hooks';

const useStyles = createStyles((theme) => ({
  statusLeft: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DADADA',
    padding: '10px 20px',
    borderEndStartRadius: 20,
    borderTopLeftRadius: 20,
  },
  statusSquare: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DADADA',
    padding: '10px 20px',
    borderLeft: 0,
  },
  statusRight: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DADADA',
    padding: '10px 20px',
    borderLeft: 0,
    borderTopRightRadius: 20,
    borderEndEndRadius: 20,
  },
}));

const Status = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number;
  className: any;
}) => (
  <Flex
    wrap={'wrap'}
    direction={'column'}
    justify={'center'}
    className={className}
  >
    <Text
      weight={400}
      size={'sm'}
      align="center"
      color="gray"
      style={{ lineHeight: 1 }}
    >
      {label}
    </Text>
    <Text weight={600} align="center" pt={'xs'} style={{ lineHeight: 0.8 }}>
      {value}
    </Text>
  </Flex>
);

export function Profile() {
  const { classes } = useStyles();
  const user = useAppSelector((state) => state.user);

  return (
    <>
      <Container p={'lg'}>
        <Flex direction={'column'} gap={'xs'} p={'sm'}>
          <Avatar
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
            size="xl"
            radius="md"
            style={{ width: 100, height: 100 }}
            alt="it's me"
          />
          <Title order={5} weight={500}>
            {user.username}
          </Title>

          <Text size={'xs'} mt={'sm'}>
            {user.bio}
          </Text>
        </Flex>
        <Flex align={'center'} justify={'center'} mt={'sm'}>
          <Status
            label="Following"
            value={user.followers}
            className={classes.statusLeft}
          />

          <Status
            label="Following"
            value={user.following}
            className={classes.statusSquare}
          />
          <Status label="Posts" value="0" className={classes.statusRight} />
        </Flex>
        <Button
          w={'100%'}
          mt={'md'}
          variant="white"
          style={{ borderColor: 'black', color: 'black' }}
        >
          Edit Profile
        </Button>
      </Container>

      <SimpleGrid
        cols={3}
        h={'100%'}
        style={{
          height: '100%',
          borderColor: '#DADADA',
          borderStyle: 'solid',
          borderWidth: 1,
          boxSizing: 'border-box',
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
          alt="Random image"
        />
      </SimpleGrid>
    </>
  );
}
