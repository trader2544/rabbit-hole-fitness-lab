
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Database } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface TableTest {
  name: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  count?: number;
}

// These literals match the actual Supabase database tables
const TABLES: { table: 
  "profiles" | "products" | "orders" | "order_items" | "notifications" | "activity_logs" | "resources" | "resource_categories" | "trainers",
  description: string
}[] = [
  { table: "profiles", description: "User Profiles" },
  { table: "products", description: "Products" },
  { table: "orders", description: "Orders" },
  { table: "order_items", description: "Order Items" },
  { table: "notifications", description: "Notifications" },
  { table: "activity_logs", description: "Activity Logs" },
  { table: "resources", description: "Resources" },
  { table: "resource_categories", description: "Resource Categories" },
  { table: "trainers", description: "Trainers" },
];

const TableTester = () => {
  const [tests, setTests] = useState<TableTest[]>([]);
  const [loading, setLoading] = useState(false);

  const testTable = async (
    tableName: typeof TABLES[number]['table'], 
    description: string
  ): Promise<TableTest> => {
    try {
      const { error, count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });

      if (error) {
        return {
          name: description,
          status: 'error',
          message: `Error: ${error.message}`,
        };
      }

      return {
        name: description,
        status: 'success',
        message: `Table accessible`,
        count: count || 0,
      };
    } catch (error) {
      return {
        name: description,
        status: 'error',
        message: `Exception: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  };

  const runAllTests = async () => {
    setLoading(true);

    const results = await Promise.all(
      TABLES.map(({ table, description }) => testTable(table, description))
    );

    setTests(results);
    setLoading(false);
  };

  useEffect(() => {
    runAllTests();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Database className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Tables Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={runAllTests} disabled={loading} className="w-full">
            {loading ? 'Testing Tables...' : 'Run Tests Again'}
          </Button>

          <div className="grid gap-3">
            {tests.map((test, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-gray-200 rounded"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(test.status)}
                  <div>
                    <p className="font-medium">{test.name}</p>
                    <p className="text-sm text-gray-600">{test.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {typeof test.count === 'number' && (
                    <span className="text-sm text-gray-500">{test.count} rows</span>
                  )}
                  <Badge className={getStatusBadge(test.status)}>
                    {test.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h3 className="font-semibold mb-2">Test Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-green-600 font-semibold">
                  {tests.filter(t => t.status === 'success').length}
                </div>
                <div className="text-gray-600">Successful</div>
              </div>
              <div className="text-center">
                <div className="text-red-600 font-semibold">
                  {tests.filter(t => t.status === 'error').length}
                </div>
                <div className="text-gray-600">Errors</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-600 font-semibold">
                  {tests.filter(t => t.status === 'warning').length}
                </div>
                <div className="text-gray-600">Warnings</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TableTester;

