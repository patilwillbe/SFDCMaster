import { LightningElement, track, wire } from 'lwc';
import getOps from '@salesforce/apex/OpportunityController.getOpps';

export default class TielsDemo extends LightningElement {
    @track actions = [{ label: 'Edit', value: 'edit' }];

    data;
    oppId;
    oppStage;

    @wire(getOps)
    wiredOpps({ data, error }) {
        if (data) {
            console.log('Data ', data);
            this.oppId = `/${data[0].Id}`;
            this.oppName = data[0].Name;
            this.oppStage = data[0].StageName;
            // this.actions = data.map(row => {
            //     let ver = { label: 'Edit', value: 'edit', objId: row.Id };
            //     return { ...row, oppId, ver };
            // });
            this.data = data;
            //this.actions = cols;
            console.log('Data ', JSON.stringify(this.actions));
        } else if (error) {
            console.log('Error ', JSON.stringify(error));
        }
    }

    handleAction(event) {
        console.log(JSON.stringify(event.detail));
    }
}