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
import { EditProfile } from './EditProfile';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './profile.api';
import { config } from '../../config';
import { IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react';
import { imgUrl } from '../../utils/media';
import { chatbubbleEllipsesOutline, settingsOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

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
  const history = useHistory();
  const user = useAppSelector((state) => state.user);
  const [editMdlOpn, setEdtMdlOpn] = useState(false);

  const fetchPostQry = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(user.id),
    refetchOnWindowFocus: false,
    placeholderData: [] as any,
    enabled: false,
  });

  useEffect(() => {
    if (user.id) fetchPostQry.refetch();
  }, [user.id]);

  return (
    <IonPage style={{ display: 'block' }}>
      <IonHeader>
        <IonToolbar style={{ padding: '2px 10px' }}>
          <Flex justify={'space-between'} style={{ alignItems: 'center' }}>
            <Title order={5} mr={'auto'}>
              Profile
            </Title>
            <IonIcon
              icon={settingsOutline}
              onClick={() => history.push('/app/chats')}
              style={{ fontSize: 25, marginLeft: 'auto' }}
            ></IonIcon>
          </Flex>
        </IonToolbar>
      </IonHeader>

      <Container p={'lg'}>
        <EditProfile open={editMdlOpn} setModalOpen={setEdtMdlOpn} />
        <Flex direction={'column'} gap={'xs'} p={'sm'}>
          <Avatar
            src={user.avatarPath ? imgUrl(user.avatarPath) : null}
            size="xl"
            radius="md"
            style={{ width: 100, height: 100 }}
            alt="it's me"
          />
          <Title order={4} weight={500}>
            {user.username}
          </Title>

          <Text size={'sm'}>{user.bio}</Text>
        </Flex>
        <Flex align={'center'} justify={'center'} mt={'sm'}>
          <Status
            label="Followers"
            value={user.followersIDs?.length || 0}
            className={classes.statusLeft}
          />

          <Status
            label="Following"
            value={user.followingIDs?.length || 0}
            className={classes.statusSquare}
          />
          <Status
            label="Posts"
            value={fetchPostQry.data.length || 0}
            className={classes.statusRight}
          />
        </Flex>
        <Button
          w={'100%'}
          mt={'md'}
          variant="white"
          style={{ borderColor: 'black', color: 'black' }}
          onClick={() => setEdtMdlOpn(true)}
        >
          Edit Profile
        </Button>
      </Container>

      <SimpleGrid
        cols={3}
        style={{
          gap: 0,
          borderColor: '#DADADA',
          borderStyle: 'solid',
          borderWidth: 1,
          borderBottom: 'none',
          boxSizing: 'border-box',
        }}
      >
        {Array.isArray(fetchPostQry.data) &&
          fetchPostQry.data.map((post, i) => (
            <Image
              key={post.path}
              onClick={() =>
                history.push(`/app/feed/${user.username}?post=${i}`)
              }
              height={150}
              src={`${config.STATIC_FILE_BASE_URL}${post.path}?alt=media`}
              alt="Random image"
            />
          ))}
      </SimpleGrid>
    </IonPage>
  );
}
