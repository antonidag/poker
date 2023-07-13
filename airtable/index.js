export class AirTableAPIClient {

    constructor(patToken){
        this.patToken = patToken
    }

    async getTableRecords(tableName) {
        const isString = typeof tableName == 'string' ? true : false;
        if(!isString || tableName == undefined) {
            throw new Error('Missing tableName parameter or tableName parameter is undefined')
        }

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.patToken}`);
      
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        const response = await fetch(`https://api.airtable.com/v0/app73ftdOgLbYaulY/${tableName}?view=Grid%20view`, requestOptions);
        const jsonObj = await response.json();
        return jsonObj.records.map(item => item.fields);
    }
}