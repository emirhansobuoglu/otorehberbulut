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

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

interface Versiyons {
  id: string;
  icerik: string;
  paketName?: string | null;
}

interface ManageVersProps {
  paketler: Versiyons[];
}
interface editmarkaProps {
  id: string;
  icerik: string;
}
const ManagePaketAck: React.FC<ManageVersProps> = ({ paketler }) => {
  const router = useRouter();
  const [editData, setEditData] = useState<editmarkaProps | null>(null); // Düzenlenecek veriyi tutar.
  const { isOpen, onOpen, onClose } = useDisclosure();
  const paketName = paketler[0]?.paketName || "Bilinmiyor";
  const handleEdit = (marka: editmarkaProps) => {
    setEditData(marka); // Seçili markayı state'e atar.
    onOpen(); // Modal'ı açar.
  };

  const handleUpdate = async (updatedData: editmarkaProps) => {
    try {
      await axios.put(`/api/paketack/${updatedData.id}`, updatedData);
      toast.success("Güncelleme başarılı!");
      onClose(); // Modal'ı kapatır.
      router.refresh(); // Sayfayı yeniler.
    } catch (error) {
      toast.error("Güncelleme sırasında bir hata oluştu.");
      console.error(error);
    }
  };

  let rows: any = [];

  if (paketler) {
    rows = paketler.map((model) => {
      return {
        id: model.id,
        icerik: model.icerik,
      };
    });
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "icerik", headerName: "İçerik", width: 200 },
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
                  icerik: params.row.icerik,
                })
              }
              className="mx-3 flex w-1/2 cursor-pointer justify-center rounded-2xl bg-orange-400"
            >
              Düzenle
            </button>
            <Link
              href={`/admin/editpaket/detay/${params.row.id}`}
              className="mx-3 flex w-1/2 cursor-pointer justify-center rounded-2xl bg-green-400"
            >
              Paket İçeriklerine Git
            </Link>
          </div>
        );
      },
    },
  ];

  const handleDelete = useCallback(async (id: string) => {
    toast.success("Silme işlemi için bekleyiniz.");
    axios
      .delete(`/api/paketack/${id}`)
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
      <h3 className="px-12 text-3xl tracking-widest text-black">{paketName}</h3>
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
                value={editData.icerik}
                onChange={(e) =>
                  setEditData({ ...editData, icerik: e.target.value })
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

export default ManagePaketAck;
