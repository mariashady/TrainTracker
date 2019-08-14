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
    

    // Stores user input into an object
    function addTrain() {
        let newTrain = {
            name: $("#train-name").val().trim(),
            destination: $("#destination").val().trim(),
            firstTrain: $("#first-train").val().trim(),
            frequency: $("#frequency").val().trim()
   
        }
        console.log(newTrain);
        // Pushes user input into database
        database.ref("trains").push(newTrain)
   
    };
    
    $("#submit").on("click", function() {
        addTrain();
        //Empties fields after user submits
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train").val("");
        $("#frequency").val("");
    

    });

    database.ref("trains").on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        let snapshotObj = childSnapshot.val();
        let currentTime = moment();
        console.log(moment());
        let newTrainName = snapshotObj.name;
        let newDestination = snapshotObj.destination;
        let firstTrain = moment(snapshotObj.firstTrain, "HH:mm");
        let freq = snapshotObj.frequency;
        let difference = currentTime.diff(firstTrain, "minutes");
        let remainder = difference % freq;
        let minAway = freq - remainder;
        let nextArrival = currentTime.add(minAway, "minutes")

        let newName = $("<td>");
        let newDest = $("<td>");
        let newFreq = $("<td>");
        let newArrival = $("<td>");
        let newMinAway = $("<td>");

        let newTableRow = $("<tr>").append(

            newName.text(newTrainName),
            newDest.text(newDestination),
            newFreq.text(freq),
            newArrival.text(nextArrival.format("LT")),
            newMinAway.text(minAway)
        )
        $("#info-table").append(newTableRow);
    });

    



});