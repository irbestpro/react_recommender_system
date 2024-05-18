/*
'''These Codes Are Written By Mehdi Touyserkani
    Email Address: Ir_Bestpro@yahoo.com
    Website: Https://www.Ir-Bestpro.com
 '''
*/

import ReactDOM from "react-dom/client";
import {useRef,useEffect,useState } from 'react';
import { Genetic_Recommander_System } from "./Genetic";
import { JOBS } from "./Data";
import FieldsComponent from "./FieldsComponent";
import ResultComponent  from "./ResultComponent";

function Recommandar(){

    const ref = useRef(); // handle Fields Component
    const resultref = useRef(); // handle result component
    const [expectedState , SetExpectedState] = useState(null);
    const [resultstate , SetresultState] = useState(null);
    const [loadingState,SetLoadingState] = useState(false); // loadingState

    //_________Start Recommander by refs checking_______________________

    useEffect(()=>{
        async function startRecommander() {
            if(expectedState && !loadingState){
                SetresultState({response : "Loading" , score : -1});
                SetLoadingState(true);
            }
            else if(expectedState && loadingState){
                var uniques = ref.current.Unique_Values();
                var temp =[];
                await Genetic_Recommander_System(expectedState,uniques).then((x)=>{
                    for(var recommended of x.gens){
                        temp = [...temp , {Title : JOBS[recommended].Title , Company : JOBS[recommended].Company , Location : JOBS[recommended].Location , Salary : JOBS[recommended].Salary , Levels: JOBS[recommended].Levels }];
                    } 
                    SetresultState({response : temp , score: 1 - x.score});
                    SetExpectedState(null);
                    SetLoadingState(false);
                });
            }
        }   
        startRecommander(); 
    } , [expectedState,loadingState]);

    //________________Render the Component_________________________

    return(
        <>
            <div id="info" style={{width:"98%" , height:"auto" , border:"solid thin navy" , padding : "10px" , marginTop:"5px" , paddingTop:"13px" , display:"flex" , flexWrap : "wrap", justifyContent : "center"}}>
                <FieldsComponent ref={ref} />
                <button style={{padding: "8px", marginLeft:"3px" , backgroundColor : "transparent" , color:"navy" , cursor:"pointer" , border : "solid thin navy"}} 
                                onClick={(e)=> SetExpectedState(ref.current.Validation())}>See Recommended Jobs</button>
            </div>
            
            <ResultComponent results={resultstate} ref={resultref} />
        </>
    )
    
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Recommandar />);
