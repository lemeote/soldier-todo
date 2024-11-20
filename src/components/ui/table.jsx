import React from "react";

import {
  tableStyle,
  headerStyle,
  cellStyle,
  groupColors,
} from "../../style/table";
import { prefectureNames } from "../../util/table";

const Table = ({ populationData, groups }) => {
  const prefectureEntries = Object.entries(prefectureNames);

  if (!Object.keys(populationData).length) {
    return <p style={{ textAlign: "center" }}>No data available.</p>;
  }

  return (
    <table style={tableStyle} aria-label="Population data by prefectures">
      <thead>
        <tr>
          <th style={{ ...cellStyle, ...headerStyle }}>年代</th>
          {prefectureEntries.map(([key, name]) => (
            <th key={key} style={{ ...cellStyle, ...headerStyle }}>
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.keys(populationData)
          .sort((a, b) => b - a)
          .map((year) => (
            <tr key={year}>
              <td style={cellStyle}>{year}</td>
              {prefectureEntries.map(([code, area]) => {
                const groupIndex = groups.findIndex((group) =>
                  group.includes(area)
                );
                const color = groupColors[groupIndex] || "white";

                return (
                  <td
                    key={code}
                    style={{ ...cellStyle, backgroundColor: color }}
                  >
                    {populationData[year]?.[code] || "-"}
                  </td>
                );
              })}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
