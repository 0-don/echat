import { NextPage } from "next";
import { useGetUserServiceByIdQuery } from "src/generated/graphql";
import { Wrapper } from "../../components/Wrapper";
import withApollo from "../../utils/apollo/withApollo";
import Image from "next/image";
import gray from "/public/gray.png";
import { useEffect, useState } from "react";
import { getRandomBetween } from "src/utils";
const ServiceDetail: NextPage<{ id: number }> = ({ id }) => {
  const { data, loading } = useGetUserServiceByIdQuery({
    variables: { id: id },
  });
  const [bgImage, setBgImage] = useState<string | undefined>();
  const service = data?.getUserServiceById.service;
  const userService = data?.getUserServiceById;
  const user = data?.getUserServiceById.user;
  console.log(service, user);
  const images = service?.images?.filter((image) => image.width > 1200);
  console.log(data, loading);

  useEffect(() => {
    images?.length! > 0 &&
      setBgImage(images![getRandomBetween(0, images!.length)].url);
    //images?.length === 0 && bgImage?.slug !== slug && setBgImage(undefined);
  }, [images]);
  return (
    <Wrapper navbar fluid className="relative">
      <div style={{ position: "relative", width: "100%", height: "48vw" }}>
        <Image
          className="img-fade opacity-40"
          src={bgImage ?? gray.src}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className=" container mx-auto h-full w-full absolute  right-1/2-1/2 z-10">
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
