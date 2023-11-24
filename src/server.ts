import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";



const { port, database_url } = config;



async function main() {
  try {
    await mongoose.connect(database_url as string);

    app.listen(port, () => {
      console.log(`assignment server is listening on port ${port}`)
    })
  }
  catch (err) {
    console.error(err)
  }
}


main();
