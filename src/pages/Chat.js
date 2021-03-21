import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Parse from 'parse/react-native';
import LoadingModal from '../components/LoadingModal';
import { APP_ID, JAVASCRIPT_KEY, CHAT_URL } from '@env';

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState();

  useEffect(() => {
    async function getCurrentUser() {
      const currentUser = await Parse.User.currentAsync();
      if (currentUser !== null) {
        setUserId(currentUser.id);
        setUser(currentUser);
      }
    }
    getCurrentUser();
  }, []);

  useEffect(() => {
    const currentUser = Parse.User.current();
    let client = new Parse.LiveQueryClient({
      applicationId: APP_ID,
      serverURL: CHAT_URL,
      javascriptKey: JAVASCRIPT_KEY,
    });
    client.open();

    let query = new Parse.Query('Message');
    query.ascending('createdAt');
    query.limit(1);

    let subscription = client.subscribe(query);

    subscription.on('create', (messageParse) =>
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, {
          _id: messageParse.id,
          text: messageParse.get('content'),
          createdAt: messageParse.get('createdAt'),
          user: {
            _id: currentUser.id,
            name: currentUser.getUsername(),
            avatar:
              'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c7e0576e-ec36-48da-9be6-6d38824e582b/d4lww9x-ad4d3adc-9c76-4947-93df-74c377fbcb68.png/v1/fill/w_900,h_773,q_80,strp/aisaka_taiga__toradora_by_uchihathedead_d4lww9x-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD03NzMiLCJwYXRoIjoiXC9mXC9jN2UwNTc2ZS1lYzM2LTQ4ZGEtOWJlNi02ZDM4ODI0ZTU4MmJcL2Q0bHd3OXgtYWQ0ZDNhZGMtOWM3Ni00OTQ3LTkzZGYtNzRjMzc3ZmJjYjY4LnBuZyIsIndpZHRoIjoiPD05MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ho-02I_iDUVtwVNaT9lMuj73W0o3QYb0W3OJaP4rfcA',
          },
        })
      )
    );
  }, []);

  const onSend = useCallback(
    (messages = []) => {
      const Message = Parse.Object.extend('Message');
      let message = new Message();

      message.set('content', messages[0].text);
      message.set('user', user);
      message.save();
    },
    [user]
  );
  if (userId) {
    return (
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userId,
        }}
        placeholder="Type a message... 📲"
      />
    );
  }
  return <LoadingModal />;
};
