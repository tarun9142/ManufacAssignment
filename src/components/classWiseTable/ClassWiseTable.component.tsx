import { Table } from "@mantine/core";

import WINE_DATASET from '../../resources/Wine-Data.json';
const ClassWiseTable = () => {
  interface WineData {
    Alcohol: any;
    "Malic Acid": any;
    Ash: any;
    "Alcalinity of ash": any;
    Magnesium: any;
    "Total phenols": any;
    Flavanoids: any;
    "Nonflavanoid phenols": any;
    "Proanthocyanins": any;
    "Color intensity": any;
    Hue: any;
    "OD280/OD315 of diluted wines": any;
    "Unknown": any;
  }

  // Read data from JSON file

  const WINR_DATASET: WineData[] = WINE_DATASET;
  // Group data by 'Alcohol' key
  const groupedData: { [alcohol: number]: WineData[] } = {};
  WINR_DATASET.forEach((item) => {
    if (groupedData[item.Alcohol] === undefined) {
      groupedData[item.Alcohol] = [];
    }
    groupedData[item.Alcohol].push(item);
  });

  // Calculate mean, mode, and median of 'Flavanoids' and 'Gamma' for each group
  const statsByAlcohol: {
    [alcohol: number]: {
      flavanoidMean: number;
      flavanoidMode: number[];
      flavanoidMedian: number;
      gammaMean: number;
      gammaMode: number[];
      gammaMedian: number;
    };
  } = {};

  for (const alcohol in groupedData) {
    console.log("Class", alcohol)
    const flavanoids = groupedData[alcohol].map(item => parseFloat(item.Flavanoids));
    const ash = groupedData[alcohol].map(item => parseFloat(item.Ash));
    const hue = groupedData[alcohol].map(item => parseFloat(item.Hue));
    const magnesium = groupedData[alcohol].map(item => parseFloat(item.Magnesium));
    console.log("flavonoids>>>>", flavanoids)
    // Calculate Gamma
    const gamma = ash.map((ashValue, index) => (ashValue * hue[index]) / magnesium[index]);

    // Calculate mean of Flavanoids
    const flavanoidMean = +(calculateMean(flavanoids).toFixed(3));

    // Calculate mode of Flavanoids
    const flavanoidMode = calculateMode(flavanoids).map(num => +(num.toFixed(3)));

    // Calculate median of Flavanoids
    const flavanoidMedian = +(calculateMedian(flavanoids).toFixed(3));

    // Calculate mean of Gamma
    const gammaMean = +(calculateMean(gamma).toFixed(3));

    // Calculate mode of Gamma
    const gammaMode = calculateMode(gamma).map(num => +(num.toFixed(3)));

    // Calculate median of Gamma
    const gammaMedian = +(calculateMedian(gamma).toFixed(3));

    statsByAlcohol[Number(alcohol)] = { flavanoidMean, flavanoidMode, flavanoidMedian, gammaMean, gammaMode, gammaMedian };
  }
  console.log("?>>>>", statsByAlcohol)
  function calculateMean(data: number[]): number {
    const sum = data.reduce((acc, val) => acc + val, 0);
    return sum / data.length;
  }

  function calculateMode(data: number[]): number[] {
    const counts: { [key: number]: number } = {};
    data.forEach(value => {
      counts[value] = (counts[value] || 0) + 1;
    });

    let maxCount = 0;
    for (const key in counts) {
      if (counts.hasOwnProperty(key)) {
        const count = counts[key];
        if (count > maxCount) {
          maxCount = count;
        }
      }
    }

    const mode: number[] = [];
    for (const key in counts) {
      if (counts.hasOwnProperty(key)) {
        const count = counts[key];
        if (count === maxCount) {
          mode.push(Number(key));
        }
      }
    }

    return mode;
  }
  function calculateMedian(data: number[]): number {
    const sortedData = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sortedData.length / 2);
    return sortedData.length % 2 !== 0 ? sortedData[mid] : (sortedData[mid - 1] + sortedData[mid]) / 2;
  }

  const flavanoidMeanRow = Object.keys(statsByAlcohol).map((ele) => {
    return (
      <Table.Td>{statsByAlcohol[parseInt(ele)].flavanoidMean} </Table.Td>
    )
  })
  const flavanoidModeRow = Object.keys(statsByAlcohol).map((ele) => {
    return (
      <Table.Td>{(statsByAlcohol[parseInt(ele)].flavanoidMode).toString()} </Table.Td>
    )
  })
  const flavanoidMedianRow = Object.keys(statsByAlcohol).map((ele) => {
    return (
      <Table.Td>{statsByAlcohol[parseInt(ele)].flavanoidMedian} </Table.Td>
    )
  })

  const gammaMeanRow = Object.keys(statsByAlcohol).map((ele) => {
    return (
      <Table.Td>{statsByAlcohol[parseInt(ele)].gammaMean} </Table.Td>
    )
  })
  const gammaModeRow = Object.keys(statsByAlcohol).map((ele) => {
    return (
      <Table.Td>{(statsByAlcohol[parseInt(ele)].gammaMode).toString()} </Table.Td>
    )
  })
  const gammaMedianRow = Object.keys(statsByAlcohol).map((ele) => {
    return (
      <Table.Td>{statsByAlcohol[parseInt(ele)].gammaMedian} </Table.Td>
    )
  })


  return (
    <>
      <Table withTableBorder withColumnBorders withRowBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Measure</Table.Th>
            {Object.keys(statsByAlcohol).map((e) => (<Table.Th>Class{e}</Table.Th>))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr><Table.Th>FlavanoidsMean</Table.Th>{flavanoidMeanRow}</Table.Tr>
          <Table.Tr><Table.Th>FlavanoidsMedian</Table.Th>{flavanoidMedianRow}</Table.Tr>
          <Table.Tr><Table.Th>FlavanoidsMode</Table.Th>{flavanoidModeRow}</Table.Tr>
        </Table.Tbody>
      </Table>
      <br />
      <br />
      <br />
      <Table withTableBorder withColumnBorders withRowBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Measure</Table.Th>
            {Object.keys(statsByAlcohol).map((e) => (<Table.Th>Class{e}</Table.Th>))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr><Table.Th>GammaMean</Table.Th>{gammaMeanRow}</Table.Tr>
          <Table.Tr><Table.Th>GammaMedian</Table.Th>{gammaMedianRow}</Table.Tr>
          <Table.Tr><Table.Th>GammaMode</Table.Th>{gammaModeRow}</Table.Tr>
        </Table.Tbody>
      </Table>
    </>
  );
};

export default ClassWiseTable;
