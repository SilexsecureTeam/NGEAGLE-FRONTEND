import React, { useEffect } from 'react'
import useRequest from '../hooks/useRequest'
import { Parser } from "html-to-react";
import fetchImages from '../hooks/useFetchImages'

function UtilPagesWrapper({
  backgroundImg,
  primaryImg,
  primaryContent,
  primaryImgPosition,
  title,
  path,
}) {

  const { data, fetchData } = useRequest(`threePageView/${path}`)

  useEffect(() => {
    fetchData(`threePageView/${path}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  return (
    <div className="relative">
      <div className="bg-fixed bg-center bg-full lg:bg-contain h-[25vh] lg:h-[80vh]" style={{ backgroundImage: `url(${fetchImages(data[0]?.banner_image)})` }} />
      <div className={`w-[90%] absolute left-[5%] flex flex-col  lg:flex-row ${primaryImgPosition === 'right' && 'lg:flex-row-reverse flex-col'} gap-[3%] lg:gap-[5%] items-end px-[5%] pb-[3%] pt-[5%] top-[80px] lg:top-[270px] bg-white h-[120vh] lg:h-[100vh]`}>
        <div className="h-[85%] w-[50%] lg:w-[32%] flex items-end">
          <img
            src={fetchImages(data[0]?.side_image)}
            className="lg:h-full h-[80%]  border w-[80%]"
            alt={data[0]?.title || "Detail Image"}
          />
          <div className="h-[60%] w-[3%] bg-[#69ab4a]" />
        </div>

        <div className="flex flex-col h-[90%] gap-[3%] lg:gap-[8%] w-full lg:w-[60%]">
          <div className="flex h-[10%] gap-[3%] w-full">
            <div className="h-[80%] w-[10px] bg-[#69ab4a]" />
            <h1 className="font-bold tracking-wide text-[18px]">{data[0]?.title}</h1>
          </div>
          {Parser().parse(data[0]?.content)}
        </div>


      </div>

      <div className="h-[120vh] w-full"></div>


      <div className="h-[35vh] gap-[10px] w-full flex items-center justify-center bg-[#10172b]">

        <div className="p-[10px] w-[85%] justify-between items-start lg:items-center gap-[20px] lg:gap-0 flex flex-col lg:flex-row border-b border-b-[#69ab4a]">
          <div className="flex flex-col gap-[10px] lg:gap-[20px]">
            <h2 className="text-[18px] lg:text-[24px] flex gap-[10px] font-bold text-[#69ab4a]">NG<span className="text-white">{`Eagle ${title}`}</span></h2>
            <span className="text-[12px] lg:text-[16px] text-white">Download a shareable and printable document containing general information about this subsidiary.</span>
          </div>

          <button className="lg:p-[10px] p-[5px] lg;text-sm text-[11px] text-[#69ab4a] border-2 border-[#69ab4a]">
            chartered@ngeagle.com
          </button>
        </div>
      </div>
    </div>
  );
}

export default UtilPagesWrapper;
