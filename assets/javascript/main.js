$("document").ready(function () {
    // console.log("***READY***");
    // console.log("MAIN.JS IS LINKED");

    // Initialize Firebase
    config = {
        apiKey: "AIzaSyAIVa7Dhma33UL1WeTx5nC7V2Ds08zwC8I",
        authDomain: "homework-7-firebase.firebaseapp.com",
        databaseURL: "https://homework-7-firebase.firebaseio.com",
        projectId: "homework-7-firebase",
        storageBucket: "",
        messagingSenderId: "637674961142"
    };
    firebase.initializeApp(config);

    database = firebase.database();

    // console.log(database.ref());

    function newTableRow(name, dest, freq, next, away) {
        let tr = $("<tr><th scope='row'>" + name + "<td>" + dest + "</td><td>" + freq + "</td><td>" + next + "</td><td id='away'>" + away + "</td></th></tr>");
        $("table").append(tr);
    };

    let name;
    let dest;
    let first;
    let freq;
    let timeConver;
    let currentTime;
    let timDiff;
    let timeRemaining;
    let timeTillTrain;
    let nextTrain;

    $(".newTrainBtn").on("click", function (event) {
        event.preventDefault();
        // console.log("clicked");
        name = $("#name").val().trim();
        dest = $("#dest").val().trim();
        first = $("#first").val().trim();
        freq = $("#freq").val().trim();
        if (first.length !== 4 || first > 2400) {
            alert("Invalid Time");
        } else if (name && dest && first && freq) {
            $("#name").val("");
            $("#dest").val("");
            $("#first").val("");
            $("#freq").val("");
            database.ref().push({
                TrainName: name,
                Destination: dest,
                Frequency: freq,
                NextArrival: moment(nextTrain).format("hh:mma"),
                FirstTrain: first
            });
        };
    });

    database.ref().on("child_added", function (snapshot) {

        name = snapshot.val().TrainName;
        dest = snapshot.val().Destination;
        first = snapshot.val().FirstTrain;
        freq = snapshot.val().Frequency;

        timeConvert = moment(first, "HH:mm").subtract(1, "years");

        currentTime = moment();

        timeDiff = moment().diff(moment(timeConvert), "minutes");

        timeRemaining = timeDiff % freq;

        timeTillTrain = freq - timeRemaining;

        nextTrain = moment().add(timeTillTrain, "minutes");

        newTableRow(name, dest, freq, moment(nextTrain).format("hh:mma"), timeTillTrain);

    });

});


