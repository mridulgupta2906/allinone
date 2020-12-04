const model=require('../model/search_model')
const logger=require('../logger');
const pool = require('../db');
const { data } = require('../logger');
const LD = require("levenshtein-distance");
const { response } = require('express');
const fs = require('fs');
const path = require('path');
const e = require('express');


// exports.search=async(req,res)=>{
//     try{
//     let name=req.body.name;
//     let limit=req.body.limit;
//     let result =await model.searchproduct(name,limit);
//     let result1=await model.searchcategory(name,limit);
//     let result2=await model.searchkeyword(name,limit);
//     // console.log("result"+result.rows)
//     // console.log("result1"+result1)
//     // console.log("result2"+result2.rows)
//     // JUST PREVIOUS SEARCHED DATA
//     let final;
//     let final7;
//     let last=[];
//     let searchelement=name[name.length-1]
//     let final2;
//     let r=result.rows;
//     let r1=result1.rows;
//     let r2=result2.rows;
//     let u;
//     final=r.concat(r1,r2);
//     console.log("final :"+final)
//         if(name.length!=1)
//         {
//             console.log("when two or more elements in string")
//             // console.log(final)
//             // final1=final.slice(0,10)
            
//             // console.log(final1)
//             let name1=name.substr(0,name.length-1)
//             let limit1=Math.ceil(limit/2);
//             let newresult =await model.searchproduct(name1,limit1);
//             let newresult1=await model.searchcategory(name1,limit1);
//             let newresult2=await model.searchkeyword(name1,limit1);
//             let v=newresult.rows;
//              let v1=newresult1.rows;
//              let v2=newresult2.rows;
//              final7=v.concat(v1,v2);    //array of json with key and id
//              for(i=0;i<final7.length-1||i==10;i++)
//             {
//                 final2=final7[i].name.substr(name.length-1,final7[i].name.length)
//                 let a=final2.search(`${searchelement}`);
//                 if(a!=-1)
//                 {
//                     let Json={
//                         name:'',
//                         key:''
//                     }
//                     Json.name=final7[i].name;
//                     Json.key=final7[i].key;
//                    last.push(Json);
//                   //console.log(last[i].name)
//                 }
//             }console.log("last array:  "+last)
//         }
//         if(name.length==1)
//         {
//            console.log("name.length==1 entered"); 
//         }
//         else
//         {
//             let arr=[];
//             for(p=0;p<final.length;p++) arr.push(final[p].name)
//             console.log(arr)
//             for(let b=0;b<last.length;b++)
//             {
//                 if(arr.includes(last[b].name)) console.log("final already has this element"+last[b].name);
//                 else final.push(last[b])
//             }
//         }
//    if(result) {
//         res.status(200).json({
//             status:'success',
//             statusCode:200,
//             message:"searched elements:",
//             data:final
//         })
//     }
//     else
//         {
//             res.status(200).json({
//                 status:'Error',
//                 statusCode:400,
//                 message:"did'nt search",
//                 data:[]
//             })
//         }
//     }catch(error)
//     {
//         logger.error(`errror (searchcontroller->search) : ${error.message}`)
//         res.status(500).json({statusCode:500,status:error,message:error.message})
//     }
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                                            //NEW SEARCH WITH ML FUNCTION

// module.exports.search=async(req,res)=>{
//         try
//         {
//             let name=req.body.name;
//             let limit=req.body.limit;
//             let re=[];
//             let arr=[];
//             let str=name.split(' ')
//             let merge;
//             console.log(str)
//             if(str.length>1)    //for multiple words in search string........................
//             {
//                 for(let i=0;i<str.length;i++)
//                 {
//                     if(str[i].length==1)    //when one of the word in search string is single letter
//                     {
//                         let result2=await model.searchdirectcase(str[i],limit);
//                         if(result2.rows.length)
//                         {
                            
//                             for(let l=0;l<result2.rows.length;l++)
//                             {
//                                 arr.push(result2.rows[l].name);
                                
//                             } console.log(`result2 :   ${arr}`)   
//                         }
//                         else continue;

//                     }   
//                     else            //when one of the word in search string is more than one letter
//                     {
//                         let newname=str[i].substr(0,str[i].length-1)
//                         let result3=await model.searchdirectcase(newname,limit)
//                         if(result3.rows.length)
//                         {
                           
//                             for(let k=0;k<result3.rows;k++)
//                             {
//                              arr.push(result3.rows[k].name);
//                              }console.log(` result3 : ${arr}`)
//                         }
//                         else continue;

//                     }                                                                                    
//                 }               //at the end of loop we get arr array with all key and name as json

//                 if(arr.length==0) arr=[]
//                 else 
//                 {
//                     merge=arr.flat(1);
//                 }console.log("result2 and result3 : "+arr) 
            
//             }
//             else        //when search string in total consists only one word
//             {
//                 let result1=await model.searchdirectcase(name,limit);
//                 if(result1.rows.length)
//                 {
//                    for(let r=0;r<result1.rows.length;r++)
//                     arr.push(result1.rows[r].name)
                    
//                 }
//                 else arr=[];
//                 console.log(`arr with only result1: ${arr}`)
//                  merge=arr;
//             }
           
           
            // let searchname=[];                          ///removal of duplicate items in arr array
            // for(j=0;j<merge.length;j++)
            // {
            //     if(!searchname.includes(merge[j])) 
            //     {
            //         searchname.push(merge[j]);

            //     }   
            // }
//             /////////////////////////////////    here start sequencing of searchname obtained from database

//             let collection = new LD(searchname)
//             collection.find(name,function(result)
//             {
//                 re.push(result);
//                 console.log(re)
//             })
//             // if(re.length)
//             // {
                
//             //     end.shift(Json) 
//             // }
            
//             if(merge.length) {
//                         res.status(200).json({
//                             status:'success',
//                             statusCode:200,
//                             message:"searched elements:",
//                             data:searchname
//                         })

//                     }
//             else
//                         {
//                             res.status(200).json({
//                                 status:'Error',
//                                 statusCode:400,
//                                 message:"did'nt search",
//                                 data:[]
//                             })
//                         }
//         }
//         catch(error)
//         {
//             logger.error(`error (searchcontroller->search) : ${error.message}`)
//             res.status(500).json({statusCode:500,status:error,message:error.message})
//         }


// }

module.exports.search=async(req,res)=>{
    try
  {
        
        let name=req.body.name;
        let limit=req.body.limit;
        let updated=[];
        let arr=[];
        let str=name.split(' ')
        let merge=[];
        if(str.length>1)    //for multiple words in search string........................
        {
                for(let i=0;i<str.length;i++)
                {
                    if(str[i].length==1)   //when one of the word in search string is single letter
                    {
                        let result2=await model.searchdirectcase(str[i],limit);
                        if(result2.rows.length)
                        {
                            
                            for(let l=0;l<result2.rows.length;l++)
                            {
                                arr.push(result2.rows[l].name);
                            } 
                            //console.log("result2 :"+arr)   
                        }
                        else continue;
                    }   
                    else    //when one of the word in search string is more than one letter
                    {
                        let newname=str[i].substr(0,str[i].length-1)
                        let result3=await model.searchdirectcase(newname,limit)
                        if(result3.rows.length)
                        {
                            for(let k=0;k<result3.rows.length;k++)
                            {
                                 arr.push(result3.rows[k].name);
                            }
                            //console.log("result3 : "+arr+" "+arr.length)
                        }
                        else continue;
                    }                                                                                    
                } //console.log("str.length>1"+arr+" : "+arr.length)
                if(arr.length==0) merge=[]
                else 
                {
                    merge=arr.flat(1);
                } 
        }
        else
        {
            let newname='';
            if(name.length==1)newname=name
            else newname=name.substr(0,name.length-1)
            let result1=await model.searchdirectcase(newname,limit);
            if(result1.rows.length)
            {
                for(let r=0;r<result1.rows.length;r++)
                {
                    arr.push(result1.rows[r].name)
                } 
            }
            else arr=[];
            merge=arr;
        }
     /////////////////////////////////////////      ALL KEYWORDS CALLED FROM DATABASE        /////////////  
        
    let searchname=[];                  ///removal of duplicate items in arr array
    for(j=0;j<merge.length;j++)
    {
        if(!searchname.includes(merge[j])) 
        {
             searchname.push(merge[j]);
        }   
    }
    console.log(searchname)
    let collection = new LD(searchname)
    collection.find(name,function(result)
    {
        updated.push(result);
    });console.log("updated: "+updated) 
    
    if(updated.length>0)
    {
        for(n=0;n<updated.length;n++)
        {
            let index=searchname.indexOf(updated[n])
            if(searchname.length==index){searchname.pop();searchname.unshift(updated[n])}
            else if(index==0)continue;
            else {searchname.splice(index,index+1);searchname.unshift(updated[n])}
        }
    }       
            
    ///////////////////////////////////////////     RETURN RESPONSE TO API CALL     ///////////////////////
    if(merge.length)
    {
        res.status(200).json({
            status:'success',
            statusCode:200,
            message:"searched elements:",
            data:searchname
        })
    }
    else
    {
        res.status(200).json({
            status:'Error',
            statusCode:400,
            message:"did'nt search",
            data:[]
        })
    }
  }        
  catch(error)
  {
      console.log(`error : ${error}`)
  }

}