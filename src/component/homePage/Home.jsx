import { useEffect } from 'react'
import Middle from '../home/Middle'
import ThirdPart from '../home/thirdPart'
import Plane from '../../PLANE/Plane'
import FortPart from '../home/FortPart'
import Flips from "../../pages/Flips";

export default function Home() {

  const apiCalls = () => {
    const fleetTypesApi = 'https://demo.35-197-87-133.plesk.page/api/social';

    fetch(fleetTypesApi, {
      method: "POST",
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // axios
    //   .post(fleetTypesApi)
    //   .then((response) => {
    //    console.log(response)
    //     })
    //   .catch((error) => {
    //     console.log(error);
    //     if (error.response) {
    //       setErrorMessage(error.response.data.message);
    //     } else {
    //       setErrorMessage(error.message);
    //     }
    //   });
  };

  useEffect(() => {
    apiCalls()
  }, [])

  return (
    <>
      <Flips />
      <div style={{ position: 'relative' }}>
        <Plane />
      </div>
      <div>
        <div style={{ paddingLeft: '5px', paddingRight: '5px' }}>
          <div className="container m-auto  pb-3 pt-5">
            <h2>
              <b>Travel Experience</b>
            </h2>
          </div>

          <div className="">
            {/* <FirstIcons /> */}
          </div>
          <div>
            <Middle />
          </div>
        </div>

        <div>
          <ThirdPart />
        </div>
        <h1 className="text-center mt-5">
          <b>Popular Destinations</b>
        </h1>
        <div>
          <FortPart />
        </div>
      </div>
    </>
  )
}
