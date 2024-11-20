import React, { useEffect, useState } from "react";

import useFetchPopulationData from "./hooks/useFetchPopulationData";
import useFriendshipScores from "./hooks/useFriendshipScores";
import Table from "./components/ui/table";
import Header from "./components/ui/header";
import findOptimalGrouping from "./components/entities/bestFriendShipGroup";

const App = () => {
  const [groups, setGroups] = useState([]);
  const [populationData, setPopulationData] = useState({});

  const {
    friendshipScores,
    handleFileUpload,
    handleUpdateScores,
  } = useFriendshipScores();

  
  const temporaryPopulationData = useFetchPopulationData();

  useEffect(() => {
    setPopulationData(temporaryPopulationData);
  }, [temporaryPopulationData]);


  useEffect(() => {
    const bestGroups = findOptimalGrouping(friendshipScores);
    setGroups(bestGroups);
  }, [friendshipScores]);

  return (
    <div>
      <Header handleFileUpload={handleFileUpload} handleUpdateScores={handleUpdateScores}/>
      <Table populationData={populationData} groups={groups} />
    </div>
  );
};

export default App;
