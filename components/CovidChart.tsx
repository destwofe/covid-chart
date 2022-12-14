import { useEffect, useState } from "react"
import { countryColor } from "../constants/colors"
import { CovidChartProps } from "../models/components"

const CovidChart: React.FC<CovidChartProps> = (props) => {
  const [running, setRunning] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRunning(v => v + 1);
    }, 180);
    return () => clearInterval(interval);
  });

  const historicalPerday = props.data[running % 30]

  const max = historicalPerday.data[0].cases

  return (
    <div>
      <p style={{ textAlign: 'center' }}>Date: {historicalPerday.date}</p>
      <div style={{ padding: 20 }}>
        {historicalPerday.data.map((item, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'row', height: 30, position: 'relative', alignItems: 'center', marginBottom: 2 }}>
            <div style={{ backgroundColor: countryColor[item.country] ?? 'red', width: `${item.cases / max * 100}%`, position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: -1 }} />
            <p>{item.country} ({item.cases} cases)</p>
          </div>
        ))}
        {/* <BarChart width={400} height={400} data={historicalPerday.data.map(a => ({ name: a.country, cases: a.cases }))}>
          <Bar dataKey="cases" />
        </BarChart> */}
        {/* <Bar options={options} data={data} /> */}
      </div>
    </div>
  )
}

export default CovidChart
