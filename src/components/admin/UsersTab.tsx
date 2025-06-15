
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function UsersTab({ users }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user: any) => (
        <Card key={user.id} className="border border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <p className="font-semibold">{user.full_name || "No name"}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-500">
                Joined: {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
