import { Product } from '../components/features/ProductCard';

export const CATEGORIES = [
  { id: '1', name: 'Vegetables', icon: '🥬' },
  { id: '2', name: 'Fruits', icon: '🥭' },
  { id: '3', name: 'Grains', icon: '🌾' },
  { id: '4', name: 'Tubers', icon: '🥔' },
  { id: '5', name: 'Spices', icon: '🌶️' },
  { id: '6', name: 'Oils', icon: '🛢️' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Fresh Cassava',
    price: 50000,
    unit: 'bag',
    image: 'https://images.unsplash.com/photo-1596647892112-921d23485ab7?q=80&w=200&auto=format&fit=crop',
    farmer: 'Musa Farm, Makeni',
    categoryId: '4'
  },
  {
    id: '2',
    name: 'Organic Tomatoes',
    price: 15000,
    unit: 'basket',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=200&auto=format&fit=crop',
    farmer: 'Aminata Garden',
    categoryId: '1'
  },
  {
    id: '3',
    name: 'Local Rice',
    price: 350000,
    unit: '50kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=200&auto=format&fit=crop',
    farmer: 'Kambia Co-op',
    categoryId: '3'
  },
  {
    id: '4',
    name: 'Sweet Potatoes',
    price: 45000,
    unit: 'bag',
    image: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?q=80&w=200&auto=format&fit=crop',
    farmer: 'Kabala Highlands',
    categoryId: '4'
  },
  {
    id: '5',
    name: 'Fresh Palm Oil',
    price: 120000,
    unit: '5 liters',
    image: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?q=80&w=200&auto=format&fit=crop',
    farmer: 'Bo Oil Producers',
    categoryId: '6'
  },
  {
    id: '6',
    name: 'Hot Peppers',
    price: 10000,
    unit: 'cup',
    image: 'https://images.unsplash.com/photo-1585443241517-5c02bd4a6e8b?q=80&w=200&auto=format&fit=crop',
    farmer: 'Kenema Spices',
    categoryId: '5'
  },
  {
    id: '7',
    name: 'Fresh Mangoes',
    price: 5000,
    unit: 'dozen',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=200&auto=format&fit=crop',
    farmer: 'Freetown Orchards',
    categoryId: '2'
  },
  {
    id: '8',
    name: 'Groundnuts',
    price: 30000,
    unit: 'kilo',
    image: 'https://images.unsplash.com/photo-1569032596950-c8b185b1c93a?q=80&w=200&auto=format&fit=crop',
    farmer: 'Makeni Nut Farm',
    categoryId: '3'
  },
  {
    id: '9',
    name: 'Cabbage',
    price: 8000,
    unit: 'head',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=200&auto=format&fit=crop',
    farmer: 'Lunsar Greens',
    categoryId: '1'
  },
  {
    id: '10',
    name: 'Pineapples',
    price: 12000,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?q=80&w=200&auto=format&fit=crop',
    farmer: 'Waterloo Fruits',
    categoryId: '2'
  },
  {
    id: '11',
    name: 'Onions',
    price: 25000,
    unit: 'kilo',
    image: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?q=80&w=200&auto=format&fit=crop',
    farmer: 'Port Loko Veggies',
    categoryId: '1'
  },
  {
    id: '12',
    name: 'Carrots',
    price: 15000,
    unit: 'bundle',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=200&auto=format&fit=crop',
    farmer: 'Kabala Fresh',
    categoryId: '1'
  },
  {
    id: '13',
    name: 'Ginger',
    price: 20000,
    unit: 'kilo',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=200&auto=format&fit=crop',
    farmer: 'Moyamba Roots',
    categoryId: '5'
  },
  {
    id: '14',
    name: 'Plantains',
    price: 15000,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1540939023-e51c865ab374?q=80&w=200&auto=format&fit=crop',
    farmer: 'Pujehun Plantations',
    categoryId: '2'
  },
  {
    id: '15',
    name: 'Yams',
    price: 60000,
    unit: 'dozen',
    image: 'https://images.unsplash.com/photo-1595859714349-30113c013cf8?q=80&w=200&auto=format&fit=crop',
    farmer: 'Kailahun Tubers',
    categoryId: '4'
  },
  {
    id: '16',
    name: 'Green Beans',
    price: 10000,
    unit: 'bundle',
    image: 'https://images.unsplash.com/photo-1533123896-1c0b3b4fb79c?q=80&w=200&auto=format&fit=crop',
    farmer: 'Aminata Garden',
    categoryId: '1'
  },
  {
    id: '17',
    name: 'Avocados',
    price: 5000,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=200&auto=format&fit=crop',
    farmer: 'Freetown Orchards',
    categoryId: '2'
  },
  {
    id: '18',
    name: 'Cocoa Beans',
    price: 150000,
    unit: '50kg',
    image: 'https://images.unsplash.com/photo-1582035973418-fcc7af5c9112?q=80&w=200&auto=format&fit=crop',
    farmer: 'Kenema Cocoa Co-op',
    categoryId: '3'
  },
  {
    id: '19',
    name: 'Coconut Oil',
    price: 45000,
    unit: 'liter',
    image: 'https://images.unsplash.com/photo-1610419358219-5eb8bc6c3e7f?q=80&w=200&auto=format&fit=crop',
    farmer: 'Bonthe Organics',
    categoryId: '6'
  },
  {
    id: '20',
    name: 'Millet',
    price: 250000,
    unit: '50kg',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=200&auto=format&fit=crop',
    farmer: 'Kambia Co-op',
    categoryId: '3'
  }
];

export interface Order {
  id: string;
  orderNumber: string;
  itemsDesc: string;
  amount: number;
  status: 'Pending Pickup' | 'Processing' | 'Completed' | 'Cancelled';
  date: string;
}

export const MOCK_ORDERS: Order[] = [
  { id: '1', orderNumber: '#1054', itemsDesc: '5 Bags of Sweet Potatoes', amount: 225000, status: 'Pending Pickup', date: 'Today, 08:30 AM' },
  { id: '2', orderNumber: '#1053', itemsDesc: '2 Baskets of Organic Tomatoes', amount: 30000, status: 'Processing', date: 'Today, 07:15 AM' },
  { id: '3', orderNumber: '#1052', itemsDesc: '10 Liters of Fresh Palm Oil', amount: 240000, status: 'Completed', date: 'Yesterday, 04:20 PM' },
  { id: '4', orderNumber: '#1051', itemsDesc: '50kg Local Rice', amount: 350000, status: 'Completed', date: 'Yesterday, 02:10 PM' },
  { id: '5', orderNumber: '#1050', itemsDesc: '3 Dozen Fresh Mangoes', amount: 15000, status: 'Pending Pickup', date: 'Yesterday, 11:05 AM' },
  { id: '6', orderNumber: '#1049', orderNumber: '#1049', itemsDesc: '20kg Groundnuts', amount: 600000, status: 'Processing', date: 'Oct 12, 09:45 AM' },
  { id: '7', orderNumber: '#1048', itemsDesc: '5 Heads of Cabbage', amount: 40000, status: 'Completed', date: 'Oct 12, 08:10 AM' },
  { id: '8', orderNumber: '#1047', itemsDesc: '2 Bunches of Plantains', amount: 30000, status: 'Completed', date: 'Oct 11, 05:30 PM' },
  { id: '9', orderNumber: '#1046', itemsDesc: '5 Kilos of Onions', amount: 125000, status: 'Pending Pickup', date: 'Oct 11, 01:15 PM' },
  { id: '10', orderNumber: '#1045', itemsDesc: '10 Bundles of Carrots', amount: 150000, status: 'Processing', date: 'Oct 11, 10:20 AM' },
  { id: '11', orderNumber: '#1044', itemsDesc: '50kg Cocoa Beans', amount: 150000, status: 'Cancelled', date: 'Oct 10, 03:40 PM' },
  { id: '12', orderNumber: '#1043', itemsDesc: '3 Kilos of Ginger', amount: 60000, status: 'Completed', date: 'Oct 10, 11:55 AM' },
  { id: '13', orderNumber: '#1042', itemsDesc: '4 Pineapples', amount: 48000, status: 'Completed', date: 'Oct 09, 04:10 PM' },
  { id: '14', orderNumber: '#1041', itemsDesc: '5 Liters Coconut Oil', amount: 225000, status: 'Pending Pickup', date: 'Oct 09, 09:30 AM' },
  { id: '15', orderNumber: '#1040', itemsDesc: '10 Dozen Yams', amount: 600000, status: 'Completed', date: 'Oct 08, 02:45 PM' }
];
