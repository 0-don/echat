import React, { Fragment, useRef, useState } from 'react';
import withApollo from '../../utils/apollo/withApollo';
import { Wrapper } from '../../components/Wrapper';



const Community: React.FC = () => {
  
  return (<Wrapper navbar>
    <div className= "grid grid-flow-col grid-cols-3 grid-ro ws-3 gap-4">
    

    </div>
         </Wrapper>
  );
};

export default withApollo({ ssr: false })(Community);
