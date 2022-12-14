import axios from 'axios'
import { NextPage } from 'next'
import Head from 'next/head'
import CovidChart from '../components/CovidChart'
import { HistoricalPerDay, HistoricalResponse } from '../models/diseasesh'
import { HomePageProps } from '../models/home'

const Home: NextPage<HomePageProps> = (props) => {
  return (
    <div>
      <Head>
        <title>Covid Global Cases</title>
        <meta name="description" content="Covid Global Cases by Destwofe fot SGN" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 style={{ textAlign: 'center' }}>
          Covid Global Cases by Destwofe for SGN
        </h1>

        <CovidChart data={props.data} />
      </main>

      <footer>
        Powered by Destwofe
      </footer>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  // https://disease.sh/v3/covid-19/historical?lastdays=30
  const response = await axios.get('https://disease.sh/v3/covid-19/historical?lastdays=30')
  const responseData = response.data as Array<HistoricalResponse>

  // parse data in to easier format for page
  const historicalPerdays: Array<HistoricalPerDay> = []
  const dates = Object.keys(responseData[0].timeline.cases)
  for (let index = 0; index < dates.length; index++) {
    const element = dates[index];
   
    const data: {country: string, cases: number}[] = []

    for (let index = 0; index < responseData.length; index++) {
      const elementC = responseData[index];

      const found = data.find(a => a.country === elementC.country)
      if (found) {
        found.cases += elementC.timeline.cases[element]
      } else {
        data.push({
          country: elementC.country,
          cases: elementC.timeline.cases[element]
        })
      }
    }

    historicalPerdays.push({
      date: element,
      data: data.sort((a, b) => b.cases - a.cases),
    })
  }

  return { props: { data: historicalPerdays } }
}
