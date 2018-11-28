import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styles: []
})
export class DashboardComponent implements OnInit {
    public cases = [
        {
            id: 1,
            date: '21 Kas Saat 7:00',
            title: 'Xinerji Gezi Turu (Batı Tarihi Eserler Müzesi)',
            nrd: 'İstanbul, Zincirli Kuyu Z Plaza',
            nry: 'Paris, Mieroe 1223 St.',
            location: 'İstanbul, Zincirli Kuyu, TR',
            tag: '#Turizm #Xinerji',
            price: '30.000'
        },

        {
            id: 2,
            date: '21 Kas Saat 7:00',
            title: 'SALT BEYOĞLU AÇIK SİNEMA',
            nrd: 'İstanbul, Zincirli Kuyu Z Plaza',
            nry: 'Paris, Mieroe 1223 St.',
            location: 'İstanbul, Zincirli Kuyu, TR',
            tag: '#Turizm #Xinerji',
            price: '30.000'
        },

        {
            id: 3,
            date: '21 Kas Saat 7:00',
            title: 'SESSİZ SİNEMA FİLM GÜNLERİ',
            nrd: 'İstanbul, Zincirli Kuyu Z Plaza',
            nry: 'Paris, Mieroe 1223 St.',
            location: 'İstanbul, Zincirli Kuyu, TR',
            tag: '#Turizm #Xinerji',
            price: '30.000'
        },

        {
            id: 4,
            date: '21 Kas Saat 7:00',
            title: 'TASARIM ATÖLYESİ KADIKÖY',
            nrd: 'İstanbul, Zincirli Kuyu Z Plaza',
            nry: 'Paris, Mieroe 1223 St.',
            location: 'İstanbul, Zincirli Kuyu, TR',
            tag: '#Turizm #Xinerji',
            price: '30.000'
        },

        {
            id: 5,
            date: '21 Kas Saat 7:00',
            title: '10 İSTANBUL KORUSU',
            nrd: 'İstanbul, Zincirli Kuyu Z Plaza',
            nry: 'Paris, Mieroe 1223 St.',
            location: 'İstanbul, Zincirli Kuyu, TR',
            tag: '#Turizm #Xinerji',
            price: '30.000'
        },

        {
            id: 6,
            date: '21 Kas Saat 7:00',
            title: 'Fol Destek Gecesi 7',
            nrd: 'İstanbul, Zincirli Kuyu Z Plaza',
            nry: 'Paris, Mieroe 1223 St.',
            location: 'İstanbul, Zincirli Kuyu, TR',
            tag: '#Turizm #Xinerji',
            price: '30.000'
        }
    ];

    public persons = [
        {
            id: 1,
            fname: 'dneme',
            lname: 'Gould',
            state: true
        },
        {
            id: 2,
            fname: 'Xiops',
            lname: 'Neese',
            state: true
        },
        {
            id: 3,
            fname: 'Melgema',
            lname: 'Bruintjes',
            state: false
        },
        {
            id: 4,
            fname: 'Shanita',
            lname: 'Penty',
            state: false
        },
        {
            id: 5,
            fname: 'Grady',
            lname: 'Zazzara',
            state: false
        },
        {
            id: 6,
            fname: 'LaJeania',
            lname: 'Lawson',
            state: false
        },
        {
            id: 7,
            fname: 'Al',
            lname: 'Underwood',
            state: false
        },
        {
            id: 4122,
            fname: 'Ronit',
            lname: 'Kemmerling',
            state: false
        },
        {
            id: 8,
            fname: 'Whitney',
            lname: 'Geddes',
            state: false
        },
        {
            id: 9,
            fname: 'Junjiang',
            lname: 'Lawson',
            state: false
        },
        {
            id: 9,
            fname: 'Junjiang',
            lname: 'Lawson',
            state: false
        },
        {
            id: 9,
            fname: 'Junjiang',
            lname: 'Lawson',
            state: false
        },
        {
            id: 9,
            fname: 'Junjiang',
            lname: 'Lawson',
            state: false
        },
        {
            id: 9,
            fname: 'Junjiang',
            lname: 'Lawson',
            state: false
        },
        {
            id: 9,
            fname: 'Junjiang',
            lname: 'Lawson',
            state: false
        },
        {
            id: 9,
            fname: 'Junjiang',
            lname: 'Lawson',
            state: false
        },
        {
            id: 9,
            fname: 'Junjiang',
            lname: 'Lawson',
            state: false
        },
        {
            id: 9,
            fname: 'Junjiang',
            lname: 'Lawson',
            state: false
        },
        {
            id: 9,
            fname: 'Junjiang',
            lname: 'Lawson',
            state: false
        },
        {
            id: 9,
            fname: 'Junjiang',
            lname: 'Lawson',
            state: false
        },
        {
            id: 9,
            fname: 'Junjiang',
            lname: 'Lawson',
            state: false
        },
        {
            id: 9,
            fname: 'Junjiang',
            lname: 'Lawson',
            state: false
        },
        {
            id: 9,
            fname: 'Junjiang',
            lname: 'Lawson',
            state: false
        }
    ];

    caseState: boolean;
    caseTitle: string;
    caseID: BigInteger;

    constructor() {
        this.caseState = true;
    }

    mediaSelect(id, title) {
        this.caseState = false;
        this.caseTitle = title;

        this.caseID = id;
    }

    mediaClose() {
        this.caseState = true;
        this.caseTitle = '';
    }

    test() {
        alert(this.caseID);
    }

    ngOnInit() {}
}
