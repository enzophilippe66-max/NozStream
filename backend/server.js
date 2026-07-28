const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());


// Test serveur
app.get("/", (req,res)=>{
    res.send("NozStream serveur OK");
});


// Création de compte
app.post("/register", async (req,res)=>{

    const {email,password} = req.body;

    const hash = await bcrypt.hash(password,10);

    db.run(
        "INSERT INTO users(email,password) VALUES(?,?)",
        [email,hash],
        function(err){

            if(err){
                return res.json({
                    message:"Email déjà utilisé"
                });
            }

            res.json({
                message:"Compte créé avec succès"
            });

        }
    );

});


// Connexion
app.post("/login",(req,res)=>{

    const {email,password} = req.body;

    db.get(
        "SELECT * FROM users WHERE email=?",
        [email],
        async(err,user)=>{

            if(!user){
                return res.json({
                    message:"Utilisateur inconnu"
                });
            }


            const ok = await bcrypt.compare(
                password,
                user.password
            );


            if(!ok){
                return res.json({
                    message:"Mot de passe incorrect"
                });
            }


            res.json({
                message:"Connexion réussie",
                premium:user.premium
            });

        }
    );

});



app.listen(process.env.PORT || 3000, ()=>{
    console.log("NozStream lancé");
});
