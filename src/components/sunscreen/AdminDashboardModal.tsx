import React, { useState, useEffect } from 'react';
import {
  X,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Plus,
  RefreshCw,
  Sun,
  Search,
  AlertCircle,
  Truck,
  Users,
  Database,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { SUNSCREEN_PRODUCTS } from '../../data/sunscreenCatalog';
import {
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_SQL_SETUP,
  checkSupabaseConnection,
  getStoredOrders,
  syncOrderToSupabase,
} from '../../lib/supabase';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderRecord {
  id: string;
  customerName: string;
  email: string;
  city: string;
  items: string;
  total: number;
  paymentMethod: string;
  status: 'Processing' | 'Packed' | 'Dispatched' | 'Delivered';
  date: string;
}

interface CouponRecord {
  code: string;
  discount: string;
  minOrder: number;
  uses: number;
  status: 'Active' | 'Paused';
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'orders' | 'coupons' | 'supabase'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [supabaseTestStatus, setSupabaseTestStatus] = useState<string | null>(null);
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [storedCheckoutOrders, setStoredCheckoutOrders] = useState<any[]>([]);
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStoredCheckoutOrders(getStoredOrders());
    }
  }, [isOpen, activeTab]);

  const handleTestSupabase = async () => {
    setIsTestingSupabase(true);
    setSupabaseTestStatus(null);
    try {
      const res = await checkSupabaseConnection();
      setSupabaseTestStatus(res.message);
    } catch (e: any) {
      setSupabaseTestStatus(`Error connecting to Supabase: ${e?.message || e}`);
    } finally {
      setIsTestingSupabase(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleSyncAllOrders = async () => {
    setIsSyncingAll(true);
    const ordersToSync = getStoredOrders();
    for (const ord of ordersToSync) {
      await syncOrderToSupabase(ord);
    }
    setStoredCheckoutOrders(getStoredOrders());
    setIsSyncingAll(false);
  };

  // Sample dynamic product inventory
  const [inventoryList, setInventoryList] = useState(() =>
    SUNSCREEN_PRODUCTS.map((p, idx) => ({
      id: p.id,
      name: p.name,
      spf: p.spfRating,
      category: p.suitableForSkin,
      price: p.price,
      originalPrice: p.originalPrice,
      stock: [120, 84, 45, 62, 78, 95, 32, 50][idx] ?? 60,
      inStock: p.inStock,
      image: p.image,
    }))
  );

  // Sample recent orders
  const [orders, setOrders] = useState<OrderRecord[]>([
    {
      id: 'ORD-98214',
      customerName: 'Ananya Sharma',
      email: 'ananya.s@gmail.com',
      city: 'Bandra, Mumbai',
      items: 'Watermelon Cooling Sunscreen (80g) x 1',
      total: 595,
      paymentMethod: 'UPI (Google Pay)',
      status: 'Dispatched',
      date: 'Today, 2:45 PM',
    },
    {
      id: 'ORD-98213',
      customerName: 'Rhea Deshmukh',
      email: 'rhea.d@outlook.com',
      city: 'Koramangala, Bengaluru',
      items: 'Vitamin C + E Sunscreen (80g) + Strawberry Dew Lip Balm',
      total: 879,
      paymentMethod: 'Credit Card (HDFC)',
      status: 'Packed',
      date: 'Today, 1:15 PM',
    },
    {
      id: 'ORD-98212',
      customerName: 'Kabir Mehta',
      email: 'kabir.m@techcorp.in',
      city: 'Vasant Vihar, New Delhi',
      items: 'Cica + Niacinamide Sunscreen (80g) x 2',
      total: 1190,
      paymentMethod: 'UPI (PhonePe)',
      status: 'Processing',
      date: 'Today, 11:30 AM',
    },
    {
      id: 'ORD-98211',
      customerName: 'Priya Mukherjee',
      email: 'priya.m@gmail.com',
      city: 'Salt Lake, Kolkata',
      items: 'Strawberry Dew Tinted Sunscreen SPF 50+ (50ml)',
      total: 549,
      paymentMethod: 'Cash on Delivery',
      status: 'Delivered',
      date: 'Yesterday',
    },
    {
      id: 'ORD-98210',
      customerName: 'Sneha Verma',
      email: 'sneha.v@yahoo.com',
      city: 'Jubilee Hills, Hyderabad',
      items: 'Ceramide Barrier Sunscreen + Dragon Fruit Jelly Moisturizer',
      total: 1019,
      paymentMethod: 'UPI (Paytm)',
      status: 'Delivered',
      date: '2 days ago',
    },
  ]);

  // Active discount coupons
  const [coupons, setCoupons] = useState<CouponRecord[]>([
    { code: 'SUNNY15', discount: '15% OFF', minOrder: 499, uses: 1420, status: 'Active' },
    { code: 'GLOW20', discount: '20% OFF', minOrder: 799, uses: 980, status: 'Active' },
    { code: 'FREESHIP', discount: 'Free Shipping', minOrder: 0, uses: 3240, status: 'Active' },
    { code: 'WATERMELON', discount: '10% Extra', minOrder: 595, uses: 610, status: 'Active' },
  ]);

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('15% OFF');

  if (!isOpen) return null;

  const handleToggleStock = (id: string) => {
    setInventoryList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, inStock: !item.inStock } : item))
    );
  };

  const handleUpdatePrice = (id: string, delta: number) => {
    setInventoryList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, price: Math.max(199, item.price + delta) } : item
      )
    );
  };

  const handleCycleOrderStatus = (id: string) => {
    const statuses: OrderRecord['status'][] = ['Processing', 'Packed', 'Dispatched', 'Delivered'];
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== id) return order;
        const currentIdx = statuses.indexOf(order.status);
        const nextStatus = statuses[(currentIdx + 1) % statuses.length];
        return { ...order, status: nextStatus };
      })
    );
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    setCoupons((prev) => [
      {
        code: newCouponCode.trim().toUpperCase(),
        discount: newCouponDiscount,
        minOrder: 499,
        uses: 0,
        status: 'Active',
      },
      ...prev,
    ]);
    setNewCouponCode('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-[#F5D5DE] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F5D5DE] bg-gradient-to-r from-[#F9DDE5] via-[#FCEEF2] to-[#F9DDE5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF8C9A] text-white flex items-center justify-center shadow-md">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-[#633D4B] tracking-tight font-display">
                  Bloom &amp; Blush Store Admin Dashboard
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white text-[#633D4B] border border-[#F5D5DE]">
                  Live Portal
                </span>
              </div>
              <p className="text-xs text-[#8E6B78]">
                Manage SPF 50+ inventory, real customer orders, coupon promotions, and fulfillment.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white text-[#8E6B78] hover:text-[#633D4B] transition-colors cursor-pointer border border-transparent hover:border-[#F5D5DE]"
            aria-label="Close dashboard"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-[#F5D5DE] bg-[#FCEEF2] overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Metrics', icon: LayoutDashboard },
            { id: 'inventory', label: 'Sunscreen Inventory (8)', icon: Package },
            { id: 'orders', label: 'Customer Orders (5)', icon: ShoppingBag },
            { id: 'coupons', label: 'Coupons & Offers (4)', icon: Tag },
            { id: 'supabase', label: 'Supabase Backend', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FF8C9A] text-white shadow-xs'
                    : 'text-[#633D4B] hover:text-[#FF8C9A] hover:bg-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#FF8C9A]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dashboard Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: OVERVIEW & METRICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF0F3] to-[#FFE5EC] border border-[#FFD1DC]">
                  <p className="text-[11px] font-bold text-[#E11D48] uppercase tracking-wider">
                    Total Revenue
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-[#1E1B1D] mt-1">
                    ₹2,48,590
                  </p>
                  <p className="text-[11px] text-[#059669] font-bold mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +18.4% today
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] border border-[#FED7AA]">
                  <p className="text-[11px] font-bold text-[#C2410C] uppercase tracking-wider">
                    Total Orders
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-[#1E1B1D] mt-1">
                    418
                  </p>
                  <p className="text-[11px] text-[#C2410C] font-semibold mt-1">
                    36 pending dispatch
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] border border-[#A7F3D0]">
                  <p className="text-[11px] font-bold text-[#047857] uppercase tracking-wider">
                    Active Sunscreen SKUs
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-[#1E1B1D] mt-1">
                    8 Variants
                  </p>
                  <p className="text-[11px] text-[#059669] font-semibold mt-1">
                    100% In-Stock
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#E0F2FE] to-[#BAE6FD] border border-[#7DD3FC]">
                  <p className="text-[11px] font-bold text-[#0369A1] uppercase tracking-wider">
                    Verified Buyer Rating
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-[#1E1B1D] mt-1">
                    4.88 ★
                  </p>
                  <p className="text-[11px] text-[#0284C7] font-semibold mt-1">
                    9,840+ reviews
                  </p>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#F0E6E1] shadow-xs space-y-3">
                  <h3 className="font-extrabold text-sm text-[#1E1B1D] flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#F97316]" />
                    <span>Fulfillment Status</span>
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1.5 border-b border-[#FAF7F5]">
                      <span className="text-[#52474E]">Orders Ready to Dispatch</span>
                      <span className="font-black text-[#E11D48]">14 packages</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-[#FAF7F5]">
                      <span className="text-[#52474E]">Blue Dart Courier Transit</span>
                      <span className="font-black text-[#0284C7]">22 packages</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-[#52474E]">Delivered Today across Metro Cities</span>
                      <span className="font-black text-[#10B981]">48 packages</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#F0E6E1] shadow-xs space-y-3">
                  <h3 className="font-extrabold text-sm text-[#1E1B1D] flex items-center gap-2">
                    <Sun className="w-4 h-4 text-[#FF6584]" />
                    <span>Top Selling Sunscreens Today</span>
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1.5 border-b border-[#FAF7F5]">
                      <span className="font-bold text-[#1E1B1D]">1. Watermelon Cooling SPF 50+</span>
                      <span className="font-extrabold text-[#E11D48]">184 sold</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-[#FAF7F5]">
                      <span className="font-bold text-[#1E1B1D]">2. Vitamin C + E Super Bright</span>
                      <span className="font-extrabold text-[#F97316]">132 sold</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="font-bold text-[#1E1B1D]">3. Strawberry Dew Tinted Sunscreen</span>
                      <span className="font-extrabold text-[#BE123C]">96 sold</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUNSCREEN INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-sm text-[#1E1B1D]">
                    Manage Sunscreen Products &amp; Prices
                  </h3>
                  <p className="text-xs text-[#7A6E75]">
                    Toggle stock availability, update prices, or monitor SKU levels.
                  </p>
                </div>
                <div className="relative">
                  <Search className="w-4 h-4 text-[#9C929A] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Filter sunscreens..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl bg-[#FAF7F5] border border-[#F0E6E1] text-xs focus:outline-none focus:ring-1 focus:ring-[#FF6584]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto border border-[#F0E6E1] rounded-2xl bg-white shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F5] border-b border-[#F0E6E1] text-[#52474E] font-black uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Sunscreen SKU</th>
                      <th className="py-3 px-4">SPF / PA</th>
                      <th className="py-3 px-4">Price (₹)</th>
                      <th className="py-3 px-4">Stock Units</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0E6E1]">
                    {inventoryList
                      .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-[#FFF5F7]/40 transition-colors">
                          <td className="py-3 px-4 flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded-xl border border-[#F0E6E1]"
                            />
                            <div>
                              <p className="font-black text-[#1E1B1D]">{item.name}</p>
                              <p className="text-[10px] text-[#7A6E75]">{item.category}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#FFE5EC] text-[#E11D48]">
                              {item.spf}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1 font-extrabold text-[#1E1B1D]">
                              <span>₹{item.price}</span>
                              <div className="flex flex-col ml-1">
                                <button
                                  onClick={() => handleUpdatePrice(item.id, 20)}
                                  className="text-[9px] hover:text-[#FF6584] cursor-pointer"
                                  title="Increase price +₹20"
                                >
                                  ▲
                                </button>
                                <button
                                  onClick={() => handleUpdatePrice(item.id, -20)}
                                  className="text-[9px] hover:text-[#FF6584] cursor-pointer"
                                  title="Decrease price -₹20"
                                >
                                  ▼
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-bold text-[#52474E]">
                            {item.stock} units
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleToggleStock(item.id)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold cursor-pointer transition-all ${
                                item.inStock
                                  ? 'bg-[#10B981]/15 text-[#047857] hover:bg-[#10B981]/25'
                                  : 'bg-[#EF4444]/15 text-[#B91C1C] hover:bg-[#EF4444]/25'
                              }`}
                            >
                              {item.inStock ? '● In Stock' : '○ Out of Stock'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleToggleStock(item.id)}
                              className="px-3 py-1.5 rounded-xl border border-[#EFE5E0] hover:border-[#FF6584] text-xs font-bold text-[#1E1B1D] hover:text-[#FF6584] transition-all cursor-pointer"
                            >
                              Toggle
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMER ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-[#1E1B1D]">Live Customer Orders</h3>
                  <p className="text-xs text-[#7A6E75]">
                    Click on status pill to cycle status: Processing → Packed → Dispatched → Delivered.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {orders.map((order) => {
                  const statusColors: Record<OrderRecord['status'], string> = {
                    Processing: 'bg-[#FEF3C7] text-[#B45309]',
                    Packed: 'bg-[#E0F2FE] text-[#0369A1]',
                    Dispatched: 'bg-[#EDE9FE] text-[#6D28D9]',
                    Delivered: 'bg-[#DCFCE7] text-[#15803D]',
                  };

                  return (
                    <div
                      key={order.id}
                      className="p-4 rounded-2xl bg-white border border-[#F0E6E1] hover:border-[#FFD1DC] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-xs text-[#1E1B1D]">{order.id}</span>
                          <span className="text-[11px] text-[#7A6E75]">• {order.date}</span>
                        </div>
                        <p className="font-black text-sm text-[#1E1B1D]">{order.customerName}</p>
                        <p className="text-xs text-[#52474E]">{order.items}</p>
                        <p className="text-[11px] text-[#7A6E75]">
                          Delivery: <strong>{order.city}</strong> | {order.paymentMethod}
                        </p>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                        <span className="text-base font-black text-[#1E1B1D]">
                          ₹{order.total}
                        </span>
                        <button
                          onClick={() => handleCycleOrderStatus(order.id)}
                          className={`px-3 py-1 rounded-full text-xs font-black cursor-pointer shadow-xs transition-all ${
                            statusColors[order.status]
                          }`}
                          title="Click to advance status"
                        >
                          {order.status} ↻
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: COUPONS & DISCOUNTS */}
          {activeTab === 'coupons' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-extrabold text-sm text-[#1E1B1D]">Active Discount Coupons</h3>
                <p className="text-xs text-[#7A6E75]">
                  Manage promo codes for checkout (e.g. SUNNY15, GLOW20, FREESHIP).
                </p>
              </div>

              {/* Add Coupon Form */}
              <form
                onSubmit={handleAddCoupon}
                className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#F0E6E1] flex flex-wrap items-center gap-3"
              >
                <input
                  type="text"
                  placeholder="Coupon Code (e.g. SUMMER25)"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#EFE5E0] text-xs font-bold uppercase tracking-wider text-[#1E1B1D] focus:outline-none focus:ring-1 focus:ring-[#FF6584]"
                />
                <select
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#EFE5E0] text-xs font-bold text-[#1E1B1D] focus:outline-none focus:ring-1 focus:ring-[#FF6584]"
                >
                  <option value="15% OFF">15% OFF</option>
                  <option value="20% OFF">20% OFF</option>
                  <option value="25% OFF">25% OFF</option>
                  <option value="Free Shipping">Free Shipping</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1E1B1D] hover:bg-[#FF6584] text-white text-xs font-black transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Coupon</span>
                </button>
              </form>

              {/* Coupon Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {coupons.map((c) => (
                  <div
                    key={c.code}
                    className="p-4 rounded-2xl bg-white border border-[#F0E6E1] shadow-xs space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black tracking-wider text-[#E11D48] px-2 py-0.5 rounded-lg bg-[#FFE5EC]">
                        {c.code}
                      </span>
                      <span className="text-[10px] font-black text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded-full">
                        {c.status}
                      </span>
                    </div>
                    <p className="text-lg font-black text-[#1E1B1D]">{c.discount}</p>
                    <p className="text-[11px] text-[#7A6E75]">
                      Min. cart value ₹{c.minOrder} • {c.uses} redemptions
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SUPABASE BACKEND LIVE INTEGRATION */}
          {activeTab === 'supabase' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Connected Banner */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-[#F9DDE5] via-[#FCEEF2] to-white border border-[#F5D5DE] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF8C9A] text-white flex items-center justify-center shadow-md shrink-0">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-[#633D4B] font-display">
                        Supabase Backend Connected
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                        Project Active
                      </span>
                    </div>
                    <p className="text-xs text-[#8E6B78] mt-1 leading-relaxed">
                      Every sunscreen order submitted on the checkout order form is automatically dispatched to your Supabase PostgreSQL database.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-stretch md:self-auto">
                  <button
                    onClick={handleTestSupabase}
                    disabled={isTestingSupabase}
                    className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-[#FCEEF2] border border-[#F5D5DE] text-xs font-bold text-[#633D4B] hover:text-[#FF8C9A] shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-[#FF8C9A] ${isTestingSupabase ? 'animate-spin' : ''}`} />
                    <span>{isTestingSupabase ? 'Testing...' : 'Test Connection'}</span>
                  </button>

                  <a
                    href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white text-xs font-black shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Supabase Dashboard</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Ping status feedback */}
              {supabaseTestStatus && (
                <div className="p-3 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs font-semibold text-[#047857] flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#059669]" />
                  <span>{supabaseTestStatus}</span>
                </div>
              )}

              {/* Project Credentials Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="p-4 rounded-2xl bg-white border border-[#F5D5DE] shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-[#8E6B78] uppercase tracking-wider">Project Reference ID</span>
                  <p className="font-mono text-xs font-black text-[#633D4B] truncate select-all">{SUPABASE_PROJECT_ID}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#F5D5DE] shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-[#8E6B78] uppercase tracking-wider">API URL</span>
                  <p className="font-mono text-xs font-black text-[#633D4B] truncate select-all">{SUPABASE_URL}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#F5D5DE] shadow-xs space-y-1">
                  <span className="text-[10px] font-bold text-[#8E6B78] uppercase tracking-wider">Anon / Publishable Key</span>
                  <p className="font-mono text-xs font-black text-[#633D4B] truncate select-all">{SUPABASE_ANON_KEY.slice(0, 20)}...</p>
                </div>
              </div>

              {/* SQL Table Setup Snippet */}
              <div className="p-5 rounded-3xl bg-white border border-[#F5D5DE] shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-black text-sm text-[#633D4B] flex items-center gap-2">
                      <span>Database Table Schema</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F9DDE5] text-[#633D4B]">public.orders</span>
                    </h4>
                    <p className="text-xs text-[#8E6B78] mt-0.5">
                      Ensure your Supabase project has the <code>orders</code> table created with public insert permissions.
                    </p>
                  </div>
                  <button
                    onClick={handleCopySql}
                    className="px-4 py-2 rounded-xl bg-[#FCEEF2] hover:bg-[#F9DDE5] border border-[#F5D5DE] text-[#633D4B] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5 text-[#FF8C9A]" />}
                    <span>{copiedSql ? 'SQL Copied!' : 'Copy SQL Setup Script'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-2xl bg-[#2D2A2E] text-[#F9DDE5] font-mono text-[11px] overflow-x-auto leading-relaxed max-h-48 scrollbar-thin">
                  {SUPABASE_SQL_SETUP}
                </pre>
              </div>

              {/* Live Order Form Submissions synced to Supabase */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-sm text-[#633D4B]">Live Checkout Form Submissions</h4>
                    <p className="text-xs text-[#8E6B78]">
                      Orders placed via checkout form — synchronized directly with Supabase.
                    </p>
                  </div>
                  <button
                    onClick={handleSyncAllOrders}
                    disabled={isSyncingAll || storedCheckoutOrders.length === 0}
                    className="px-3.5 py-1.5 rounded-xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white text-xs font-black shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? 'animate-spin' : ''}`} />
                    <span>Sync All to Supabase</span>
                  </button>
                </div>

                {storedCheckoutOrders.length === 0 ? (
                  <div className="p-8 rounded-3xl bg-[#FCEEF2]/50 border border-dashed border-[#F5D5DE] text-center space-y-2">
                    <ShoppingBag className="w-8 h-8 text-[#FF8C9A] mx-auto opacity-70" />
                    <p className="font-black text-xs text-[#633D4B]">No Checkout Orders Placed Yet</p>
                    <p className="text-[11px] text-[#8E6B78] max-w-sm mx-auto">
                      Fill the order form at checkout to see customer orders appear here and sync instantly to your Supabase database table.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {storedCheckoutOrders.map((ord: any) => (
                      <div
                        key={ord.order_id}
                        className="p-4 rounded-2xl bg-white border border-[#F5D5DE] hover:border-[#FF8C9A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-xs text-[#633D4B]">{ord.order_id}</span>
                            <span className="text-[10px] font-bold text-[#8E6B78]">
                              {ord.created_at ? new Date(ord.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                              ord.synced ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]' : 'bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]'
                            }`}>
                              {ord.synced ? `Synced (${ord.syncedTable || 'orders'})` : 'Saved in Queue'}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-[#633D4B]">
                            {ord.customer_name} • <span className="text-[#8E6B78]">{ord.customer_phone || ord.customer_email}</span>
                          </p>
                          <p className="text-[11px] text-[#8E6B78]">
                            {ord.shipping_address}, {ord.city}, {ord.state} {ord.pincode}
                          </p>
                        </div>

                        <div className="text-right flex md:flex-col items-center md:items-end justify-between md:justify-center pt-2 md:pt-0 border-t md:border-t-0 border-[#F5D5DE]">
                          <span className="text-sm font-black text-[#FF8C9A]">₹{ord.total_amount}</span>
                          <span className="text-[10px] font-bold text-[#633D4B]">{ord.payment_method}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#F0E6E1] bg-[#FAF7F5] flex items-center justify-between text-xs text-[#7A6E75]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            <span>Store Administrator Session Active</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#1E1B1D] text-white font-bold text-xs hover:bg-[#FF6584] transition-all cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
