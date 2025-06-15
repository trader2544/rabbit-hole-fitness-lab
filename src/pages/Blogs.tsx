
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, User } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image_url: string | null;
  category: string;
  tags: string[] | null;
  published_at: string;
  created_at: string;
  profiles: {
    full_name: string;
  } | null;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        profiles!blogs_author_id_fkey(full_name)
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
    } else {
      setBlogs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-gray-500">Loading blogs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-light text-gray-900 mb-8">Blog</h1>
          
          {blogs.length === 0 ? (
            <Card className="border border-gray-200">
              <CardContent className="p-8 text-center">
                <p className="text-gray-600">No blog posts available yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {blogs.map((blog) => (
                <Card key={blog.id} className="border border-gray-200">
                  <CardHeader>
                    {blog.featured_image_url && (
                      <img 
                        src={blog.featured_image_url} 
                        alt={blog.title}
                        className="w-full h-48 object-cover rounded-t-lg mb-4"
                      />
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(blog.published_at).toLocaleDateString()}
                      <User className="h-4 w-4 ml-4" />
                      {blog.profiles?.full_name || 'Admin'}
                    </div>
                    <CardTitle className="text-2xl font-light">{blog.title}</CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="capitalize">{blog.category}</Badge>
                      {blog.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                    <div 
                      className="prose prose-gray max-w-none"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
