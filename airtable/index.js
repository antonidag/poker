export class AirTableAPIClient {

    constructor(patToken){
        this.patToken = patToken
    }

    async getTableRecords() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.patToken}`);
      
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
      
        const response = await fetch("https://api.airtable.com/v0/app73ftdOgLbYaulY/Players?maxRecords=3&view=Grid%20view", requestOptions);

        return response.body;
    }
}