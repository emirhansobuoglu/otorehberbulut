/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Card, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

interface Versiyons {
  id: string;
  name: string;
  segment: string;
  engine_capacity: string;
  horsepower: string;
  torque: string;
  fueltype: string;
  fuel: string;
  transmission: string;
  topspeed: string;
  accerelation: string;
  kasaName?: string | null;
}

interface ManageVersProps {
  versiyonlar: Versiyons[];
}
interface editmarkaProps {
  id: string;
  name: string;
  segment: string;
  engine_capacity: string;
  horsepower: string;
  torque: string;
  fueltype: string;
  fuel: string;
  transmission: string;
  topspeed: string;
  accerelation: string;
}
const ManageVersiyon: React.FC<ManageVersProps> = ({ versiyonlar }) => {
  const router = useRouter();
  const [editData, setEditData] = useState<editmarkaProps | null>(null); // Düzenlenecek veriyi tutar.
  const { isOpen, onOpen, onClose } = useDisclosure();
  const kasaad = versiyonlar[0]?.kasaName || "Bilinmiyor";
  const handleEdit = (marka: editmarkaProps) => {
    setEditData(marka); // Seçili markayı state'e atar.
    onOpen(); // Modal'ı açar.
  };

  const handleUpdate = async (updatedData: editmarkaProps) => {
    try {
      await axios.put(`/api/vers/${updatedData.id}`, updatedData);
      toast.success("Güncelleme başarılı!");
      onClose(); // Modal'ı kapatır.
      router.refresh(); // Sayfayı yeniler.
    } catch (error) {
      toast.error("Güncelleme sırasında bir hata oluştu.");
      console.error(error);
    }
  };

  let rows: any = [];

  if (versiyonlar) {
    rows = versiyonlar.map((model) => {
      return {
        id: model.id,
        name: model.name,
        segment: model.segment,
        engine_capacity: model.engine_capacity,
        horsepower: model.horsepower,
        torque: model.torque,
        fueltype: model.fueltype,
        fuel: model.fuel,
        transmission: model.transmission,
        topspeed: model.topspeed,
        accerelation: model.accerelation,
      };
    });
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "name", width: 100 },
    { field: "segment", headerName: "Segment", width: 80 },
    { field: "engine_capacity", headerName: "MotorHacmi", width: 100 },
    { field: "horsepower", headerName: "HP", width: 80 },
    { field: "torque", headerName: "Tork", width: 80 },
    { field: "fueltype", headerName: "Yakıt Türü", width: 100 },
    { field: "fuel", headerName: "Yakıt Tüketimi", width: 100 },
    { field: "transmission", headerName: "Şanzıman", width: 100 },
    { field: "topspeed", headerName: "Maks. Hız", width: 100 },
    { field: "accerelation", headerName: "Hızlanma", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="flex">
            <button
              onClick={() => handleDelete(params.row.id)}
              className="mx-3 flex w-1/2 cursor-pointer justify-center rounded-2xl bg-red-400"
            >
              Sil
            </button>
            <button
              onClick={() =>
                handleEdit({
                  id: params.row.id,
                  name: params.row.name,
                  segment: params.row.segment,
                  engine_capacity: params.row.engine_capacity,
                  horsepower: params.row.horsepower,
                  torque: params.row.torque,
                  fueltype: params.row.fueltype,
                  fuel: params.row.fuel,
                  transmission: params.row.transmission,
                  topspeed: params.row.topspeed,
                  accerelation: params.row.accerelation,
                })
              }
              className="mx-3 flex w-1/2 cursor-pointer justify-center rounded-2xl bg-orange-400"
            >
              Düzenle
            </button>
            <Link
              href={`/admin/editpaket/${params.row.id}`}
              className="mx-3 flex w-1/2 cursor-pointer justify-center rounded-2xl bg-green-400"
            >
              Versiyonuna Git
            </Link>
          </div>
        );
      },
    },
  ];

  const handleDelete = useCallback(async (id: string) => {
    toast.success("Silme işlemi için bekleyiniz.");
    axios
      .delete(`/api/vers/${id}`)
      .then(() => {
        toast.success("Sildirme işlemi başarılı");
        router.refresh();
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="rounded-2xl shadow-2xl">
      <h3 className="px-12 text-3xl tracking-widest text-black">{kasaad}</h3>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
      {isOpen && editData && (
        <Card className="fixed left-1/4 top-1/4 z-50 w-1/2 rounded-3xl bg-slate-800/80 p-[20px] shadow-2xl">
          <form
            className="grid grid-cols-2 items-center justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editData); // Güncelleme işlemini başlatır.
            }}
          >
            <div className="col-span-1 px-2">
              <input
                type="text"
                className="my-3 h-12 w-full rounded-2xl border border-slate-300 bg-white p-3 outline-none"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="col-span-1 px-2">
              <input
                placeholder="Segment Ör: B Segment"
                type="text"
                className="my-3 h-12 w-full rounded-2xl border border-slate-300 bg-white p-3 outline-none"
                value={editData.segment}
                onChange={(e) =>
                  setEditData({ ...editData, segment: e.target.value })
                }
                required
              />
            </div>
            <div className="col-span-1 px-2">
              <input
                placeholder="Motor Hacmi"
                type="text"
                className="my-3 h-12 w-full rounded-2xl border border-slate-300 bg-white p-3 outline-none"
                value={editData.engine_capacity}
                onChange={(e) =>
                  setEditData({ ...editData, engine_capacity: e.target.value })
                }
                required
              />
            </div>
            <div className="col-span-1 px-2">
              <input
                placeholder="HP"
                type="text"
                className="my-3 h-12 w-full rounded-2xl border border-slate-300 bg-white p-3 outline-none"
                value={editData.horsepower}
                onChange={(e) =>
                  setEditData({ ...editData, horsepower: e.target.value })
                }
                required
              />
            </div>
            <div className="col-span-1 px-2">
              <input
                placeholder="Tork"
                type="text"
                className="my-3 h-12 w-full rounded-2xl border border-slate-300 bg-white p-3 outline-none"
                value={editData.torque}
                onChange={(e) =>
                  setEditData({ ...editData, torque: e.target.value })
                }
                required
              />
            </div>
            <div className="col-span-1 px-2">
              <input
                placeholder="Yakıt Türü"
                type="text"
                className="my-3 h-12 w-full rounded-2xl border border-slate-300 bg-white p-3 outline-none"
                value={editData.fueltype}
                onChange={(e) =>
                  setEditData({ ...editData, fueltype: e.target.value })
                }
                required
              />
            </div>
            <div className="col-span-1 px-2">
              <input
                placeholder="Yakıt Tüketimi"
                type="text"
                className="my-3 h-12 w-full rounded-2xl border border-slate-300 bg-white p-3 outline-none"
                value={editData.fuel}
                onChange={(e) =>
                  setEditData({ ...editData, fuel: e.target.value })
                }
                required
              />
            </div>
            <div className="col-span-1 px-2">
              <input
                placeholder="Şanzıman"
                type="text"
                className="my-3 h-12 w-full rounded-2xl border border-slate-300 bg-white p-3 outline-none"
                value={editData.transmission}
                onChange={(e) =>
                  setEditData({ ...editData, transmission: e.target.value })
                }
                required
              />
            </div>
            <div className="col-span-1 px-2">
              <input
                placeholder="Maks. Hız"
                type="text"
                className="my-3 h-12 w-full rounded-2xl border border-slate-300 bg-white p-3 outline-none"
                value={editData.topspeed}
                onChange={(e) =>
                  setEditData({ ...editData, topspeed: e.target.value })
                }
                required
              />
            </div>
            <div className="col-span-1 px-2">
              <input
                placeholder="Hızlanma 0-100"
                type="text"
                className="my-3 h-12 w-full rounded-2xl border border-slate-300 bg-white p-3 outline-none"
                value={editData.accerelation}
                onChange={(e) =>
                  setEditData({ ...editData, accerelation: e.target.value })
                }
                required
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="btn btn-primary">
                Güncelle
              </button>
              <button className="btn btn-error" onClick={onClose}>
                Close
              </button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default ManageVersiyon;
