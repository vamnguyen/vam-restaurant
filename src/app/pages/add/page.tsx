"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { uploadFile } from "@uploadcare/upload-client";
import { toast } from "react-toastify";

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

type Option = {
  title: string;
  additionalPrice: number;
};

const AddProductPage = () => {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  // Object
  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });

  // Array
  const [options, setOptions] = useState<Option[]>([]);

  const [file, setFile] = useState<File>();

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session) {
    toast.warning("You are not login!");
    router.push("/pages/login");
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };

  // const upload = async () => {
  //   const data = new FormData();
  //   data.append("file", file!);
  //   data.append("upload_preset", "restaurant");

  //   const res = await fetch(
  //     "https://api.cloudinary.com/v1_1/vamnguyen/image/upload",
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "multipart/form-data" },
  //       body: data,
  //     }
  //   );
  //   console.log("CHECK RESPONSE FROM CLOUDINARY ~ upload ~ res:", res);

  //   if (!res.ok) {
  //     console.error(
  //       `Request store image to Cloudinary failed with status ${res.status}`
  //     );
  //     // Handle the error appropriately
  //   } else {
  //     const contentType = res.headers.get("content-type");
  //     if (contentType && contentType.includes("application/json")) {
  //       const resData = await res.json();
  //       return resData.url;
  //     } else {
  //       console.error("Response is not in JSON format");
  //       // Handle non-JSON response
  //     }
  //   }

  //   // const resData = await res.json();
  //   // return resData.url;
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // // get the image url  uploaded on cloudinary
      // const url = await upload();

      // upload image to UploadCare
      const result = await uploadFile(file!, {
        publicKey: "376b05d734140722ee84",
        store: "auto",
        metadata: {
          subsystem: "uploader",
          pet: "product",
        },
      });
      console.log(`URL: ${result?.cdnUrl}`);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
          method: "POST",
          body: JSON.stringify({
            img: result?.cdnUrl,
            ...inputs,
            options,
          }),
        }
      );

      const data = await res.json();
      router.push(`/pages/product/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40   flex items-center justify-center text-red-500">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-6 pl-9 pr-1 min-[375px]:p-0"
      >
        <h1 className="text-4xl mb-2 text-gray-300 font-bold">
          Add New Product
        </h1>

        <div className="w-full flex flex-col gap-2 ">
          <label
            className="text-sm cursor-pointer flex gap-4 items-center"
            htmlFor="file"
          >
            <Image src="/upload.png" alt="" width={30} height={20} />
            <span>Upload Image</span>
          </label>
          <input
            type="file"
            id="file"
            // className="hidden"
            onChange={handleChangeImg}
          />
        </div>

        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Title</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="text"
            placeholder="Bella Napoli"
            name="title"
            onChange={handleChange}
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Description</label>
          <textarea
            rows={3}
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
            name="desc"
            onChange={handleChange}
          />
        </div>

        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Price</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="number"
            placeholder="69"
            name="price"
            onChange={handleChange}
          />

          <div className="w-full flex flex-col gap-2 ">
            <label className="text-sm">Category</label>
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
              type="text"
              placeholder="ex: burgers/pizzas/pastas"
              name="catSlug"
              onChange={handleChange}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="text-sm">Options</label>
            <div className="flex flex-col md:flex-row">
              <input
                className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
                type="text"
                placeholder="Title (ex: small/large)"
                name="title"
                onChange={changeOption}
              />
              <input
                className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
                type="number"
                placeholder="Additional Price (ex: $2)"
                name="additionalPrice"
                onChange={changeOption}
              />
              <div
                className="bg-gray-500 p-2 text-white cursor-pointer w-fit"
                onClick={() => setOptions((prev) => [...prev, option])}
              >
                Add Option
              </div>

              <div className="flex flex-wrap gap-4 mt-2">
                {options?.map((opt) => (
                  <div
                    className="p-2 rounded-md cursor-pointer bg-gray-200 text-gray-400"
                    key={opt.title}
                    onClick={() =>
                      setOptions((prev) =>
                        prev.filter((item) => item.title !== opt.title)
                      )
                    }
                  >
                    <span>{opt.title} </span>
                    <span className="text-xs">(+ ${opt.additionalPrice})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-red-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
