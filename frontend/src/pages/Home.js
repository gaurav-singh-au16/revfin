import Layout from '../components/Layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {

  const [template, setTemplate] = useState([])

  useEffect(() => {
    getSavedTemplates()
  }, [])

  const getSavedTemplates = () => {
    axios.get('http://localhost:3001/api/template')
    .then((response) => {
      setTemplate(response.data.data);
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  // console.log(template)
  return (
    <>
      <Layout template = {template}/>
    </>
  )
}

export default Home