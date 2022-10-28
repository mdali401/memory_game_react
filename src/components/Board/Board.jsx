import React, {useState, useCallback} from 'react'
import useGetImages from '../../hooks/useGetImages'
import {Button, Grid} from '@mui/material'
import './Board.css'
import { useEffect } from 'react'
import Confetti from 'react-confetti'


export const Board = ({gameOptions, restartGame}) => {
  const [formattedImageData, setFormattedImageData] = useState([])
  const [gameWon, setGameWon] = useState(false)
  const images = useGetImages(gameOptions)
  
  function checkPairMatch() {
    console.log('run')
    const flippedPair = formattedImageData.filter(item => item.isClicked)
    console.log(flippedPair)
    if(flippedPair.length < 2) return 
    if(flippedPair.every(item => item.id === flippedPair[0].id))
    {
      setFormattedImageData(oldData => oldData.map(item => {
        return flippedPair[0].id === item.id ?
        {...item, isActive: false}
        :
        item
      }))
    }
  }

  function checkGameWinStatus() {
    if(formattedImageData.length && formattedImageData.every(item => item.isActive === false))
    {
      console.log('You WON!')
      setGameWon(true)
    }
  }

  function handleClick(position) {
    
    if(!formattedImageData[position].isActive)
      return

    let userClickCount = formattedImageData.filter(item => item.isClicked).length
    
    if(userClickCount >= 2) return

    setFormattedImageData(oldData => oldData.map((item, index) => (
      position == index ? 
      {...item, isClicked:true}
      :
      item
    )))
    setTimeout(() => {
      setFormattedImageData(oldData => oldData.map((item, index) => (
        position == index ? 
        {...item, isClicked:false}
        :
        item
      )))
    }, 700)
    
  }

  useEffect(() => {
    if(gameWon) return
    checkPairMatch()
    checkGameWinStatus()
  })

  useEffect(()=>{
    
    images.length && setFormattedImageData(images.map((item) => {
      return {
        id: item.id,
        src: item.src.small,
        isClicked: false,
        isShown: false,
        isActive: true
      }
    }))

    setFormattedImageData(oldImages => [...oldImages, ...oldImages])
  }, [images.length])
    
  
  
  return (
    <>
    <Grid container justifyContent='center' spacing = '10' padding='50px 30%'>
      {formattedImageData.map((imageData, index) => {
        return <Grid key={index} onClick={() => handleClick(index)} item border='2px solid black' justifyContent='center' xs={12} md={4} lg={3}>
        <img className ={(imageData.isClicked || !imageData.isActive) ? '': 'img-flipped'}  src={imageData.src} alt='' /></Grid>
      })}
      
    </Grid>
    <Button onClick = {restartGame}>New Game</Button>
    {gameWon && <Confetti />}
    </>
    
  )
}


export default Board;