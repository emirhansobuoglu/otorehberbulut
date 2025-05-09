/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDisclosure } from "@nextui-org/react";
import { Marka } from "@prisma/client";
import axios from "axios";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";

import firebaseApp from "@/lib/firebase";

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

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-hooks/exhaustive-deps */

interface ManageMarkaProps {
  markalar: Marka[];
}
interface editmarkaProps {
  id: string;
  name: string;
  image: string;
  newImage?: string;
}
const ManageMarka: React.FC<ManageMarkaProps> = ({ markalar }) => {
  const storage = getStorage(firebaseApp);
  const router = useRouter();
  const [editData, setEditData] = useState<editmarkaProps | null>(null); // Düzenlenecek veriyi tutar.
  const [img, setImg] = useState<File | null>(null); // Yeni yüklenen resmi tutar.
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEdit = (marka: editmarkaProps) => {
    setEditData(marka); // Seçili markayı state'e atar.
    onOpen(); // Modal'ı açar.
  };

  const handleUpdate = async (updatedData: editmarkaProps) => {
    let uploadedImg = updatedData.image; // Varsayılan olarak mevcut resmi kullan.

    if (img) {
      // Eğer yeni bir resim seçilmişse yükle.
      try {
        // Eski resmi sil
        if (uploadedImg) {
          const oldImageRef = ref(storage, uploadedImg);
          try {
            await deleteObject(oldImageRef);
            toast.info("Eski resim başarıyla silindi!");
          } catch (deleteError) {
            console.error("Eski resmi silme hatası:", deleteError);
            toast.error("Eski resmi silerken bir hata oluştu.");
          }
        }

        const storageRef = ref(storage, `images/${updatedData.name}.jpg`);
        const uploadTask = uploadBytesResumable(storageRef, img);
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            async () => {
              uploadedImg = await getDownloadURL(uploadTask.snapshot.ref);
              toast.success("Yeni resim başarıyla yüklendi!");
              resolve();
            }
          );
        });
      } catch (error) {
        console.error("Resim yükleme hatası:", error);
        toast.error("Resim yüklenirken bir hata oluştu.");
        return;
      }
    }

    const updatedMarka = { ...updatedData, image: uploadedImg };

    try {
      await axios.put(`/api/data/${updatedMarka.id}`, updatedMarka);
      toast.success("Güncelleme başarılı!");
      onClose(); // Modal'ı kapatır.
      router.refresh(); // Sayfayı yeniler.
    } catch (error) {
      toast.error("Güncelleme sırasında bir hata oluştu.");
      console.error(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0]);
    }
  };
  let rows: any = [];

  if (markalar) {
    rows = markalar.map((marka) => {
      return {
        id: marka.id,
        name: marka.name,
        image: marka.image,
      };
    });
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "name", width: 200 },
    {
      field: "image",
      headerName: "image",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <Image
              src={params.row.image}
              height={50}
              width={50}
              alt={params.row.id}
            />
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="flex">
            <button
              onClick={() => handleDelete(params.row.id, params.row.image)}
              className="mx-3 flex w-1/2 cursor-pointer justify-center rounded-2xl bg-red-400"
            >
              Sil
            </button>
            <button
              onClick={() =>
                handleEdit({
                  id: params.row.id,
                  name: params.row.name,
                  image: params.row.image,
                  newImage: "",
                })
              }
              className="mx-3 flex w-1/2 cursor-pointer justify-center rounded-2xl bg-orange-300"
            >
              Düzenle
            </button>
            <Link
              href={`/admin/editmodel/${params.row.id}`}
              className="mx-3 flex w-1/2 cursor-pointer justify-center rounded-2xl bg-green-400"
            >
              Modeline Git
            </Link>
          </div>
        );
      },
    },
  ];

  const handleDelete = useCallback(async (id: string, image: any) => {
    toast.success("Silme işlemi için bekleyiniz.");
    const handleDeleteImg = async () => {
      try {
        const imageRef = ref(storage, image);
        await deleteObject(imageRef);
      } catch (error) {
        return console.log("Bir hata mevcut:", error);
      }
    };
    await handleDeleteImg();
    axios
      .delete(`/api/data/${id}`)
      .then(() => {
        toast.success("Sildirme işlemi başarılı");
        router.refresh();
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 100 } },
        }}
        pageSizeOptions={[5, 10, 50, 100]}
        checkboxSelection
        sx={{ border: 0 }}
      />
      {isOpen && editData && (
        <div className="fixed left-1/4 top-1/4 z-50 w-1/2 rounded-3xl bg-slate-800 p-[20px] shadow-2xl">
          <form
            className=""
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editData); // Güncelleme işlemini başlatır.
            }}
          >
            <div>
              <label>Ad:</label>
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
            <div>
              <label>Mevcut Resim:</label>
              <div>
                <Image
                  src={editData.image}
                  height={50}
                  width={50}
                  alt={editData.id}
                />
              </div>
            </div>
            <div>
              <label>Yeni Resim:</label>
              <input
                type="file"
                className="my-3 h-12 w-full rounded-2xl border border-slate-300 bg-white p-3 outline-none"
                onChange={handleFileChange}
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
        </div>
      )}
    </div>
  );
};

export default ManageMarka;
