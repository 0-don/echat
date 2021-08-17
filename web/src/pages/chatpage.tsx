
import Chats from "../components/chat/Chats";
import SendMessage from "../components/chat/SendMessage";
import { useState } from "react";

import withApollo from '../utils/apollo/withApollo';


const Chatpage = () => {
  const [name, setName] = useState<string>("");
  const [entered, setEntered] = useState<boolean>(false);

  return (
    
      <div className="App">
        {!entered && (
          <div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <button onClick={() => setEntered(true)}>Enter chat</button>
          </div>
        )}

        {name !== "" && entered && (
          <div>
            <Chats />
            <SendMessage name={name} />
          </div>
        )}
      </div>

  );
};

export default withApollo({ ssr: false }) (Chatpage);
