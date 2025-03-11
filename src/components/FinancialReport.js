import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

const FinancialReport = () => {
  // Income data from Irwin Naturals and Klee Irwin
  const incomeData = [
    { source: 'Irwin Naturals (Direct Deposit)', amount: 4501.97 }, // Feb 7 and Feb 21 combined
    { source: 'Klee Irwin (Zelle)', amount: 3615.00 }  // Sum of all Klee Irwin Zelle payments
  ];

  // Income breakdown details
  const irwinNaturalsBreakdown = [
    { date: "Feb 7", description: "IRWIN NATURALS DIRECT DEP", amount: 2441.10 },
    { date: "Feb 21", description: "IRWIN NATURALS DIRECT DEP", amount: 2060.87 }
  ];

  const kleeIrwinBreakdown = [
    { date: "Feb 11", description: "Zelle payment from KLEE IRWIN", amount: 1750.00 },
    { date: "Feb 13", description: "Zelle payment from KLEE IRWIN", amount: 1000.00 },
    { date: "Feb 14", description: "Zelle payment from KLEE IRWIN", amount: 500.00 },
    { date: "Feb 24", description: "Zelle payment from KLEE IRWIN", amount: 365.00 }
  ];

  // Main expense categories - with corrected category names and values
  const mainExpenseData = [
    { category: 'Housing (Minoo)', amount: 3500.00 },
    { category: 'Health & Wellness', amount: 1065.49 },
    { category: 'Entertainment & Subscriptions', amount: 1220.64 }, // Added Apple bill, Growplex, SP BUR BUR
    { category: 'Uncategorized', amount: 885.07 }, // Removed Growplex and SP BUR BUR
    { category: 'Digital Services', amount: 806.72 },
    { category: 'Food Delivery', amount: 601.29 }, // Renamed from Transportation
    { category: 'Amazon', amount: 566.25 },
    { category: 'Erewhon', amount: 488.48 },
    { category: 'Car (Ray)', amount: 410.66 },
    { category: 'Utilities & Bills', amount: 209.86 }, // Reduced by moving Apple bill to subscriptions
    { category: 'Banking & Fees', amount: 110.00 },
    { category: 'Dining', amount: 56.62 }, // Renamed from Dining & Food Delivery
    { category: 'Other Online Shopping', amount: 17.89 },
    { category: 'Clothing & Accessories', amount: 17.79 },
    { category: 'Other Groceries', amount: 16.39 }
  ];

  // Category details - transactions that make up each category (with corrections)
  const categoryDetails = {
    'Housing (Minoo)': [
      { date: "Feb 12", description: "Zelle payment to Minoo", amount: 1750.00 },
      { date: "Feb 11", description: "Zelle payment to Minoo", amount: 1750.00 }
    ],
    'Car (Ray)': [
      { date: "Feb 21", description: "Zelle payment to Ray Mund", amount: 400.00 },
      { date: "Feb 18", description: "Zelle payment to Ray Mund", amount: 10.66 }
    ],
    'Amazon': [
      { date: "Feb 24", description: "AMAZON MKTPL*5P0D57R", amount: 90.41 },
      { date: "Feb 10", description: "AMAZON MKTPL*816HM3S", amount: 92.52 },
      { date: "Feb 18", description: "Amazon.com*E57885FS3", amount: 78.84 },
      { date: "Feb 24", description: "AMAZON MKTPL*AE8Q045", amount: 28.46 },
      { date: "Feb 10", description: "AMAZON MKTPL*OF8UH7I", amount: 57.62 }
    ],
    'Erewhon': [
      { date: "Feb 26", description: "EREWHON CALABASAS", amount: 204.39 },
      { date: "Feb 18", description: "EREWHON CALABASAS", amount: 284.09 }
    ],
    'Other Groceries': [
      { date: "Feb 24", description: "TRADER JOE S #254", amount: 10.94 },
      { date: "Feb 10", description: "Amazon Grocery Subscr", amount: 5.45 }
    ],
    'Other Online Shopping': [
      { date: "Feb 24", description: "PAYPAL - ETSY INC", amount: 17.89 }
    ],
    'Health & Wellness': [
      { date: "Feb 14", description: "SP DR. CLARK STORE", amount: 907.19 },
      { date: "Feb 10", description: "SP ACTIVATION VIBRAT", amount: 99.00 },
      { date: "Feb 25", description: "THYROIDSUPPLEMENTS.C", amount: 39.96 },
      { date: "Feb 12", description: "CVS/PHARMACY", amount: 19.34 }
    ],
    'Entertainment & Subscriptions': [
      { date: "Feb 18", description: "BE KIND STUDIOS", amount: 298.00 },
      { date: "Mar 03", description: "PAYPAL - APPLE.COM BILL", amount: 149.99 }, // Moved from Utilities
      { date: "Mar 03", description: "OPENAI *CHATGPT SUBSCR", amount: 200.00 },
      { date: "Feb 20", description: "SP BUTCHERBOX", amount: 169.00 },
      { date: "Feb 14", description: "GROWPLEX", amount: 77.40 }, // Moved from Uncategorized
      { date: "Feb 14", description: "SP BUR BUR", amount: 57.13 }, // Moved from Uncategorized
      { date: "Feb 18", description: "PAYPAL - CHEWY INC", amount: 52.23 },
      { date: "Feb 13", description: "BE KIND STUDIOS", amount: 45.00 },
      { date: "Feb 10", description: "BE KIND STUDIOS", amount: 35.00 },
      { date: "Feb 25", description: "BE KIND STUDIOS", amount: 27.89 }
    ],
    'Digital Services': [
      { date: "Feb 24", description: "PAYPAL - HOTELS", amount: 189.73 },
      { date: "Feb 27", description: "PAYPAL - PAYIN4", amount: 141.80 },
      { date: "Feb 12", description: "PAYPAL - PAYIN4", amount: 141.80 },
      { date: "Feb 24", description: "PAYPAL - PAYIN4", amount: 84.86 },
      { date: "Mar 03", description: "PAYPAL - PAYIN4", amount: 44.37 }
    ],
    'Food Delivery': [ // Renamed from Transportation
      { date: "Feb 21", description: "UBER *EATS", amount: 143.47 },
      { date: "Feb 24", description: "UBER *EATS", amount: 69.38 },
      { date: "Feb 11", description: "UBER *EATS", amount: 51.49 },
      { date: "Feb 11", description: "UBER *EATS", amount: 37.99 },
      { date: "Feb 10", description: "UBER *EATS", amount: 34.45 }
    ],
    'Utilities & Bills': [ // Removed Apple.com bill
      { date: "Mar 06", description: "OVERDRAFT FEE", amount: 34.00 },
      { date: "Mar 05", description: "OVERDRAFT FEE", amount: 34.00 },
      { date: "Feb 11", description: "PAYPAL - APPLE.COM BILL", amount: 29.99 },
      { date: "Feb 19", description: "PAYPAL - APPLE.COM BILL", amount: 23.98 }
    ],
    'Banking & Fees': [
      { date: "Feb 10", description: "NON-CHASE ATM WITHDRAW", amount: 46.00 },
      { date: "Mar 04", description: "OVERDRAFT FEE", amount: 34.00 },
      { date: "Feb 24", description: "NON-CHASE ATM WITHDRAW", amount: 24.00 },
      { date: "Feb 24", description: "NON-CHASE ATM FEE-WITH", amount: 3.00 },
      { date: "Feb 10", description: "NON-CHASE ATM FEE-WITH", amount: 3.00 }
    ],
    'Dining': [ // Renamed from Dining & Food Delivery
      { date: "Feb 24", description: "CHAUPAIN BAKERY", amount: 14.00 },
      { date: "Feb 18", description: "SEA SIDE BURGER", amount: 13.54 },
      { date: "Feb 18", description: "SEA SIDE BURGER", amount: 10.15 },
      { date: "Feb 18", description: "SQ *VENICE COCONUTS", amount: 8.00 },
      { date: "Feb 14", description: "SQ *310 COFFEE COMPANY", amount: 5.48 }
    ],
    'Clothing & Accessories': [
      { date: "Feb 13", description: "THE UPS STORE", amount: 17.79 }
    ],
    'Uncategorized': [ // Removed Growplex and SP BUR BUR
      { date: "Feb 21", description: "Zelle payment to Andrey Urakhchin", amount: 400.00 },
      { date: "Feb 18", description: "SQ *NO'ELANI'S PURE DR", amount: 88.82 },
      { date: "Feb 24", description: "ULTA #1431", amount: 53.66 }
    ]
  };

  // Updated subscription services breakdown
  const subscriptionDetails = [
    { service: "BE KIND STUDIOS", amount: 405.89 },
    { service: "OPENAI CHATGPT", amount: 200.00 },
    { service: "BUTCHERBOX", amount: 169.00 },
    { service: "APPLE.COM BILL", amount: 149.99 }, // Added
    { service: "GROWPLEX", amount: 77.40 }, // Added
    { service: "SP BUR BUR", amount: 57.13 }, // Added
    { service: "CHEWY", amount: 52.23 },
    { service: "Other Subscriptions", amount: 109.00 }
  ];

  // Colors for the charts
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', 
    '#82ca9d', '#ffc658', '#bc5090', '#8b0000', '#006400',
    '#4b0082', '#ff1493', '#808000', '#483d8b', '#2f4f4f'
  ];
  
  const INCOME_COLORS = ['#4CAF50', '#8BC34A'];

  // Calculate totals
  const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = mainExpenseData.reduce((sum, item) => sum + item.amount, 0);
  const netCashFlow = totalIncome - totalExpenses;

  // Add total to each data point for percentage calculation
  const expenseDataWithTotal = mainExpenseData.map(item => ({...item, total: totalExpenses}));
  
  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow-sm">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-gray-700">${payload[0].value.toFixed(2)}</p>
          <p className="text-gray-500 text-sm">
            ({((payload[0].value / payload[0].payload.total) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  // State for selected category to show details
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // State for active tab
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto bg-gray-50">
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center mb-2">February 2025 Financial Report</h1>
        <p className="text-center text-gray-600 mb-6">Complete Analysis of Income and Expenses</p>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-1 py-4 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('income')}
              className={`px-1 py-4 text-sm font-medium ${
                activeTab === 'income'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`px-1 py-4 text-sm font-medium ${
                activeTab === 'expenses'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Expenses
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-1 py-4 text-sm font-medium ${
                activeTab === 'analysis'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analysis & Recommendations
            </button>
          </nav>
        </div>
        
        {/* Executive Summary - Always visible */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4">Executive Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-700">Total Income</h3>
              <p className="text-2xl font-bold text-green-800">${totalIncome.toFixed(2)}</p>
              <p className="text-sm text-green-600">From Irwin Naturals and Klee Irwin</p>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h3 className="text-lg font-semibold text-red-700">Total Expenses</h3>
              <p className="text-2xl font-bold text-red-800">${totalExpenses.toFixed(2)}</p>
              <p className="text-sm text-red-600">Across 15 categories</p>
            </div>
            
            <div className={`p-4 rounded-lg border ${netCashFlow >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'}`}>
              <h3 className={`text-lg font-semibold ${netCashFlow >= 0 ? 'text-blue-700' : 'text-yellow-700'}`}>Net Cash Flow</h3>
              <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-blue-800' : 'text-yellow-800'}`}>${netCashFlow.toFixed(2)}</p>
              <p className={`text-sm ${netCashFlow >= 0 ? 'text-blue-600' : 'text-yellow-600'}`}>
                {netCashFlow >= 0 ? 'Positive cash flow' : 'Expenses exceeded income'}
              </p>
            </div>
          </div>
        </div>
      
        {/* Main Content Based on Active Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Income Overview</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={incomeData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="source" />
                      <YAxis
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                      <Legend />
                      <Bar dataKey="amount" name="Income Amount" fill="#4CAF50">
                        {incomeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={INCOME_COLORS[index % INCOME_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Top 5 Expenses</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={mainExpenseData.slice(0, 5)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                      <Legend />
                      <Bar dataKey="amount" name="Amount" fill="#FF8042">
                        {mainExpenseData.slice(0, 5).map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h3 className="text-lg font-semibold mb-4">Key Observations</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-gray-700">
                  <span className="font-medium">Housing costs</span> are your largest expense at <span className="font-semibold">${mainExpenseData.find(i => i.category === 'Housing (Minoo)').amount.toFixed(2)}</span>, representing {((mainExpenseData.find(i => i.category === 'Housing (Minoo)').amount / totalExpenses) * 100).toFixed(1)}% of total expenses.
                </li>
                <li className="text-gray-700">
                  <span className="font-medium">Health & Wellness</span> and <span className="font-medium">Entertainment & Subscriptions</span> are your second and third largest expenses, totaling <span className="font-semibold">${(mainExpenseData.find(i => i.category === 'Health & Wellness').amount + mainExpenseData.find(i => i.category === 'Entertainment & Subscriptions').amount).toFixed(2)}</span>.
                </li>
                <li className="text-gray-700">
                  <span className="font-medium">Food-related expenses</span> (Erewhon, Food Delivery, Dining, Other Groceries) total <span className="font-semibold">${(mainExpenseData.find(i => i.category === 'Erewhon').amount + mainExpenseData.find(i => i.category === 'Food Delivery').amount + mainExpenseData.find(i => i.category === 'Dining').amount + mainExpenseData.find(i => i.category === 'Other Groceries').amount).toFixed(2)}</span>, with Erewhon and food delivery being the largest components.
                </li>
                <li className="text-gray-700">
                  You had <span className="font-medium">banking fees</span> of <span className="font-semibold">${mainExpenseData.find(i => i.category === 'Banking & Fees').amount.toFixed(2)}</span>, including several overdraft fees that could be avoided.
                </li>
                <li className={`${netCashFlow >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  Your <span className="font-medium">net cash flow</span> for February was <span className="font-semibold">${netCashFlow.toFixed(2)}</span>, which is {netCashFlow >= 0 ? 'positive' : 'negative'}.
                </li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'income' && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">Income Sources</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-green-700">Total Income: ${totalIncome.toFixed(2)}</h3>
            </div>
            <div className="h-72 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={incomeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="source" angle={-45} textAnchor="end" height={80} />
                  <YAxis
                    tickFormatter={(value) => `$${value}`}
                    label={{ value: 'Amount (USD)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Legend />
                  <Bar dataKey="amount" name="Income Amount" fill="#4CAF50">
                    <LabelList dataKey="amount" position="top" formatter={(value) => `$${value.toFixed(0)}`} />
                    {incomeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={INCOME_COLORS[index % INCOME_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Irwin Naturals Income</h3>
                <table className="min-w-full border rounded">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Date</th>
                      <th className="py-2 px-4 border-b text-left">Description</th>
                      <th className="py-2 px-4 border-b text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {irwinNaturalsBreakdown.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{item.date}</td>
                        <td className="py-2 px-4">{item.description}</td>
                        <td className="py-2 px-4 text-right">${item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-semibold">
                      <td className="py-2 px-4" colSpan="2">Total</td>
                      <td className="py-2 px-4 text-right">${incomeData[0].amount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Klee Irwin Zelle Payments</h3>
                <table className="min-w-full border rounded">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Date</th>
                      <th className="py-2 px-4 border-b text-left">Description</th>
                      <th className="py-2 px-4 border-b text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kleeIrwinBreakdown.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{item.date}</td>
                        <td className="py-2 px-4">{item.description}</td>
                        <td className="py-2 px-4 text-right">${item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-semibold">
                      <td className="py-2 px-4" colSpan="2">Total</td>
                      <td className="py-2 px-4 text-right">${incomeData[1].amount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold mb-2 text-blue-800">Income Analysis</h3>
              <ul className="list-disc pl-5 space-y-2 text-blue-800">
                <li>Irwin Naturals direct deposits are your primary income source at 55.5% of total income.</li>
                <li>Klee Irwin Zelle payments account for 44.5% of your income.</li>
                <li>Your most significant Klee Irwin payment was $1,750.00 on February 11th.</li>
                <li>Your total monthly income of $8,116.97 averages to approximately $270.57 per day.</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'expenses' && (
          <div>
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-red-700">Total Expenses: ${totalExpenses.toFixed(2)}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center">Top 10 Expense Categories</h3>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={mainExpenseData.slice(0, 10)}
                        margin={{ top: 20, right: 30, left: 20, bottom: 90 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="category" 
                          angle={-45} 
                          textAnchor="end" 
                          height={80}
                        />
                        <YAxis
                          tickFormatter={(value) => `${value}`}
                          label={{ value: 'Amount (USD)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip formatter={(value) => `${value.toFixed(2)}`} />
                        <Bar 
                          dataKey="amount" 
                          fill="#FF8042" 
                          name="Amount"
                          onClick={(data) => data && handleCategorySelect(data.category)}
                        >
                          {mainExpenseData.slice(0, 10).map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={selectedCategory === entry.category ? 
                                '#ff7300' : COLORS[index % COLORS.length]} 
                            />
                          ))}
                          <LabelList dataKey="amount" position="top" formatter={(value) => `${value.toFixed(0)}`} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-center text-gray-600 mt-2">
                    Click on a category to see details
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-center">Expense Distribution</h3>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseDataWithTotal}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="amount"
                          nameKey="category"
                          label={({ name, percent }) => 
                            percent > 0.03 ? `${name.length > 12 ? name.substring(0, 12) + '...' : name}: ${(percent * 100).toFixed(0)}%` : ''
                          }
                          onClick={(data) => data && handleCategorySelect(data.name)}
                        >
                          {mainExpenseData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={selectedCategory === entry.category ? 
                                '#ff7300' : COLORS[index % COLORS.length]} 
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* Category Details Section */}
              {selectedCategory && (
                <div className="bg-white p-4 rounded-lg border border-gray-200 mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    {selectedCategory} Details (${mainExpenseData.find(item => item.category === selectedCategory).amount.toFixed(2)})
                  </h2>
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Date</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                          <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {categoryDetails[selectedCategory] && categoryDetails[selectedCategory].map((item, index) => (
                          <tr key={index}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{item.date}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.description}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">${item.amount.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-50 font-semibold">
                          <td colSpan="2" className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Total</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">
                            ${mainExpenseData.find(item => item.category === selectedCategory).amount.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Special view for Entertainment & Subscriptions */}
                  {selectedCategory === "Entertainment & Subscriptions" && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-4">Subscription Services Breakdown</h3>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={subscriptionDetails}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="service" />
                            <YAxis
                              tickFormatter={(value) => `${value}`}
                              label={{ value: 'Amount (USD)', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip formatter={(value) => `${value.toFixed(2)}`} />
                            <Legend />
                            <Bar dataKey="amount" name="Amount" fill="#8884d8">
                              <LabelList dataKey="amount" position="top" formatter={(value) => `${value.toFixed(0)}`} />
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <span className="font-bold">Note:</span> BE KIND STUDIOS total of $405.89 includes four separate transactions throughout February.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Complete Expense List */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Complete Expense Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Category</th>
                        <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Amount</th>
                        <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Percentage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {mainExpenseData
                        .sort((a, b) => b.amount - a.amount)
                        .map((category, index) => (
                        <tr 
                          key={index} 
                          className={`cursor-pointer hover:bg-gray-50 ${selectedCategory === category.category ? 'bg-yellow-50' : ''}`}
                          onClick={() => handleCategorySelect(category.category)}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{category.category}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">${category.amount.toFixed(2)}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">
                            {((category.amount / totalExpenses) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-100 font-semibold">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Total</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">${totalExpenses.toFixed(2)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">100.0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div>
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-semibold mb-4">Financial Analysis</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Spending Categories Analysis</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-2">Housing</h4>
                    <p className="text-gray-700 mb-2">Housing costs ($3,500.00) represent {((3500 / totalExpenses) * 100).toFixed(1)}% of your total monthly expenses.</p>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(3500 / totalExpenses) * 100}%` }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">{((3500 / totalExpenses) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-2">Health & Wellness + Entertainment & Subscriptions</h4>
                    <p className="text-gray-700 mb-2">These discretionary categories together ($2,286.13) account for {(((1065.49 + 1220.64) / totalExpenses) * 100).toFixed(1)}% of your total spending.</p>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${((1065.49 + 1220.64) / totalExpenses) * 100}%` }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">{(((1065.49 + 1220.64) / totalExpenses) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-2">Food-Related Expenses</h4>
                    <p className="text-gray-700 mb-2">Combined food costs (Erewhon, Food Delivery, Dining, Other Groceries) total $1,162.78, representing {(((488.48 + 601.29 + 56.62 + 16.39) / totalExpenses) * 100).toFixed(1)}% of your expenses.</p>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${((488.48 + 601.29 + 56.62 + 16.39) / totalExpenses) * 100}%` }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">{(((488.48 + 601.29 + 56.62 + 16.39) / totalExpenses) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Cash Flow Analysis</h3>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="mb-1 text-base font-medium text-gray-700">Income Utilization</div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-blue-600 h-4 rounded-full text-xs font-medium text-blue-100 text-center p-0.5 leading-none" style={{ width: `${(totalExpenses / totalIncome) * 100}%` }}>
                          {((totalExpenses / totalIncome) * 100).toFixed(1)}%
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Percentage of income spent</p>
                    </div>
                    
                    <div>
                      <div className="mb-1 text-base font-medium text-gray-700">Savings Rate</div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className={`h-4 rounded-full text-xs font-medium text-center p-0.5 leading-none ${netCashFlow >= 0 ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'}`} style={{ width: `${Math.abs((netCashFlow / totalIncome) * 100)}%` }}>
                          {((netCashFlow / totalIncome) * 100).toFixed(1)}%
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Percentage of income saved</p>
                    </div>
                    
                    <div>
                      <div className="mb-1 text-base font-medium text-gray-700">Daily Spending</div>
                      <p className="text-2xl font-bold text-gray-900">${(totalExpenses / 28).toFixed(2)}</p>
                      <p className="mt-1 text-xs text-gray-500">Average daily expenses in February</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Recommendations</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">Reduce Food Delivery Expenses</h4>
                    <p className="text-blue-700 mb-1">You spent $601.29 on food delivery services this month.</p>
                    <p className="text-blue-700">Consider reducing Uber Eats usage and preparing more meals at home to save approximately $300-400 per month.</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">Eliminate Banking Fees</h4>
                    <p className="text-blue-700 mb-1">You paid $110.00 in banking and ATM fees this month, including several overdraft charges.</p>
                    <p className="text-blue-700">Set up balance alerts and use in-network ATMs to eliminate these unnecessary expenses.</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">Review Subscription Services</h4>
                    <p className="text-blue-700 mb-1">Your entertainment and subscription services total $1,220.64 per month.</p>
                    <p className="text-blue-700">Consider auditing your subscriptions to identify services you may not be fully utilizing.</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">Grocery Shopping Strategy</h4>
                    <p className="text-blue-700 mb-1">Erewhon is your primary grocery source at $488.48 this month.</p>
                    <p className="text-blue-700">Consider supplementing with more shopping at Trader Joe's to reduce your grocery expenses while maintaining quality.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-semibold mb-4">Budget Planning</h2>
              
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-6">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Category</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Current</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Suggested</th>
                      <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">Savings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Housing (Minoo)</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">$3,500.00</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">$3,500.00</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-500">$0.00</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Health & Wellness</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">$1,065.49</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">$800.00</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-green-600">$265.49</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Entertainment & Subscriptions</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">$1,220.64</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">$900.00</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-green-600">$320.64</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Food Delivery</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">$601.29</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">$300.00</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-green-600">$301.29</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Erewhon</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">$488.48</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">$400.00</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-green-600">$88.48</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Banking & Fees</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">$110.00</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">$0.00</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-green-600">$110.00</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Other Categories</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">$2,971.25</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">$2,600.00</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-green-600">$371.25</td>
                    </tr>
                    <tr className="bg-gray-100 font-semibold">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Total</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">${totalExpenses.toFixed(2)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-gray-900">$8,500.00</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-green-600">$1,457.15</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-6">
                <h3 className="text-lg font-semibold mb-2 text-green-800">Potential Monthly Savings</h3>
                <p className="text-green-700 mb-4">
                  By implementing the suggested budget adjustments, you could save approximately <span className="font-bold">$1,457.15</span> per month.
                </p>
                <p className="text-green-700">
                  This would increase your monthly positive cash flow from <span className="font-medium">${netCashFlow.toFixed(2)}</span> to <span className="font-bold">${(netCashFlow + 1457.15).toFixed(2)}</span>, allowing you to save or invest approximately 18% of your income.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold mb-2 text-blue-800">Next Steps</h3>
                <ol className="list-decimal pl-5 space-y-2 text-blue-700">
                  <li>Track your daily expenses to identify impulse spending patterns.</li>
                  <li>Create alerts for your bank account to avoid overdraft fees.</li>
                  <li>Audit your subscription services and cancel those not frequently used.</li>
                  <li>Create a meal planning strategy to reduce food delivery dependence.</li>
                  <li>Set up an automatic transfer to a savings account for the amount you're planning to save each month.</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialReport;