/*function checkVotingIcon (votingValue) {
    if (Number(votingValue).toFixed(2) <=1.29){
        dangerLevel[0].icon
    } else if (Number(votingValue).toFixed(2) >= 1.30 && Number(votingValue).toFixed(2) <=2.29){
        dangerLevel[1].icon
    } else {
        dangerLevel[2].icon
    }
}*/

function iconScale (fMarker){
    let x ;
    if (fMarker.count < 10){
        return x = Number(50);
    } else if (fMarker.count > 50){
        return x = Number(75);
    } else {
        return x = Number(60);
    }
}

export {iconScale};