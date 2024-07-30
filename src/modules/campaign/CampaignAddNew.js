import FormGroup from "components/common/FormGroup";
import FormRow from "components/common/FormRow";
import { Dropdown } from "components/dropdown";
import { Input, Textarea } from "components/input";
import { Label } from "components/label";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import axios from "axios";
import { Button } from "components/button";
import useOnChange from "hooks/useOnChange";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { apiURL } from "config/config";
import { toast } from "react-toastify";
import ImageUpload from "components/image/ImageUpload";

Quill.register("modules/imageUploader", ImageUploader);
const categoriesData = ["Film", "Education"];
const CampaignAddNew = () => {
  const { handleSubmit, control, setValue, reset, getValues, watch } =
    useForm();
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const getDropdownLabel = (name, defaultValue) => {
    const value = watch(name) || defaultValue;
    return value;
  };
  const resetValues = () => {
    setStartDate("");
    setEndDate("");
    reset({});
  };
  const handleAddNewCampaign = async (values) => {
    console.log("🚀 ~ CampaignAddNew ~ values:", values);
    try {
      await axios.post(`${apiURL}/campaigns`, {
        ...values,
        content,
        startDate,
        endDate,
      });
      resetValues();
      toast.success("Create campaign successfully");
    } catch (error) {
      console.log("🚀 ~ handleAddNewCampaign ~ error:", error);
      toast.error("Can not create new campaign");
    }
  };
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          "https://api.imgbb.com/1/upload?key=92acf7a6e235093f750301a9549bee94";
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const reponse = await axios({
            method: "post",
            url: "https://api.imgbb.com/1/upload?key=92acf7a6e235093f750301a9549bee94",
            data: bodyFormData,
            headers: {
              "Content-Type": "mutipart/form-data",
            },
          });
          return reponse.data.data.url;
        },
      },
    }),
    []
  );
  const handleChange = (content, delta, source, editor) => {
    // console.log("Content:", content); // Nội dung văn bản đã thay đổi

    setContent(content);
  };

  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useOnChange(500);
  function handleSelectDropdownOption(name, value) {
    setValue(name, value);
  }
  // https://restcountries.com/v3.1/name/{name}
  useEffect(() => {
    if (!filterCountry) return;
    async function fetchCountry() {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${filterCountry}`
      );

      setCountries(response.data);
    }
    fetchCountry();
  }, [filterCountry]);
  return (
    <div className="bg-white rounded-xl py-10 px-[66px]">
      <div className="text-center">
        <h1 className="py-6 px-14 bg-text4 text-text2 bg-opacity-5 font-bold text-[25px] inline-block rounded-xl mb-10">
          Start a Campaign🚀
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleAddNewCampaign)}>
        <FormRow>
          <FormGroup>
            <Label>Campaign Title*</Label>
            <Input
              name="title"
              placeholder="Write a title!"
              control={control}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label>Select a category*</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={getDropdownLabel("category", "Select category")}
              ></Dropdown.Select>
              <Dropdown.List>
                {categoriesData.map((category) => (
                  <Dropdown.Option
                    key={category}
                    onClick={() =>
                      handleSelectDropdownOption("category", category)
                    }
                  >
                    <span className="capitalize">{category}</span>
                  </Dropdown.Option>
                ))}
              </Dropdown.List>
            </Dropdown>
          </FormGroup>
        </FormRow>
        <FormGroup>
          <Label>Short Description*</Label>
          <Textarea
            name="short_description"
            placeholder="Write a short description..."
            control={control}
          ></Textarea>
        </FormGroup>
        <FormGroup>
          <Label>Story*</Label>
          <ReactQuill
            placeholder="Write your story......"
            modules={modules}
            theme="snow"
            value={content}
            onChange={handleChange}
          />
        </FormGroup>
        <FormRow>
          <FormGroup>
            <Label>Featured Image</Label>
            <ImageUpload
              onChange={setValue}
              name="featured_image"
            ></ImageUpload>
          </FormGroup>
        </FormRow>
        <div className="w-full pr-20 pl-11 bg-secondary rounded-xl h-[120px] flex items-center gap-x-5 mb-10">
          <span>
            <svg
              width={40}
              height={40}
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2239_7136)">
                <path
                  d="M26.4997 9.979H13.1663C12.6663 9.979 12.333 10.3123 12.333 10.8123C12.333 11.3123 12.6663 11.6457 13.1663 11.6457H26.4997C26.9997 11.6457 27.333 11.3123 27.333 10.8123C27.333 10.3123 26.9997 9.979 26.4997 9.979Z"
                  fill="white"
                />
                <path
                  d="M12.4999 7.81266C12.4999 8.146 12.8332 8.31266 13.1666 8.31266H26.4999C26.8332 8.31266 27.1666 8.146 27.1666 7.81266L30.4999 1.146C30.6666 0.812663 30.6666 0.479329 30.3332 0.145996C30.1666 -0.0206706 29.8332 -0.0206706 29.4999 0.145996L23.3332 3.146L20.4999 0.312663C20.1666 -0.0206706 19.6666 -0.0206706 19.3332 0.312663L16.3332 3.146L10.1666 0.145996C9.83324 -0.0206706 9.4999 -0.0206706 9.16657 0.145996C8.83324 0.312663 8.9999 0.812663 9.16657 1.146L12.4999 7.81266Z"
                  fill="white"
                />
                <path
                  d="M27.1667 13.6456C27 13.4789 26.6667 13.3123 26.5 13.3123H13.1667C13 13.3123 12.6667 13.4789 12.5 13.6456C12.1667 13.9789 4 22.6456 4 27.4789C4 34.3123 11.1667 39.9789 19.8333 39.9789C28.5 39.9789 35.6667 34.3123 35.6667 27.4789C35.6667 22.6456 27.5 13.9789 27.1667 13.6456ZM20.6667 33.3123V34.1456C20.6667 34.6456 20.3333 34.9789 19.8333 34.9789C19.3333 34.9789 19 34.6456 19 34.1456V33.3123C17.1667 32.9789 15.8333 31.8123 15.6667 30.3123C15.6667 29.8123 16 29.4789 16.5 29.4789C17 29.4789 17.3333 29.8123 17.3333 30.3123C17.3333 30.9789 18.1667 31.6456 19 31.8123V28.4789C16.8333 27.9789 15.6667 26.8123 15.6667 25.3123C15.6667 23.6456 17.1667 22.3123 19 21.9789V21.1456C19 20.6456 19.3333 20.3123 19.8333 20.3123C20.3333 20.3123 20.6667 20.6456 20.6667 21.1456V21.6456C22.5 21.9789 23.8333 23.1456 24 24.6456C24 25.1456 23.6667 25.4789 23.1667 25.4789C22.6667 25.4789 22.3333 25.1456 22.3333 24.6456C22.3333 23.9789 21.5 23.3123 20.6667 23.1456V26.4789C22.8333 26.9789 24 28.1456 24 29.6456C24 31.6456 22.5 32.9789 20.6667 33.3123Z"
                  fill="white"
                />
                <path
                  d="M20.667 28.4785V31.4785C21.667 31.3119 22.3337 30.6452 22.3337 29.9785C22.3337 29.3119 21.8337 28.8118 20.667 28.4785Z"
                  fill="white"
                />
                <path
                  d="M17.333 24.9788C17.333 25.6454 17.833 26.1454 18.9997 26.4788V23.4788C17.9997 23.6454 17.333 24.3121 17.333 24.9788Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_2239_7136">
                  <rect
                    width="39.6667"
                    height="39.9579"
                    fill="white"
                    transform="translate(0 0.0209961)"
                  />
                </clipPath>
              </defs>
            </svg>
          </span>
          <h1 className="text-2xl font-bold text-white">
            You will get 90% of total raised
          </h1>
        </div>
        <FormRow>
          <FormGroup>
            <Label>Goal*</Label>
            <Input name="goal" placeholder="$0.00USD" control={control}></Input>
          </FormGroup>
          <FormGroup>
            <Label>Raised Amount *</Label>
            <Input
              name="amount"
              placeholder="$0.00USD"
              control={control}
            ></Input>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Amount Prefilled</Label>
            <Input
              name="prefilled"
              placeholder="Amount Prefilled"
              control={control}
            ></Input>
            <p className="text-sm text-left text-text3">
              It will help fill amount box by click, place each amount by comma,
              ex: 10,20,30,40
            </p>
          </FormGroup>
          <FormGroup>
            <Label>Video</Label>
            <Input name="video" placeholder="Video" control={control}></Input>
            <p className="text-sm text-left text-text3">
              Place Youtube or Vimeo Video URL
            </p>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Campaign End Method*</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select one"></Dropdown.Select>
              <Dropdown.List>
                <Dropdown.Option>Backend</Dropdown.Option>
                <Dropdown.Option>Frontend</Dropdown.Option>
              </Dropdown.List>
            </Dropdown>
          </FormGroup>
          <FormGroup>
            <Label>Country*</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={getDropdownLabel("country", "Select country")}
              ></Dropdown.Select>
              <Dropdown.List>
                <Dropdown.Search
                  placeholder="Search coutry"
                  onChange={setFilterCountry}
                ></Dropdown.Search>
                {countries.length > 0 &&
                  countries.map((country) => (
                    <Dropdown.Option
                      key={country?.name?.common}
                      onClick={() =>
                        handleSelectDropdownOption(
                          "country",
                          country?.name?.common
                        )
                      }
                    >
                      {country?.name?.common}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <Label>Start Date</Label>
            <DatePicker onChange={setStartDate} value={startDate} />
          </FormGroup>
          <FormGroup>
            <Label>End Date</Label>
            <DatePicker onChange={setEndDate} value={endDate} />
          </FormGroup>
        </FormRow>
        <div className="mt-10 text-center">
          <Button type="submit" className="px-10 mx-auto text-white bg-primary">
            Submit new campaign
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CampaignAddNew;

//tren source
// import useOnChange from "hooks/useOnChange";
// import ReactQuill, { Quill } from "react-quill";
// import React, { useMemo, useState } from "react";
// import ImageUploader from "quill-image-uploader";
// import ImageUpload from "components/image/ImageUpload";
// import FormRow from "components/common/FormRow";
// import FormGroup from "components/common/FormGroup";
// import DatePicker from "react-date-picker";
// import "react-date-picker/dist/DatePicker.css";
// import "react-calendar/dist/Calendar.css";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import { Label } from "components/label";
// import { Input, Textarea } from "components/input";
// import { Dropdown } from "components/dropdown";
// import { Button } from "components/button";
// import { apiURL, imgbbAPI } from "config/config";
// import "react-quill/dist/quill.snow.css";
// Quill.register("modules/imageUploader", ImageUploader);

// const categoriesData = ["architecture", "education"];

// const CampaignAddNew = () => {
//   const { handleSubmit, control, setValue, reset, watch } = useForm();
//   const getDropdownLabel = (name, defaultValue = "") => {
//     const value = watch(name) || defaultValue;
//     return value;
//   };
//   const [content, setContent] = React.useState("");
//   const resetValues = () => {
//     setStartDate("");
//     setEndDate("");
//     reset({});
//   };
//   const handleAddNewCampaign = async (values) => {
//     try {
//       await axios.post(`${apiURL}/campaigns`, {
//         ...values,
//         content,
//         startDate,
//         endDate,
//       });
//       toast.success("Create campaign successfully");
//       resetValues();
//     } catch (error) {
//       toast.error("Can not create new campaign");
//     }
//     // values, startDate, endDate, content
//   };
//   const modules = useMemo(
//     () => ({
//       toolbar: [
//         ["bold", "italic", "underline", "strike"],
//         ["blockquote"],
//         [{ header: 1 }, { header: 2 }], // custom button values
//         [{ list: "ordered" }, { list: "bullet" }],
//         [{ header: [1, 2, 3, 4, 5, 6, false] }],
//         ["link", "image"],
//       ],
//       imageUploader: {
//         upload: async (file) => {
//           const bodyFormData = new FormData();
//           bodyFormData.append("image", file);
//           const response = await axios({
//             method: "post",
//             url: imgbbAPI,
//             data: bodyFormData,
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           });
//           return response.data.data.url;
//         },
//       },
//     }),
//     []
//   );
//   const handleSelectDropdownOption = (name, value) => {
//     setValue(name, value);
//   };
//   const [countries, setCountries] = useState([]);
//   const [filterCountry, setFilterCountry] = useOnChange(500);
//   useEffect(() => {
//     async function fetchCountries() {
//       if (!filterCountry) return;
//       try {
//         const response = await axios.get(
//           `https://restcountries.com/v3.1/name/${filterCountry}`
//         );
//         setCountries(response.data);
//       } catch (error) {
//         toast.error(error.message);
//       }
//     }
//     fetchCountries();
//   }, [filterCountry]);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   return (
//     <div className="bg-white rounded-xl py-10 px-[66px]">
//       <div className="text-center">
//         <h1 className="py-4 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block mb-10">
//           Start a Campaign 🚀
//         </h1>
//         <form onSubmit={handleSubmit(handleAddNewCampaign)}>
//           <FormRow>
//             <FormGroup>
//               <Label>Campaign Title *</Label>
//               <Input
//                 control={control}
//                 name="title"
//                 placeholder="Write a title"
//               ></Input>
//             </FormGroup>
//             <FormGroup>
//               <Label>Select a category *</Label>
//               <Dropdown>
//                 <Dropdown.Select
//                   placeholder={getDropdownLabel("category", "Select category")}
//                 ></Dropdown.Select>
//                 <Dropdown.List>
//                   {categoriesData.map((category) => (
//                     <Dropdown.Option
//                       key={category}
//                       onClick={() =>
//                         handleSelectDropdownOption("category", category)
//                       }
//                     >
//                       <span className="capitalize">{category}</span>
//                     </Dropdown.Option>
//                   ))}
//                 </Dropdown.List>
//               </Dropdown>
//             </FormGroup>
//           </FormRow>
//           <FormGroup>
//             <Label>Short Description *</Label>
//             <Textarea
//               name="short_description"
//               placeholder="Write a short description...."
//               control={control}
//             ></Textarea>
//           </FormGroup>
//           <FormGroup>
//             <Label>Story *</Label>
//             <ReactQuill
//               placeholder="Write your story......"
//               modules={modules}
//               theme="snow"
//               value={content}
//               onChange={setContent}
//             />
//           </FormGroup>
//           <FormRow>
//             <FormGroup>
//               <Label>Featured Image</Label>
//               <ImageUpload
//                 onChange={setValue}
//                 name="featured_image"
//               ></ImageUpload>
//             </FormGroup>
//             <FormGroup></FormGroup>
//           </FormRow>
//           <FormRow>
//             <FormGroup>
//               <Label>Goal *</Label>
//               <Input
//                 control={control}
//                 name="goal"
//                 placeholder="$0.00 USD"
//               ></Input>
//             </FormGroup>
//             <FormGroup>
//               <Label>Raised amount *</Label>
//               <Input
//                 control={control}
//                 name="amount"
//                 placeholder="$0.00 USD"
//               ></Input>
//             </FormGroup>
//           </FormRow>
//           <FormRow>
//             <FormGroup>
//               <Label>Amount Prefilled</Label>
//               <Input
//                 control={control}
//                 name="prefilled"
//                 placeholder="Amount Prefilled"
//               ></Input>
//               <p className="text-sm text-left text-text3">
//                 It will help fill amount box by click, place each amount by
//                 comma, ex: 10,20,30,40
//               </p>
//             </FormGroup>
//             <FormGroup>
//               <Label>Video</Label>
//               <Input control={control} name="video" placeholder="Video"></Input>
//               <p className="text-sm text-left text-text3">
//                 Place Youtube or Vimeo Video URL
//               </p>
//             </FormGroup>
//           </FormRow>
//           <FormRow>
//             <FormGroup>
//               <Label>Campaign End Method</Label>
//               <Dropdown>
//                 <Dropdown.Select placeholder="Select one"></Dropdown.Select>
//                 <Dropdown.List></Dropdown.List>
//               </Dropdown>
//             </FormGroup>
//             <FormGroup>
//               <Label>Country</Label>
//               <Dropdown>
//                 <Dropdown.Select
//                   placeholder={getDropdownLabel("country", "Select country")}
//                 ></Dropdown.Select>
//                 <Dropdown.List>
//                   <Dropdown.Search
//                     placeholder="Search country..."
//                     onChange={setFilterCountry}
//                   ></Dropdown.Search>
//                   {countries.length > 0 &&
//                     countries.map((country) => (
//                       <Dropdown.Option
//                         key={country?.name?.common}
//                         onClick={() =>
//                           handleSelectDropdownOption(
//                             "country",
//                             country?.name?.common
//                           )
//                         }
//                       >
//                         {country?.name?.common}
//                       </Dropdown.Option>
//                     ))}
//                 </Dropdown.List>
//               </Dropdown>
//             </FormGroup>
//           </FormRow>
//           <FormRow>
//             <FormGroup>
//               <Label>Start Date</Label>

//               <DatePicker
//                 onChange={setStartDate}
//                 value={startDate}
//                 format="dd-MM-yyyy"
//               />
//             </FormGroup>
//             <FormGroup>
//               <Label>End Date</Label>
//               <DatePicker
//                 onChange={setEndDate}
//                 value={endDate}
//                 format="dd-MM-yyyy"
//               />
//             </FormGroup>
//           </FormRow>
//           <div className="mt-10 text-center">
//             <Button
//               type="submit"
//               className="px-10 mx-auto text-white bg-primary"
//             >
//               Submit new campaign{" "}
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CampaignAddNew;
