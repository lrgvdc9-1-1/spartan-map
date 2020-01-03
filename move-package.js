//Once angular is build we will move it to the correct location
//the final build..

const fs = require('fs');
const path = require('path');

const delete_directory = '../../../../public/components/GIS';
const move_directory = "./dist/spartan-mp/";


//Clean up first...
fs.readdir(delete_directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
     
     if(file.includes(".")){
         fs.unlink(path.join(delete_directory, file), err => {
            if (err) throw err;
         });
     }

    
  }
   //Once directory is clean lets move the files over to the new directory..
   moveFiles()
});


function moveFiles() {
   
    fs.readdir(move_directory, (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
           
           if(file.includes(".")){
                var f = path.basename(file);
                var dest = path.resolve(delete_directory, f);
                var current = path.resolve(move_directory, file);
               
                  fs.rename(current, dest, (err)=>{
                      if(err) throw err;
                      else console.log('Successfully moved');
                    });
           }}
        })  
  }
  

