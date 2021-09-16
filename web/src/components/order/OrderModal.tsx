import React, { useState } from "react";
import { Button, Modal } from "src/components/htmlElements";
import { GetUserServiceByIdQuery } from "src/generated/graphql";
import gray from "/public/gray.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";

interface OrderModalProps {
  data: GetUserServiceByIdQuery | undefined;
}

export const OrderModal: React.FC<OrderModalProps> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const [rounds, setRounds] = useState(1);
  const [startTime, setStartTime] = useState(new Date());

  const userService = data?.getUserServiceById;
  const service = data?.getUserServiceById.service;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value, min, max }: any = event.target;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    setRounds(value);
  };

  console.log(new Date(new Date().setHours(0, 0, 0, 0)));

  return (
    <>
      <Button
        className="flex justify-center  items-center py-2 px-20 border border-opacity-25 rounded-lg shadow-sm text-sm font-medium text-white bg-purple hover:bg-purple-dark"
        text="order"
        icon="star"
        onClick={() => setOpen(!open)}
      />
      <Modal open={open} setOpen={setOpen}>
        <div className="dark:text-white text-black inline-block max-w-xl bg-white dark:bg-dark rounded-lg text-left transform">
          <div className="py-8 px-8">
            <h1 className="text-2xl">Confirm Order</h1>

            <div className="flex justify-between items-end">
              <div className="flex space-x-5 mt-5">
                <Image
                  placeholder="blur"
                  width={100}
                  height={100}
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII="
                  layout="fixed"
                  objectFit="cover"
                  className="rounded-xl"
                  src={service?.boxArtUrl ?? gray.src}
                />
                <div className="w-44">
                  <h3 className="text-xl">{service?.name}</h3>
                  <p className="text-sm">{userService?.description}</p>
                </div>
              </div>

              <div className="flex space-x-1 font-medium">
                <FontAwesomeIcon size="lg" icon="coins" />
                <p>{userService?.price.toFixed(2)}</p>
                <p>/</p>
                <p>{userService?.per}</p>
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <p className="text-xl">Rounds</p>

              <div className="flex justify-between space-x-3">
                <div
                  className="bg-dark-light hover:bg-purple py-1 px-3"
                  onClick={() =>
                    setRounds(rounds - 1 > 1 ? rounds - 1 : rounds)
                  }
                >
                  <FontAwesomeIcon size="sm" icon="minus" />
                </div>

                <input
                  name="rounds"
                  value={rounds}
                  max={999}
                  min={1}
                  onChange={handleChange}
                  type="number"
                  className="w-12 bg-dark-light text-center text-white"
                />

                <div
                  className="bg-dark-light hover:bg-purple py-1 px-3"
                  onClick={() =>
                    setRounds(rounds + 1 < 1000 ? rounds + 1 : rounds)
                  }
                >
                  <FontAwesomeIcon size="sm" icon="plus" />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <p className="text-xl">Start Time</p>

              <div className="flex justify-between space-x-3">
                <DatePicker
                  className="w-96"
                  selected={startTime}
                  showTimeSelect
                  onChange={(date) => setStartTime(date as any)}
                  minDate={new Date()}
                  minTime={new Date(new Date().setHours(0, 0, 0, 0))}
                  maxTime={new Date()}
                  dateFormat="MMMM d, yyyy h:mm aa"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
