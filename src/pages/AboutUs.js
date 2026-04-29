import React, { useEffect } from "react";
import useRequest from '../hooks/useRequest'
import fetchImages from '../hooks/useFetchImages'
import '../style/aboutus.css'
import { Parser } from "html-to-react";

function AboutUs() {

  const { data, fetchData } = useRequest("aboutus", "POST");
  const { data: dataSub1, fetchData: fetchDataSub1 } = useRequest("aboutusSub/1", "GET");
  const { data: dataSub2, fetchData: fetchDataSub2 } = useRequest("aboutusSub/2", "GET");
  const { data: dataSub3, fetchData: fetchDataSub3 } = useRequest("aboutusSub/3", "GET");
  const { data: dataBan, fetchData: fetchDataBan } = useRequest("aboutusBan", "GET");

  useEffect(() => {
    fetchData();
    fetchDataSub1();
    fetchDataSub2();
    fetchDataSub3();
    fetchDataBan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <div className="hjryqrweuj bg-[#69ab4a] flex flex-col lg:flex-row w-full  px-[5%]">
        {<img src={fetchImages(data[0]?.image)} alt="About Us" />}

        <div className="h-full flex flex-col w-full mtrtyu5 items-start">
          <div>
            <span className="text-white">
              {data[0]?.aviationIndustries_text}
            </span>
          </div>
          <h1 className="text-white">
            {data[0]?.title}
          </h1>
          <h4 className="flex flex-col text-white">
            {data[0]?.aviationIndustries}
          </h4>
          <span className="text-white">
            {Parser().parse(data[0]?.description)}
          </span>
        </div>
      </div>

      <div className="bg-white">
        <div className="w-full flex px-[10px] lg:flex-row flex-col-reverse justify-center gap-[10px] gap-[10%]  lg:py-[5%] items-center">
          <div className="w-full lg:w-[45%] h-full gap-[2px] justify-center flex flex-col">
            <h1 className="text-black text-[18px] font-semibold">
              {dataSub1[0]?.heading}
            </h1>
            <span className="text-black leading-[25px] text-[18px]">
              {Parser().parse(dataSub1[0]?.content)}
            </span>
          </div>
          <img
            src={fetchImages(dataSub1[0]?.image)}
            className="lg:h-full place-self-end object-cover h-[100%] w-full lg:w-[30%]"
            alt={dataSub1[0]?.heading || "Aviation Industry Section 1"}
          />
        </div>

        <div className="w-full flex px-[10px] lg:flex-row flex-col justify-center gap-[10px] gap-[10%]  items-center">
          <img
            src={fetchImages(dataSub2[0]?.image)}
            className="lg:h-full place-self-end object-cover h-[100%] w-full lg:w-[30%]"
            alt={dataSub2[0]?.heading || "Aviation Industry Section 2"}
          />

          <div className="w-full lg:w-[45%] h-full gap-[5px] justify-center flex flex-col">
            <h1 className="text-black text-[18px] font-semibold">
              {dataSub2[0]?.heading}
            </h1>
            <span className="text-black leading-[25px] text-[18px]">
              {Parser().parse(dataSub2[0]?.content)}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full mt-5 banMidlle bg-cover bg-center lg:bg-cover" style={{ backgroundImage: `url(${fetchImages(dataBan[0]?.image)})` }} />

      <div className="dflexworlas">
        <div className="p-5 shadow-sm bg-[#f4f9f2] lg:w-[35%] movinUpuytg">
          <h1 className="text-black text-[18px] font-bold ">
            {dataBan[0]?.high_heading}
          </h1>
          <span className="text-[16px] text-black">
            {Parser().parse(dataBan[0]?.high_content)}
          </span>
        </div>

        <div className="p-5 lg:w-[35%]">
          <h1 className="text-black text-[18px] font-bold">
            {dataBan[0]?.low_heading}
          </h1>
          <span className="text-black text-[16px]">
            {Parser().parse(dataBan[0]?.low_content)}
          </span>
        </div>

      </div>

      <div className="bg-white">
        <div className="w-full flex px-[10px] lg:flex-row flex-col justify-center gap-[10px] lg:gap-[10%]  items-center">
          <img
            src={fetchImages(dataSub3[0]?.image)}
            className="lg:h-full place-self-end object-cover h-[100%] w-full lg:w-[30%]"
            alt={dataSub3[0]?.heading || "Aviation Industry Section 3"}
          />

          <div className="w-full lg:w-[45%] h-full gap-[5px] justify-center flex flex-col">
            <h1 className="text-black text-[18px] font-semibold">
              {dataSub3[0]?.heading}
            </h1>
            <span className="text-black leading-[25px] text-[18px]">
              {Parser().parse(dataSub3[0]?.content)}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AboutUs;
