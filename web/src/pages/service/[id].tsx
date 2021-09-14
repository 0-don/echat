import { NextPage } from "next";
import { useGetUserServiceByIdQuery } from "src/generated/graphql";
import { Wrapper } from "../../components/Wrapper";
import withApollo from "../../utils/apollo/withApollo";
import Image from "next/image";
import transparent from "/public/transparent.png";
import { useEffect, useState } from "react";
import { getRandomBetween } from "src/utils";

const ServiceDetail: NextPage<{ id: number }> = ({ id }) => {
  const [bgImage, setBgImage] = useState<string | undefined>();
  const { data } = useGetUserServiceByIdQuery({
    variables: { id },
  });
  const userService = data?.getUserServiceById;
  const user = data?.getUserServiceById.user;
  const service = data?.getUserServiceById.service;
  const images = service?.images?.filter((image) => image.width > 1200);

  useEffect(() => {
    images?.length &&
      setBgImage(images[getRandomBetween(0, images.length)].url);
  }, [images]);

  console.log(user);

  return (
    <Wrapper navbar fluid className="relative">
      <div style={{ position: "relative", width: "100%", height: "40vw" }}>
        <Image
          className="img-fade opacity-40"
          src={bgImage ?? transparent.src}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="container max-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute top-0 left-0 right-0">
        <div className="dark:text-white text-black text-4xl ">
          <div>
            <h1 className="mt-8">{service?.name}</h1>
            <h1 className="mt-8">
              {userService?.price} {userService?.per}
            </h1>
          </div>{" "}
          <div className=" flex flex-0">
            <div className="border border-purple-dark">
              <div className="flex space-x-72 rounded-lg  text-center mt-8">
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

              <div
                style={{ position: "relative", width: "100%", height: "200px" }}
              >
                <Image
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII="
                  layout="fill"
                  objectFit="cover"
                  src={userService?.image ?? transparent.src}
                />
              </div>
            </div>
            <div
              style={{
                width: "400px",
              }}
              className=" flex flex-col border  border-purple-dark"
            >
              <div
                className=""
                style={{
                  position: "relative",
                  width: "400px",
                  height: "300px",
                  maxWidth: "400px",
                  maxHeight: "300px",
                }}
              >
                <Image
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII="
                  layout="fill"
                  objectFit="cover"
                  src={
                    user?.images?.find((image) => image.type == "profile")
                      ?.url ?? transparent.src
                  }
                />
              </div>
              <div className="flex flex-wrap space-x-32 text-center">
                <div className="text-3xl">{user?.username}</div>
                {user?.lastOnline == new Date() ? (
                  <div className="bg-green-500 h-8 w-8 rounded-full mr-1"></div>
                ) : (
                  <div className="bg-red h-8 w-8 rounded-full mr-1"></div>
                )}
              </div>
              <div className="flex flex-0">
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

ServiceDetail.getInitialProps = ({ query }) => ({
  id: parseInt(query.id as string),
});

export default withApollo({ ssr: false })(ServiceDetail);
