var objPeople = [
    {
        email: "oscar.devos02@gmail.com",
        key: "ODS-RFL-576-9L7-O25"
    },
    {
        email: "osrdevos@gmail.com",
        key: "ODS-RFL-086-HVC-28G"
    },
]

function getInfo() {
    var email = document.getElementById("email").value
    var key = document.getElementById("key").value

    for(i = 0; i < objPeople.length; i++) {
        if(email == objPeople[i].email && key == objPeople[i].key) {
            console.log ("you're in!")
            return
        }
    }
    console.log("Incorrect email or key")
}
