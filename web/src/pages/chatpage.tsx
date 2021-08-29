
import { useEffect } from "react";
import Chats from "../components/chat/Chats";
import SendMessage from "../components/chat/SendMessage";
import { useMeQuery } from "../generated/graphql";
import withApollo from '../utils/apollo/withApollo';


const Chatpage = () => {
const { data, loading } = useMeQuery();
 
if(!loading && data?.me){
   return (
      // <div className="App border border-purple-dark">
      //   { (
      //     <div> 
      //       <Chats />
      //       <SendMessage name={data.me.username} />
      //     </div> 
      //   )}
      // </div>
      
 

      <div className="flex flex-row h-72 w-2/5 justify-between bg-white">
        <div className="flex flex-col dark:bg-lightGray w-2/6 border-r-2 overflow-y-auto">
        
          <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
           
              <img
                src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                className="object-cover h-12 w-12 rounded-full"
                alt=""
              />
        
            <div className="w-full">
              <div className="text-lg font-semibold">{data.me.username}</div>
          
            </div>
          </div>
          </div>

        <div className="w-full py-28 px-5 flex flex-col dark:bg-dark space-y-96  justify-between">
          <div className="flex flex-col mt-5">
            <div className="flex justify-end mb-4"></div>
              
       
            <div className="flex justify-start mb-4">
              <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                className="object-cover h-8 w-8 rounded-full"
                alt=""
              />
              <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                happy holiday guys!
              </div>
            </div> <input                       
              className="w-full bg-gray-300 py-5 px-3 rounded-xl"
              type="text"
              placeholder="type your message here..."
            />
     
        
           
          </div>

       
      </div>
    </div>
  );
}else{
 return (<div>Is loading</div>)
};
}
 

export default withApollo({ ssr: false }) (Chatpage);
