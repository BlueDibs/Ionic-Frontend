import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { Flex, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getFeedsByUsername } from './ProfileFeeds.api';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useRef,
} from 'react';

export function ProfileFeeds() {
  const { username } = useParams<{ username: string }>();
  const parentRef = useRef(null);

  const getFeedsQuery = useQuery({
    queryKey: ['feeds', username],
    queryFn: () => getFeedsByUsername(username),
    placeholderData: [],
  });

  const rowVirtualizer = useVirtualizer({
    count: getFeedsQuery.data?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  if (getFeedsQuery.isLoading) return <IonPage>Loading...</IonPage>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ padding: '2px 10px' }}>
          <Flex justify={'space-between'} style={{ alignItems: 'center' }}>
            <Title order={5} mr={'auto'}>
              Profile Feeds
            </Title>
          </Flex>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Flex
          direction={'column'}
          ref={parentRef}
          style={{ overflowY: 'auto', height: '100%' }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem: any) => (
              <div
                key={virtualItem.key}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                Row {virtualItem.index}
              </div>
            ))}
          </div>
        </Flex>
      </IonContent>
    </IonPage>
  );
}
