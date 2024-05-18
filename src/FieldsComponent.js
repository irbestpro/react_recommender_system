/*
'''These Codes Are Written By Mehdi Touyserkani
    Email Address: Ir_Bestpro@yahoo.com
    Website: Https://www.Ir-Bestpro.com
 '''
*/


import {useImperativeHandle,useMemo,forwardRef, useRef } from 'react';
import { JOBS } from "./Data";

const Dataset = JOBS;
var unqique_titles = ["Data Scientist"];
var unqique_companies = ["Numerdox"];
var unqique_locations = ["Sacramento, CA"];
var unqique_levels = ["Sacramento, Jr."];

const FieldsComponent = forwardRef(function FieldsComponent(props , ref){

   const temp_ref = useRef([]); // set temp_ref to make components accessible

    //_______Caching Unique Values Extraction Process___________________

    useMemo(()=>{
        Dataset.map(x=> unqique_titles.filter(y=> y===x.Title).length === 0 ? unqique_titles.push(x.Title):x)
        Dataset.map(x=> unqique_companies.filter(y=> y===x.Company).length === 0 ? unqique_companies.push(x.Company):x)
        Dataset.map(x=> unqique_locations.filter(y=> y===x.Location).length === 0 ? unqique_locations.push(x.Location):x)
        Dataset.map(x=> unqique_levels.filter(y=> y===x.Levels).length === 0 ? unqique_levels.push(x.Levels):x)
    } , []);

    //_______________Imperative Handler_________________________________

    useImperativeHandle(ref,()=>{
        return{
            //________Check All Fields Validity_______________________

            Validation(){ 
                var flag = false;
                var data = [];
                for(var i=0; i<= temp_ref.current.length-1 ; i++){
                    if(temp_ref.current[i]){
                        if(temp_ref.current[i].value == -1 || temp_ref.current[i].value === "") {
                            flag = true;
                            temp_ref.current[i].style.border = "solid thin red";
                        }
                        else{
                            temp_ref.current[i].style.border = "solid thin silver";
                            data.push(temp_ref.current[i].value); // push value to data
                        }
                    }
                }

                if(!flag){
                    return data;
                }
                else{
                    return null;
                }
            },

            //_______Checking Fields Boundary for Genetic Algorithm_______________

            Unique_Values(){
                return {titles:unqique_titles , locations: unqique_locations , levels : unqique_levels}
            }
        }
    });

    //__________Return Layout____________________________________________

    return(
        <>
            <select id="Title" ref={(elm) => temp_ref.current[0]  = elm} style={{padding:"8px" , border : "solid thin navy" , marginLeft : "3px"}}>
                <option value={-1}>Please Select Job Title</option>
                {unqique_titles.map((x,index) => <option key={index} value={index+1}>{x}</option>)}
            </select>

            <select id="Locations" ref={(elm) => temp_ref.current[1] = elm} style={{padding:"8px" , border : "solid thin navy" , marginLeft : "3px"}}>
                <option value={-1}>Please Select Office Location</option>
                {unqique_locations.filter(x=>x!=="").map((x,index) => <option key={index} value={index+1}>{x}</option>)}
            </select>

            <select id="Levels" ref={(elm) => temp_ref.current[2] = elm} style={{padding:"8px" , border : "solid thin navy" , marginLeft : "3px"}}>
                <option value={-1}>Please Select Your Level</option>
                {unqique_levels.map((x,index) => <option key={index} value={index+1}>{x}</option>)}
            </select>

            <input type="number" id="Salary" ref={(elm) => temp_ref.current[3] = elm} placeholder="Expected Annual Salary" style={{padding:"8px" , border : "solid thin navy" , marginLeft : "3px"}}></input>
        </>
    )
});

export default FieldsComponent;