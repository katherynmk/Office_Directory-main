const { MongoClient } = require("mongodb");
//this is a function that is meant to add data to your mongo database
//to run, type 'node' then name of the file into your terminal
// ex: 'node insert-data.js'
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://lewis:lewis1234@cluster0.vvd1s.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "OfficeDirectory";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         // make collection
         const col = db.collection("professors");

        const docs = [
                { id: "1" , name: "Dr. Ray Klump", hours: "Appointment", roomnumber: "N/A", email: "klumpra@lewisu.edu", phone: "N/A", website: "N/A"},
                { id: "2" , name: "Dr. Paul Kim", hours: "Monday, Wednesday, Friday from 12:00pm - 1:00pm", roomnumber: "N/A", email:"kimyo@lewisu.edu" , phone: "N/A", website: "N/A"},
              ];


//create ADMIN account, and an update database function

        // this option prevents additional documents from being inserted if one fails
        const options = { ordered: true };
        const result = await col.insertMany(docs, options);
        console.log(`${result.insertedCount} documents were inserted`);

         console.log(docs);
        
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}
run().catch(console.dir);