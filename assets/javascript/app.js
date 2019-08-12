// Your web app's Firebase configuration
$(document).ready(function () {

    let firebaseConfig = {
        apiKey: "AIzaSyB3WcPGbhRI4f9CFP3C8GDlG4AQEuQ_dy4",
        authDomain: "traintracker-76d8c.firebaseapp.com",
        databaseURL: "https://traintracker-76d8c.firebaseio.com",
        projectId: "traintracker-76d8c",
        storageBucket: "",
        messagingSenderId: "938309609286",
        appId: "1:938309609286:web:659dba76c5dbd1f4"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


    let database = firebase.database()


    function addTrain() {
        let newTrain = {
            name: $("#train-name").val().trim(),
            destination: $("#destination").val().trim(),
            firstTrain: $("#first-train").val().trim(),
            frequency: $("#frequency").val().trim()
   
        }
        console.log(newTrain);

        database.ref("trains").push(newTrain)

        
        
        
    }
    
    $("#submit").on("click", function() {
        addTrain();

        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train").val("");
        $("#frequency").val("");
    

    });



});