import React, {useState,useEffect} from 'react';
import {localMockData,url} from "./data.js";
import {Container,Button,Input,TextField,IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {root,completionResultsBox,searchStyle,resultItemStyle} from './styles.js'
import axios from 'axios';

export const AutoCompletion=()=>{
  const [inputContent,setInputContent]=useState("");

  const [mockData,setMockData]=[];

  
   //retrieve the mock data from an online json file
  useEffect(() => {
    let mounted = true;
    axios.get(url)
      .then(res => {
        if(mounted) {
          setMockData(res.data);
        }
      })
    return () => mounted = false;
  }, [])

//the mock data is default read from an online json file.If the link is broken, it is read from local dataset
  const mockdataSet =mockData||localMockData;

/*the following function is used to dynamically match and display the completion results from the dataset giving a search content*/
  const completionResult=(dataSet)=>{
  /*first, convert the input search content and the words in dataset to lower case */
  /*loop through the whole dataset and find the element that match the user's input content at current monent */
  /*return the results array*/
  /*use array.map() to render each recommendation item in the list*/
     var results;
     var display;
     if(inputContent.length>0){
     results = dataSet.filter(ele=>ele.toLowerCase().slice(0,inputContent.length)===inputContent.toLowerCase())
       if(results.length>0){
         return results.map((ele,index)=>(<li key={index} style={resultItemStyle} onClick={()=>setInputContent(ele)}>{ele}</li>))
       }
   }
  }

  return (
    <div>
    <Container id="root" style={root}>
    <p style={{height:'30px',fontSize:'24pt',fontWeight:'400'}}>Auto Completion Demo</p>
    <form style={searchStyle}>
    <TextField 
      id="searchField" 
      type="text" 
      variant="outlined" 
      placeholder="search word" 
      value={inputContent} 
      style={{paddingTop:'10px'}}
      onChange = {e => setInputContent(e.target.value)} />

    {/*search icon button for open the link in google search page*/}
   <IconButton 
       id='searchIcon' 
       type="submit" 
       sx={{ p: '10px' }} 
       aria-label="search" 
       href={"https://www.google.com/search?q="+inputContent} 
       target="_blank" 
       style={{marginTop:'10px'}}>
    <SearchIcon fontSize='large' />
   </IconButton>
    </form>
    
      {/*when serach content is typed,show the completion result box*/}
    {(inputContent.length>0)&&
    (<div id="completionBox" style={completionResultsBox}>
    {completionResult(mockdataSet)}
    </div>)
    }
    </Container>
    </div>
  )
}
