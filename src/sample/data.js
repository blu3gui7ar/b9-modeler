export const metadata = {
    category: {
        type: 'object',
        attrs: {
            description: 'desc',
            lang: 'languages',
            attributes: 'attributes',
            styles: 'styles',
            imgs: 'images',
            children: 'subcats'
        }
    },
    desc: {type: 'map', flatten: true, value: 'info'},
    languages: {type: 'checkbox', choices: ['en', 'fr', 'de']},
    attributes: {type: 'list', value: 'attribute'},
    attribute: {type: 'ref', target: 'attribute:'},
    styles: {type: 'list', flatten: false, value: 'style'},
    style: {type: 'ref', target: 'style:'},
    images: {type: 'textlist', limit: 5},
    subcats: {type: 'list', value: 'category'}
}

export const data = {
    description: {
        'title': 'RootCat',
        'category': 'Wedding Dress',
        'color': 'Red'
    },
    attributes: [
        'attribute:123',
        'attribute:456',
        'attribute:789'
    ],
    styles: [
        'style:123',
        'style:456',
        'style:789'
    ],
    imgs: [
        'image:123',
        'image:456',
        'image:789'
    ],
    children: [
        {
            description: {
                title: 'SubCat1'
            }
        },
        {
            description: {
                title: 'SubCat2'
            }
        },
        {
            description: {
                title: 'SubCat3'
            }
        }
    ]
}
