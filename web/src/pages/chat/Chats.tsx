import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const ALL_CHATS = gql`
  query allChats {
    getChats {
      id
      name
      message
    }
  }
`;

const CHATS_SUBSCRIPTION = gql`
  subscription OnNewChat {
    messageSent {
      id
      name
      message
    }
  }
`;

const Chats = () => {
  const { loading, error, data, subscribeToMore } = useQuery(ALL_CHATS);

  useEffect(() => {
    subscribeToMore({
      document: CHATS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newChat = subscriptionData.data.messageSent;

        return {
          getChats: [...prev.getChats, newChat],
        };
      },
    });
  }, []);

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <div>
      {data.getChats.map((chat: any) => (
        <div key={chat.id}>
          <p>
            {chat.name}: {chat.message}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Chats;