import { IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../store/hooks';
import { getFeed } from './feed.api';
import { ActionIcon, Avatar, Flex, Image, Paper, Text } from '@mantine/core';
import { imgUrl } from '../../utils/media';
import {
  heartOutline,
  chatboxOutline,
  heart,
  paperPlaneOutline,
  chatbubbleEllipsesOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export function Feed() {
  const history = useHistory();
  const user = useAppSelector((state) => state.user);
  const [lastClick, setlastClick] = useState<{ time: Date; id: string } | null>(
    null
  );
  const controls = useAnimation();

  const getFeedQuery = useQuery({
    queryKey: ['feeds', user.id],
    queryFn: getFeed,
  });

  const likeTimer = (postId: string) => {
    console.log(lastClick);
    if (!lastClick)
      return setlastClick((_) => ({ time: new Date(), id: postId }));
    else if (
      new Date().getSeconds() - lastClick.time.getSeconds() < 1 &&
      postId == lastClick.id
    ) {
      controls.start({
        scale: [0.8, 1, 0.8],
        opacity: [0, 1],
        transition: { duration: 0.2 },
      });
      setTimeout(() => {
        controls.start({ opacity: [1, 0] });
        setlastClick((_) => ({ time: new Date(), id: postId }));
      }, 500);
      return;
    }
    return setlastClick((_) => ({ time: new Date(), id: postId }));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: '2px 10px' }}>
          <Flex justify={'space-between'} style={{ alignItems: 'center' }}>
            <Text weight={800} mr={'auto'}>
              Logo
            </Text>
            <IonIcon
              icon={chatbubbleEllipsesOutline}
              onClick={() => history.push('/app/chats')}
              style={{ fontSize: 25, marginLeft: 'auto' }}
            ></IonIcon>
          </Flex>
        </IonToolbar>
      </IonHeader>

      <Flex direction={'column'} style={{ overflow: 'auto' }}>
        {!!getFeedQuery.data &&
          getFeedQuery.data.map(
            (post: { User: any; id: any; path: any; likes: any }) => (
              <Paper withBorder>
                <Flex style={{ padding: '7px 10px' }} gap={10} align={'center'}>
                  <Avatar src={imgUrl(post.User.avatarPath)} />
                  <Text weight={500}>{post.User.username}</Text>
                </Flex>
                <div
                  onClick={() => likeTimer(post.id)}
                  style={{
                    position: 'relative',
                    transformOrigin: 'center',
                  }}
                >
                  {lastClick?.id == post.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={controls}
                      style={{
                        zIndex: '9999',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        margin: '-50px -50px',
                      }}
                    >
                      <IonIcon
                        icon={heart}
                        style={{
                          zIndex: '99999',
                          fontSize: '100px',
                          position: 'absolute',

                          color: 'white',
                        }}
                      />
                    </motion.div>
                  )}
                  <Image
                    mx="auto"
                    height={300}
                    style={{ backgroundColor: 'black' }}
                    fit="scale-down"
                    src={imgUrl(post.path)}
                    withPlaceholder
                  ></Image>
                </div>
                <Flex
                  style={{ padding: '4px 15px' }}
                  gap={'sm'}
                  align={'center'}
                >
                  <ActionIcon>
                    <IonIcon size="large" icon={heartOutline} />
                  </ActionIcon>{' '}
                  <ActionIcon>
                    <IonIcon size="large" icon={chatboxOutline} />
                  </ActionIcon>{' '}
                  <ActionIcon>
                    <IonIcon size="large" icon={paperPlaneOutline} />
                  </ActionIcon>{' '}
                  <Text ml={'auto'} size={'sm'} color="#5C5F66" weight={500}>
                    {post.likes} likes
                  </Text>
                </Flex>
              </Paper>
            )
          )}
      </Flex>
    </IonPage>
  );
}
