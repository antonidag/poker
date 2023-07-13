export class AirTableAPIClient {

    constructor(patToken) {
        this.patToken = patToken
    }

    async getTableRecords(tableName) {
        const isString = typeof tableName == 'string' ? true : false;
        if (!isString || tableName == undefined) {
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

    async createTableRecordPlayer(tableName, reqBody) {
        const isString = typeof tableName == 'string' ? true : false;
        if (!isString || tableName == undefined) {
            throw new Error('Missing tableName parameter or tableName parameter is undefined')
        }

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.patToken}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "records": [
                {
                    "fields": {
                        "FirstName": reqBody.firstName,
                        "LastName": reqBody.lastName,
                        "Status": reqBody.status,
                        "img": [
                            {
                                "url": "https://v5.airtableusercontent.com/v1/18/18/1689264000000/bXwVgTp0eQnxwM3H_L9jow/pEKbKD7keDSGyYZt-OclWz32qMnAoQ8-CLpjpYOTmvqKyt5M3DkLusXrNEuOrHkALnDjFIXb_SnCSeRpM6OPutqFnIkH1wjaFvYEeBMDnNBWAuDw__llgqqrb55bh-wu/PVMdquTSYItvohrE4_Mt-8dxlMoFylKTdksM-pNIHlU"
                            }
                        ]
                    }
                }
            ]
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const response = await fetch("https://api.airtable.com/v0/app73ftdOgLbYaulY/Players", requestOptions);
        return response.body;
    }
}