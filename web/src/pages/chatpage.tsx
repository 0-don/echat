
import { useEffect } from "react";
import Chats from "../components/chat/Chats";
import SendMessage from "../components/chat/SendMessage";
import { useMeQuery } from "../generated/graphql";
import withApollo from '../utils/apollo/withApollo';


const Chatpage = () => {
const { data, loading } = useMeQuery();
 
if(!loading && data?.me){
   return (
      <div className="App">
        { (
          <div> 
            <Chats />
            <SendMessage name={data.me.username} />
          </div>
        )}
      </div>
  );
}else{
 return (<div>Is loading</div>)
};
}
 

export default withApollo({ ssr: false }) (Chatpage);
