// Product Detail Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Product data - in a real app, this would come from an API
    const products = {
        'nike-vomero-18': {
            id: 'nike-vomero-18',
            name: 'NIKE VOMERO 18',
            price: 200,
            originalPrice: 250,
            image: './images/nike-vomero-18-57k.png',
            images: [
                './images/nike-vomero-18-57k.png',
                './images/nike-air-zoom-upturn-sc-38k.png',
                './images/nike-air-max-excee-32k.png',
                './images/nike-quest-6-35k.png'
            ],
            description: 'The Nike Vomero 18 delivers premium comfort with responsive cushioning and a breathable upper. Perfect for daily runs and all-day wear.',
            details: `
                <p>The Nike Vomero 18 is designed for runners who demand both comfort and performance. Featuring Nike's latest React foam technology, this shoe provides exceptional cushioning and energy return with every step.</p>
                <ul>
                    <li>React foam midsole for responsive cushioning</li>
                    <li>Breathable mesh upper for optimal ventilation</li>
                    <li>Rubber outsole with strategic traction zones</li>
                    <li>Heel counter for stability and support</li>
                    <li>Lightweight construction for all-day comfort</li>
                </ul>
            `,
            specifications: {
                'Upper Material': 'Mesh and synthetic',
                'Midsole': 'React foam',
                'Outsole': 'Rubber',
                'Weight': '10.2 oz (men\'s size 9)',
                'Drop': '10mm',
                'Sizes': '7-15 US',
                'Colors': 'White/Black, Navy/White, Grey/White'
            },
            sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15],
            colors: [
                { name: 'White/Black', value: '#ffffff', image: './images/nike-vomero-18-57k.png' },
                { name: 'Navy/White', value: '#1e3a8a', image: './images/nike-vomero-18-57k.png' },
                { name: 'Grey/White', value: '#6b7280', image: './images/nike-vomero-18-57k.png' }
            ],
            reviews: [
                {
                    name: 'Alex Johnson',
                    rating: 5,
                    date: '2024-01-15',
                    comment: 'Amazing comfort! Perfect for my daily runs. The cushioning is incredible.'
                },
                {
                    name: 'Sarah Chen',
                    rating: 5,
                    date: '2024-01-10',
                    comment: 'Great shoe, very comfortable and stylish. Highly recommend!'
                },
                {
                    name: 'Mike Rodriguez',
                    rating: 4,
                    date: '2024-01-05',
                    comment: 'Good quality and fit. Slightly narrow but overall satisfied.'
                }
            ]
        },
        'nike-air-zoom-sc': {
            id: 'nike-air-zoom-sc',
            name: 'NIKE AIR ZOOM SC',
            price: 145,
            originalPrice: 180,
            image: './images/nike-air-zoom-upturn-sc-38k.png',
            images: [
                './images/nike-air-zoom-upturn-sc-38k.png',
                './images/nike-vomero-18-57k.png',
                './images/nike-air-max-excee-32k.png',
                './images/nike-quest-6-35k.png'
            ],
            description: 'Lightweight and responsive, the Nike Air Zoom SC offers incredible energy return and a sleek, modern design.',
            details: `
                <p>The Nike Air Zoom SC combines lightweight construction with responsive Zoom Air technology for an exceptional running experience.</p>
                <ul>
                    <li>Zoom Air units in forefoot and heel</li>
                    <li>Lightweight mesh upper</li>
                    <li>Rubber outsole with flex grooves</li>
                    <li>Minimalist design aesthetic</li>
                    <li>Breathable construction</li>
                </ul>
            `,
            specifications: {
                'Upper Material': 'Mesh',
                'Midsole': 'Zoom Air',
                'Outsole': 'Rubber',
                'Weight': '8.5 oz (men\'s size 9)',
                'Drop': '8mm',
                'Sizes': '7-15 US',
                'Colors': 'Black/White, White/Black, Blue/White'
            },
            sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15],
            colors: [
                { name: 'Black/White', value: '#000000', image: './images/nike-air-zoom-upturn-sc-38k.png' },
                { name: 'White/Black', value: '#ffffff', image: './images/nike-air-zoom-upturn-sc-38k.png' },
                { name: 'Blue/White', value: '#3b82f6', image: './images/nike-air-zoom-upturn-sc-38k.png' }
            ],
            reviews: [
                {
                    name: 'David Kim',
                    rating: 5,
                    date: '2024-01-12',
                    comment: 'Super lightweight and responsive. Perfect for speed work!'
                },
                {
                    name: 'Emma Wilson',
                    rating: 4,
                    date: '2024-01-08',
                    comment: 'Great shoe for training. Very comfortable and stylish.'
                }
            ]
        },
        'nike-air-max-excee': {
            id: 'nike-air-max-excee',
            name: 'NIKE AIR MAX EXCEE',
            price: 110,
            originalPrice: 140,
            image: './images/nike-air-max-excee-32k.png',
            images: [
                './images/nike-air-max-excee-32k.png',
                './images/nike-vomero-18-57k.png',
                './images/nike-air-zoom-upturn-sc-38k.png',
                './images/nike-quest-6-35k.png'
            ],
            description: 'The Nike Air Max Excee delivers classic Air Max comfort with a modern twist, featuring visible Air Max technology.',
            details: `
                <p>Experience the legendary Air Max comfort with the Nike Air Max Excee. This shoe combines classic style with modern performance.</p>
                <ul>
                    <li>Visible Air Max unit in heel</li>
                    <li>Mesh and synthetic upper</li>
                    <li>Rubber outsole with Air Max branding</li>
                    <li>Classic Air Max silhouette</li>
                    <li>Comfortable fit for all-day wear</li>
                </ul>
            `,
            specifications: {
                'Upper Material': 'Mesh and synthetic',
                'Midsole': 'Air Max',
                'Outsole': 'Rubber',
                'Weight': '11.5 oz (men\'s size 9)',
                'Drop': '12mm',
                'Sizes': '7-15 US',
                'Colors': 'White/Black, Black/White, Red/White'
            },
            sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15],
            colors: [
                { name: 'White/Black', value: '#ffffff', image: './images/nike-air-max-excee-32k.png' },
                { name: 'Black/White', value: '#000000', image: './images/nike-air-max-excee-32k.png' },
                { name: 'Red/White', value: '#dc2626', image: './images/nike-air-max-excee-32k.png' }
            ],
            reviews: [
                {
                    name: 'Chris Taylor',
                    rating: 4,
                    date: '2024-01-14',
                    comment: 'Classic Air Max feel with modern comfort. Great for casual wear.'
                },
                {
                    name: 'Lisa Park',
                    rating: 5,
                    date: '2024-01-09',
                    comment: 'Love the classic look and the comfort is amazing!'
                }
            ]
        },
        'nike-quest-6': {
            id: 'nike-quest-6',
            name: 'NIKE QUEST 6',
            price: 129,
            originalPrice: 160,
            image: './images/nike-quest-6-35k.png',
            images: [
                './images/nike-quest-6-35k.png',
                './images/nike-vomero-18-57k.png',
                './images/nike-air-zoom-upturn-sc-38k.png',
                './images/nike-air-max-excee-32k.png'
            ],
            description: 'The Nike Quest 6 offers reliable performance and comfort for everyday running with a breathable upper and responsive cushioning.',
            details: `
                <p>The Nike Quest 6 is designed for runners who want reliable performance without breaking the bank. Perfect for daily training and casual wear.</p>
                <ul>
                    <li>Phylon midsole for lightweight cushioning</li>
                    <li>Breathable mesh upper</li>
                    <li>Rubber outsole with flex grooves</li>
                    <li>Comfortable fit for all foot types</li>
                    <li>Durable construction for long-lasting wear</li>
                </ul>
            `,
            specifications: {
                'Upper Material': 'Mesh',
                'Midsole': 'Phylon',
                'Outsole': 'Rubber',
                'Weight': '9.8 oz (men\'s size 9)',
                'Drop': '10mm',
                'Sizes': '7-15 US',
                'Colors': 'White/Black, Navy/White, Grey/White'
            },
            sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15],
            colors: [
                { name: 'White/Black', value: '#ffffff', image: './images/nike-quest-6-35k.png' },
                { name: 'Navy/White', value: '#1e3a8a', image: './images/nike-quest-6-35k.png' },
                { name: 'Grey/White', value: '#6b7280', image: './images/nike-quest-6-35k.png' }
            ],
            reviews: [
                {
                    name: 'James Brown',
                    rating: 4,
                    date: '2024-01-11',
                    comment: 'Great value for money. Comfortable and reliable for daily runs.'
                },
                {
                    name: 'Maria Garcia',
                    rating: 5,
                    date: '2024-01-07',
                    comment: 'Perfect shoe for my training. Very comfortable and durable.'
                }
            ]
        },
        'nike-air-max-sc': {
            id: 'nike-air-max-sc',
            name: 'NIKE AIR MAX SC',
            price: 85,
            originalPrice: 110,
            image: './images/nike-air-max-sc-18k.png',
            images: [
                './images/nike-air-max-sc-18k.png',
                './images/nike-vomero-18-57k.png',
                './images/nike-air-zoom-upturn-sc-38k.png',
                './images/nike-quest-6-35k.png'
            ],
            description: 'The Nike Air Max SC delivers classic Air Max style with modern comfort, perfect for everyday wear.',
            details: `
                <p>Get the classic Air Max look with the Nike Air Max SC. This shoe offers timeless style and reliable comfort for all-day wear.</p>
                <ul>
                    <li>Visible Air Max unit in heel</li>
                    <li>Mesh and synthetic upper</li>
                    <li>Rubber outsole with Air Max branding</li>
                    <li>Classic Air Max design</li>
                    <li>Comfortable fit for all-day wear</li>
                </ul>
            `,
            specifications: {
                'Upper Material': 'Mesh and synthetic',
                'Midsole': 'Air Max',
                'Outsole': 'Rubber',
                'Weight': '10.8 oz (men\'s size 9)',
                'Drop': '10mm',
                'Sizes': '7-15 US',
                'Colors': 'White/Black, Black/White, Blue/White'
            },
            sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15],
            colors: [
                { name: 'White/Black', value: '#ffffff', image: './images/nike-air-max-sc-18k.png' },
                { name: 'Black/White', value: '#000000', image: './images/nike-air-max-sc-18k.png' },
                { name: 'Blue/White', value: '#3b82f6', image: './images/nike-air-max-sc-18k.png' }
            ],
            reviews: [
                {
                    name: 'Robert Lee',
                    rating: 4,
                    date: '2024-01-13',
                    comment: 'Classic Air Max style at a great price. Very comfortable!'
                },
                {
                    name: 'Jennifer White',
                    rating: 5,
                    date: '2024-01-06',
                    comment: 'Love the classic look and the comfort is amazing!'
                }
            ]
        },
        'nike-air-force-1': {
            id: 'nike-air-force-1',
            name: 'NIKE AIR FORCE 1',
            price: 115,
            originalPrice: 140,
            image: './images/purple-shoe.png',
            images: [
                './images/purple-shoe.png',
                './images/nike-vomero-18-57k.png',
                './images/nike-air-zoom-upturn-sc-38k.png',
                './images/nike-quest-6-35k.png'
            ],
            description: 'The iconic Nike Air Force 1 delivers timeless style and legendary comfort with premium materials.',
            details: `
                <p>The Nike Air Force 1 is a basketball shoe that became a cultural icon. Known for its clean design and comfortable fit.</p>
                <ul>
                    <li>Full-grain leather upper</li>
                    <li>Air-Sole unit for cushioning</li>
                    <li>Rubber outsole with pivot points</li>
                    <li>Classic basketball silhouette</li>
                    <li>Timeless design that never goes out of style</li>
                </ul>
            `,
            specifications: {
                'Upper Material': 'Full-grain leather',
                'Midsole': 'Air-Sole',
                'Outsole': 'Rubber',
                'Weight': '12.5 oz (men\'s size 9)',
                'Drop': '8mm',
                'Sizes': '7-15 US',
                'Colors': 'White, Black, Purple, Navy'
            },
            sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15],
            colors: [
                { name: 'White', value: '#ffffff', image: './images/purple-shoe.png' },
                { name: 'Black', value: '#000000', image: './images/purple-shoe.png' },
                { name: 'Purple', value: '#8b5cf6', image: './images/purple-shoe.png' }
            ],
            reviews: [
                {
                    name: 'Marcus Johnson',
                    rating: 5,
                    date: '2024-01-12',
                    comment: 'Classic shoe that never goes out of style. Perfect for any occasion!'
                },
                {
                    name: 'Sarah Davis',
                    rating: 4,
                    date: '2024-01-08',
                    comment: 'Great quality and comfort. Love the classic look!'
                }
            ]
        },
        'nike-react-vision': {
            id: 'nike-react-vision',
            name: 'NIKE REACT VISION',
            price: 140,
            originalPrice: 170,
            image: './images/blue-shoe.png',
            images: [
                './images/blue-shoe.png',
                './images/nike-vomero-18-57k.png',
                './images/nike-air-zoom-upturn-sc-38k.png',
                './images/nike-quest-6-35k.png'
            ],
            description: 'The Nike React Vision combines innovative React foam with a futuristic design for ultimate comfort.',
            details: `
                <p>Experience the future of running with the Nike React Vision. Featuring React foam technology for responsive cushioning.</p>
                <ul>
                    <li>React foam midsole for energy return</li>
                    <li>Breathable mesh upper</li>
                    <li>Rubber outsole with traction pattern</li>
                    <li>Futuristic design elements</li>
                    <li>Lightweight construction</li>
                </ul>
            `,
            specifications: {
                'Upper Material': 'Mesh and synthetic',
                'Midsole': 'React foam',
                'Outsole': 'Rubber',
                'Weight': '9.2 oz (men\'s size 9)',
                'Drop': '8mm',
                'Sizes': '7-15 US',
                'Colors': 'Blue/White, Black/White, Grey/White'
            },
            sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15],
            colors: [
                { name: 'Blue/White', value: '#3b82f6', image: './images/blue-shoe.png' },
                { name: 'Black/White', value: '#000000', image: './images/blue-shoe.png' },
                { name: 'Grey/White', value: '#6b7280', image: './images/blue-shoe.png' }
            ],
            reviews: [
                {
                    name: 'Alex Chen',
                    rating: 5,
                    date: '2024-01-11',
                    comment: 'Amazing comfort and futuristic look. Perfect for running!'
                },
                {
                    name: 'Lisa Wang',
                    rating: 4,
                    date: '2024-01-07',
                    comment: 'Great shoe with excellent cushioning. Very comfortable!'
                }
            ]
        },
        'nike-zoom-fly': {
            id: 'nike-zoom-fly',
            name: 'NIKE ZOOM FLY',
            price: 155,
            originalPrice: 190,
            image: './images/green-shoe.png',
            images: [
                './images/green-shoe.png',
                './images/nike-vomero-18-57k.png',
                './images/nike-air-zoom-upturn-sc-38k.png',
                './images/nike-quest-6-35k.png'
            ],
            description: 'The Nike Zoom Fly delivers speed and responsiveness with Zoom Air technology for serious runners.',
            details: `
                <p>Built for speed, the Nike Zoom Fly features Zoom Air technology and a responsive design for serious runners.</p>
                <ul>
                    <li>Zoom Air units in forefoot and heel</li>
                    <li>Lightweight mesh upper</li>
                    <li>Carbon fiber plate for propulsion</li>
                    <li>Responsive foam midsole</li>
                    <li>Designed for speed and efficiency</li>
                </ul>
            `,
            specifications: {
                'Upper Material': 'Mesh',
                'Midsole': 'Zoom Air + React foam',
                'Outsole': 'Rubber',
                'Weight': '8.8 oz (men\'s size 9)',
                'Drop': '6mm',
                'Sizes': '7-15 US',
                'Colors': 'Green/White, Black/White, White/Black'
            },
            sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15],
            colors: [
                { name: 'Green/White', value: '#10b981', image: './images/green-shoe.png' },
                { name: 'Black/White', value: '#000000', image: './images/green-shoe.png' },
                { name: 'White/Black', value: '#ffffff', image: './images/green-shoe.png' }
            ],
            reviews: [
                {
                    name: 'David Kim',
                    rating: 5,
                    date: '2024-01-10',
                    comment: 'Incredible speed and responsiveness. Perfect for racing!'
                },
                {
                    name: 'Emma Rodriguez',
                    rating: 4,
                    date: '2024-01-06',
                    comment: 'Great performance shoe with excellent energy return!'
                }
            ]
        },
        'nike-air-force-1-men': {
            id: 'nike-air-force-1-men',
            name: 'NIKE AIR FORCE 1 MEN',
            price: 125,
            originalPrice: 150,
            image: './images/purple-shoe.png',
            images: [
                './images/purple-shoe.png',
                './images/nike-vomero-18-57k.png',
                './images/nike-air-zoom-upturn-sc-38k.png',
                './images/nike-quest-6-35k.png'
            ],
            description: 'The classic Nike Air Force 1 in men\'s sizing with premium leather construction.',
            details: `
                <p>The Nike Air Force 1 Men delivers the iconic basketball shoe design with premium materials and comfortable fit.</p>
                <ul>
                    <li>Full-grain leather upper</li>
                    <li>Air-Sole unit for cushioning</li>
                    <li>Rubber outsole with pivot points</li>
                    <li>Classic basketball silhouette</li>
                    <li>Durable construction for everyday wear</li>
                </ul>
            `,
            specifications: {
                'Upper Material': 'Full-grain leather',
                'Midsole': 'Air-Sole',
                'Outsole': 'Rubber',
                'Weight': '12.5 oz (men\'s size 9)',
                'Drop': '8mm',
                'Sizes': '7-15 US',
                'Colors': 'White, Black, Purple, Navy'
            },
            sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15],
            colors: [
                { name: 'White', value: '#ffffff', image: './images/purple-shoe.png' },
                { name: 'Black', value: '#000000', image: './images/purple-shoe.png' },
                { name: 'Purple', value: '#8b5cf6', image: './images/purple-shoe.png' }
            ],
            reviews: [
                {
                    name: 'Michael Brown',
                    rating: 5,
                    date: '2024-01-09',
                    comment: 'Classic design with great comfort. Perfect for casual wear!'
                }
            ]
        },
        'nike-vomero-18-women': {
            id: 'nike-vomero-18-women',
            name: 'NIKE VOMERO 18 WOMEN',
            price: 150,
            originalPrice: 180,
            image: './images/nike-vomero-18-57k.png',
            images: [
                './images/nike-vomero-18-57k.png',
                './images/nike-air-zoom-upturn-sc-38k.png',
                './images/nike-air-max-excee-32k.png',
                './images/nike-quest-6-35k.png'
            ],
            description: 'The Nike Vomero 18 in women\'s sizing with responsive cushioning and breathable upper.',
            details: `
                <p>Designed specifically for women, the Nike Vomero 18 Women offers the same premium comfort with a tailored fit.</p>
                <ul>
                    <li>React foam midsole for responsive cushioning</li>
                    <li>Breathable mesh upper</li>
                    <li>Rubber outsole with strategic traction zones</li>
                    <li>Women-specific fit and sizing</li>
                    <li>Lightweight construction for all-day comfort</li>
                </ul>
            `,
            specifications: {
                'Upper Material': 'Mesh and synthetic',
                'Midsole': 'React foam',
                'Outsole': 'Rubber',
                'Weight': '9.2 oz (women\'s size 8)',
                'Drop': '10mm',
                'Sizes': '5-12 US Women',
                'Colors': 'White/Black, Navy/White, Pink/White'
            },
            sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
            colors: [
                { name: 'White/Black', value: '#ffffff', image: './images/nike-vomero-18-57k.png' },
                { name: 'Navy/White', value: '#1e3a8a', image: './images/nike-vomero-18-57k.png' },
                { name: 'Pink/White', value: '#ec4899', image: './images/nike-vomero-18-57k.png' }
            ],
            reviews: [
                {
                    name: 'Jessica Taylor',
                    rating: 5,
                    date: '2024-01-08',
                    comment: 'Perfect fit and amazing comfort. Love the women-specific design!'
                }
            ]
        },
        'nike-air-zoom-upturn': {
            id: 'nike-air-zoom-upturn',
            name: 'NIKE AIR ZOOM UPTURN',
            price: 145,
            originalPrice: 175,
            image: './images/nike-air-zoom-upturn-sc-38k.png',
            images: [
                './images/nike-air-zoom-upturn-sc-38k.png',
                './images/nike-vomero-18-57k.png',
                './images/nike-air-max-excee-32k.png',
                './images/nike-quest-6-35k.png'
            ],
            description: 'The Nike Air Zoom Upturn delivers responsive cushioning with a modern design for versatile performance.',
            details: `
                <p>Experience responsive cushioning with the Nike Air Zoom Upturn. Perfect for training and everyday wear.</p>
                <ul>
                    <li>Zoom Air units in forefoot and heel</li>
                    <li>Lightweight mesh upper</li>
                    <li>Rubber outsole with flex grooves</li>
                    <li>Modern design aesthetic</li>
                    <li>Versatile performance for various activities</li>
                </ul>
            `,
            specifications: {
                'Upper Material': 'Mesh',
                'Midsole': 'Zoom Air',
                'Outsole': 'Rubber',
                'Weight': '9.5 oz (men\'s size 9)',
                'Drop': '8mm',
                'Sizes': '7-15 US',
                'Colors': 'Black/White, White/Black, Blue/White'
            },
            sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15],
            colors: [
                { name: 'Black/White', value: '#000000', image: './images/nike-air-zoom-upturn-sc-38k.png' },
                { name: 'White/Black', value: '#ffffff', image: './images/nike-air-zoom-upturn-sc-38k.png' },
                { name: 'Blue/White', value: '#3b82f6', image: './images/nike-air-zoom-upturn-sc-38k.png' }
            ],
            reviews: [
                {
                    name: 'Ryan Wilson',
                    rating: 4,
                    date: '2024-01-07',
                    comment: 'Great responsive feel and comfortable fit. Perfect for training!'
                }
            ]
        },
        // Kids Products
        'nike-air-max-sc-kids': {
            id: 'nike-air-max-sc-kids',
            name: 'NIKE AIR MAX SC KIDS',
            price: 85,
            originalPrice: 110,
            image: './images/nike-air-max-sc-18k.png',
            images: [
                './images/nike-air-max-sc-18k.png',
                './images/nike-vomero-18-57k.png',
                './images/nike-air-zoom-upturn-sc-38k.png',
                './images/nike-quest-6-35k.png'
            ],
            description: 'The Nike Air Max SC Kids delivers classic Air Max style with modern comfort, perfect for active kids.',
            details: `
                <p>Designed specifically for kids, the Nike Air Max SC Kids offers the same classic Air Max look with kid-friendly features.</p>
                <ul>
                    <li>Visible Air Max unit in heel for cushioning</li>
                    <li>Durable mesh and synthetic upper</li>
                    <li>Rubber outsole with Air Max branding</li>
                    <li>Easy-to-use hook and loop closure</li>
                    <li>Comfortable fit for all-day wear</li>
                </ul>
            `,
            specifications: {
                'Upper Material': 'Mesh and synthetic',
                'Midsole': 'Air Max',
                'Outsole': 'Rubber',
                'Weight': '8.5 oz (kids size 3)',
                'Drop': '10mm',
                'Sizes': '3-7 US Kids',
                'Colors': 'White/Black, Black/White, Blue/White'
            },
            sizes: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
            colors: [
                { name: 'White/Black', value: '#ffffff', image: './images/nike-air-max-sc-18k.png' },
                { name: 'Black/White', value: '#000000', image: './images/nike-air-max-sc-18k.png' },
                { name: 'Blue/White', value: '#3b82f6', image: './images/nike-air-max-sc-18k.png' }
            ],
            reviews: [
                {
                    name: 'Sarah Johnson',
                    rating: 5,
                    date: '2024-01-12',
                    comment: 'My son loves these shoes! Great quality and very comfortable for active kids.'
                },
                {
                    name: 'Mike Chen',
                    rating: 4,
                    date: '2024-01-08',
                    comment: 'Perfect for my daughter. Easy to put on and very durable.'
                }
            ]
        },
        'nike-quest-6-kids': {
            id: 'nike-quest-6-kids',
            name: 'NIKE QUEST 6 KIDS',
            price: 90,
            originalPrice: 120,
            image: './images/nike-quest-6-35k.png',
            images: [
                './images/nike-quest-6-35k.png',
                './images/nike-vomero-18-57k.png',
                './images/nike-air-zoom-upturn-sc-38k.png',
                './images/nike-air-max-excee-32k.png'
            ],
            description: 'The Nike Quest 6 Kids offers reliable performance and comfort for active kids with a breathable upper.',
            details: `
                <p>Perfect for active kids, the Nike Quest 6 Kids provides reliable performance and comfort for daily activities.</p>
                <ul>
                    <li>Phylon midsole for lightweight cushioning</li>
                    <li>Breathable mesh upper</li>
                    <li>Rubber outsole with flex grooves</li>
                    <li>Easy-to-use closure system</li>
                    <li>Durable construction for active kids</li>
                </ul>
            `,
            specifications: {
                'Upper Material': 'Mesh',
                'Midsole': 'Phylon',
                'Outsole': 'Rubber',
                'Weight': '7.8 oz (kids size 3)',
                'Drop': '10mm',
                'Sizes': '3-7 US Kids',
                'Colors': 'White/Black, Navy/White, Grey/White'
            },
            sizes: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
            colors: [
                { name: 'White/Black', value: '#ffffff', image: './images/nike-quest-6-35k.png' },
                { name: 'Navy/White', value: '#1e3a8a', image: './images/nike-quest-6-35k.png' },
                { name: 'Grey/White', value: '#6b7280', image: './images/nike-quest-6-35k.png' }
            ],
            reviews: [
                {
                    name: 'Lisa Wang',
                    rating: 5,
                    date: '2024-01-11',
                    comment: 'Great shoes for my active 8-year-old. Very comfortable and durable!'
                }
            ]
        },
        'nike-air-max-excee-kids': {
            id: 'nike-air-max-excee-kids',
            name: 'NIKE AIR MAX EXCEE KIDS',
            price: 75,
            originalPrice: 100,
            image: './images/nike-air-max-excee-32k.png',
            images: [
                './images/nike-air-max-excee-32k.png',
                './images/nike-vomero-18-57k.png',
                './images/nike-air-zoom-upturn-sc-38k.png',
                './images/nike-quest-6-35k.png'
            ],
            description: 'The Nike Air Max Excee Kids delivers classic Air Max comfort with a modern twist for young sneaker enthusiasts.',
            details: `
                <p>Introduce your kids to the legendary Air Max comfort with the Nike Air Max Excee Kids.</p>
                <ul>
                    <li>Visible Air Max unit in heel</li>
                    <li>Mesh and synthetic upper</li>
                    <li>Rubber outsole with Air Max branding</li>
                    <li>Classic Air Max silhouette</li>
                    <li>Comfortable fit for all-day wear</li>
                </ul>
            `,
            specifications: {
                'Upper Material': 'Mesh and synthetic',
                'Midsole': 'Air Max',
                'Outsole': 'Rubber',
                'Weight': '8.2 oz (kids size 3)',
                'Drop': '12mm',
                'Sizes': '3-7 US Kids',
                'Colors': 'White/Black, Black/White, Red/White'
            },
            sizes: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
            colors: [
                { name: 'White/Black', value: '#ffffff', image: './images/nike-air-max-excee-32k.png' },
                { name: 'Black/White', value: '#000000', image: './images/nike-air-max-excee-32k.png' },
                { name: 'Red/White', value: '#dc2626', image: './images/nike-air-max-excee-32k.png' }
            ],
            reviews: [
                {
                    name: 'David Kim',
                    rating: 4,
                    date: '2024-01-10',
                    comment: 'My son loves the classic Air Max look. Great quality for the price!'
                }
            ]
        },
        'nike-react-kids': {
            id: 'nike-react-kids',
            name: 'NIKE REACT KIDS',
            price: 80,
            originalPrice: 105,
            image: './images/blue-shoe.png',
            images: [
                './images/blue-shoe.png',
                './images/nike-vomero-18-57k.png',
                './images/nike-air-zoom-upturn-sc-38k.png',
                './images/nike-quest-6-35k.png'
            ],
            description: 'The Nike React Kids combines innovative React foam with a fun design for ultimate comfort and style.',
            details: `
                <p>Experience the future of kids footwear with the Nike React Kids. Featuring React foam technology for responsive cushioning.</p>
                <ul>
                    <li>React foam midsole for energy return</li>
                    <li>Breathable mesh upper</li>
                    <li>Rubber outsole with traction pattern</li>
                    <li>Fun, colorful design elements</li>
                    <li>Lightweight construction for active kids</li>
                </ul>
            `,
            specifications: {
                'Upper Material': 'Mesh and synthetic',
                'Midsole': 'React foam',
                'Outsole': 'Rubber',
                'Weight': '7.5 oz (kids size 3)',
                'Drop': '8mm',
                'Sizes': '3-7 US Kids',
                'Colors': 'Blue/White, Black/White, Pink/White'
            },
            sizes: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
            colors: [
                { name: 'Blue/White', value: '#3b82f6', image: './images/blue-shoe.png' },
                { name: 'Black/White', value: '#000000', image: './images/blue-shoe.png' },
                { name: 'Pink/White', value: '#ec4899', image: './images/blue-shoe.png' }
            ],
            reviews: [
                {
                    name: 'Emma Rodriguez',
                    rating: 5,
                    date: '2024-01-09',
                    comment: 'Amazing comfort for my daughter. She loves the colorful design!'
                }
            ]
        },
        'nike-zoom-kids': {
            id: 'nike-zoom-kids',
            name: 'NIKE ZOOM KIDS',
            price: 70,
            originalPrice: 95,
            image: './images/green-shoe.png',
            images: [
                './images/green-shoe.png',
                './images/nike-vomero-18-57k.png',
                './images/nike-air-zoom-upturn-sc-38k.png',
                './images/nike-quest-6-35k.png'
            ],
            description: 'The Nike Zoom Kids delivers speed and responsiveness with Zoom Air technology designed for active kids.',
            details: `
                <p>Built for active kids, the Nike Zoom Kids features Zoom Air technology and a responsive design for young athletes.</p>
                <ul>
                    <li>Zoom Air units in forefoot and heel</li>
                    <li>Lightweight mesh upper</li>
                    <li>Rubber outsole with flex grooves</li>
                    <li>Fun, energetic design</li>
                    <li>Designed for speed and efficiency</li>
                </ul>
            `,
            specifications: {
                'Upper Material': 'Mesh',
                'Midsole': 'Zoom Air',
                'Outsole': 'Rubber',
                'Weight': '7.2 oz (kids size 3)',
                'Drop': '6mm',
                'Sizes': '3-7 US Kids',
                'Colors': 'Green/White, Black/White, White/Black'
            },
            sizes: [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7],
            colors: [
                { name: 'Green/White', value: '#10b981', image: './images/green-shoe.png' },
                { name: 'Black/White', value: '#000000', image: './images/green-shoe.png' },
                { name: 'White/Black', value: '#ffffff', image: './images/green-shoe.png' }
            ],
            reviews: [
                {
                    name: 'James Wilson',
                    rating: 4,
                    date: '2024-01-08',
                    comment: 'Great performance shoe for my active son. Very comfortable and responsive!'
                }
            ]
        }
    };

    // Get product ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'nike-vomero-18';
    const product = products[productId];

    if (!product) {
        console.error('Product not found');
        return;
    }

    // Initialize product page
    initializeProductPage(product);

    function initializeProductPage(product) {
        // Update page title
        document.title = `${product.name} - SneakVerse`;
        
        // Update breadcrumb
        document.getElementById('breadcrumb-product').textContent = product.name;

        // Update product info
        document.getElementById('product-title').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price}`;
        document.getElementById('product-original-price').textContent = `$${product.originalPrice}`;
        document.getElementById('product-description-text').textContent = product.description;
        document.getElementById('product-details-content').innerHTML = product.details;

        // Update main image
        const mainImage = document.getElementById('main-product-image');
        mainImage.src = product.image;
        mainImage.alt = product.name;

        // Update thumbnails
        product.images.forEach((image, index) => {
            const thumb = document.getElementById(`thumb${index + 1}`);
            if (thumb) {
                thumb.src = image;
                thumb.alt = `${product.name} - View ${index + 1}`;
            }
        });

        // Generate size options
        generateSizeOptions(product.sizes);
        
        // Generate color options
        generateColorOptions(product.colors);
        
        // Generate specifications
        generateSpecifications(product.specifications);
        
        // Generate reviews
        generateReviews(product.reviews);
        
        // Generate related products
        generateRelatedProducts(product.id);

        // Setup event listeners
        setupEventListeners(product);
        
        // Initialize wishlist state
        initializeWishlistState(product);
    }

    function generateSizeOptions(sizes) {
        const sizeContainer = document.getElementById('sizeOptions');
        sizeContainer.innerHTML = '';

        sizes.forEach(size => {
            const sizeBtn = document.createElement('button');
            sizeBtn.className = 'size-option';
            sizeBtn.textContent = size;
            sizeBtn.dataset.size = size;
            sizeContainer.appendChild(sizeBtn);
        });

        // Add click handlers for size selection
        sizeContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('size-option')) {
                // Remove active class from all size options
                sizeContainer.querySelectorAll('.size-option').forEach(btn => {
                    btn.classList.remove('active');
                });
                // Add active class to clicked size
                e.target.classList.add('active');
                
                // Clear any size selection error
                clearProductFieldError(sizeContainer);
            }
        });

        // Auto-select first size
        if (sizes.length > 0) {
            const firstSize = sizeContainer.querySelector('.size-option');
            if (firstSize) {
                firstSize.classList.add('active');
            }
        }
    }

    function generateColorOptions(colors) {
        const colorContainer = document.getElementById('colorOptions');
        colorContainer.innerHTML = '';

        colors.forEach((color, index) => {
            const colorBtn = document.createElement('button');
            colorBtn.className = 'color-option';
            colorBtn.style.backgroundColor = color.value;
            colorBtn.title = color.name;
            colorBtn.dataset.color = color.name;
            colorBtn.dataset.image = color.image;
            if (index === 0) colorBtn.classList.add('active');
            colorContainer.appendChild(colorBtn);
        });

        // Add click handlers for color selection
        colorContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('color-option')) {
                // Remove active class from all color options
                colorContainer.querySelectorAll('.color-option').forEach(btn => {
                    btn.classList.remove('active');
                });
                // Add active class to clicked color
                e.target.classList.add('active');
                
                // Update main image
                const newImage = e.target.dataset.image;
                document.getElementById('main-product-image').src = newImage;
            }
        });
    }

    function generateSpecifications(specs) {
        const specsContainer = document.getElementById('specifications-content');
        specsContainer.innerHTML = '';

        Object.entries(specs).forEach(([key, value]) => {
            const specRow = document.createElement('div');
            specRow.className = 'spec-row';
            specRow.innerHTML = `
                <div class="spec-label">${key}</div>
                <div class="spec-value">${value}</div>
            `;
            specsContainer.appendChild(specRow);
        });
    }

    function generateReviews(reviews) {
        const reviewsContainer = document.getElementById('reviewsList');
        reviewsContainer.innerHTML = '';

        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review-item';
            reviewElement.innerHTML = `
                <div class="review-header">
                    <div class="review-author">${review.name}</div>
                    <div class="review-rating">
                        ${generateStars(review.rating)}
                    </div>
                    <div class="review-date">${review.date}</div>
                </div>
                <div class="review-comment">${review.comment}</div>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    }

    function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fa-solid fa-star"></i>';
            } else {
                stars += '<i class="fa-regular fa-star"></i>';
            }
        }
        return stars;
    }

    function generateRelatedProducts(currentProductId) {
        const relatedContainer = document.getElementById('relatedProducts');
        relatedContainer.innerHTML = '';

        // Get other products (exclude current one)
        const otherProducts = Object.values(products).filter(p => p.id !== currentProductId).slice(0, 4);

        otherProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'related-product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p class="price">$${product.price}</p>
                <button class="view-details-btn" data-product-id="${product.id}">View Details</button>
            `;
            relatedContainer.appendChild(productCard);
        });

        // Add click handlers for related products
        relatedContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-details-btn')) {
                const productId = e.target.dataset.productId;
                window.location.href = `product-detail.html?id=${productId}`;
            }
        });
    }

    function setupEventListeners(product) {
        // Quantity controls
        const quantityDisplay = document.getElementById('quantityDisplay');
        const decreaseBtn = document.getElementById('quantityDecrease');
        const increaseBtn = document.getElementById('quantityIncrease');
        let quantity = 1;

        decreaseBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        });

        increaseBtn.addEventListener('click', () => {
            quantity++;
            quantityDisplay.textContent = quantity;
        });

        // Add to cart button removed

        // Buy now button
        document.getElementById('buyNowBtn').addEventListener('click', () => {
            const selectedSize = document.querySelector('.size-option.active')?.dataset.size;
            const selectedColor = document.querySelector('.color-option.active')?.dataset.color;
            
            if (!selectedSize) {
                // Show error on size container
                const sizeContainer = document.getElementById('sizeOptions');
                if (sizeContainer) {
                    showProductFieldError(sizeContainer, 'Please select a size before proceeding to checkout');
                }
                return;
            }

            const cartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity,
                size: selectedSize,
                color: selectedColor
            };

            // Open buy modal directly without adding to cart
            openBuyModalFromDetail(cartItem);
        });

        // Wishlist button
        document.getElementById('wishlistBtn').addEventListener('click', () => {
            const wishlistBtnEl = document.getElementById('wishlistBtn');
            const iconEl = wishlistBtnEl ? wishlistBtnEl.querySelector('i') : null;
            if (!iconEl) return;

            const isLiked = iconEl.classList.contains('fa-solid');

            if (isLiked) {
                // Remove from wishlist
                removeFromWishlist(product.id);
                iconEl.classList.remove('fa-solid', 'active');
                iconEl.classList.add('fa-regular');
                wishlistBtnEl.setAttribute('aria-pressed', 'false');
                showProfessionalNotification('Removed from wishlist', 'info');
            } else {
                // Add to wishlist
                addToWishlist(product);
                iconEl.classList.remove('fa-regular');
                iconEl.classList.add('fa-solid', 'active');
                wishlistBtnEl.setAttribute('aria-pressed', 'true');
                showProfessionalNotification('Added to wishlist', 'success');
            }
        });

        // Image zoom functionality
        const mainImage = document.getElementById('main-product-image');
        const zoomOverlay = document.getElementById('imageZoomOverlay');
        const zoomedImage = document.getElementById('zoomed-image');
        const zoomClose = document.getElementById('zoomClose');

        mainImage.addEventListener('click', () => {
            zoomedImage.src = mainImage.src;
            zoomOverlay.style.display = 'flex';
        });

        zoomClose.addEventListener('click', () => {
            zoomOverlay.style.display = 'none';
        });

        zoomOverlay.addEventListener('click', (e) => {
            if (e.target === zoomOverlay) {
                zoomOverlay.style.display = 'none';
            }
        });

        // Thumbnail click handlers
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                // Remove active class from all thumbnails
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                // Add active class to clicked thumbnail
                thumb.classList.add('active');
                // Update main image
                mainImage.src = thumb.src;
            });
        });

        // Tab functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.tab;
                
                // Remove active class from all tabs and panels
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding panel
                btn.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });

        // Currency change handler for buy modal
        const currencySelect = document.getElementById('buyCurrency');
        if (currencySelect) {
            currencySelect.addEventListener('change', () => {
                // Get the current product data
                const selectedSize = document.querySelector('.size-option.active')?.dataset.size;
                const selectedColor = document.querySelector('.color-option.active')?.dataset.color;
                const quantity = parseInt(document.getElementById('quantityDisplay').textContent) || 1;
                
                // Create current item object
                const currentItem = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity,
                    size: selectedSize,
                    color: selectedColor
                };
                
                // Update the total with new currency
                updateBuyTotalFromDetail(currentItem);
            });
        }

        // Checkout form validation functions
        function showProductFieldError(inputEl, message) {
            if (!inputEl) return;
            inputEl.classList.add('field-error');
            let helper = inputEl.parentElement.querySelector('.error-text');
            if (!helper) {
                helper = document.createElement('div');
                helper.className = 'error-text';
                inputEl.parentElement.appendChild(helper);
            }
            helper.textContent = message;
        }

        function clearProductFieldError(inputEl) {
            if (!inputEl) return;
            inputEl.classList.remove('field-error');
            const helper = inputEl.parentElement.querySelector('.error-text');
            if (helper) helper.remove();
        }

        function validateProductCheckoutForm() {
            const name = document.getElementById('checkout-name');
            const email = document.getElementById('checkout-email');
            const phone = document.getElementById('checkout-phone');
            const address = document.getElementById('checkout-address');
            const payment = document.getElementById('checkout-payment');

            let isValid = true;

            // Clear previous errors
            [name, email, phone, address, payment].forEach(clearProductFieldError);

            // Name validation: at least 2 characters
            if (!name || name.value.trim().length < 2) {
                showProductFieldError(name, 'Please enter your full name.');
                isValid = false;
            }

            // Email validation: simple regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
            if (!email || !emailRegex.test(email.value.trim())) {
                showProductFieldError(email, 'Please enter a valid email address.');
                isValid = false;
            }

            // Pakistani mobile: 03XXXXXXXXX (11 digits starting with 03)
            const pkPhoneRegex = /^03\d{9}$/;
            if (!phone || !pkPhoneRegex.test(phone.value.trim())) {
                showProductFieldError(phone, 'Enter valid Pakistani number e.g. 03443090603');
                isValid = false;
            }

            // Address: at least 20 characters
            if (!address || address.value.trim().length < 20) {
                showProductFieldError(address, 'Address must be at least 20 characters.');
                isValid = false;
            }

            // Payment selected
            if (!payment || !payment.value) {
                showProductFieldError(payment, 'Please select a payment method.');
                isValid = false;
            }

            return isValid;
        }

        // Checkout form submission handler
        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Validate form before proceeding
                if (!validateProductCheckoutForm()) {
                    return;
                }
                
                // Add item to cart only when order is placed (without showing notification)
                const selectedSize = document.querySelector('.size-option.active')?.dataset.size;
                const selectedColor = document.querySelector('.color-option.active')?.dataset.color;
                const quantity = parseInt(document.getElementById('quantityDisplay').textContent) || 1;
                
                if (selectedSize) {
                    const cartItem = {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: quantity,
                        size: selectedSize,
                        color: selectedColor
                    };
                    addToCartFromDetailSilent(cartItem);
                }
                
                // Show success modal
                const orderModal = document.getElementById('orderSuccessModal');
                if (orderModal) {
                    orderModal.style.display = 'flex';
                    orderModal.setAttribute('aria-hidden', 'false');
                    
                    // Close buy modal
                    const buyModal = document.getElementById('buy-modal');
                    if (buyModal) {
                        buyModal.classList.add('hidden');
                        buyModal.setAttribute('aria-hidden', 'true');
                    }
                    
                    // Reset form
                    checkoutForm.reset();
                    
                    // Close success modal after 3 seconds
                    setTimeout(() => {
                        orderModal.style.display = 'none';
                        orderModal.setAttribute('aria-hidden', 'true');
                    }, 3000);
                }
            });

            // Real-time validation for checkout form
            ['input', 'change', 'blur'].forEach(evt => {
                checkoutForm.addEventListener(evt, (e) => {
                    const target = e.target;
                    if (!(target instanceof HTMLElement)) return;
                    if (target.id?.startsWith('checkout-')) clearProductFieldError(target);
                });
            });
        }

        // Close buy modal handlers
        const buyClose = document.getElementById('buy-close');
        const buyModal = document.getElementById('buy-modal');
        
        if (buyClose) {
            buyClose.addEventListener('click', () => {
                if (buyModal) {
                    buyModal.classList.add('hidden');
                    buyModal.setAttribute('aria-hidden', 'true');
                }
            });
        }
        
        if (buyModal) {
            buyModal.addEventListener('click', (e) => {
                if (e.target === buyModal) {
                    buyModal.classList.add('hidden');
                    buyModal.setAttribute('aria-hidden', 'true');
                }
            });
        }

        // Close order success modal
        const orderClose = document.getElementById('orderCloseModal');
        const orderModal = document.getElementById('orderSuccessModal');
        
        if (orderClose && orderModal) {
            orderClose.addEventListener('click', () => {
                orderModal.style.display = 'none';
                orderModal.setAttribute('aria-hidden', 'true');
            });
            
            orderModal.addEventListener('click', (e) => {
                if (e.target === orderModal) {
                    orderModal.style.display = 'none';
                    orderModal.setAttribute('aria-hidden', 'true');
                }
            });
        }
    }

    function showCartModal() {
        const cartModal = document.getElementById('cart-modal');
        if (cartModal) {
            cartModal.classList.remove('hidden');
            setTimeout(() => {
                cartModal.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                cartModal.classList.remove('show');
                setTimeout(() => cartModal.classList.add('hidden'), 400);
            }, 2000);
        }
    }

    // Add to cart functionality for product detail page
    function addToCartFromDetail(cartItem) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already exists (by name and size)
        const existing = cart.find(item => 
            item.name === cartItem.name && 
            item.size === cartItem.size && 
            item.color === cartItem.color
        );
        
        if (existing) {
            // Update quantity if item already exists
            existing.quantity += cartItem.quantity;
        } else {
            // Add new item to cart
            cart.push(cartItem);
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count in navigation
        updateCartCount();
        
        // Show success notification
        showProfessionalNotification('Added to cart successfully!', 'success');
    }

    // Silent add to cart functionality (no notification)
    function addToCartFromDetailSilent(cartItem) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already exists (by name and size)
        const existing = cart.find(item => 
            item.name === cartItem.name && 
            item.size === cartItem.size && 
            item.color === cartItem.color
        );
        
        if (existing) {
            // Update quantity if item already exists
            existing.quantity += cartItem.quantity;
        } else {
            // Add new item to cart
            cart.push(cartItem);
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count in navigation
        updateCartCount();
        
        // No notification shown - this is for order placement
    }

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cartCount.textContent = cart.length;
        }
    }

    function openBuyModalFromDetail(selectedItem) {
        const buyModal = document.getElementById('buy-modal');
        if (!buyModal) return;
        
        buyModal.classList.remove('hidden');
        buyModal.setAttribute('aria-hidden', 'false');
        
        // Hide multi-select panel if it was left open
        const selectBox = document.getElementById('buySelect');
        const selectList = document.getElementById('buySelectList');
        if (selectBox) selectBox.classList.add('hidden');
        if (selectList) selectList.innerHTML = '';
        
        // Update modal content
        const buyModalItem = document.getElementById('buyModalItem');
        const buyModalPrice = document.getElementById('buyModalPrice');
        const buyModalImage = document.getElementById('buyModalImage');
        
        if (buyModalItem) buyModalItem.textContent = selectedItem.name;
        if (buyModalPrice) buyModalPrice.textContent = `$${selectedItem.price} x ${selectedItem.quantity}`;
        if (buyModalImage && selectedItem.image) buyModalImage.src = selectedItem.image;
        
        // Update total
        updateBuyTotalFromDetail(selectedItem);
        
        // Focus on name input
        const nameInput = document.getElementById('checkout-name');
        if (nameInput) nameInput.focus();
    }

    function updateBuyTotalFromDetail(item) {
        const totalEl = document.getElementById('buyTotal');
        const currencyEl = document.getElementById('buyCurrency');
        if (!totalEl || !currencyEl || !item) return;
        
        const qty = item.quantity || 1;
        const base = parseFloat(item.price) * qty;
        const code = currencyEl.value || 'USD';
        
        // Currency rates
        const currencyRates = {
            USD: 1,
            PKR: 277,
            AED: 3.67,
            EUR: 0.92,
            GBP: 0.78,
            INR: 83.1
        };
        
        const rate = currencyRates[code] || 1;
        const converted = base * rate;
        
        // Format currency
        const symbolMap = { USD: '$', PKR: '₨', AED: 'د.إ', EUR: '€', GBP: '£', INR: '₹' };
        const symbol = symbolMap[code] || code + ' ';
        
        if (code === 'PKR') {
            totalEl.textContent = `${symbol}${Math.round(converted).toLocaleString()}`;
        } else {
            totalEl.textContent = `${symbol}${converted.toFixed(2)}`;
        }
    }

    // Cart functionality removed

    // Professional notification system
    function showProfessionalNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.professional-notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'professional-notification';
        
        // Set type-specific styling and icon
        let iconClass, bgColor, textColor;
        switch (type) {
            case 'success':
                iconClass = 'fa-solid fa-check-circle';
                bgColor = '#10b981';
                textColor = '#ffffff';
                break;
            case 'warning':
                iconClass = 'fa-solid fa-exclamation-triangle';
                bgColor = '#f59e0b';
                textColor = '#ffffff';
                break;
            case 'error':
                iconClass = 'fa-solid fa-times-circle';
                bgColor = '#ef4444';
                textColor = '#ffffff';
                break;
            default:
                iconClass = 'fa-solid fa-info-circle';
                bgColor = '#3b82f6';
                textColor = '#ffffff';
        }

        notification.innerHTML = `
            <div class="notification-content">
                <i class="${iconClass}"></i>
                <span class="notification-message">${message}</span>
                <button class="notification-close">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
        `;

        // Apply styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: ${textColor};
            padding: 0;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            max-width: 400px;
            min-width: 300px;
            transform: translateX(100%);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        // Style the content
        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            align-items: center;
            padding: 16px 20px;
            gap: 12px;
        `;

        // Style the icon
        const icon = notification.querySelector('i:first-child');
        icon.style.cssText = `
            font-size: 20px;
            flex-shrink: 0;
        `;

        // Style the message
        const messageEl = notification.querySelector('.notification-message');
        messageEl.style.cssText = `
            flex: 1;
            font-size: 14px;
            font-weight: 500;
            line-height: 1.4;
        `;

        // Style the close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: ${textColor};
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
            flex-shrink: 0;
        `;

        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });

        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.backgroundColor = 'transparent';
        });

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Close button functionality
        closeBtn.addEventListener('click', () => {
            closeNotification(notification);
        });

        // Auto close after 4 seconds
        const autoCloseTimer = setTimeout(() => {
            closeNotification(notification);
        }, 4000);

        // Store timer reference for manual close
        notification.autoCloseTimer = autoCloseTimer;
    }

    function closeNotification(notification) {
        if (notification.autoCloseTimer) {
            clearTimeout(notification.autoCloseTimer);
        }
        
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // ==================== WISHLIST FUNCTIONALITY ====================
    
    function addToWishlist(product) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        // Check if product already exists
        const existing = wishlist.find(item => item.id === product.id);
        
        if (!existing) {
            const wishlistItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                originalPrice: product.originalPrice
            };
            wishlist.push(wishlistItem);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
        
        updateWishlistCount();
        updateWishlistUI();
    }
    
    function removeFromWishlist(productId) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist = wishlist.filter(item => item.id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        
        updateWishlistCount();
        updateWishlistUI();
    }
    
    function updateWishlistCount() {
        const wishlistCount = document.getElementById('wishlist-count');
        if (wishlistCount) {
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            wishlistCount.textContent = wishlist.length;
        }
    }
    
    function updateWishlistUI() {
        const wishlistItemsContainer = document.getElementById('wishlist-items');
        if (!wishlistItemsContainer) return;
        
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlistItemsContainer.innerHTML = "";
        
        if (wishlist.length === 0) {
            wishlistItemsContainer.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; color: var(--text-color);">
                    <i class="fa-solid fa-heart" style="font-size: 48px; color: #ef4444; margin-bottom: 16px; opacity: 0.5;"></i>
                    <h3 style="margin: 0 0 8px 0; font-size: 18px;">Your wishlist is empty</h3>
                    <p style="margin: 0; opacity: 0.7; font-size: 14px;">Add products you love to your wishlist</p>
                </div>
            `;
            return;
        }
        
        wishlist.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("wishlist-item");
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="wishlist-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price}${item.originalPrice ? ` <span style="text-decoration: line-through; opacity: 0.6;">$${item.originalPrice}</span>` : ''}</p>
                </div>
                <div class="wishlist-item-actions">
                    <button class="view-details-from-wishlist" data-product-id="${item.id}">View Details</button>
                    <button class="wishlist-item-remove" data-product-id="${item.id}">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
            `;
            
            // View details from wishlist
            const viewDetailsBtn = div.querySelector('.view-details-from-wishlist');
            viewDetailsBtn.addEventListener('click', () => {
                // Close wishlist sidebar
                const wishlistSidebar = document.getElementById('wishlist-sidebar');
                const wishlistOverlay = document.getElementById('wishlist-overlay');
                if (wishlistSidebar) wishlistSidebar.classList.remove('active');
                if (wishlistOverlay) wishlistOverlay.classList.remove('active');
                
                // Navigate to product detail page
                window.location.href = `product-detail.html?id=${item.id}`;
            });
            
            // Remove from wishlist
            const removeBtn = div.querySelector('.wishlist-item-remove');
            removeBtn.addEventListener('click', () => {
                removeFromWishlist(item.id);
                showProfessionalNotification('Removed from wishlist', 'info');
            });
            
            wishlistItemsContainer.appendChild(div);
        });
    }
    
    function initializeWishlistState(product) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const isInWishlist = wishlist.some(item => item.id === product.id);

        const wishlistBtn = document.getElementById('wishlistBtn');
        const iconEl = wishlistBtn ? wishlistBtn.querySelector('i') : null;
        if (iconEl && wishlistBtn) {
            if (isInWishlist) {
                iconEl.classList.remove('fa-regular');
                iconEl.classList.add('fa-solid', 'active');
                wishlistBtn.setAttribute('aria-pressed', 'true');
            } else {
                iconEl.classList.remove('fa-solid', 'active');
                iconEl.classList.add('fa-regular');
                wishlistBtn.setAttribute('aria-pressed', 'false');
            }
        }

        updateWishlistCount();
        updateWishlistUI();
    }
    
    // Wishlist sidebar functionality
    function setupWishlistSidebar() {
        const wishlistBtn = document.getElementById('wishlist-btn');
        const wishlistSidebar = document.getElementById('wishlist-sidebar');
        const wishlistOverlay = document.getElementById('wishlist-overlay');
        const closeWishlist = document.getElementById('close-wishlist');
        const clearWishlistBtn = document.getElementById('clear-wishlist');
        
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => {
                wishlistSidebar.classList.add('active');
                wishlistOverlay.classList.add('active');
                updateWishlistUI();
            });
        }
        
        if (closeWishlist) {
            closeWishlist.addEventListener('click', () => {
                wishlistSidebar.classList.remove('active');
                wishlistOverlay.classList.remove('active');
            });
        }
        
        if (wishlistOverlay) {
            wishlistOverlay.addEventListener('click', () => {
                wishlistSidebar.classList.remove('active');
                wishlistOverlay.classList.remove('active');
            });
        }
        
        if (clearWishlistBtn) {
            clearWishlistBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear your wishlist?')) {
                    localStorage.removeItem('wishlist');
                    updateWishlistCount();
                    updateWishlistUI();
                    showProfessionalNotification('Wishlist cleared', 'info');
                }
            });
        }
    }
    
    // Initialize wishlist sidebar
    setupWishlistSidebar();
    
    // Initialize cart sidebar
    setupCartSidebar();
});

// ==================== CART SIDEBAR FUNCTIONALITY ====================
function setupCartSidebar() {
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');
    const clearCartBtn = document.getElementById('clear-cart');
    const buyAllBtn = document.getElementById('buy-all');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            updateCartUI();
        });
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
        });
    }
    
    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
        });
    }
    
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear your cart?')) {
                localStorage.removeItem('cart');
                updateCartUI();
                updateCartCount();
                showProfessionalNotification('Cart cleared', 'info');
            }
        });
    }
    
    // Buy All functionality is handled by main script.js
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = "";
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-color);">
                <i class="fa-solid fa-shopping-cart" style="font-size: 48px; color: var(--accent-color); margin-bottom: 16px; opacity: 0.5;"></i>
                <h3 style="margin: 0 0 8px 0; font-size: 18px;">Your cart is empty</h3>
                <p style="margin: 0; opacity: 0.7; font-size: 14px;">Add some products to get started</p>
            </div>
        `;
        return;
    }
    
    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
                ${item.size ? `<small>Size: ${item.size}</small>` : ''}
                ${item.color ? `<small>Color: ${item.color}</small>` : ''}
                <button class="buy-now-btn" data-index="${index}">Buy</button>
            </div>
            <span class="cart-item-remove">&times;</span>
        `;
        
        // Remove button functionality
        const removeBtn = div.querySelector(".cart-item-remove");
        removeBtn.addEventListener("click", () => {
            removeFromCart(index);
        });
        
        // Buy button functionality
        const buyBtn = div.querySelector(".buy-now-btn");
        buyBtn.addEventListener("click", () => {
            openBuyModalFromDetail(item);
        });
        
        cartItemsContainer.appendChild(div);
    });
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    updateCartCount();
    showProfessionalNotification('Item removed from cart', 'info');
}

function openBuyModalFromCart(cartItems) {
    const buyModal = document.getElementById('buy-modal');
    if (!buyModal) return;
    
    buyModal.classList.remove('hidden');
    buyModal.setAttribute('aria-hidden', 'false');
    
    // Show multi-select panel for multiple items
    const selectBox = document.getElementById('buySelect');
    const selectList = document.getElementById('buySelectList');
    
    if (cartItems.length > 1 && selectBox && selectList) {
        selectBox.classList.remove('hidden');
        selectList.innerHTML = '';
        
        cartItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'buy-select-item';
            itemDiv.innerHTML = `
                <input type="checkbox" id="item-${index}" checked>
                <label for="item-${index}">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h4>${item.name}</h4>
                        <p>$${item.price} x ${item.quantity}</p>
                    </div>
                </label>
            `;
            selectList.appendChild(itemDiv);
        });
    } else {
        if (selectBox) selectBox.classList.add('hidden');
        if (selectList) selectList.innerHTML = '';
    }
    
    // Update modal content with first item or total
    const buyModalItem = document.getElementById('buyModalItem');
    const buyModalPrice = document.getElementById('buyModalPrice');
    const buyModalImage = document.getElementById('buyModalImage');
    
    if (cartItems.length === 1) {
        const item = cartItems[0];
        if (buyModalItem) buyModalItem.textContent = item.name;
        if (buyModalPrice) buyModalPrice.textContent = `$${item.price} x ${item.quantity}`;
        if (buyModalImage && item.image) buyModalImage.src = item.image;
        updateBuyTotalFromDetail(item);
    } else {
        if (buyModalItem) buyModalItem.textContent = `${cartItems.length} items in cart`;
        if (buyModalPrice) buyModalPrice.textContent = 'Multiple items';
        if (buyModalImage) buyModalImage.src = cartItems[0].image;
        
        // Calculate total for all items
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalEl = document.getElementById('buyTotal');
        if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    }
    
    // Focus on name input
    const nameInput = document.getElementById('checkout-name');
    if (nameInput) nameInput.focus();
}
