import { LightningElement, api, wire } from 'lwc';
import getRecord from '@salesforce/apex/LookupController.getRecords';

const DELAY = 300;
export default class LookupComponent extends LightningElement {
    @api apiName = "Group";
    searchStr;

    @api objectLabel = "Queue";
    @api iconName = "standard:queue";
    delayTimeOut;
    selectedRecord = { recordId: "", recordName: "" };
    displayOptions = false;

    @wire(getRecord, { objectApiName: "$apiName", searchKey: "$searchStr" })
    searchRecords;

    get recordSelected() {
        return this.selectedRecord.recordId === "" ? false : true;
    }

    sendSelection() {
        let mySelectionEvent = new CustomEvent("selectrec", {
            detail: this.selectedRecord.recordId,
        });
        this.dispatchEvent(mySelectionEvent);
    }

    removalSelection() {
        this.selectedRecord = { recordId: "", recordName: "" };
        this.sendSelection();
        this.displayOptions = false;
    }

    clickHandler(event) {
        let selectedId = event.currentTarget.dataset.item;
        let selectedRecord = this.searchRecords.data.find(
            (item) => item.Id === selectedId
        );
        this.selectedRecord = {
            recordId: selectedRecord.Id,
            recordName: selectedRecord.Name,
        };
        this.sendSelection();
        this.displayOptions = false;
    }

    changeHandler(event) {
        window.clearTimeout(this.delayTimeOut);
        let temp = event.target.value;
        //debouning in javascript -Do not update the reactive property as long as this function is called within a delay.
        this.delayTimeOut = setTimeout(() => {
            this.searchStr = temp;
            this.displayOptions = true;
        }, DELAY);
    }
}