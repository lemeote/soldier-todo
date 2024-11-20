import { useState, useEffect } from "react";

const useFetchPopulationData = () => {
  const [populationData, setPopulationData] = useState({});

  useEffect(() => {
    const fetchPopulationData = async () => {
      try {
        const endpoints = [
          "http://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?appId=e7a210dc62d9977d72433f076b23c86d5063bf92&statsDataId=0003448233&lang=J&cdAreaFrom=08000&cdAreaTo=14000",
          "http://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?appId=e7a210dc62d9977d72433f076b23c86d5063bf92&statsDataId=0003448233&lang=J&cdArea=19000",
        ];

        const responses = await Promise.all(
          endpoints.map((url) => fetch(url).then((res) => res.json()))
        );

        const combinedData = responses.flatMap((response) => {
          return (
            response.GET_STATS_DATA?.STATISTICAL_DATA?.DATA_INF?.VALUE || []
          );
        });

        const formattedData = combinedData.reduce((acc, item) => {
          const year = item["@time"].slice(0, 4);
          const area = item["@area"];
          const percentage = item["$"];
          if (!acc[year]) acc[year] = {};
          acc[year][area] = percentage;
          return acc;
        }, {});

        setPopulationData(formattedData);
      } catch (error) {
        return error
      }
    };
    fetchPopulationData();
  }, []);
  return populationData;
};

export default useFetchPopulationData;
