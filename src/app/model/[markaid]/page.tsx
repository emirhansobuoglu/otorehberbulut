/* eslint-disable react/jsx-no-undef */
import Image from "next/image";
import Link from "next/link";

import { Card, CardHeader } from "@nextui-org/react";

import getKasa from "@/app/actions/getkasa";
import getMarkaDetails from "@/app/actions/getmarkadets";
import getModel from "@/app/actions/getmodel";

type Params = Promise<{ markaid: string }>;

export default async function Model({ params }: { params: Params }) {
  const markaid = (await params).markaid;
  const models = await getModel({ markaid: markaid });
  const modelsWithKasa = await Promise.all(
    models.map(async (model) => {
      const kasalar = await getKasa({ modelid: model.id });
      return { ...model, kasalar };
    })
  );
  const marka = await getMarkaDetails({ markaid: markaid });

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
            </div>
            <div className="col-span-1 mx-auto h-[100px] w-[100px] animate-fade-left animate-delay-1000 animate-normal animate-fill-both animate-once animate-ease-in lg:h-[200px] lg:w-[200px]">
              <br />
              <br />
              <Image
                height={1000}
                width={1000}
                alt="Card background"
                className="z-0 h-full w-full object-contain"
                src={marka?.marka?.image || "/logooo.png"}
                quality={100}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="relative z-0">
          <div className="mx-auto grid grid-cols-10 gap-4 px-10 lg:px-32">
            <p className="col-span-10 mt-10 text-start text-5xl tracking-wider text-black">
              İstediğiniz modeli seçiniz <br />
              <br />
            </p>

            {modelsWithKasa.map((item, index) => (
              <div className="col-span-10" key={index}>
                <Link key={index} href={`/kasa/${item.id}`}>
                  <Card className="rounded-3xl bg-black/40">
                    <CardHeader className="px-10 text-xl text-white lg:text-3xl">
                      {item.name}
                    </CardHeader>
                    <div className="grid grid-cols-4 gap-5 px-4">
                      {item.kasalar.length === 0 && (
                        <div className="col-span-2 grid shadow-2xl lg:col-span-1">
                          <p className="mx-auto text-medium text-white lg:text-xl">
                            Bu model için kasa bulunamadı.
                          </p>
                        </div>
                      )}
                      {item.kasalar.slice(-4).map((kasa) => (
                        <div
                          key={kasa.id}
                          className="col-span-2 grid shadow-2xl lg:col-span-1"
                        >
                          <Image
                            height={2000}
                            width={2000}
                            alt={kasa.name}
                            className="z-0 h-full w-full rounded-3xl object-cover"
                            src={kasa.image} // Kasa resmi
                            quality={100}
                          />
                          <p className="mt-1 text-center text-white">
                            {kasa.name}
                          </p>
                          <p className="mt-1 hidden text-center text-white lg:block">
                            {kasa.year}
                          </p>
                        </div>
                      ))}
                    </div>
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
