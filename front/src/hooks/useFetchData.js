import { useEffect, useState } from "react";

export default function useFetchData (url, way) {

    const [datas, setDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            async function fetchDatas () {
              try {
                const response = await fetch(`${url}/${way}`);
                if (response.ok) {
                  const datasBack = await response.json();
                  console.log(datasBack);
                  const modifiedDatasBack = datasBack.map((s) =>
                    s.likes === 1 ? { ...s, likes: true } : { ...s, likes: false }
                  );
                  const newModifiedDatas = await Promise.all(
                    modifiedDatasBack.map(async(s) => {
                      if (s.image === null) {
                        const response = await fetch(
                          URL.createObjectURL(
                            new Blob([new Uint8Array(s.imgBlob.data)])
                          )
                        )
                        const text = await response.text()
                        s.image = text
                      }
                      return { ...s}
                    })
                  )
                  setDatas(newModifiedDatas);
                }
              } catch (error) {
                console.error(error);
              } finally {
                setIsLoading(false);
              }
            };
            fetchDatas();
          }, [url, way])
        return[[datas, setDatas], isLoading]
}