const express=require("express");

const { data } = require("./logger");
const func=require("./function");
const pool=require("./db");

exports.variantid=async(req,res)=>{
let count=0;
let arr=["voilet","indigo","blue","grey","orange","red","green","yellow","black","white","pink","brown","purple",
"xs","s","m","l","xl","xxl","xxxl","13","12","11","10","9","8","7","6","5","4","3","28","30","32","34","36","38","40",
"50","100","250","500","1000","1500","2000","5000","25"];
let j={};
for(let i=0;i<arr.length;i++)
{
    sql=`INSERT INTO "variant" (key,name) values ($1,$2);`
    let data=[func.generateUUID(),arr[i]];
    await pool.query(sql,data);
    console.log(count++);
}
console.log("successfull");
}