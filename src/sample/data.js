export const metadata = {
    category: {
        type: 'object',
        attrs: {
            description: 'desc',
            extensions: 'extensions',
            lang: 'languages',
            leaf: 'leaf',
            gender: 'gender',
            attributes: 'attributes',
            styles: 'styles',
            imgs: 'images',
            children: 'subcats'
        }
    },
    desc: {type: 'map', flatten: true, value: 'info'},
    extensions: {type: 'map', value: 'ext'},
    ext: {type: 'object', attrs: {type: 'type', value: 'value'}},
    languages: {type: 'checkbox', choices: ['en', 'fr', 'de']},
    leaf: {type: 'radio', choices: {leaf: 'true', intermediate: 'false'}},
    gender: {type: 'select', options: {'male': 1, 'female': 2, 'unisex': 0}},
    attributes: {type: 'list', value: 'attribute'},
    attribute: {type: 'text', line: 1},
    styles: {type: 'list', flatten: false, value: 'style'},
    style: {type: 'ref', target: 'style:'},
    images: {type: 'textlist', line: 5},
    subcats: {type: 'list', value: 'category'}
}

export const data = {
    description: {
        'title': 'RootCat',
        'category': 'Wedding Dress',
        'color': 'Red'
    },
    extensions: {
        'shipExt': {
            type: 'dresses',
            value: '1~2 days'
        }
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
