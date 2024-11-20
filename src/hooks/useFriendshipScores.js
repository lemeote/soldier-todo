import { useState } from "react";
import Papa from "papaparse";

const useFriendshipScores = () => {
  const [updatedScores, setUpdatedScores] = useState({});
  const [friendshipScores, setFriendshipScores] = useState({});

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (result) => {
          const scores = {};
          result.data.forEach((row) => {
            const from = row.x;
            scores[from] = {};
            Object.keys(row).forEach((to) => {
              if (to !== "x" && row[to] !== "-") {
                scores[from][to] = row[to];
              }
            });
          });
          setUpdatedScores(scores);
        },
      });
    }
  };

  const handleUpdateScores = () => {
    if (Object.keys(updatedScores).length > 0) {
      setFriendshipScores(updatedScores);
    } else {
      alert("Please upload a CSV file first.");
    }
  };

  return {
    friendshipScores,
    handleFileUpload,
    handleUpdateScores,
  };
};

export default useFriendshipScores;
