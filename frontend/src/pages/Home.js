import Layout from '../components/Layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {

  const [template, setTemplate] = useState([])
  const [rectangle, setRectangle] = useState([])

  useEffect(() => {
    getSavedTemplates()
    getSavedRectangle()
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
  const getSavedRectangle = () => {
    axios.get('http://localhost:3001/api/rectangle')
    .then((response) => {
      setRectangle(response.data.data);
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  console.log(rectangle)
  return (
    <>
      <Layout template = {template} rectangle = {rectangle}/>
    </>
  )
}

export default Home