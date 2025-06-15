
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Edit, Trash2, Upload } from "lucide-react";

export default function ProductsTab({ products, fetchProducts }) {
  const { toast } = useToast();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast({ title: "Error", description: "Please select a product image.", variant: "destructive" });
      return;
    }

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, imageFile);

    if (uploadError) {
      toast({ title: "Image Upload Error", description: uploadError.message, variant: "destructive" });
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    const { error: insertError } = await supabase
      .from('products')
      .insert([{
        ...newProduct,
        price: parseFloat(newProduct.price),
        original_price: newProduct.original_price ? parseFloat(newProduct.original_price) : null,
        image_url: publicUrl,
      }]);

    if (insertError) {
      toast({ title: "Error", description: insertError.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Product added successfully!" });
      setNewProduct({ name: "", description: "", price: "", original_price: "", category: "" });
      setImageFile(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
      fetchProducts();
    }
  };

  const deleteProduct = async (product) => {
    //
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    // Delete image from storage
    if (product.image_url) {
      try {
        const url = new URL(product.image_url);
        const path = url.pathname.split('/product-images/')[1];
        if (path) {
          await supabase.storage.from('product-images').remove([path]);
        }
      } catch (e) {
        console.error("Error parsing or deleting image from storage", e);
      }
    }

    // Delete product from database
    const { error } = await supabase.from('products').delete().eq('id', product.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Product deleted." });
      fetchProducts();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="font-light flex items-center">
            <Plus className="mr-2 h-5 w-5" />
            Add New Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addProduct} className="space-y-4">
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
              className="rounded-none border-gray-200"
            />
            <Textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="rounded-none border-gray-200"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="number"
                step="0.01"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
                className="rounded-none border-gray-200"
              />
              <Input
                type="number"
                step="0.01"
                placeholder="Original Price"
                value={newProduct.original_price}
                onChange={(e) => setNewProduct({ ...newProduct, original_price: e.target.value })}
                className="rounded-none border-gray-200"
              />
            </div>
            <Select value={newProduct.category} onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
              <SelectTrigger className="rounded-none border-gray-200">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Equipment">Equipment</SelectItem>
                <SelectItem value="Supplements">Supplements</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <label htmlFor="product-image" className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
              <div className="flex items-center space-x-2">
                <Input
                  id="product-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="rounded-none border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  required
                />
              </div>
              {imageFile && <p className="text-sm text-gray-500 mt-2">Selected: {imageFile.name}</p>}
            </div>
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 rounded-none">
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="font-light">Existing Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {products.map((product: any) => (
              <div key={product.id} className="flex items-center justify-between p-3 border border-gray-200">
                <div className="flex items-center space-x-4">
                  <img src={product.image_url} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">${product.price}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="rounded-none" disabled>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-none text-red-600" onClick={() => deleteProduct(product)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
