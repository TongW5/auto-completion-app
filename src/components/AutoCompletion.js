import React, {useState,useEffect} from 'react';
import {localMockData,url} from "./data.js";
import {Typography,Box,Container,Button,Grid,Input,TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {root,completionResultsBox,searchStyle} from './styles.js'
import axios from 'axios';

export const AutoCompletion=()=>{
  const [inputContent,setInputContent]=useState("");

  const [mockData,setMockData]=[];

  const handelKeyPress=(e)=>{
    if(e.keyCode===13){

    }
  }

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

/*the following function is used to dynamically match and display the completion results from the dataset when giving a search content*/
  const completionResult=(dataSet)=>{
  /*first, make sure case insensitive of the input content that user typed */
  /*loop through the whole dataset and find the element that match the user's input content at current monent */
  /*return the result as the findResult array*/
  /*use array.map() to render each recommendation item list*/
     var results;
     var display;
     if(inputContent.length>0){
     results = dataSet.filter(ele=>ele.toLowerCase().slice(0,inputContent.length)===inputContent.toLowerCase())
       if(results.length>0){
         return results.map(ele=>(<li style={{listStyleType: 'none',fontSize:"16pt",marginBottom:'3px'}} onClick={()=>setInputContent(ele)}>{ele}</li>))
       }
   }
  }

  return (
    <div>
    <Container id="root" style={root}>
    <p style={{height:'30px',fontSize:'24pt',fontWeight:'400'}}>Auto Completion Demo</p>
    <form style={searchStyle}>
    <TextField id="search" type="text" variant="outlined" placeholder="search" value={inputContent} style={{paddingTop:'10px'}}
    onChange = {e => setInputContent(e.target.value)} />
    <Button variant="contained" style={{backgroundColor:'white',margin:'15px 0 0 15px',}} type="submit">
    <a target="_blank" href={"https://www.google.com/?q="+inputContent} style={{textDecoration:'none'}}>search</a>
   </Button>
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
