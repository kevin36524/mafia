export const makeJoinRoomAPICall = async (userName:string, roomID:string) => {
    const rawResponse = await fetch('https://us-central1-hriyaan-24ae1.cloudfunctions.net/createOrJoinRoom', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName, roomID})
      });
      const content = await rawResponse.json();
      return content;
}

export const deleteRoomAPICall = async (roomID:string) => {
    const rawResponse = await fetch('https://us-central1-hriyaan-24ae1.cloudfunctions.net/deleteRoom', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({roomID})
      });
      const content = await rawResponse.json();
      return content;
}

export const updateRoomAPICall = async (roomObj: any) => {
  console.log("I am in updateRoomAPI call");
  const rawResponse = await fetch('https://us-central1-hriyaan-24ae1.cloudfunctions.net/updateRoom', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({roomObj})
  });
  const content = await rawResponse.json();
  return content;
}