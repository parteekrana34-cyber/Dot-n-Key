import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-Memory Backend Store for Admin Dashboard
let backendProducts = [
  {
    id: 'pj-001',
    name: 'Aurelia Pavé Diamond Pendant',
    category: 'Necklaces',
    price: 74500,
    stock: 14,
    rating: 4.9,
    salesCount: 84,
    status: 'In Stock',
    karat: '18K Yellow Gold',
  },
  {
    id: 'pj-002',
    name: 'Élise Emerald Cut Solitaire Ring',
    category: 'Rings',
    price: 125000,
    stock: 9,
    rating: 5.0,
    salesCount: 112,
    status: 'In Stock',
    karat: '18K Solid Gold / 950 Pt',
  },
  {
    id: 'pj-003',
    name: 'Symphony Diamond Tennis Bracelet',
    category: 'Bracelets',
    price: 185000,
    stock: 6,
    rating: 4.9,
    salesCount: 67,
    status: 'In Stock',
    karat: '18K White Gold',
  },
  {
    id: 'pj-004',
    name: 'Celeste South Sea Pearl Drop Earrings',
    category: 'Earrings',
    price: 62000,
    stock: 18,
    rating: 4.8,
    salesCount: 52,
    status: 'In Stock',
    karat: '18K Champagne Gold',
  },
  {
    id: 'pj-005',
    name: 'Serenade Royal Bridal Tiara Suite',
    category: 'Bridal Jewellery',
    price: 365000,
    stock: 3,
    rating: 5.0,
    salesCount: 39,
    status: 'Limited Vault',
    karat: 'Platinum 950',
  },
  {
    id: 'pj-006',
    name: 'The Sovereign Imperial Collar',
    category: 'Luxury Collection',
    price: 740000,
    stock: 2,
    rating: 5.0,
    salesCount: 19,
    status: 'Piece Unique',
    karat: '18K Solid Yellow Gold',
  },
];

let backendOrders = [
  {
    id: 'PY-90421',
    customer: 'Victoria Montgomery',
    email: 'v.montgomery@mayfair.co.uk',
    item: 'Aurelia Pavé Diamond Pendant',
    amount: 74500,
    date: '2026-10-05',
    status: 'Delivered',
    paymentMethod: 'Credit Card (Amex)',
  },
  {
    id: 'PY-88319',
    customer: 'Priya Sharma',
    email: 'priya.sharma@mumbaicircle.in',
    item: 'Élise Emerald Cut Solitaire Ring',
    amount: 125000,
    date: '2026-10-06',
    status: 'In Atelier Setting',
    paymentMethod: 'UPI Instant Transfer',
  },
  {
    id: 'PY-77142',
    customer: 'Elena Rostova',
    email: 'e.rostova@geneva-wealth.ch',
    item: 'Symphony Diamond Tennis Bracelet',
    amount: 185000,
    date: '2026-10-06',
    status: 'Insured Courier Shipped',
    paymentMethod: 'Wire Transfer',
  },
  {
    id: 'PY-65201',
    customer: 'Sophia Kensington',
    email: 'sophia.k@luxemail.com',
    item: 'The Sovereign Imperial Collar',
    amount: 740000,
    date: '2026-10-06',
    status: 'Processing',
    paymentMethod: 'Armored Courier COD',
  },
];

let backendInquiries = [
  {
    id: 'inq-1',
    name: 'Lord Arthur Sterling',
    email: 'sterling@londonchambers.com',
    service: 'Bespoke Diamond Commission',
    message: 'Seeking a 3.5 carat D-Flawless emerald cut engagement ring setting in unheated platinum.',
    date: '2026-10-06',
    status: 'Followed Up',
  },
  {
    id: 'inq-2',
    name: 'Mademoiselle Claire Dupont',
    email: 'claire@parisluxe.fr',
    service: 'Private Salon Viewing',
    message: 'Requesting appointment at Milan atelier on October 14th for bridal tiara inspection.',
    date: '2026-10-06',
    status: 'Pending Consultation',
  },
];

// Backend API Endpoints for Admin Dashboard

// 1. Products Management
app.get('/api/products', (req, res) => {
  res.json({ success: true, products: backendProducts });
});

app.post('/api/products', (req, res) => {
  const newProduct = {
    id: `pj-00${backendProducts.length + 1}`,
    name: req.body.name || 'Untitled Fine Jewel',
    category: req.body.category || 'Luxury Collection',
    price: Number(req.body.price) || 950,
    stock: Number(req.body.stock) || 5,
    rating: 5.0,
    salesCount: 0,
    status: req.body.status || 'In Stock',
    karat: req.body.karat || '18K Yellow Gold',
  };
  backendProducts.unshift(newProduct);
  res.json({ success: true, product: newProduct });
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = backendProducts.findIndex((p) => p.id === id);
  if (index !== -1) {
    backendProducts[index] = { ...backendProducts[index], ...req.body };
    res.json({ success: true, product: backendProducts[index] });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  backendProducts = backendProducts.filter((p) => p.id !== id);
  res.json({ success: true, message: 'Product deleted from inventory' });
});

// 2. Orders Management
app.get('/api/orders', (req, res) => {
  res.json({ success: true, orders: backendOrders });
});

// Supabase config
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://nyzjsmitfngyzesnsikz.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_7HeI40Y816eCbpwXegbplA_qACQO_yz';

async function syncToSupabaseBackend(order: any) {
  const candidateTables = ['orders', 'order_form', 'orders_form', 'checkout_orders', 'payora_orders'];
  for (const tbl of candidateTables) {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${tbl}`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          order_id: order.id,
          customer_name: order.customer,
          customer_email: order.email,
          customer_phone: order.phone || '',
          shipping_address: order.address || '',
          city: order.city || '',
          postal_code: order.postalCode || '',
          total_amount: order.amount,
          payment_method: order.paymentMethod,
          status: order.status,
          currency: 'INR',
          created_at: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        console.log(`[Supabase Server Sync] Successfully saved to table '${tbl}'`);
        return true;
      }
    } catch {
      // safe continue
    }
  }
  return false;
}

app.post('/api/orders', async (req, res) => {
  const newOrder = {
    id: req.body.id || `PY-${Math.floor(100000 + Math.random() * 900000)}`,
    customer: req.body.customer || 'Private Collector',
    email: req.body.email || 'client@payorajewels.com',
    phone: req.body.phone || '',
    address: req.body.address || '',
    city: req.body.city || '',
    postalCode: req.body.postalCode || '',
    item: req.body.item || 'Bespoke Atelier Creation',
    amount: Number(req.body.amount) || 1200,
    date: new Date().toISOString().split('T')[0],
    status: 'In Atelier Setting',
    paymentMethod: req.body.paymentMethod || 'Credit Card',
  };
  backendOrders.unshift(newOrder);

  // Trigger server-side sync in background
  syncToSupabaseBackend(newOrder).catch(() => {});

  res.json({ success: true, order: newOrder });
});

app.put('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = backendOrders.find((o) => o.id === id);
  if (order) {
    order.status = status;
    res.json({ success: true, order });
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// 3. Analytics Overview
app.get('/api/analytics', (req, res) => {
  const totalRevenue = backendOrders.reduce((sum, o) => sum + o.amount, 0);
  const totalProducts = backendProducts.length;
  const totalOrders = backendOrders.length;
  const totalInquiries = backendInquiries.length;
  const avgOrderValue = Math.round(totalRevenue / (totalOrders || 1));

  res.json({
    success: true,
    analytics: {
      totalRevenue,
      totalOrders,
      totalProducts,
      totalInquiries,
      avgOrderValue,
      vaultValuation: 15480000,
      currency: 'INR',
    },
  });
});

// 4. Inquiries
app.get('/api/inquiries', (req, res) => {
  res.json({ success: true, inquiries: backendInquiries });
});

app.post('/api/inquiries', (req, res) => {
  const newInq = {
    id: `inq-${backendInquiries.length + 1}`,
    name: req.body.name || 'Anonymous Collector',
    email: req.body.email || 'collector@luxemail.com',
    service: req.body.service || 'Private Salon Consultation',
    message: req.body.message || 'Atelier inquiry',
    date: new Date().toISOString().split('T')[0],
    status: 'Pending Consultation',
  };
  backendInquiries.unshift(newInq);
  res.json({ success: true, inquiry: newInq });
});

// Development / Production Vite middleware handling
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Dot & Key Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
