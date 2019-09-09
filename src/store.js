const STORE = {
    users: [
        {
            id: 11,
            name: 'Brooklyn',
            checkedOut: {
                1: 2,
                7: 3
            }
        },
        {
            id: 12,
            name: 'Derrick',
            checkedOut: {
                2: 2,
            }
        }

    ],
    inventory: [
        {
            id: 1,
            name: 'Purple Mac',
            quantity: 6,
            quantityAvailable: 4,
            category: 'computer',
            image: 'https://images-na.ssl-images-amazon.com/images/I/51et4LzjJxL._SL1000_.jpg'
        },
        {
            id: 2,
            name: 'Red Mac',
            quantity: 6,
            quantityAvailable: 4,
            category: 'computer',
            image: 'https://images-na.ssl-images-amazon.com/images/I/515I48-ZKKL._SL1000_.jpg'
        },
        {
            id: 3,
            name: 'Green Mac',
            quantity: 6,
            quantityAvailable: 6,
            category: 'computer',
            image: 'https://images-na.ssl-images-amazon.com/images/I/51V7YDVUFPL._SL1000_.jpg'
        },
        {
            id: 4,
            name: 'Blue Mac',
            quantity: 6,
            quantityAvailable: 6,
            category: 'computer',
            image: 'https://images-na.ssl-images-amazon.com/images/I/517M3iveTRL._SL1000_.jpg'
        },
        {
            id: 5,
            name: 'Yellow Mac',
            quantity: 6,
            quantityAvailable: 6,
            category: 'computer',
            image: 'https://images-na.ssl-images-amazon.com/images/I/51ukf-Q359L._SL1200_.jpg'
        },
        {
            id: 6,
            name: 'Lenovo',
            quantity: 6,
            quantityAvailable: 6,
            category: 'computer',
            image: 'https://i.ebayimg.com/images/g/Kn0AAOSwv-ZZ83Fg/s-l640.jpg'
        },
        {
            id: 7,
            name: 'iPad - New',
            quantity: 12,
            quantityAvailable: 9,
            category: 'tablet',
            image: 'https://images-na.ssl-images-amazon.com/images/I/71N%2ByhxlbwL._SL1500_.jpg'
        },
        {
            id: 8,
            name: 'iPad - Old',
            quantity: 8,
            quantityAvailable: 8,
            category: 'tablet',
            image: 'https://i5.walmartimages.com/asr/bf85b617-948d-48c7-b9c5-70b44cb50484_1.a3a36bc6a3228d548fec9858a2d574e7.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF'
        }
    ]
}

export default STORE