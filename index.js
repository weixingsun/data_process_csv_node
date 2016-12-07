'use strict';
const alasql = require('alasql')

//alasql("CREATE TABLE test1 (participant INT, age INT, sex string, region string, word string, time )");
function csv(sql,data,cbk) {
    alasql(sql,data,function(data){
      cbk(data)
    })
}
var sql1 = 
   'SELECT participant,age,sex,region,word,time_stamp, '
   +'min(X_00) as Ax,max(X_00) as Bx,max(Y_00) as Cy '
   +'FROM csv("test4.csv",{headers:true}) '
   +'group by participant,age,sex,region,word,time_stamp';
/*
var db = 'CREATE INDEXEDDB DATABASE IF NOT EXISTS stats;\
        ATTACH INDEXEDDB DATABASE stats; \
        USE stats; \
        DROP TABLE IF EXISTS test4; \
        CREATE TABLE test4; \
        SELECT * INTO test4 FROM ?', [data], function(){

        alasql.promise('SELECT COLUMN * FROM cities WHERE population > 100000 ORDER BY city DESC')
          .then(function(res){
			//
        });
    });
*/
var sql2 = 
   'SELECT participant,age,sex,region,word,time_stamp, '
   +'X_00 as Ax, Y_00 as Ay '
   +'FROM csv("test4.csv",{headers:true}) a '
   +'JOIN ? abc on abc.Ax=a.X_00 and a.participant=abc.participant and a.age=abc.age and a.sex=abc.sex and a.region=abc.region and a.word=abc.word and a.time_stamp=abc.time_stamp '

var sql3 =
   'SELECT participant,age,sex,region,word,time_stamp, '
   +'X_00 as Bx, Y_00 as Byy '
   +'FROM csv("test4.csv",{headers:true}) b '
   +'JOIN ? abc on abc.Bx=b.X_00 and b.participant=abc.participant and b.age=abc.age and b.sex=abc.sex and b.region=abc.region and b.word=abc.word and b.time_stamp=abc.time_stamp '

var sql4 =
   'SELECT participant,age,sex,region,word,time_stamp, '
   +'X_00 as Cx, Y_00 as Cy '
   +'FROM csv("test4.csv",{headers:true}) c '
   +'JOIN ? abc on abc.Cy=c.Y_00 and c.participant=abc.participant and c.age=abc.age and c.sex=abc.sex and c.region=abc.region and c.word=abc.word and c.time_stamp=abc.time_stamp '

var sqlFirst = 'SELECT * INTO csv("first.csv",{headers:true,separator:","}) FROM ?'
var sqlA = 'SELECT * INTO csv("test4_a.csv",{headers:true,separator:","}) FROM ?'
var sqlB = 'SELECT * INTO csv("test4_b.csv",{headers:true,separator:","}) FROM ?'
var sqlC = 'SELECT * INTO csv("test4_c.csv",{headers:true,separator:","}) FROM ?'

/********************************* not works yet
var sqlABC = 
  'SELECT a.participant,a.age,a.sex,a.region,a.word,a.time_stamp, '
  +'a.Ax,a.Ay,b.Bx,b.Byy,c.Cx,c.Cy '
  //+'INTO csv("test4_abc.csv",{headers:true,separator:","}) '
  +'FROM csv("test4_a.csv",{headers:true}) a '
  +'JOIN (select * from csv("test4_b.csv",{headers:true})) b '
  +'on a.participant=b.participant and a.age=b.age and a.sex=b.sex and a.region=b.region and a.word=b.word and a.time_stamp=b.time_stamp '
  +'JOIN (select * from csv("test4_c.csv",{headers:true})) c '
  +'on a.participant=c.participant and a.age=c.age and a.sex=c.sex and a.region=c.region and a.word=c.word and a.time_stamp=c.time_stamp '
var sqlABC2 = 'SELECT * INTO csv("test4_abc.csv",{headers:true,separator:","}) FROM ?'
*/
/*var sqlDup = 
   'SELECT participant,age,sex,region,word,time_stamp, '
   +'count(1) as dup '
   +'FROM csv("test4_c.csv",{headers:true}) '
   +'group by participant,age,sex,region,word,time_stamp '
   +'having count(1)>1'
   
csv(sqlDup,[],function(dup){  ////////////////////// ABC
   console.log('dup='+JSON.stringify(dup))
})*/
/*let test1 = csv(sql1,[],function(data){
    console.log('test4='+data.length)
	//csv(sqlFirst,[data],function(no){})
    csv(sql2,[data],function(data2){  ////////////////////// A
        //console.log('A(x,y)='+JSON.stringify(data2))
        csv(sqlA,[data2],function(no){})
    })
    csv(sql3,[data],function(data3){  ////////////////////// B
        //console.log('B(x,y)='+JSON.stringify(data3))
        csv(sqlB,[data3],function(no){})
    })
    csv(sql4,[data],function(data4){  ////////////////////// C
        //console.log('C(x,y)='+JSON.stringify(data4))
        csv(sqlC,[data4],function(no){})
    })
})*/

/*var selectA =
  'SELECT a.participant,a.age,a.sex,a.region,a.word,a.time_stamp, a.Ax,a.Ay '
  +'FROM csv("test4_a.csv",{headers:true}) a '
var plusB =
  'SELECT a.participant,a.age,a.sex,a.region,a.word,a.time_stamp, a.Ax,a.Ay,b.Bx,b.Byy '
  +'FROM csv("test4_b.csv",{headers:true}) b '
  +'JOIN ? a on a.participant=b.participant and a.age=b.age and a.sex=b.sex and a.region=b.region and a.word=b.word and a.time_stamp=b.time_stamp '
var plusC =
  'SELECT c.participant,c.age,c.sex,c.region,c.word,c.time_stamp, ab.Ax,ab.Ay,ab.Bx,ab.Byy,c.Cx,c.Cy '
  +'FROM csv("test4_c.csv",{headers:true}) c '
  +'JOIN ? ab on ab.participant=c.participant and ab.age=c.age and ab.sex=c.sex and ab.region=c.region and ab.word=c.word and ab.time_stamp=c.time_stamp '
var saveABC = 'SELECT * INTO csv("ABC.csv",{headers:true,separator:","}) FROM ?'
var saveAB = 'SELECT * INTO csv("AB.csv",{headers:true,separator:","}) FROM ?'
csv(selectA,[],function(a){  ////////////////////// A
   console.log('a='+a.length)
   csv(plusB,[a],function(ab){
	 console.log('ab='+ab.length)
	 //csv(saveAB,[ab],function(no){})
	 csv(plusC,[ab],function(abc){
	   console.log('abc='+abc.length)
	   csv(saveABC,[abc],function(no){})
     })
   })
})*/

//let k = (Byy - Ay) / (Bx - Ax)
//let Dx = (Cy - Ay + k * Ax + Cx / k) / (k + 1 / k)
//let Dy = Cy - (Dx - Cx) / k

/*var selectK =
  'SELECT a.participant,a.age,a.sex,a.region,a.word,a.time_stamp, a.Ax,a.Ay,a.Bx,a.Byy,a.Cx,a.Cy, '
  +'(Byy - Ay) / (Bx - Ax) as k '
  +'FROM csv("ABC.csv",{headers:true}) a '
var saveK = 'SELECT * INTO csv("K.csv",{headers:true,separator:","}) FROM ?'
csv(selectK,[],function(k){  ////////////////////// K
  csv(saveK,[k],function(no){})
})*/
var selectD =
  'select participant,age,sex,region,word,time_stamp, Ax,Ay,Bx,Byy,Cx,Cy, Dx, Cy - (Dx - Cx) / k as Dy from ('
  +'SELECT participant,age,sex,region,word,time_stamp, Ax,Ay,Bx,Byy,Cx,Cy, k, '
  +'(Cy - Ay + k * Ax + Cx / k) / (k + 1 / k) as Dx '
  +'FROM csv("K.csv",{headers:true}) ) a'
var saveD = 'SELECT * INTO csv("ABCD.csv",{headers:true,separator:","}) FROM ?'
csv(selectD,[],function(d){  ////////////////////// D
  csv(saveD,[d],function(no){})
})