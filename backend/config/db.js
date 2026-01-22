// import mongoose from "mongoose";

// export const  connectDB = async () =>{

//     await mongoose.connect('mongodb+srv://priyanshukumar1234tu_db_user:Devil98@cluster0.ld7biue.mongodb.net/food-del').then(()=>console.log("DB Connected"));
   
// }


// // add your mongoDB connection string above.
// // Do not use '@' symbol in your databse user's password else it will show an error.


import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1);
  }
};
