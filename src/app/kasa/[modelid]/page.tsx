/* eslint-disable react/jsx-no-undef */
import Image from "next/image";
import Link from "next/link";

import { Card } from "@nextui-org/react";

import getKasa from "@/app/actions/getkasa";
import getMarkaDetails from "@/app/actions/getmarkadets";

type Params = Promise<{ modelid: string }>;

export default async function Model({ params }: { params: Params }) {
  const modelid = (await params).modelid;
  const models = await getKasa({ modelid: modelid });
  const modelad = models[0].modelAd;
  const marka = await getMarkaDetails({ modelid: modelid });
  return (
    <>
      <div className="relative">
        {/* Hero Section */}
        <div
          className="mt-16 h-[350px] w-full animate-fade-down items-center justify-center bg-cover bg-center object-contain animate-delay-500 animate-normal animate-fill-both animate-once animate-ease-in"
          style={{ backgroundImage: "url('/mainpage.png')" }}
        >
          <div className="grid grid-cols-2">
            <div className="col-span-1 mx-auto animate-fade-right px-5 animate-delay-1000 animate-normal animate-fill-both animate-once animate-ease-in">
              <br />
              <br />
              <p className="text-4xl tracking-widest text-black lg:text-5xl">
                {marka?.marka?.name}
              </p>
              <br />
              <p className="text-4xl tracking-widest text-black lg:text-5xl">
                {modelad || "Model Adına Ulaşılamıyor."}
              </p>
            </div>
            <div className="col-span-1 mx-auto h-[100px] w-[100px] animate-fade-left animate-delay-1000 animate-normal animate-fill-both animate-once animate-ease-in lg:h-[200px] lg:w-[200px]">
              <br />
              <br />
              <Image
                height={1000}
                width={1000}
                alt="Card background"
                className="z-0 h-full w-full object-contain"
                src={marka?.marka?.image || "logooo.png"}
                quality={100}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="relative z-0">
          <div className="mx-auto mt-10 grid grid-cols-12 gap-5 px-10 lg:gap-10 lg:px-32">
            <p className="col-span-12 text-start text-4xl tracking-wider text-black lg:text-5xl">
              İstediğiniz kasayı seçiniz <br />
              <br />
            </p>

            {models.map((item, index) => (
              <div className="col-span-6 text-center lg:col-span-4" key={index}>
                <Link key={index} href={`/versiyon/${item.id}`}>
                  <Card
                    className="mx-auto h-full w-full rounded-3xl bg-black/40 text-center"
                    shadow="lg"
                  >
                    <p className="top-1 z-10 m-1 mx-auto text-large text-white">
                      {item.name}
                      <br />
                      {item.year}
                    </p>
                    <Image
                      height={1000}
                      width={1000}
                      alt="Card background"
                      className="z-0 col-span-1 h-full w-full rounded-3xl object-cover"
                      src={item.image}
                      quality={100}
                    />
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <br></br>
        <br />
      </div>
      <br />
    </>
  );
}
