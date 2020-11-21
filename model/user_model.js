const pool = require("../db");
// const { v1 } = require("uuid");
const func =require('../function')
var nodemailer = require('nodemailer');
const logger=require('../logger')


exports.logincheck=async(password,name,phone)=>{
      try{
        let sqlQuery=`SELECT id FROM "user" where password=$1 and name=$2 and phone=$3`
        let data=[password,name,phone];
        let result=await pool.query(sqlQuery,data);
        return result;
      }
        catch(error){
          logger.error(`error (usermodel->logincheck) : ${error.message}`)
        }
        
}

exports.forgetpassword=async(email)=>{
       // console.log(password,phone,name);
        try{
        let sql= await pool.query(`select id from "user" where email='${email}'`);
        if(!sql.rowCount>0){
             var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'k2c2222@gmail.com',
                pass: 'Terimaka@22222'
              }
            });
            var mailOptions = {
              from: 'k2c2222@gmail.com',
              to: email,
              subject: 'RESET PASSWORD',
              text: 'password reset link is: '
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            return 5;
        } 
        else return 2; 
        
    }catch(error){
            logger.error(`error (usermodel->forgetpassword)  : ${error.message}`);
        }   
    }

exports.signup=async(keys,values)=>{
     let id=func.generateUUID();
        let sqlQuery="";
        let sqlQuery2="";
        let sql="";
        for(i=0;i<keys.length;i++){
                sqlQuery=sqlQuery +`${keys[i]},`;
                sqlQuery2=sqlQuery2+`'${values[i]}',`  
              }
              sql='INSERT INTO "user" (id,'+sqlQuery.substr(0,sqlQuery.length-1)+') values($1,'+sqlQuery2.substr(0,sqlQuery2.length-1)+')';
              //console.log(sql);
        // let sqlQuery=`INSERT INTO "user" (name,id,password,phone,email,age) values($1,$2,$3,$4,$5,$6)`;
        let data=[id];
         let result=await pool.query(sql,data);
         if(result.rowCount>0){
            console.log("executed");
            return id;
        }
        else console("error");
}

exports.update_user_profile=async(keys,values)=>{
    let c="";
    let v="";
    let sqlQuery=""; 
    let index=keys.indexOf("id");

    let sql='UPDATE "user" set ';
    try{
        for(i=0;i<keys.length;i++){
          if(i==index) continue;
          else{
            sqlQuery=sqlQuery +`${keys[i]}='${values[i]}',`;
            } 
        }
        sqlQuery=sql+sqlQuery;
        sql1=sqlQuery.substr(0,sqlQuery.length-1);
        sql=sql1+" where id=$1";
       data=[values[index]];
       let result=await pool.query(sql,data);
       if(result.rowCount>0) return values[index];
    }catch(error){
      logger.error(`error (usermodel->updateuserprofile) : ${error.message}`)
    }


}

exports.deleteuser=async(id)=>{
  let sql=`DELETE FROM "user" where id=$1;`
  let data=[id]; 
  let result=await pool.query(sql,data);
  if(result.rowCount>0) return id;
  else return 0;
}









