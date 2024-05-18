/*
'''These Codes Are Written By Mehdi Touyserkani
    Email Address: Ir_Bestpro@yahoo.com
    Website: Https://www.Ir-Bestpro.com
 '''
*/

export default function ResultComponent({results}){
    if(results){
        if(results.score === -1)
        {
            return (<div style={{display : "flex" , justifyContent : "center" , fontSize : "25px" , color:"navy" , paddingTop : "20px"}}>
                Searching for Perfect Matched Jobs ...
            </div>)
        }
        else
        {
            return(
                <div style={{border:"solid thin navy" , padding : "10px" , paddingLeft: "1px" ,  display : "flex" , flexWrap : "wrap" , width : "98.6%" , marginTop : "8px"}}> 
                    <div style={{border:"solid thin navy" , padding : "10px" , flex:"100%" , marginLeft : "0.5%" , color:"navy"}}> Fitness Score : {results.score} </div>
                    {
                        results.response.map(x=> 
                            <div style={{border : "solid thin navy" , color : "navy" , flex:"32%" , marginLeft : "0.5%" , padding : "10px"}}>
                                <div><span> Title :</span> <span>{x.Title}</span> </div>
                                <div><span> Company :</span> <span>{x.Company}</span> </div>
                                <div><span> Location :</span> <span>{x.Location}</span> </div>
                                <div><span> Salary :</span> <span>{x.Salary}</span> </div>
                                <div><span> Levels :</span> <span>{x.Levels}</span> </div>
                            </div>    
                        )
                    }
                </div>
            )
        }
    }
}