$("document").ready(function () {
    console.log("***READY***");
    console.log("MAIN.JS IS LINKED");

    function newTableRow(name, dest, freq, next, away) {
        let tr = $("<tr><th scope='row'>" + name + "<td>" + dest + "</td><td>" + freq + "</td><td>" + next + "</td><td>" + away + "</td></th></tr>");
        $("table").append(tr);
    };

    let name;
    let dest;
    let first;
    let freq;

    $(".newTrainBtn").on("click", function (event) {
        event.preventDefault();
        console.log("clicked");
        name = $("#name").val().trim();
        dest = $("#dest").val().trim();
        first = $("#first").val().trim();
        freq = $("#freq").val().trim();

        var timeConvert = moment(first, "HH:mm").subtract(1, "years");
        console.log(timeConvert);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var timeDiff = moment().diff(moment(timeConvert), "minutes");
        console.log("DIFFERENCE IN TIME: " + timeDiff);

        var timeRemaining = timeDiff % freq;
        console.log(timeRemaining);

        var timeTillTrain = freq - timeRemaining;
        console.log("MINUTES TILL TRAIN: " + timeTillTrain);

        var nextTrain = moment().add(timeTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        console.log("MINUTES TILL TRAIN: " + timeTillTrain);
        if (first.length !== 4) {
            alert("Invalid Time");
        } else if (name && dest && first && freq) {

            newTableRow(name, dest, freq, moment(nextTrain).format("hh:mma"), timeTillTrain);
            $("#name").val("");
            $("#dest").val("");
            $("#first").val("");
            $("#freq").val("");
        };
    });
});


// FIREBASE INFO
/* 
<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCqzmkzpBI6U0uJeotryphFcnpWzfbQqrY",
    authDomain: "chancejm-791e1.firebaseapp.com",
    databaseURL: "https://chancejm-791e1.firebaseio.com",
    projectId: "chancejm-791e1",
    storageBucket: "chancejm-791e1.appspot.com",
    messagingSenderId: "932832111214"
  };
  firebase.initializeApp(config);
</script> */