import React, {useState} from 'react'
import {Button,Grid, Typography, Radio, IconButton} from '@mui/material'
import {RemoveCircleOutline, AddCircleOutline} from '@mui/icons-material'
import { CATEGORIES, DIFFICULTY, INITIAL_CARDS_COUNT } from '../../constants'

const Settings = ({setGameOptions}) => {
    const [options, setOptions] = useState({
        category: CATEGORIES[0],
        difficulty: DIFFICULTY[0],
        cards_count: INITIAL_CARDS_COUNT
    })

    const STEP_COUNT_FOR_SIZE = 2;

    function handleSizeDecrement() {
        if(options.cards_count <= 12)
            return
        setOptions(oldOptions => ({...oldOptions, cards_count: options.cards_count - STEP_COUNT_FOR_SIZE}))
    }

    function handleSizeIncrement() {
        if(options.cards_count >= 50)
            return
        setOptions(oldOptions => ({...oldOptions, cards_count: options.cards_count + STEP_COUNT_FOR_SIZE}))
    }

    console.log(options)
  return (
    <Grid container sx={{border:'2px solid green', justifyContent:'center', alignItems:'center',height:'100vh'}}>
     <Grid item align='center' sx={{border:'2px solid blue', padding:'20px', borderRadius:'10px'}}>       
        <Typography>Settings</Typography>
                
        <Typography sx={{marginTop:'20px'}}>Category</Typography>
        <div>
        {CATEGORIES.map(category => {
            return <React.Fragment key={category}><Radio name={category} value={category} checked={category === options.category} onChange={() => setOptions({...options, category:category})}/><label style={{marginRight:'15px'}}>{category}</label></React.Fragment>
        })}
        </div>
        <Typography sx={{marginTop:'20px'}}>Difficulty</Typography>
        <div>
        {DIFFICULTY.map(difficulty => {
            return <React.Fragment key={difficulty}><Radio key={difficulty} name={difficulty} value={difficulty} checked={difficulty === options.difficulty} onChange={() => setOptions({...options, difficulty:difficulty})}/><label style={{marginRight:'15px'}}>{difficulty}</label></React.Fragment>
        })}
        </div>

        <Typography sx={{marginTop:'20px'}}>Size</Typography>
        <Grid container direction='row' sx={{justifyContent:'center', alignItems:'center'}}>
            <IconButton onClick={handleSizeDecrement}>
                <RemoveCircleOutline />
            </IconButton>
            <Typography>{options.cards_count}</Typography>
            <IconButton onClick={handleSizeIncrement}>
                <AddCircleOutline />
            </IconButton>
        </Grid>
        <Button variant='contained' color='success' onClick={() => setGameOptions(options)}>Play</Button>
     </Grid> 
    </Grid>
  )
}

export default Settings