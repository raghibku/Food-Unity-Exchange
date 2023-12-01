import React from 'react'
import { Helmet } from "react-helmet";
import Banner from './Banner'
import FeaturedFoods from './FeaturedFoods'
import Testimonials from './Testimonials'
import FAQ from './FAQ'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Food Unity Exchange | Home</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <Banner />
      <FeaturedFoods />
      <Testimonials />
      <FAQ />
    </div>
  )
}

export default Home