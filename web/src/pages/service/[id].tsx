import { NextPage } from "next";
import { useGetUserServiceByIdQuery } from "src/generated/graphql";
import { Wrapper } from "../../components/Wrapper";
import withApollo from "../../utils/apollo/withApollo";
import Image from "next/image";
import gray from "/public/gray.png";
const ServiceDetail: NextPage<{ id: number }> = ({ id }) => {
  const { data, loading } = useGetUserServiceByIdQuery({
    variables: { id: id },
  });
  const service = data?.getUserServiceById.service;
  const userService = data?.getUserServiceById;
  const user = data?.getUserServiceById.user;
  console.log(service, user);

  console.log(data, loading);
  return (
    <Wrapper navbar>
      <div className="dark:text-white text-black text-4xl ">
        <h1 className=" mt-8">{service?.name}</h1>
        <h1 className=" mt-8">
          {userService?.price} {userService?.per}
        </h1>
        <div className="flex flex-wrap space-x-72 rounded-lg border-  border border-purple-dark text-center mt-8">
          <div>
            <h1>Review Score</h1>
            <h2>5.0/5.0</h2>
          </div>
          <div>
            <h1>Served</h1>
            <h2>52</h2>
          </div>
          <div>
            <h1>Recommended</h1>
            <h2>51</h2>
          </div>
        </div>
        <div style={{ position: "relative", width: "100%", height: "200px" }}>
          <Image
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII="
            layout="fill"
            objectFit="cover"
            src={userService?.image ?? gray.src}
          />
        </div>
      </div>
    </Wrapper>
  );
};

ServiceDetail.getInitialProps = ({ query }) => {
  return {
    id: parseInt(query.id as string),
  };
};

export default withApollo({ ssr: false })(ServiceDetail);
