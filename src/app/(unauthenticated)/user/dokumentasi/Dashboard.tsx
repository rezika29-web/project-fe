"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Menu } from "antd";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [menuItems2, setMenuItems2] = useState([]);
  const [selectedImages, setSelectedImages] = useState({
    image1: null,
    image2: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://test-sipintas-plus.biroumumsumbar.com/api/public/fasilitas"
        );

        // Filter data untuk memastikan tidak ada elemen kosong
        const validData = response.data.facilities.filter((item) => item && item.id);

        // Format menu dari API
        const formattedMenu = validData.map((item) => ({
          label: item.name,
          key: item.id.toString(),
        }));

        setMenuItems(formattedMenu);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://sipintas-plus.biroumumsumbar.com/api/public/rent");

        // Filter data valid (hindari nilai null atau tidak memiliki ID)
        const validData = response.data.filter(item => item && item.id);

        // Gunakan Map untuk menyimpan hanya title unik
        const uniqueMenuMap = new Map();

        validData.forEach(item => {
          if (!uniqueMenuMap.has(item.title)) {
            uniqueMenuMap.set(item.title, {
              label: item.title,
              key: item.id.toString(), // ID pertama yang ditemukan untuk title tersebut
              image1: item.image1,
              image2: item.image2,
            });
          }
        });

        // Konversi map ke array untuk menu
        setMenuItems2(Array.from(uniqueMenuMap.values()));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p className="text-center">Loading data...</p>;
  }
  const handleMenuClick = (e) => {
    const selectedItem = menuItems.find((item) => item.key === e.key);
    if (selectedItem) {
      setSelectedImages({
        image1: selectedItem?.image1,
        image2: selectedItem?.image2,
      });
    }
  };

  return (
    <div className="p-6">
      <div className="flex-col mb-6">
        <div className="flex-col mb-10 justify-center">
          <div className="flex-row mt-10 justify-center text-center items-center p-4 bg-white w-full shadow-md rounded-md">
            <h1 style={{}} className="mb-10 text-2xl font-extrabold">
              Dokumentasi Kegiatan
            </h1>
            <Menu
              onClick={handleMenuClick}
              mode="horizontal"
              items={menuItems}
            />
            <Menu
              onClick={handleMenuClick}
              mode="horizontal"
              items={menuItems2}
            />

            <div className="mt-6 flex flex-col items-center gap-4">
              {selectedImages.image1 && (
                <image
                  src={`https://test-sipintas-plus.biroumumsumbar.com/dokumantasi_kegiatan/${selectedImages.image1}`}
                  alt="Dokumentasi 1"
                  className="w-64 h-40 object-cover rounded-md shadow-md"
                />
              )}
              {selectedImages.image2 && (
                <image
                  src={`https://test-sipintas-plus.biroumumsumbar.com/dokumantasi_kegiatan/${selectedImages.image2}`}
                  alt="Dokumentasi 2"
                  className="w-64 h-40 object-cover rounded-md shadow-md"
                />
              )}
              {!selectedImages.image1 && !selectedImages.image2 && (
                <p className="text-gray-500">Pilih menu untuk melihat gambar</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
