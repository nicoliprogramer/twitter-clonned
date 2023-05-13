import mongoose from "mongoose"

class Database {

    constructor(){
        this.connect()
    }

    connect(){
        mongoose.connect("mongodb+srv://nicoTC:clavefacil@cluster0.d88pfd2.mongodb.net/DBTwitterClone?retryWrites=true&w=majority")
        .then(() => {
            console.log("Database connected successful")
        })
        .catch((error)=>{
            console.log("Database connection error: " + error);
        })
    }
}

//         ("useNewUrlParser", true),
//         ("useUnifiedTopology", true),
//         ("useFindAndModify", false)) 

export default new Database();

