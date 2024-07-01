import { LightningElement, track } from 'lwc';
import getNews from '@salesforce/apex/NewsController.retrieveNews';

export default class NewsComponent extends LightningElement {

    @track result = [];
    @track selectedNews = {};
    @track isModalOpen = false;

    get modalClass() {
        //return `slds-modal ${this.isModalOpen ? "slds-fade-in-open" : "slds-modal"}`;
        console.log('My flag ', this.isModalOpen);
        return this.isModalOpen ? "slds-modal slds-fade-in-open" : "slds-modal";

    }

    get modalBackgroundClass() {
        return this.isModalOpen ? "slds-backdrop slds-backdrop_open" : "slds-backdrop";
    }

    closemodal() {
        this.isModalOpen = false;
    }
    connectedCallback() {
        this.fetchNews();
    }

    fetchNews() {
        getNews()
            .then(response => {
                console.log('Response ', response);
                this.formatNewsdata(response.articles);
            })
            .catch(error => {
                console.log('Error ', error);
            });
    }

    formatNewsdata(response) {
        this.result = response.map((item, index) => {
            let id = `news_${index + 1} `;
            let name = item.source.name;
            let date = new Date(item.publishedAt).toDateString();
            return { ...item, id: id, name: name, date: date };
        });
    }

    showModal(event) {
        const id = event.target.dataset.item;
        this.result.forEach(item => {
            if (item.id === id) {
                this.selectedNews = { ...item };
            }
        });
        console.log('id ', JSON.stringify(this.selectedNews));
        this.isModalOpen = true;
    }
}